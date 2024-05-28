<template>
  <v-app>
    <TheHeader v-if="!showHeaderAndFooter" />
    <main>
      <router-view></router-view>
    </main>
    <TheFooter v-if="!showHeaderAndFooter" />
  </v-app>
</template>

<script setup>
import TheHeader from "./layout/ui/TheHeader.vue";
import TheFooter from "./layout/ui/TheFooter.vue";

import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
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
