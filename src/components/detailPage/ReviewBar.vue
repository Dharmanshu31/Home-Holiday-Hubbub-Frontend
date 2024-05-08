<template>
  <v-card elevation="0" max-width="900">
    <v-list class="tw-flex tw-flex-col-reverse tw-bg-transparent">
      <v-list-item v-for="(rating, _, i) in ratings" :key="i">
        <v-progress-linear
          :model-value="rating * 3"
          color="yellow-darken-3"
          height="20"
          rounded
        ></v-progress-linear>

        <template v-slot:prepend>
          <span>{{ i + 1 }}</span>
          <v-icon class="tw-mx-3" icon="mdi-star"></v-icon>
        </template>

        <template v-slot:append>
          <div>
            <span class="tw-flex tw-justify-end tw-ml-3">
              {{ rating }}
            </span>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
const props = defineProps({
  ratings: Object,
});
</script>
