<template>
  <v-footer class="tw-flex tw-flex-col tw-mt-14" color="#f7f7f7">
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon.icon"
        :icon="icon.icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-4 tw-justify-between tw-w-full">
      <v-row>
        <v-col md="6" sm="6" xm="6">
          <a href="#" class="text-lg font-semibold mb-2 tw-pl-28">About Us</a>
        </v-col>
        <v-col md="6" sm="6" xm="6">
          <a href="#" class="text-lg font-semibold mb-2">Connect Us</a>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
    </div>
    <div>
      Discover your perfect holiday home with Holiday Home Hubbub. Explore our
      curated collection of rental properties and start planning your next
      getaway today.
    </div>
    <v-divider></v-divider>

    <div class="py-4">
      &copy; {{ new Date().getFullYear() }} Holiday Home Hubbub. All Rights
      Reserved.
    </div>
  </v-footer>
</template>

<script setup>
const icons = [
  { icon: "mdi-facebook", link: "" },
  { icon: "mdi-twitter", link: "" },
  { icon: "mdi-linkedin", link: "" },
  { icon: "mdi-instagram", link: "" },
];
</script>
