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

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s;
  -webkit-text-fill-color: #fff !important;
}
.v-text-field .v-messages__message {
  color: rgb(255, 255, 255);
}
</style>
