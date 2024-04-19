<template>
  <v-btn color="red">Home</v-btn>
  <TheHeader />
  <router-view></router-view>
  <TheFooter />
</template>

<script setup>
import TheHeader from "../layout/ui/TheHeader.vue";
import TheFooter from "../layout/ui/TheFooter.vue";
</script>

<style></style>
