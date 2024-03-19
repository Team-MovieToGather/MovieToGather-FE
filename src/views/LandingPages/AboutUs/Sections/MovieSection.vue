<script setup>

</script>

<template>

  <div ref="scrollTargetRef" class="scroll container" style="max-height: 1000px">
    <q-infinite-scroll @load="onLoadMenu" :offset="250" :scroll-target="scrollTargetRef">
      <q-item v-for="(item, index) in itemsMenu" :key="index">
        <q-item-section class="row">
          <RouterLink
            :to="{ name: 'detail-view' }">
            <BestReviewCard class="col" image="https://cdn.quasar.dev/img/parallax2.jpg" name="재영" title="리뷰제목" />
          </RouterLink>
        </q-item-section>
        <q-item-section class="row">
          <RouterLink
            :to="{ name: 'detail-view' }">
            <BestReviewCard class="col" image="https://cdn.quasar.dev/img/parallax2.jpg" name="재영" title="리뷰제목" />
          </RouterLink>
        </q-item-section>
        <q-item-section class="row">
          <RouterLink
            :to="{ name: 'detail-view' }">
            <BestReviewCard class="col" image="https://cdn.quasar.dev/img/parallax2.jpg" name="재영" title="리뷰제목" />
          </RouterLink>
        </q-item-section>
      </q-item>
      <template v-slot:loading>
        <div class="text-center q-my-md">
          <q-spinner-dots color="primary" size="20px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>


</template>
<script>
import { ref } from "vue";
import BestReviewCard from "@/views/Presentation/Components/BestReviewCard.vue";


export default {
  components: { BestReviewCard },

  setup() {
    const itemsMenu = ref([{}, {}, {}, {}, {}, {}, {}]);
    const scrollTargetRef = ref(null);

    return {
      itemsMenu,
      scrollTargetRef,

      onLoadMenu(index, done) {
        if (index > 1) {
          setTimeout(() => {
            itemsMenu.value.push({}, {}, {}, {}, {}, {}, {});
            done();
          }, 2000);
        } else {
          setTimeout(() => {
            done();
          }, 200);
        }
      }
    };
  }


};
</script>
