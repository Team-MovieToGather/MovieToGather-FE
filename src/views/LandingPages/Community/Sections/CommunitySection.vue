<script setup>

import CommunityCard from "@/views/LandingPages/Community/components/CommunityCard.vue";
</script>

<template>
  <div class="q-pa-md container">
    <div class="row q-gutter-sm">
      <q-intersection
        v-for="index in 9"
        :key="index"
        class="my-example-item"
      >
        <RouterLink
          :to="{ name: 'community-detail' }">
          <CommunityCard :max-applicants=30 :num-applicants=1 location="장소" type="온라인" end-time="2013/12/11 00:01"
                         start-time="2012/12/10 10:00" movie-name="재미없는영화" meeting-name="재미없는영화 감상회" />
        </RouterLink>
      </q-intersection>
    </div>
  </div>

</template>
<script>


</script>
<style lang="sass" scoped>
.my-example-item
  margin-bottom: 40px
  height: 200px
  width: 400px
</style>