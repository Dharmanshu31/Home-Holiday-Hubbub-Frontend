<template>
  <v-container class="tw-mt-12">
    <div class="tw-flex tw-justify-between tw-items-center">
      <h1 class="tw-text-2xl sm:tw-text-4xl tw-font-bold">
        {{ response.name }}
      </h1>
      <div class="tw-flex tw-items-center">
        <v-btn
          class="tw-float-right tw-mx-2 tw-my-2"
          :color="like ? '#F56040' : '#000'"
          @click="(like = !like), liked(route.params.propertyId)"
          :icon="like ? 'mdi-heart' : 'mdi-heart-outline'"
          variant="elevated"
        ></v-btn>
      </div>
    </div>
    <div class="tw-flex tw-flex-wrap tw-gap-3 tw-my-5">
      <v-img
        v-for="(image, i) in response.images"
        :src="`../../assets/properts/${image}`"
        :key="i"
        class="tw-min-w-72"
      ></v-img>
    </div>
    <h2
      v-if="response.location"
      class="tw-text-xl tw-font-bold tw-mt-12 sm:tw-text-3xl"
    >
      {{ response.propertyType }} in {{ response.location.city }},
      {{ response.location.state }}, {{ response.location.country }}
    </h2>
    <p class="tw-mt-3 tw-font-bold tw-text-base sm:tw-text-lg">
      {{ response.maxGuests }} guests - {{ response.bedrooms }} bedroom(s) -
      {{ response.bed }} bed(s) - {{ response.bathrooms }} bathroom(s)
    </p>
    <div class="tw-flex tw-text-xl tw-text-center tw-mt-3">
      <v-icon icon="mdi-star" color="#f9a825"> </v-icon>
      <div
        v-if="response.ratingsAverage > 0"
        class="tw-font-semibold tw-pl-1 tw-mt-[2px]"
      >
        {{ response.ratingsAverage }} / 5
      </div>
      <div v-else class="tw-font-semibold tw-pl-1 tw-mt-[2px]">
        No reviews yet
      </div>
    </div>
    <hr />
    <div class="tw-flex tw-items-center tw-gap-5">
      <v-avatar size="60">
        <v-img
          v-if="response.owner"
          :alt="response.owner.name"
          :src="`../../assets/users/${response.owner.photo}`"
        ></v-img>
      </v-avatar>
      <h3 v-if="response.owner" class="tw-font-bold tw-text-base sm:tw-text-lg">
        Hosted by {{ response.owner.name }}
      </h3>
    </div>
    <hr />
    <h3 class="tw-text-xl tw-font-bold">Description</h3>
    <p class="tw-max-w-[900px] tw-mt-5 tw-font-medium">
      {{ response.description }}
    </p>
    <hr />
    <h3 class="tw-text-xl tw-font-bold">{{ response.highlight }}</h3>
    <p class="tw-max-w-[900px] tw-mt-5 tw-font-medium">
      {{ response.highlightDetail }}
    </p>
    <hr />
    <div class="tw-flex tw-justify-between tw-flex-wrap tw-mt-10">
      <div>
        <h2 class="tw-text-xl tw-font-bold sm:tw-text-2xl">
          What this place offers?
        </h2>
        <div
          class="tw-grid tw-grid-cols-2 tw-my-8 tw-max-w-[700px] tw-gap-x-5 sm:tw-gap-x-28"
        >
          <div
            class="tw-flex tw-items-center tw-gap-5 text-xl tw-mb-8"
            v-for="(amenity, i) in response.amenities"
            :key="i"
          >
            <div class="tw-text-xl sm:tw-text-2xl">
              <v-icon :icon="getAmenityIcon(amenity)"></v-icon>
            </div>
            <p class="tw-font-semibold tw-text-lg">{{ amenity }}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 class="tw-text-xl tw-font-bold sm:tw-text-2xl">
          How long do you want to stay?
        </h2>
        <div class="tw-mt-9 tw-flex tw-flex-col tw-items-center">
          <Calander
            v-model="selectedDate"
            v-if="response && response.bookings"
            :bookingDate="response.bookings"
          />
          <div class="tw-mt-9 tw-text-center">
            <v-btn
              @click="toggaleDialog()"
              class="tw-w-44 tw-mx-2"
              color="#F8395A"
              >Booking</v-btn
            >
            <v-btn @click="clearDate()" class="tw-w-44" color="#222222"
              >Clear</v-btn
            >
          </div>
        </div>
        <v-dialog v-model="dialog" width="auto" round>
          <v-card
            class="tw-text-center tw-w-[350px] tw-h-[370px] lg:tw-w-[500px]"
          >
            <v-card-title>
              <h3
                class="tw-font-extrabold tw-text-2xl tw-text-green-600 tw-mt-5"
              >
                CONFIRM AND PAY
              </h3>
              <hr class="tw-border tw-border-dotted" />
            </v-card-title>
            <h2 class="tw-font-extrabold tw-text-xl">
              🎊 YOUR BOOKING DETAILS 🎊
            </h2>
            <v-card-text>
              <h3 class="tw-text-xl tw-mb-2 tw-font-bold">
                &#x20B9; {{ response.pricePerNight }} X {{ totalNights }} NIGHT
              </h3>
              <h3 class="tw-text-xl tw-mb-2 tw-font-bold">
                TOTAL PRICE: &#x20B9;
                {{ totalPrice }}
              </h3>
              <p class="tw-text-base tw-mb-2 tw-font-bold">
                <span class="tw-font-extrabold">CHECK-IN:</span> {{ startDate }}
              </p>
              <p class="tw-text-base tw-mb-2 tw-font-bold">
                <span class="tw-font-extrabold">CHECK-OUT:</span> {{ endDate }}
              </p>
            </v-card-text>
            <v-btn
              @click="confirmBooking()"
              :loading="paymentLoading"
              color="#F8395A"
              >Confirm Booking</v-btn
            >
          </v-card>
        </v-dialog>
      </div>
    </div>

    <hr v-if="token" />
    <v-btn color="black" @click="reviewModel = !reviewModel" v-if="token">Add Review</v-btn>
    <v-dialog max-width="500px" v-model="reviewModel">
      <v-card>
        <h1 class="tw-text-center tw-font-bold tw-text-xl tw-mt-4">
          Write Your Review
        </h1>
        <hr />
        <v-card-text>
          <p>Select Ratings</p>
          <v-rating
            class="tw-px-7 tw-text-xl"
            v-model="addRating"
            active-color="yellow-accent-4"
            half-increments
            size="60"
            hover
          ></v-rating>
          <v-textarea
            clear-icon="mdi-close-circle"
            label="Write Review Here"
            clearable
            :rules="[required]"
            v-model="writeReviewData"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" variant="text" @click="reviewModel = !reviewModel"
            >Cancel</v-btn
          >
          <v-btn
            color="black"
            variant="elevated"
            @click="postReview(response.id)"
            >Post</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <hr />

    <div class="tw-flex tw-text-2xl tw-text-center tw-mt-3">
      <v-icon icon="mdi-star" color="#f9a825"> </v-icon>
      <div
        v-if="response.ratingsAverage > 0"
        class="tw-font-semibold tw-pl-1 tw-mt-1"
      >
        {{ response.ratingsAverage }}
      </div>
      <div v-else class="tw-font-semibold tw-pl-1 tw-mt-1">No reviews yet</div>
      <div
        v-if="response.ratingQuantity > 0"
        class="tw-font-semibold tw-pl-1 tw-mt-1"
      >
        - {{ response.ratingQuantity }} reviews
      </div>
    </div>
    <ReviewBar :ratings="ratings" />
    <hr />
    <div class="tw-grid tw-grid-cols-1 tw-gap-5 xl:tw-grid-cols-2">
      <Review v-if="response.id" :id="response.id" />
    </div>
    <hr style="margin-top: 50px" />
    <DetailMap
      v-if="response.location"
      :lagLat="response.location.coordinates"
    />
    <h1 class="tw-mt-5 tw-text-2xl tw-font-extrabold">Where you’ll be</h1>
    <p class="tw-mt-3 tw-text-xl tw-font-semibold" v-if="response.location">
      {{ response.location.city }} , {{ response.location.state }} ,
      {{ response.location.country }}
    </p>
    <p class="tw-mt-3 tw-text-xl tw-font-semibold" v-if="response.location">
      {{ response.location.formattedAddress }}
    </p>
    <h1 class="tw-mt-5 tw-text-2xl tw-font-extrabold">Contect Host</h1>
    <div class="tw-flex tw-gap-8 tw-mt-3">
      <a
        v-if="response.owner"
        class="tw-text-3xl"
        :href="'mailto:' + response.owner.email"
        ><v-btn icon="mdi-gmail" color="red"></v-btn
      ></a>
      <a
        v-if="response.owner"
        class="tw-text-3xl"
        :href="'tel:' + response.owner.phone"
        ><v-btn icon="mdi-phone-plus" color="green"></v-btn
      ></a>
    </div>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { amenities } from "../data";
