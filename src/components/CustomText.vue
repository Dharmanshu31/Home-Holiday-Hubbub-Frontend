<template>
  <v-text-field
    :name="name"
    :type="type"
    :label="label"
    :rules="rules"
    :class="class"
    variant="underlined"
  >
  </v-text-field>
</template>

<script setup>
const props = defineProps({
  name: String,
  label: String,
  rules: Array,
  class: {
    type: String,
    default: "tw-mt-3",
  },
  type: String,
});
</script>
