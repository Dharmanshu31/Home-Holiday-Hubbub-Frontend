<template>
  <v-app>
    <v-container>
      <v-app-bar :elevation="4" rounded>
        <template v-slot:image>
          <v-img src="/assets/view.jpg" cover></v-img>
        </template>
        <template v-slot:prepend v-if="$vuetify.display.xs">
          <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title
          ><router-link to="/" class="tw-text-white"
            >Holiday Home Hubbub</router-link
          ></v-app-bar-title
        >

        <template v-slot:append>
          <v-btn icon="mdi-magnify" color="white"></v-btn>

          <v-btn icon="mdi-dots-vertical" color="white"></v-btn>
        </template>
      </v-app-bar>
    </v-container>
  </v-app>
</template>

<script setup></script>

<style scoped></style>