import Calander from "../components/detailPage/Calander.vue";
import ReviewBar from "../components/detailPage/ReviewBar.vue";
import Review from "../components/detailPage/Review.vue";
import DetailMap from "../components/detailPage/DetailMap.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "../store/axios";
import Cookies from "js-cookie";

const router = useRouter();
const response = ref({});
const selectedDate = ref([new Date()]);
const dialog = ref(false);
const store = useStore();
const route = useRoute();
const like = ref(false);
const reviewModel = ref(false);
const addRating = ref(1);
const writeReviewData = ref("");
const paymentLoading = ref(false);
const ratings = ref({
  one: 0,
  two: 0,
  three: 0,
  four: 0,
  five: 0,
});

onMounted(async () => {
  const res = await store.dispatch("getOneProperty", route.params.propertyId);
  response.value = res.data;
  if (res.response && res.response.status === 400) {
    router.replace("/notFound");
  }
  if (response.value.reviews) {
    response.value.reviews.map((review) => {
      if (review.rating >= 1 && review.rating < 2) {
        ratings.value.one++;
      }
      if (review.rating >= 2 && review.rating < 3) {
        ratings.value.two++;
      }
      if (review.rating >= 3 && review.rating < 4) {
        ratings.value.three++;
      }
      if (review.rating >= 4 && review.rating < 5) {
        ratings.value.four++;
      }
      if (review.rating === 5) {
        ratings.value.five++;
      }
    });
  }
});

