<template>
  <div
    class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen"
  >
    <img src="../../404-page.svg" class="tw-size-80" />
    <h1 class="tw-text-4xl tw-font-bold tw-mb-4">404 - Not Found</h1>
    <p class="tw-text-lg">The page you are looking for does not exist.</p>
    <router-link to="/" class="tw-mt-5">
      <v-btn prepend-icon="mdi-home" variant="outlined">Go back to home</v-btn>
    </router-link>
  </div>
</template>

<script setup></script>
