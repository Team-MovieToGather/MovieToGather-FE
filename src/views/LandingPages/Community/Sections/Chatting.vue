<script setup>


import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
</script>

<template>
  <section>
    <div class="row justify-center">
      <div style="width: 100%; max-width: 600px">
        <q-chat-message
          label="Sunday, 19th"
        />

        <q-chat-message
          name="me"
          :text="['hey, how are you?']"
          sent
          stamp="7 minutes ago"
        />
        <q-chat-message
          name="Jane"
          :text="['doing fine, how r you?']"
          stamp="4 minutes ago"
        />

        <div class="row justify-space-between py-2">
          <div class="col-10 mx-auto">
            <MaterialInput
              class="input-group-dynamic"
              :label="{ class: 'form-label' }"
              type="text"
            />
          </div>
          <MaterialButton variant="gradient" color="info" class="w-auto me-2">Info</MaterialButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>