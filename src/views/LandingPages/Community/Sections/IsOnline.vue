<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-option-group
        v-model="panel"
        inline
        :options="[
          { label: '온라인', value: 'url' },
          { label: '오프라인', value: 'map' },
        ]"
      />

      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="url">
          <div class="text-h6 col-12">장소 URL</div>
          <q-input filled v-model="locationUrl" />
          <q-btn @click="updateLocationUrl" type="button" label="장소 저장하기" color="primary" />
        </q-tab-panel>

        <q-tab-panel name="map">
          <div class="text-h6">지도</div>
          <DaumMap filled v-model="locationUrl" @update:roadAddress="updateRoadAddress" />
          <!--
          <div id="map" class="mt-5">
            <KakaoMap />
          </div>
          -->
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import DaumMap from "@/views/LandingPages/Community/components/DaumMap.vue";

export default {
  components: { DaumMap },
  setup(props, { emit }) { // Add { emit } here
    const roadAddress = ref(""); // New data property
    const panel = ref("url"); // Changed initial value
    const locationUrl = ref("");

    watch(panel, (newVal) => {
      let type;
      if (newVal === "url") {
        type = "ONLINE";
      } else if (newVal === "map") {
        type = "OFFLINE";
      }
      // Use emit instead of this.$emit
      emit("update:type", type);
    });
    const updateLocationUrl = () => {
      emit("update:locationUrl", locationUrl.value);
      console.log(locationUrl.value); // Ensure the value is updated
    };

    const updateRoadAddress = (newRoadAddress) => {
      roadAddress.value = newRoadAddress;
      emit("update:roadAddress", roadAddress.value);
      console.log("roadAddress: ", roadAddress.value);
    };

    return {
      panel, // Changed return value
      updateRoadAddress, // New method
      roadAddress, // New return value
      locationUrl, // Return locationUrl
      updateLocationUrl // Return the method
    };
  }
};
</script>
