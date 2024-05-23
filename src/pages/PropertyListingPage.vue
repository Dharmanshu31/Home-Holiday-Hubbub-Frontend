<template>
  <v-container class="tw-mt-8 tw-bg-newbg">
    <v-row>
      <v-col class="tw-text-heading tw-font-bold tw-text-3xl tw-my-10 tw-ml-11">
        Publish Your Place
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="form" @submit.prevent="createProperty">
          <div class="tw-bg-white tw-rounded-2xl tw-py-8 tw-px-10">
            <h1 class="tw-text-red-500 tw-text-2xl tw-font-bold">
              Step 1: Tell us about your place
            </h1>
            <hr />

            <h3 class="tw-text-lg tw-font-bold tw-mt-8">
              Which of these categories best describes your place?
            </h3>
            <div
              class="tw-m-7 tw-flex tw-flex-wrap tw-gap-5 tw-justify-center tw-items-center"
            >
              <div v-for="(icon, i) in icons" :key="i">
                <div
                  :class="[
                    iconClass,
                    {
                      'tw-border-gray-500': iconName !== icon.text,
                      'tw-border-pinkRed tw-border-2 tw-bg-gray-100':
                        iconName === icon.text,
                    },
                  ]"
                  @click="setIconeName(icon.text)"
                >
                  <v-icon :icon="icon.name" class="tw-text-3xl"></v-icon>
                  <p class="tw-text-center">
                    {{ icon.text }}
                  </p>
                </div>
              </div>
            </div>

            <h3 class="tw-text-lg tw-font-bold tw-mt-10 tw-mb-5">
              What type of place will guests have?
            </h3>
            <div class="tw-flex tw-flex-col tw-gap-5">
              <div
                :class="[
                  placeClass,
                  {
                    'tw-border-gray-500': placeName !== place.name,
                    'tw-border-pinkRed tw-border-2 tw-bg-gray-100':
                      placeName === place.name,
                  },
                ]"
                v-for="(place, i) in plases"
                :key="i"
                @click="setPlaceName(place.name)"
              >
                <div class="tw-max-w-[400px]">
                  <h4 class="tw-mb-1 tw-font-extrabold">{{ place.name }}</h4>
                  <p class="tw-font-semibold">{{ place.dis }}</p>
                </div>
                <div class="tw-text-2xl tw-float-end">
                  <v-icon :icon="place.icon"></v-icon>
                </div>
              </div>
            </div>

            <h3 class="tw-text-lg tw-font-bold tw-mt-10 tw-mb-5">
              Where's your place located?
            </h3>
            <h1 class="tw-font-bold tw-mb-5">Pick Location from Map</h1>
            <Map
              @locationSelected="setLocationFileds"
              :lag="property ? property.location.coordinates[0] : undefined"
              :lat="property ? property.location.coordinates[1] : undefined"
            />
            <v-container>
              <v-row>
                <v-col>
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">Street Address</p>
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    placeholder="Street Address"
                    variant="outlined"
                    clearable
                    class="tw-max-w-[700px]"
                    :rules="[required]"
                    v-model="address"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="field-width">
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">
                    Apartment, Suite, etc.
                  </p>
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    placeholder="Apt, Suite, etc."
                    variant="outlined"
                    clearable
                    :rules="[required]"
                    v-model="appartment"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="field-width">
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">City</p>
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    placeholder="City"
                    variant="outlined"
                    clearable
                    :rules="[required]"
                    v-model="city"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="field-width">
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">Zipcode</p>
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    placeholder="Zipcode"
                    variant="outlined"
                    clearable
                    :rules="[required]"
                    v-model="zipcode"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="field-width">
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">Country</p>
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    placeholder="Country"
                    variant="outlined"
                    clearable
                    :rules="[required]"
                    v-model="country"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="field-width">
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">State</p>
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    placeholder="City"
                    variant="outlined"
                    clearable
                    :rules="[required]"
                    v-model="state"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <h3 class="tw-text-lg tw-font-bold tw-mt-3 tw-mb-5">
              Share some basics about your place
            </h3>
            <div class="tw-flex tw-flex-wrap tw-gap-10">
              <div
                class="tw-flex tw-items-center tw-gap-8 tw-p-4 tw-border tw-border-gray-500 tw-rounded-lg"
                v-for="(basic, i) in basics"
                :key="i"
              >
                <p>{{ basic.name }}</p>
                <div class="tw-flex tw-items-center tw-gap-2 tw-text-lg">
                  <v-icon
                    icon="mdi-minus-circle-outline"
                    class="counter"
                    @click="decrement(basic.refName)"
                  ></v-icon>
                  <p>{{ basic.value }}</p>
                  <v-icon
                    icon="mdi-plus-circle-outline "
                    class="counter"
                    @click="increment(basic.refName)"
                  ></v-icon>
                </div>
              </div>
            </div>
          </div>

          <div class="tw-bg-white tw-rounded-2xl tw-py-8 tw-px-10 tw-mt-10">
            <h1 class="tw-text-red-500 tw-text-2xl tw-font-bold">
              Step 2: Make your place stand out
            </h1>
            <hr />

            <h3 class="tw-text-lg tw-font-bold tw-mt-10">
              Tell guests what your place has to offer
            </h3>

            <div class="tw-flex tw-flex-wrap tw-gap-5 tw-mt-8">
              <div v-for="(ame, i) in amenities" :key="i">
                <div
                  :class="[
                    amenitieClass,
                    {
                      'tw-border-gray-500': !amenitie.includes(ame.text),
                      'tw-border-pinkRed tw-border-2 tw-bg-gray-100 ':
                        amenitie.includes(ame.text),
                    },
                  ]"
                  @click="setAmenitie(ame.text)"
                >
                  <div class="tw-text-2xl">
                    <v-icon :icon="ame.name"></v-icon>
                  </div>
                  <p class="tw-text-center tw-font-semibold">
                    {{ ame.text }}
                  </p>
                </div>
              </div>
            </div>

            <h3 class="tw-text-lg tw-font-bold tw-mt-10">
              Add some photos of your place
            </h3>
            <div class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-6">
              <div v-for="(image, i) in imagePriview" :key="i">
                <v-img :src="image" cover class="tw-w-[250px] tw-h-[150px]">
                  <v-icon
                    icon="mdi-trash-can-outline"
                    class="tw-bg-white tw-opacity-80 tw-p-1 tw-float-end"
                    @click="removeImage(i)"
                  ></v-icon>
                </v-img>
              </div>
              <v-file-input
                accept="image/*"
                multiple
                style="display: none"
                id="image"
                v-model="photos"
                @change="previewImage"
              ></v-file-input>
              <label
                for="image"
                class="tw-py-10 tw-px-24 tw-flex tw-flex-col tw-justify-center tw-cursor-pointer tw-border tw-border-black tw-border-dashed tw-rounded-lg tw-items-center tw-w-[250px] tw-h-[150px]"
              >
                <div class="tw-text-3xl">
                  <v-icon icon="mdi-image-multiple"></v-icon>
                </div>
                <p class="tw-font-semibold tw-text-center tw-min-w-max tw-mt-1">
                  Upload from your device
                </p>
              </label>
            </div>

            <h3 class="tw-text-lg tw-font-bold tw-mt-10">
              What make your place attractive and exciting?
            </h3>

            <v-container>
              <v-row>
                <v-col>
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">Title</p>
                  <v-text-field
                    v-model="title"
                    clear-icon="mdi-close-circle"
                    placeholder="Title"
                    variant="outlined"
                    clearable
                    class="tw-max-w-[600px]"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">Description</p>
                  <v-textarea
                    v-model="description"
                    clear-icon="mdi-close-circle"
                    placeholder="Description"
                    variant="outlined"
                    clearable
                    class="tw-max-w-[600px]"
                    rows="5"
                    :rules="[required, descriptionRule]"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">Highlight</p>
                  <v-text-field
                    v-model="highlight"
                    clear-icon="mdi-close-circle"
                    placeholder="Highlight"
                    variant="outlined"
                    clearable
                    class="tw-max-w-[600px]"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">Highlight details</p>
                  <v-textarea
                    v-model="detailHighlight"
                    clear-icon="mdi-close-circle"
                    placeholder="Highlight details"
                    variant="outlined"
                    clearable
                    class="tw-max-w-[600px]"
                    rows="5"
                    :rules="[required, descriptionRule]"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">
                    Now, set your PRICE
                  </p>
                  <v-text-field
                    v-model="price"
                    prepend-inner-icon="mdi-currency-rupee"
                    clear-icon="mdi-close-circle"
                    placeholder="Street Address"
                    variant="outlined"
                    clearable
                    class="tw-max-w-[200px]"
                    :rules="[required, priceRule]"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <v-btn
            v-if="store.state.property.oldPropertyData"
            :loading="loading"
            class="tw-mt-10 tw-text-xl"
            color="#f8395a"
            size="large"
            rounded="xl"
            @click="updatePropertyData"
            >Update Property</v-btn
          >
          <v-btn
            v-else
            :loading="loading"
            class="tw-mt-10 tw-text-xl"
            color="#f8395a"
            size="large"
            rounded="xl"
            type="submit"
            >CREATE YOUR LISTING</v-btn
          >
          <router-link to="/">
          <v-btn
            v-if="store.state.property.oldPropertyData"
            class="tw-mt-10 md:tw-ml-10 tw-text-xl"
            color="#f8395a"
            size="large"
            rounded="xl"
            >Cancel Update</v-btn
          >
        </router-link>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { amenities } from "../data";
