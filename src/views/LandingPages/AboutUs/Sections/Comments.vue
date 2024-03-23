<script setup>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";

const props = defineProps({
  reviewId: Number
});
const comments = ref([]);
const newCommentText = ref('');



onMounted(() => {
  console.log('가져온 리뷰 id: ',props.reviewId); // 성공
  getComments();
});

// 댓글 불러오기
async function getComments() {
  try {
    const getReview = await axios.get(`http://localhost:8080/api/reviews/${props.reviewId}`);
    comments.value = getReview.data.comments.map(comment => ({
      ...comment,
      isEditing: false,
      editText: comment.contents
    }));
    console.log('comments: ', comments.value[0])
  } catch (error) {
    console.log('리뷰 불러오기 실패', error)
  }
}

// 댓글 등록
async function postComment() {
  try {
    const url = `http://localhost:8080/api/reviews/${props.reviewId}/comments`;
    const response = await axios.post(url, {
      contents: newCommentText.value,
    });
    getComments()
    console.log('댓글이 추가되었습니다.', response.data);
    newCommentText.value = '';
  } catch (error) {
    console.error('댓글 추가에 실패했습니다.', error);
  }
}
// 댓글 수정
async function startEdit(comment) {
  comment.isEditing = true;
};

// 수정 댓글 저장
const saveEdit = async (comment) => {
  try {
    const url = `http://localhost:8080/api/reviews/${props.reviewId}/comments/${comment.id}`;
    await axios.put(url, {contents: comment.editText});
    await getComments();
    comment.isEditing = false;
    console.log('댓글 수정 성공! id: ', comment.id);
  } catch (error) {
    console.error('댓글 수정 실패! id: ', comment.id, error);
  }
};

// 댓글 수정 취소
const cancelEdit = (comment) => {
  comment.isEditing = false;
};

// 댓글 삭제
async function deleteComment(commentId) {
  try {
    const url = `http://localhost:8080/api/reviews/${props.reviewId}/comments/${commentId}`;
    await axios.delete(url);
    console.log('댓글 삭제 성공 id: ', commentId);
    getComments();
  } catch (error) {
    console.error('댓글 삭제 실패 id: ', commentId);
  }
}


  // 날짜 포매팅 함수
  // function formatDate(dateString) {
  //   const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  //   return new Date(dateString).toLocaleDateString('ko-KR', options);
  // }


</script>

<template>
  <div class="q-pa-md row justify-center">
    <h3>댓글</h3>
  </div>
  <div class="q-pa-md row mydiv justify-center">



    <!--    댓글 입력    -->
    <div style="width: 100%; max-width: 1200px">
      <q-input
        v-model="newCommentText"
        filled
        autogrow
        placeholder="리뷰에 대한 감상을 남겨보세요!"
      />
      <q-btn label="댓글 달기" @click="postComment" class="q-mt-md" color="primary" style="margin: 0px "/>
    </div>



    <!--    댓글 목록   -->
    <div class="q-pa-md row ">
      <div v-for="(comment, index) in comments" :key="index" class="mydiv comment-box" style="width: 100%; max-width: 1200px">
        <!-- 댓글-->
        <div  class="mt-2 row">
          <!--          <div>{{ comment.createdAt | formatDate }}</div>-->

          <!--   댓글 내용과 기본 버튼  -->
          <div v-if="!comment.isEditing">
          <!--   댓글 내용-->
            <div class="comment-content">
              <div>{{ comment.createdBy }}</div>
              <p class="text-bold" >{{ comment.contents }}</p>
              <q-btn flat round color="red" icon="favorite" /> {{ comment.likeCount }}
            </div>

            <!-- 기본 버튼 -->
            <div class="row comment-actions">
              <q-btn flat label="수정" @click="startEdit(comment)" color="orange" class="q-mr-md" />
              <q-btn flat label="삭제" @click="deleteComment(comment.id)" color="negative" />
            </div>
          </div>

          <!-- 수정 모드 -->
          <div v-else class="edit-mode">
            <!-- 수정 입력란 -->
            <q-input v-model="comment.editText" filled autogrow />
            <!-- 수정 모드 버튼 -->
            <div class="edit-buttons">
              <q-btn flat label="수정" @click="saveEdit(comment)" class="q-mt-md" color="primary" />
              <q-btn flat label="취소" @click="cancelEdit(comment)" class="q-mt-md" color="primary" />
            </div>
          </div>


        </div>

      </div>
    </div>


  </div>


</template>



<style>
.mydiv {
  border: 1px solid black;
  margin-bottom: 10px;
  padding: 15px;
}

.text-bold {
  font-weight: bold;
}

.comment-box {
  border: 1px solid black;
  margin-bottom: 10px;
  padding: 15px;
  position: relative; /* 부모를 상대 위치로 설정 */
}

.edit-buttons {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  gap: 10px; /* 버튼 사이의 간격 */
}

.comment-actions {
  position: absolute; /* 절대 위치 */
  bottom: 10px; /* 하단에서 10px */
  right: 15px; /* 우측에서 15px */
  display: flex;
  gap: 10px; /* 버튼 사이의 간격 */
}
.edit-mode {
  display: flex;
  flex-direction: column; /* 요소를 수직으로 쌓음 */
}
.edit-actions {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  gap: 10px; /* 버튼 사이 간격 */
}
/* 수정 모드가 아닐 때만 버튼을 표시 */
.comment-actions {
  display: none;
}
/* 수정 모드일 때 기본 버튼 숨김 처리 */
.edit-mode .comment-actions {
  display: flex;
}

/* 수정 모드일 때 수정 모드 버튼 표시 */
.edit-mode .edit-actions {
  display: flex;
}
</style>
```