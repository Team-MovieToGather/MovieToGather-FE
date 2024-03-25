<template>
  <div>
    <input type="text" placeholder="우편번호" v-model="zonecode" readonly />
    <button id="postcode" @click="openPostcode" type="button">검색</button><br />
    <input type="text" v-model="roadAddress" placeholder="주소" readonly />
    <input type="text" v-model="detailAddress" placeholder="상세주소" />
  </div>
</template>
<script>
export default {
  name: "PostCode",
  data() {
    return {
      zonecode: "",
      roadAddress: "",
      detailAddress: "",
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          console.log(data);
          this.zonecode = data.zonecode;
          this.roadAddress = data.roadAddress;
          this.$emit('update:roadAddress', this.roadAddress);
        },
      }).open();
    },
  },
};
</script>