import { icons } from "../data";
import { plases } from "../data";
import Map from "../components/listingPage/Map.vue";
import axios from "../store/axios";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";

const store = useStore();

const router = useRouter();
const iconClass =
  "filter-border tw-border tw-w-28 tw-h-24 tw-rounded-xl tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-flex-col tw-text-[19px]";

const placeClass =
  "filter-box tw-flex tw-justify-between tw-items-center tw-border tw-rounded-xl tw-cursor-pointer tw-px-8 tw-py-3 tw-max-w-[600px]";

const amenitieClass =
  "filter-border tw-border tw-w-52 tw-h-[90px] tw-rounded-xl tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-flex-col ";

const loading = ref(false);
const iconName = ref("");
const amenitie = ref([]);
const placeName = ref("");
const guest = ref(1);
const bedroom = ref(1);
const bathroom = ref(1);
const beds = ref(1);
const form = ref("");
const address = ref("");
const city = ref("");
const state = ref("");
const zipcode = ref("");
const country = ref("");
const lag = ref(0);
const lat = ref(0);
const appartment = ref("");
const photos = ref([]);
const imagePriview = ref([]);
const title = ref("");
const description = ref("");
const highlight = ref("");
const detailHighlight = ref("");
const price = ref("");

const basics = [
  { name: "Guests", value: guest, refName: "guest" },
  { name: "Bedrooms", value: bedroom, refName: "bedroom" },
  { name: "Beds", value: beds, refName: "beds" },
  { name: "Bathrooms", value: bathroom, refName: "bathroom" },
];

