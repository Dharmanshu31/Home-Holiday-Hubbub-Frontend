<template>
  <v-container>
    <v-app-bar color="#024950">
      <template v-slot:prepend v-if="$vuetify.display.smAndDown">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title v-if="$vuetify.display.mdAndUp" class="tw-max-w-fit"
        ><router-link to="/">Holiday Home Hubbub</router-link></v-app-bar-title
      >
      <!-- <v-app-bar-title v-else="$vuetify.display.smAndDown"
        ><router-link to="/"><img src="/home holiday hubbub.svg" /></router-link
      ></v-app-bar-title> -->
      <v-text-field
        v-model="search"
        type="search"
        name="Search"
        placeholder="Search the Home"
        append-inner-icon="mdi-magnify"
        variant="outlined"
        @input="onSearch"
        @click:append-inner="onClick"
        class="tw-my-auto tw-py-1 tw-mx-2 tw-w-48"
        rounded="pill"
      ></v-text-field>
      <v-spacer></v-spacer>
      <router-link to="list-property">Become Host</router-link>
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
</template>

<script setup>
import { ref } from "vue";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useStore } from "vuex";

const store = useStore();

//next 3 line for decode and store token value to VueX
const token = Cookies.get("token");
const decode = jwtDecode(token);
store.commit("setUser", { id: decode.id, role: decode.role });

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
:deep(
    .v-text-field .v-field--no-label input,
    .v-text-field .v-field--active input
  ) {
  padding-top: 7px;
}
:deep(.v-field__append-inner) {
  padding-bottom: 7px;
}
/* @media (max-width: 959.98px) {
  :deep(.v-toolbar__content > .v-toolbar-title) {
    margin-inline-start: auto;
  }
} */
</style>
