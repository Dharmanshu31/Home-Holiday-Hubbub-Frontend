<template>
  <v-container class="tw-mt-8">
    <v-row>
      <v-col
        cols="12"
        class="tw-text-heading tw-font-bold tw-text-3xl tw-my-10"
      >
        Your Trip List
      </v-col>
    </v-row>
    <div
      class="tw-mt-8 tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-8 tw-justify-center"
      v-if="items.length > 0"
    >
      <div v-for="(item, i) in items" :key="i">
        <HomeCard :item="item.propertyId" :history="item" />
      </div>
    </div>
    <div v-else class="tw-text-center tw-my-28">
      <p class="tw-text-xl tw-font-bold">
        You haven't visited any place yet. Book a place now !!!!!
      </p>
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

const userHistory = async () => {
  loading.value = true;
  try {
    const token = Cookies.get("token");
    const userId = store.state.user.id;
    const res = await axios.get(`booking/user/${userId}`, {
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
  loading.value = false;
};
//fatch user history
onMounted(async () => {
  userHistory();
});

watch(page, () => {
  userHistory();
});
</script>
