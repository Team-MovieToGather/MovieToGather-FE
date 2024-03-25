<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-option-group
        v-model="panel"
        inline
        :options="[
          { label: '장소', value: 'url' },
          { label: '지도', value: 'map' },
        ]"
      />

      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="url">
          <div class="text-h6 col-12">장소 URL</div>
          <q-input filled v-model="locationUrl" label="장소 URL" @input="updateLocationUrl" />
        </q-tab-panel>

        <q-tab-panel name="map">
          <div class="text-h6">지도</div>
          <q-btn color="primary" label="주소 검색하기" />
          <div id="map" class="mt-5">
            <KakaoMap />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import KakaoMap from "@/views/LandingPages/Community/components/KakaoMap.vue";

export default {
  components: { KakaoMap },
  setup() {
    return {
      panel: ref("mails")
    };
  }
};
</script>