<template>
  <v-container class="tw-mt-8">
    <v-row>
      <v-col class="tw-text-heading tw-font-bold tw-text-3xl tw-my-10">
        Your Reservation List
      </v-col>
    </v-row>
    <div
      class="tw-mt-8 tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-8 tw-justify-center"
      v-if="items.length > 0"
    >
      <div v-for="(item, i) in items" :key="i">
        <HomeCard :item="item.propertyId" :reservation="item" />
      </div>
    </div>
    <div v-else class="tw-text-center tw-my-28">
      <p class="tw-text-xl tw-font-bold">No Data Is Booked Yet !!!!!</p>
    </div>
    <Loader v-if="loading" />
  </v-container>
  <v-pagination
    v-model="page"
    :length="totalPage"
    :total-visible="7"
    active-color="#024950"
  ></v-pagination>
</template>

<script setup>
import HomeCard from "../components/HomeCard.vue";
import { useStore } from "vuex";
import { ref, onMounted, watch } from "vue";
import axios from "../store/axios";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useStore();
const items = ref([]);
const loading = ref(false);
const page = ref(1);
const totalPage = ref(1);

const ownerReservation = async () => {
  try {
    const token = Cookies.get("token");
    const ownerId = store.state.user.id;
    const res = await axios.get(`booking/owner/${ownerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page: page.value, limit: 6 },
    });
    items.value = res.data[0];
    totalPage.value = Math.ceil(res.data[1] / 6);
  } catch (err) {
    if (err && err.response) {
      toast.error("Somthing Wents wrong Try Again Latter");
    }
  }
};

const adminResrvation = async () => {
  try {
    const token = Cookies.get("token");
    const res = await axios.get(`booking/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page: page.value, limit: 6 },
    });
    items.value = res.data[0];
    totalPage.value = Math.ceil(res.data[1] / 6);
  } catch (err) {
    if (err && err.response) {
      toast.error("Somthing Wents wrong Try Again Latter");
    }
  }
};

//fathc reservation data
onMounted(async () => {
  loading.value = true;
  if (store.state.user.role !== "admin") {
    ownerReservation();
  } else {
    adminResrvation();
  }
  loading.value = false;
});

watch(page, () => {
  loading.value = true;
  if (store.state.user.role !== "admin") {
    ownerReservation();
  } else {
    adminResrvation();
  }
  loading.value = false;
});
</script>

<style></style>