const increment = (field) => {
  switch (field) {
    case "guest":
      guest.value++;
      break;
    case "bedroom":
      bedroom.value++;
      break;
    case "bathroom":
      bathroom.value++;
      break;
    case "beds":
      beds.value++;
      break;
  }
};

const decrement = (field) => {
  switch (field) {
    case "guest":
      guest.value = Math.max(guest.value - 1, 1);
      break;
    case "bedroom":
      bedroom.value = Math.max(bedroom.value - 1, 1);
      break;
    case "bathroom":
      bathroom.value = Math.max(bathroom.value - 1, 1);
      break;
    case "beds":
      beds.value = Math.max(beds.value - 1, 1);
      break;
  }
};

const setIconeName = (name) => {
  iconName.value = name;
};
const setPlaceName = (name) => {
  placeName.value = name;
};

const setAmenitie = (name) => {
  const index = amenitie.value.indexOf(name);
  if (index !== -1) {
    amenitie.value.splice(index, 1);
  } else {
    amenitie.value.push(name);
  }
};

const newPhotos = [];
const previewImage = () => {
  for (let i = 0; i < photos.value.length; i++) {
    const file = photos.value[i];
    const render = new FileReader();
    render.onload = (e) => {
      imagePriview.value.push(e.target.result);
      newPhotos.push(file);
      if (newPhotos.length === photos.value.length) {
        photos.value = newPhotos;
      }
    };
    render.readAsDataURL(file);
  }
};

