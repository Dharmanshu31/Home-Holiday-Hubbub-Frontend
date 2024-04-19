<template>
  <v-app>
    <v-container>
      <v-app-bar color="#024950">
        <template v-slot:prepend v-if="$vuetify.display.smAndDown">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="tw-max-w-fit"
          ><router-link to="/"
            >Holiday Home Hubbub</router-link
          ></v-app-bar-title
        >
        <v-text-field
          v-model="search"
          type="search"
          color="white"
          name="Search"
          placeholder="Search the Home"
          append-inner-icon="mdi-magnify"
          variant="outlined"
          @input="onSearch"
          @click:append-inner="onClick"
          class="tw-my-auto tw-py-1 tw-max-w-96 tw-mx-2"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          v-if="$vuetify.display.xs"
          icon="mdi-dots-vertical"
          class="tw-float-right"
        ></v-btn>
        <v-btn v-if="$vuetify.display.smAndUp" class="tw-float-right"
          ><router-link to="/login">Login</router-link></v-btn
        >
      </v-app-bar>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
const onClick = () => {
  console.log(search.value);
};
const onSearch = (e) => {
  setTimeout(() => console.log(e.target.value), 2000);
};
</script>

<style scoped>
:deep(.v-input__control) {
  margin-top: 1.5%;
  max-height: 45px;
}
.v-app-bar {
  background-color: #0fa4af;
}
</style>
