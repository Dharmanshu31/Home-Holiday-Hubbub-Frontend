<template>
  <v-footer class="tw-flex tw-flex-col" color="#f7f7f7">
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon.icon"
        :icon="icon.icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-4 tw-w-full">
      <v-row>
        <v-col class="tw-flex tw-flex-col tw-ml-16">
          <a href="/" class="foot text-lg font-semibold mb-2 tw-w-max"
            >About Us</a
          >
          <a href="#" class="foot text-lg font-semibold mb-2 tw-w-max"
            >Propertys</a
          >
          <a href="#" class="foot text-lg font-semibold mb-2 tw-w-max"
            >History</a
          >
        </v-col>

        <v-col class="tw-flex tw-flex-col">
          <a href="#" class="foot text-lg font-semibold mb-2 tw-w-max"
            >Connect Us</a
          >
          <a href="#" class="foot text-lg font-semibold mb-2 tw-w-max"
            >Popular Home</a
          >
          <a href="#" class="foot text-lg font-semibold mb-2 tw-w-max"
            >Latest News</a
          >
        </v-col>
      </v-row>
    </div>
    <br />
    <br />
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

<style scoped>
.foot:hover {
  text-decoration: underline;
}
</style>
