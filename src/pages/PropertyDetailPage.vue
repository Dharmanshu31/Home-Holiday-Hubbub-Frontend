<template>
  <Loader class="tw-mt-24" v-if="loading" />
  <v-container class="tw-mt-12">
    <div class="tw-flex tw-justify-between tw-items-center">
      <h1 class="tw-text-2xl sm:tw-text-4xl tw-font-bold">
        {{ response.name }}
      </h1>
      <div class="tw-flex tw-items-center">
        <v-btn icon="mdi-share-variant" @click="share = !share"></v-btn>
        <v-btn
          class="tw-float-right tw-mx-2 tw-my-2"
          :color="like ? '#F56040' : '#000'"
          @click="toggleLike(), liked(route.params.propertyId)"
          :icon="like ? 'mdi-heart' : 'mdi-heart-outline'"
          variant="elevated"
        ></v-btn>
      </div>
    </div>
    <v-dialog v-model="share" max-width="500">
      <div class="tw-bg-white tw-p-6">
        <v-icon icon="mdi-window-close" @click="share = !share"></v-icon>
        <p class="tw-mt-5 tw-text-xl tw-font-semibold">
          Share This Property With Friedns And Family
        </p>
        <p class="tw-mt-3" v-if="response.ratingsAverage">
          {{ response.name }} which has rating
          <v-icon
            icon="mdi-star"
            color="#f9a825"
            v-if="response.ratingsAverage"
          ></v-icon>
          {{ response.ratingsAverage }}
        </p>
        <p class="tw-mt-3" v-else>
          {{ response.name }} only in &#x20B9; {{ response.pricePerNight }}
        </p>
        <div class="tw-grid tw-grid-cols-2 tw-gap-7 tw-mt-8">
          <v-btn
            prepend-icon="mdi-content-copy"
            variant="outlined"
            color="gray"
            @click="sharePorperty('copy')"
            >Copy</v-btn
          >
          <v-btn
            prepend-icon="mdi-whatsapp"
            @click="sharePorperty('whatsapp')"
            variant="outlined"
            color="green"
            >whatsapp</v-btn
          >
          <v-btn
            prepend-icon="mdi-facebook"
            variant="outlined"
            color="blue"
            @click="sharePorperty('facebook')"
            >facebook</v-btn
          >
          <v-btn
            prepend-icon="mdi-twitter"
            variant="outlined"
            color="black"
            @click="sharePorperty('twitter')"
            >twitter</v-btn
          >
          <v-btn
            prepend-icon="mdi-instagram"
            variant="outlined"
            color="pink"
            @click="sharePorperty('instagram')"
            >instagram</v-btn
          >
          <v-btn
            prepend-icon="mdi-gmail"
            variant="outlined"
            color="red"
            @click="sharePorperty('gmail')"
            >Mail</v-btn
          >
        </div>
      </div>
    </v-dialog>
    <div>
      <div class="tw-flex tw-flex-wrap tw-gap-3 tw-my-5">
        <v-img
          v-for="(image, i) in response.images"
          :src="`../../assets/properts/${image}`"
          :key="i"
          class="tw-min-w-72"
          @click="toggleFullscreen(`../../assets/properts/${image}`)"
        ></v-img>
      </div>
      <v-dialog v-model="fullscreen" hide-overlay class="tw-max-w-[800px]">
        <v-img
          :src="fullscreenImage"
          class="tw-border-gray-950 tw-border-[3px]"
        ></v-img>
      </v-dialog>
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

    <hr
      v-if="
        (token && validReview && notOwner) ||
        (store.state.user.role && store.state.user.role === 'admin')
      "
    />
    <v-btn
      color="black"
      @click="reviewModel = !reviewModel"
      v-if="
        (token && validReview && notOwner) ||
        (store.state.user.role && store.state.user.role === 'admin')
      "
      >Add Review</v-btn
    >
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
            v-if="!oldReviewData"
            color="black"
            variant="elevated"
            @click="postReview(response.id)"
            >Post</v-btn
          >
          <v-btn
            v-else
            color="black"
            variant="elevated"
            @click="updateReview(response.id)"
            >Update</v-btn
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
      <Review
        v-if="response.id"
        :id="response.id"
        @editreview="collectOldReview"
      />
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

