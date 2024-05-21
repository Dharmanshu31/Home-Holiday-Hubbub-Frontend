<template>
  <div class="tw-mt-14">
    <div class="tw-h-52 tw-bg-gray-800">hello Admin</div>
    <div>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="name"
        @update:options="loadItems"
      ></v-data-table-server>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const headers = ref([
  {
    title: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Calories", key: "calories", align: "end" },
  { title: "Fat (g)", key: "fat", align: "end" },
  { title: "Carbs (g)", key: "carbs", align: "end" },
]);
</script>
