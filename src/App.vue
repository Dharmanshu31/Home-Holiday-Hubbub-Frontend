<template>
  <v-app>
    <TheHeader v-if="!showHeaderAndFooter" />
    <main>
      <router-view></router-view>
      <div class="tw-flex tw-justify-end">
        <div
          v-if="!showHeaderAndFooter"
          class="tw-fixed tw-bottom-4 tw-right-4 tw-z-50"
        >
          <ChatBot v-if="!showHeaderAndFooter" />
        </div>
      </div>
    </main>
    <TheFooter v-if="!showHeaderAndFooter" />
  </v-app>
</template>

<script setup>
import TheHeader from "./layout/ui/TheHeader.vue";
import TheFooter from "./layout/ui/TheFooter.vue";
import ChatBot from "./pages/ChatBot.vue";

import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

//for deside to show footer and header or not
const showHeaderAndFooter = computed(() => {
  return [
    "/login",
    "/signUp",
    "/notFound",
    "/forgetPassword",
    "/resetPassword",
  ].includes(route.path);
});
</script>

<style scoped></style>
