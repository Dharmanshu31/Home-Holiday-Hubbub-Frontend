<template>
  <v-card width="350" hover>
    <v-row>
      <v-col>
        <v-carousel height="300" touch hide-delimiters class="slideBtn">
          <v-carousel-item
            v-for="(image, i) in item.images"
            :key="i"
            :src="`/assets/properts/${image}`"
            cover
          >
            <v-icon
              class="tw-float-right tw-mx-2 tw-my-2"
              :color="liked ? '#F56040' : '#ffffff'"
              @click="toggleLike(), like(item._id)"
              :icon="liked ? 'mdi-heart' : 'mdi-heart-outline'"
            ></v-icon>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <router-link :to="`/property/${item._id}`">
      <v-card-title class="tw-font-extrabold tw-text-black">{{
        item.name
      }}</v-card-title>

      <v-card-text>
        <div class="tw-text-base">{{ item.propertyCategory }}</div>
        <div class="tw-text-base" v-if="item.location">
          {{ item.location.city }} , {{ item.location.state }}
        </div>
        <div class="tw-font-bold tw-text-base tw-mt-2" v-if="!history">
          &#x20B9; {{ item.pricePerNight }} night
        </div>
        <div class="tw-font-bold tw-text-base tw-mt-2" v-else>
          Totel Price: &#x20B9; {{ history.totalPrice }}
        </div>
        <div v-if="history" class="tw-font-bold tw-text-base tw-mt-2">
          <p>StartDate: {{ new Date(history.startDate).toDateString() }}</p>
          <p>EndDate: {{ new Date(history.endDate).toDateString() }}</p>
        </div>
        <div v-if="reservation" class="tw-font-bold tw-text-base tw-mt-2">
          <p>StartDate: {{ new Date(reservation.startDate).toDateString() }}</p>
          <p>EndDate: {{ new Date(reservation.endDate).toDateString() }}</p>
        </div>
        <div v-if="reservation" class="tw-font-bold tw-text-sm tw-mt-2">
          <p>Guest Name: {{ reservation.userId.name }}</p>
        </div>
        <div class="tw-flex tw-mt-3 tw-text-base tw-text-center">
          <v-icon icon="mdi-star" color="#f9a825"> </v-icon>
          <div v-if="item.ratingsAverage > 0" class="tw-font-semibold tw-pl-1">
            {{ item.ratingsAverage }}/5
          </div>
          <div v-else class="tw-font-semibold tw-pl-1">No reviews yet</div>
        </div>
      </v-card-text>
    </router-link>
    <div class="tw-justify-between tw-flex tw-mx-8 tw-my-4">
      <v-btn
        v-if="
          store.state.user.role === 'admin' ||
          store.state.user.id === item.owner
        "
        color="green"
        append-icon="mdi-pencil"
        variant="text"
        @click="sendOldData(item)"
        >Edit</v-btn
      >
      <v-btn
        v-if="
          (store.state.user.role === 'admin' ||
            store.state.user.id === item.owner) &&
          !reservations &&
          !tripHistroy
        "
        color="red"
        append-icon="mdi-trash-can"
        variant="outlined"
        @click="showDialog = !showDialog"
        >Delete</v-btn
      >
      <v-btn
        v-if="
          (store.state.user.role === 'admin' ||
            store.state.user.id === item.owner) &&
          (reservations || tripHistroy)
        "
        color="red"
        append-icon="mdi-trash-can"
        variant="outlined"
        @click="showCancelBooking = !showCancelBooking"
        >Cancel Booking</v-btn
      >
    </div>
  </v-card>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-card-text>
        Are you sure you want to delete this Property?
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" variant="text" @click="showDialog = false"
          >Cancel</v-btn
        >
        <v-btn color="red" variant="text" @click="deleteProperty(item.id)"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showCancelBooking" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirm Cancel Booking</v-card-title>
      <v-card-text>
        <p>Are you sure you want to Cancel Booking?</p>
        <p class="tw-text-red-600 tw-mt-9">
          Note:-If You Cancel The Booking The Payment Will Be Refuneded Under 15
          Working Day
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" variant="text" @click="showCancelBooking = false"
          >Cancel</v-btn
        >
        <v-btn color="red" variant="text" @click="cancelBooking">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRoute, useRouter } from "vue-router";

const liked = ref(false);
const showDialog = ref(false);
const showCancelBooking = ref(false);
const store = useStore();
const router = useRouter();
const route = useRoute();
const props = defineProps({
  item: Object,
  history: Object,
  reservation: Object,
});

const tripHistroy = computed(() => route.path.includes(["trip-history"]));
const reservations = computed(() => route.path.includes(["reservations"]));
const toggleLike = () => {
  liked.value = !liked.value;
};

const like = (propertyId) => {
  store.dispatch("likeTheProperty", propertyId);
};

const sendOldData = (item) => {
  store.commit("setOldPropertyData", item);
  router.push("list-property");
};

onMounted(async () => {
  const res = await store.dispatch("getWishList", props.item._id);
  liked.value = res;
  // if(res.response && res.response.data.message){
  //   toast.error('Login to Get Access')
  //   // router.replace('/login')
  // }
});

const deleteProperty = async (propertyId) => {
  const res = await store.dispatch("deleteProperty", propertyId);
  if (res === "") {
    toast.success("Property Deleted Succesfully");
    showDialog.value = false;
  }
  if (res && res.response && res.response.message) {
    toast.error("Somthing Wrong Try Again Latter !!");
  }
};

const cancelBooking = () => {
  console.log("cancel Booking");
};
</script>
<style scoped>
:deep(.slideBtn .v-btn--icon.v-btn--size-default) {
  background-color: white;
  box-shadow: none;
}
:deep(.slideBtn .v-btn--icon.v-btn--size-default) {
  color: rgb(255, 255, 255);
  font-size: 25px;
  height: max-content;
}
:deep(.v-btn--icon.v-btn--density-default) {
  width: 0;
  font-size: 7px;
}
</style>
