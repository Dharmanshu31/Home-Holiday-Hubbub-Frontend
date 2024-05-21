<template>
  <v-container class="tw-mt-8">
    <v-row>
      <v-col class="tw-text-heading tw-font-bold tw-text-3xl tw-my-10">
        Your Reservation List
      </v-col>
    </v-row>
    <div
      class="tw-mt-8 tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-8 tw-justify-center"
    >
      <div v-for="(item, i) in items" :key="i">
        <HomeCard :item="item.propertyId" :reservation="item"/>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import HomeCard from "../components/HomeCard.vue";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import axios from "../store/axios";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useStore();
const items = ref([]);

onMounted(async () => {
  try {
    const token = Cookies.get("token");
    const ownerId = store.state.user.id;
    const res = await axios.get(`booking/owner/${ownerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    items.value = res.data;
  } catch (err) {
    if (err && err.response) {
      toast.error("Somthing Wents wrong Try Again Latter");
    }
  }
});
</script>

<style></style>