const removeImage = (index) => {
  imagePriview.value.splice(index, 1);
  photos.value.splice(index, 1);
};

const setLocationFileds = (locationDetails) => {
  address.value = locationDetails.streetAddress;
  city.value = locationDetails.city;
  state.value = locationDetails.state;
  zipcode.value = locationDetails.zipcode;
  country.value = locationDetails.country;
  lag.value = locationDetails.lag;
  lat.value = locationDetails.lat;
};

const required = (value) => !!value || "Field is required !!";

const priceRule = (value) => Number(value) >= 0 || "Enter valid price!!";
const descriptionRule = (value) => {
  const words = value.trim().split(/\s+/).length;
  return words > 15 || "Must be more than 15 words.";
};
const reset = () => {
  form.value.reset();
  photos.value = [];
  iconName.value = "";
  amenitie.value = [];
  placeName.value = "";
  guest.value = 1;
  bedroom.value = 1;
  bathroom.value = 1;
  beds.value = 1;
  imagePriview.value = [];
  lat.value = 0;
  lag.value = 0;
};
const token = Cookies.get("token");
const createProperty = async () => {
  if (!(await form.value.validate()).valid) return;
  loading.value = true;
  if (!iconName || !placeName || amenitie.length === 0) {
    iconName.value === "Other";
    placeName.value === "An entire place";
    amenitie.push("Personal care products");
  }

  const formData = new FormData();
  formData.append("propertyCategory", iconName.value);
  formData.append("propertyType", placeName.value);
  formData.append("location[coordinates][0]", lag.value);
  formData.append("location[coordinates][1]", lat.value);
  formData.append(
    "location[formattedAddress]",
    address.value + ", " + appartment.value
  );
  formData.append("location[city]", city.value);
  formData.append("location[state]", state.value);
  formData.append("location[zipcode]", zipcode.value);
  formData.append("location[country]", country.value);
  formData.append("address", address.value);
  formData.append("maxGuests", +basics[0].value.value);
  formData.append("bedrooms", +basics[1].value.value);
  formData.append("bed", +basics[2].value.value);
  formData.append("bathrooms", +basics[3].value.value);
  formData.append("name", title.value);
  formData.append("description", description.value);
  formData.append("highlight", highlight.value);
  formData.append("highlightDetail", detailHighlight.value);
  formData.append("pricePerNight", +price.value);
  amenitie.value.forEach((amenity) => {
    formData.append(`amenities[]`, amenity);
  });
  photos.value.forEach((photo) => {
    formData.append(`images`, photo);
  });

  try {
    const response = await axios.post("property", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      loading.value = false;
      router.push("/");
    }
  } catch (err) {
    if (
      typeof err.response.data.message === "string" &&
      err.response.data.message.includes("geo")
    ) {
      toast.error("Please pick a location from the map.");
    } else if (typeof err.response.data.message === "string") {
      toast.error(err.response.data.message);
    } else if (Array.isArray(err.response.data.message)) {
      toast.error("fill all fields and try again!!");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
  loading.value = false;
  reset();
};

//repacing old data
const property = store.state.property.oldPropertyData;
onMounted(() => {
  if (property) {
    iconName.value = property.propertyCategory;
    placeName.value = property.propertyType;
    lag.value = property.location.coordinates[0];
    lat.value = property.location.coordinates[1];
    address.value = property.address;
    const temp = property.location.formattedAddress.split(",");
    appartment.value = temp[temp.length - 1];
    city.value = property.location.city;
    state.value = property.location.state;
    zipcode.value = property.location.zipcode;
    country.value = property.location.country;
    basics[0].value.value = property.maxGuests;
    basics[1].value.value = property.bedrooms;
    basics[2].value.value = property.bed;
    basics[3].value.value = property.bathrooms;
    title.value = property.name;
    description.value = property.description;
    highlight.value = property.highlight;
    detailHighlight.value = property.highlightDetail;
    price.value = property.pricePerNight;
    amenitie.value = property.amenities;
    const addPath = property.images.map(
      (image) => `../../assets/properts/${image}`
    );
    imagePriview.value = addPath;
  }
});
//adding updated data
const updatePropertyData = async () => {
  if (!(await form.value.validate()).valid) return;
  loading.value = true;

  const formData = new FormData();
  iconName.value !== property.propertyCategory &&
    formData.append("propertyCategory", iconName.value);
  placeName.value !== property.propertyType &&
    formData.append("propertyType", placeName.value);
  lag.value !== property.location.coordinates[0] &&
    formData.append("location[coordinates][0]", lag.value);
  lat.value !== property.location.coordinates[1] &&
    formData.append("location[coordinates][1]", lat.value);
  address.value + ", " + appartment.value !==
    property.location.formattedAddress &&
    formData.append(
      "location[formattedAddress]",
      address.value + ", " + appartment.value
    );
  city.value !== property.location.city &&
    formData.append("location[city]", city.value);
  state.value !== property.location.state &&
    formData.append("location[state]", state.value);
  zipcode.value !== property.location.zipcode &&
    formData.append("location[zipcode]", zipcode.value);
  country.value !== property.location.country &&
    formData.append("location[country]", country.value);
  address.value !== property.address &&
    formData.append("address", address.value);
  basics[0].value.value !== property.maxGuests &&
    formData.append("maxGuests", +basics[0].value.value);
  basics[1].value.value !== property.bedrooms &&
    formData.append("bedrooms", +basics[1].value.value);
  basics[2].value.value !== property.bed &&
    formData.append("bed", +basics[2].value.value);
  basics[3].value.value !== property.bathrooms &&
    formData.append("bathrooms", +basics[3].value.value);
  title.value !== property.name && formData.append("name", title.value);
  description.value !== property.description &&
    formData.append("description", description.value);
  highlight.value !== property.highlight &&
    formData.append("highlight", highlight.value);
  detailHighlight.value !== property.highlightDetail &&
    formData.append("highlightDetail", detailHighlight.value);
  price.value !== property.pricePerNight &&
    formData.append("pricePerNight", +price.value);
  amenitie.value.forEach((amenity) => {
    formData.append(`amenities[]`, amenity);
  });
  photos.value.forEach((photo) => {
    formData.append(`images`, photo);
  });

  try {
    const response = await axios.patch(`property/${property._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      loading.value = false;
      router.push("/");
    }
  } catch (err) {
    if (
      typeof err.response.data.message === "string" &&
      err.response.data.message.includes("geo")
    ) {
      toast.error("Please pick a location from the map.");
    } else if (Array.isArray(err.response.data.message)) {
      toast.error("fill all fields and try again!!");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
  loading.value = false;
};
</script>

<style scoped>
.v-container {
  max-width: 100%;
}

hr {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  border-style: inset;
  border-width: 1px;
}

.filter-border:hover {
  background-color: #f7f8f8;
  border-color: #f8395a;
  border-width: 2px;
  transition: 0.2s ease;
}

.filter-box:hover {
  background-color: #f7f8f8;
  border-color: #f8395a;
  border-width: 2px;
  transition: 0.2s ease;
}

.counter:hover {
  cursor: pointer;
  color: #f8395a;
  transition: 0.2s ease;
}

:deep(
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active
  ) {
  transition: background-color 5000s;
  -webkit-text-fill-color: #000000 !important;
}

.field-width {
  max-width: 360px;
}
</style>
