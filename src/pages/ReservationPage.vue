<template>
  <v-container class="tw-mt-8">
    <v-row>
      <v-col class="tw-text-heading tw-font-bold tw-text-3xl tw-my-10">
        Your Reservation List
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" md="4" lg="3" v-for="(item, i) in items" :key="i">
        <HomeCard :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import HomeCard from "../components/HomeCard.vue";

const items = [
  {
    title: "Australian beaches",
    location: "Alisoana, Sydny Aus",
    type: "Betch",
    price: "12000",
  },
];
</script>

<style></style>
