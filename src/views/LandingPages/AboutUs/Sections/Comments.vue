<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const props = defineProps({
  reviewId: Number
});

onMounted(() => {
  console.log('가져온 리뷰 id: ',props.reviewId); // 성공
  // console.log('댓글: ',props.comments[0]);
  getComments();
});

const comments = ref([]);
const newCommentText = ref('');

async function getComments() {
  try {
    const getReview = await axios.get(`http://localhost:8080/api/reviews/${props.reviewId}`);
    comments.value = getReview.data.comments;
    console.log('comments: ', comments.value[0])
  } catch (error) {
    console.log('리뷰 불러오기 실패', error)
  }
}

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

// async function editComment(commentId) {
//   try {
//     const url = `http://localhost:8080/api/reviews/${props.reviewId}/comments/${commentId}`;
//     await axios.put(url);
//
//   }
// }

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
      <q-btn label="댓글 달기" @click="postComment" class="q-mt-md" color="primary" />
    </div>



    <!--    댓글 목록   -->
    <div class="q-pa-md row ">
      <div v-for="(comment, index) in comments" :key="index" class="mydiv" style="width: 100%; max-width: 1200px">
        <!--        댓글-->
        <div  class="mt-2 row">
          <div>{{ comment.createdBy }}</div>
          <!--          <div>{{ comment.createdAt | formatDate }}</div>-->
          <p class="text-bold" >{{ comment.contents }}</p>
          <p class="col-6 text-md-end">
            <q-btn flat round color="red" icon="favorite" />
            {{ comment.likeCount }}
          </p>
        </div>
        <!--        버튼-->
        <div class="row">
          <div class="col">
            <q-btn flat label="수정" @click="editComment(comment.id)" color="orange" class="q-mr-md" />
          </div>
          <div class = "col">
            <q-btn flat label="삭제" @click="deleteComment(comment.id)" color="negative" />
          </div>
        </div>


      </div>
    </div>

  </div>
</template>



<style>
.mydiv {
  border: 1px solid black;
  margin-bottom: 10px; /* 댓글 간의 간격을 주기 위해 추가 */
  padding: 15px; /* 댓글 내부 패딩을 위해 추가 */
}

.text-bold {
  font-weight: bold;
}

.text-right {
  text-align: right;
}
</style>
```