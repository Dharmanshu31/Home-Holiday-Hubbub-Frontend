<template>
  <div>
    <v-card class="tw-max-w-[500px] tw-max-h-[300px]" elevation="6">
      <v-card-text>
        <div class="tw-flex tw-items-center">
          <v-avatar size="60">
            <v-img
              alt="John"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
            ></v-img>
          </v-avatar>
          <h2 class="tw-text-xl tw-mx-3">John</h2>
        </div>
        <div class="tw-flex tw-mt-2">
          <v-rating
            v-model="rating"
            active-color="yellow-accent-4"
            size="20"
            disabled
          ></v-rating>
          <p class="tw-ml-2 tw-font-bold tw-text-base">
            {{
              new Date("2024-05-08T13:59:50.784Z").toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
            }}
          </p>
        </div>
        <p class="tw-mt-2 tw-text-lg tw-flex tw-flex-wrap tw-font-semibold">
          Really good Airbnb for staycation. Quiet and beautiful location. Staff
          is really helpful and responsive.
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const rating = ref(3);
</script>