<script setup nonce="<%= nonce %>">
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
const fullscreen = ref(false);
const fullscreenImage = ref(null);
const loading = ref(false);
const share = ref(false);
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
const validReview = ref(false);
const token = Cookies.get("token");
const notOwner = ref(true);

//show priview img diloag
const toggleFullscreen = (imgPath) => {
  fullscreenImage.value = imgPath;
  fullscreen.value = !fullscreen.value;
};

//fatching data and seting value for reviewBar
onMounted(async () => {
  loading.value = true;
  const res = await store.dispatch("getOneProperty", route.params.propertyId);
  response.value = res.data;
  if (res.response && res.response.status === 400) {
    router.replace("/notFound");
  }
  const userId = store.state.user.id;
  if (userId && userId === res.data.owner._id) {
    notOwner.value = false;
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
  if (store.state.user.id !== "") {
    try {
      const res = await axios.get(
        `booking/property/${route.params.propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.length > 0) {
        validReview.value = true;
      }
    } catch (err) {
      if (err && err.response) {
        toast.error("Somthing Wents wrong Try Again Latter");
      }
    }
  }
  loading.value = false;
});

//togel like
const toggleLike = () => {
  if (token) {
    like.value = !like.value;
  } else {
    toast.error("Login to Access This Functionlity");
  }
};

//for showing the like value for wishlist
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

// collecting old review data
const oldReviewData = ref();
const collectOldReview = (oldReview) => {
  reviewModel.value = true;
  oldReviewData.value = oldReview;
  addRating.value = oldReview.rating;
  writeReviewData.value = oldReview.review;
};

//update reviewData
const updateReview = async (propertyId) => {
  if (writeReviewData.value === "") {
    return;
  }
  const data = {
    review: writeReviewData.value,
    rating: addRating.value,
  };
  try {
    const res = await axios.patch(
      `property/${propertyId}/review/${oldReviewData.value.reviewId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      reviewModel.value = false;
      toast.success("Review Updated Successfully");
    }
  } catch (err) {
    toast.error("Somthing Wents Wrong Try Again letter!!");
  }
};

//formating dates
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

//booking the property
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

//showing amenities icon
const getAmenityIcon = (amenityText) => {
  const foundAmenity = amenities.find(
    (amenitie) => amenitie.text === amenityText
  );
  return foundAmenity ? foundAmenity.name : "";
};

//show hidde diloage
const toggaleDialog = () => {
  if (!token) {
    toast.error("Login To Book Property");
    return;
  }
  dialog.value = !dialog.value;
};

//cleare the date in booking
const clearDate = () => {
  selectedDate.value = [new Date()];
};
let isHandlingUpdate = false;

//watch for checking the date value not add in range
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

//share property link
const propertyUrl = "http://localhost:5173" + route.fullPath;
const sharePorperty = async (appName) => {
  let shareUrl = "";
  switch (appName) {
    case "copy":
      try {
        await navigator.clipboard.writeText(propertyUrl);
        toast.success("URL Copied To Clipboard!");
      } catch (err) {
        toast.error("Failed To Copy");
      }
      return;
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodeURIComponent(propertyUrl)}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        propertyUrl
      )}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        propertyUrl
      )}`;
      break;
    case "instagram":
      shareUrl = `https://www.instagram.com`;
      break;
    case "gmail":
      shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&body=${encodeURIComponent(
        propertyUrl
      )}`;
      break;
  }
  window.open(shareUrl, "_blank");
};
</script>

<style scoped>
hr {
  margin: 20px 0;
  border-style: inset;
  border-width: 1px;
}
</style>