const liked = (propertyId) => {
  store.dispatch("likeTheProperty", propertyId);
};

//reqired validation
const required = (value) => !!value || "Can't post empty review !!";

//like
onMounted(async () => {
  const res = await store.dispatch("getWishList", route.params.propertyId);
  like.value = res;
  if (res && res.response && res.response.data.message) {
    toast.error("Login to Get Access");
    // router.replace('/login')
  }
});

const token = Cookies.get("token");
//post the review
const postReview = async (propertyId) => {
  if (writeReviewData.value === "") {
    return;
  }
  const data = {
    review: writeReviewData.value,
    rating: addRating.value,
  };
  try {
    const res = await axios.post(`property/${propertyId}/review`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 201) {
      reviewModel.value = false;
      toast.success("Review Posted Successfully");
    }
  } catch (err) {
    toast.error("Somthing Wents Wrong Try Again letter!!");
  }
};

const startDate = computed(() =>
  new Date(selectedDate.value[0]).toDateString()
);
const endDate = computed(() =>
  new Date(selectedDate.value[selectedDate.value.length - 1]).toDateString()
);

const totalNights = computed(() => selectedDate.value.length);
const totalPrice = computed(
  () => response.value.pricePerNight * totalNights.value
);

const confirmBooking = async () => {
  paymentLoading.value = true;
  try {
    const res = await axios.post(
      `booking/${route.params.propertyId}/${startDate.value} - ${endDate.value}`,
      "",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 201) {
      window.location.href = res.data.url;
    }
  } catch (err) {
    toast.error("Somthing wents wrong try again latter!!");
  }
  paymentLoading.value = false;
};

const getAmenityIcon = (amenityText) => {
  const foundAmenity = amenities.find(
    (amenitie) => amenitie.text === amenityText
  );
  return foundAmenity ? foundAmenity.name : "";
};
const toggaleDialog = () => {
  dialog.value = !dialog.value;
};
const clearDate = () => {
  selectedDate.value = [new Date()];
};
let isHandlingUpdate = false;

watch(selectedDate, (newVal) => {
  if (isHandlingUpdate) return; // Exit if already handling an update
  isHandlingUpdate = true; // Set the flag to true
  let err = false;
  for (let date of newVal) {
    const currentDate = new Date(date);
    for (let booking of response.value.bookings) {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      if (currentDate >= start && currentDate <= end) {
        err = true;
        break;
      }
    }
  }
  if (err) {
    toast.error("Please Select Date Which Are Not Booked");
    clearDate();
  }
  nextTick(() => {
    isHandlingUpdate = false;
  });
});
</script>

<style scoped>
hr {
  margin: 20px 0;
  border-style: inset;
  border-width: 1px;
}
</style>
