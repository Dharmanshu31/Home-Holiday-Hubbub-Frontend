<template>
  <v-card class="tw-w-[550px] tw-h-[200px]" hover>
    <v-card-text>
      <div class="tw-flex tw-items-center">
        <v-avatar size="60">
          <v-img
            alt="John"
            :src="`../../assets/users/${props.review.user.photo}`"
          ></v-img>
        </v-avatar>
        <h2 class="tw-text-xl tw-mx-3">{{ props.review.user.name }}</h2>
      </div>
      <div class="tw-flex tw-mt-2">
        <v-rating
          v-model="props.review.rating"
          active-color="yellow-accent-4"
          size="20"
          disabled
        ></v-rating>
        <p class="tw-ml-2 tw-font-bold tw-text-base">
          {{
            new Date(`${props.review.createdAt}`).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          }}
        </p>
      </div>
      <p class="tw-mt-2 tw-text-lg tw-flex tw-flex-wrap tw-font-semibold">
        {{ props.review.review }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, onMounted } from "vue";

const props = defineProps({
  review: Object,
  id: String,
});

onMounted(() => {
  const id = computed(() => props.id);
  console.log(id.value);
});
</script>
