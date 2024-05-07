<template>
  <v-date-picker
    color="#222222"
    multiple="range"
    show-adjacent-months
    :elevation="elevated"
    @mouseover="elevated = 10"
    @mouseleave="elevated = 0"
  ></v-date-picker>
</template>

<script setup>
import { ref } from "vue";
const elevated = ref(0);
</script>
