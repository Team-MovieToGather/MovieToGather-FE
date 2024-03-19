<template>
  <div class="q-pa-md row justify-center">
    <h3>댓글</h3>
  </div>
  <div class="q-pa-md row mydiv justify-center">
    <div style="width: 100%; max-width: 1200px">
      <q-input
        v-model="text"
        filled
        autogrow
      />
    </div>
    <div class="q-pa-md row ">
      <div class="mydiv" style="width: 100%; max-width: 1200px">
        <div class="mt-2 row">
          <p class="col-6">댓글 내용이 이렇고저렇고.....</p>
          <p class="col-6 text-md-end">
            <q-btn flat round color="red" icon="favorite" />
            100
          </p>
        </div>
        <div class="row">
          <div class="col">
          </div>
          <div class="col">
          </div>
          <div class="col">
          </div>
          <div class="col">
            <p class="text-md-end">수정</p>
          </div>
          <div class = "col">
            <p class="text-md-end">삭제</p>
          </div>
        </div>


      </div>
    </div>

  </div>
</template>

<script setup>

</script>
<style>
.mydiv {
  border: 1px solid black;
}
</style>
```