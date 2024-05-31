<template>
  <div
    v-for="(review, i) in reviews"
    class="tw-flex tw-justify-center"
    :key="i"
  >
    <v-card class="tw-w-[550px] tw-h-[200px]" hover>
      <v-card-text>
        <div class="tw-flex tw-items-center">
          <v-avatar size="60">
            <v-img
              :alt="review.user.name"
              :src="`../../assets/users/${review.user.photo}`"
            ></v-img>
          </v-avatar>
          <h2 class="tw-text-xl tw-mx-3">{{ review.user.name }}</h2>
          <div v-if="review.user._id === id">
            <v-btn
              append-icon="mdi-progress-pencil"
              variant="text"
              @click="editreview(review._id, review.rating, review.review)"
            >
              <span class="tw-text-xs">edit</span></v-btn
            >
            <v-icon
              icon="mdi-trash-can"
              variant="text"
              color="red"
              @click="deleteReview(review._id, review.property)"
            ></v-icon>
          </div>
        </div>
        <div class="tw-flex tw-mt-2">
          <v-rating
            v-model="review.rating"
            active-color="yellow-accent-4"
            size="20"
            disabled
            half-increments
          ></v-rating>
          <p class="tw-ml-2 tw-font-bold tw-text-base">
            {{
              new Date(`${review.createdAt}`).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
            }}
          </p>
        </div>
        <p class="tw-mt-2 tw-text-lg tw-flex tw-flex-wrap tw-font-semibold">
          {{ review.review }}
        </p>
      </v-card-text>
    </v-card>
  </div>
  <v-btn
    v-if="reviews.length > 6"
    elevation="0"
    variant="outlined"
    class="tw-w-52 tw-ml-4"
    @click="addMore"
    >Show More Reviews</v-btn
  >
</template>

<script setup>
import axios from "../../store/axios";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const store = useStore();
const id = ref();
id.value = store.state.user.id;
const props = defineProps({
  id: String,
});
const emit = defineEmits(["editreview"]);
const reviews = ref([]);
const limit = ref(6);

//add more review
const addMore = () => {
  limit.value += 6;
};

//edit review emit
const editreview = (reviewId, rating, review) => {
  const oldReview = { reviewId, rating, review };
  emit("editreview", oldReview);
};

//delete Review
const deleteReview = async (reviewId, propertyId) => {
  try {
    const res = await axios.delete(
      `/property/${propertyId}/review/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 204) {
      toast.success("Review Deleted Succefully");
    }
  } catch (err) {
    toast.error("Somthing Went Wrong Try Again Letter");
  }
};

//fatch review
onMounted(async () => {
  try {
    const res = await axios.get(
      `property/${props.id}/review?limit=${limit.value}`
    );
    reviews.value = res.data;
  } catch (err) {
    if (err.response && err.response.data.message) {
      toast.err("Somthing Wents Wrong");
    }
  }
});
</script>
