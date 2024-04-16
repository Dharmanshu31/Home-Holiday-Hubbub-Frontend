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
    default: "",
  },
  type: String,
});
</script>

<style>
.v-text-field .v-messages__message {
  color: white;
}
</style>
