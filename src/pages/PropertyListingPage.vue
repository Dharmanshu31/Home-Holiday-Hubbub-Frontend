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
            <Map @locationSelected="setLocationFileds" />
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
                  @click="
                    setAmenitie(ame.text);
                    console.log(amenitie);
                  "
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
                    clear-icon="mdi-close-circle"
                    placeholder="Description"
                    variant="outlined"
                    clearable
                    class="tw-max-w-[600px]"
                    rows="1"
                    :rules="[required]"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">Highlight</p>
                  <v-text-field
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
                    clear-icon="mdi-close-circle"
                    placeholder="Highlight details"
                    variant="outlined"
                    clearable
                    class="tw-max-w-[600px]"
                    rows="1"
                    :rules="[required]"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="tw-mb-1 tw-font-bold tw-pb-2">
                    Now, set your PRICE
                  </p>
                  <v-text-field
                    prepend-inner-icon="mdi-currency-rupee"
                    clear-icon="mdi-close-circle"
                    placeholder="Street Address"
                    variant="outlined"
                    clearable
                    class="tw-max-w-[200px]"
                    :rules="[required]"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <v-btn
            class="tw-mt-10 tw-text-xl"
            color="#f8395a"
            size="large"
            rounded="xl"
            type="submit"
            >CREATE YOUR LISTING</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { amenities } from "../data";
import { icons } from "../data";
import { plases } from "../data";
import Map from "../components/Map.vue";
import axios from "../store/axios";

const iconClass =
  "filter-border tw-border tw-w-28 tw-h-24 tw-rounded-xl tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-flex-col tw-text-[19px]";

const placeClass =
  "filter-box tw-flex tw-justify-between tw-items-center tw-border tw-rounded-xl tw-cursor-pointer tw-px-8 tw-py-3 tw-max-w-[600px]";

const amenitieClass =
  "filter-border tw-border tw-w-52 tw-h-[90px] tw-rounded-xl tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-flex-col ";

const iconName = ref("");
const amenitie = ref([]);
const placeName = ref("");
const guest = ref(1);
const bedroom = ref(1);
const bathroom = ref(1);
const beds = ref(1);
const form = ref(1);
const address = ref("");
const city = ref("");
const zipcode = ref("");
const country = ref("");
const photos = ref([]);
const imagePriview = ref([]);

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
  console.log(iconName.value);
};
const setPlaceName = (name) => {
  placeName.value = name;
  console.log(placeName.value);
};

const setAmenitie = (name) => {
  if (amenitie.value.includes(name)) {
    return;
  } else {
    amenitie.value.push(name);
  }
};

const previewImage = () => {
  for (let i = 0; i < photos.value.length; i++) {
    const file = photos.value[i];
    const render = new FileReader();
    render.onload = (e) => {
      imagePriview.value.push(e.target.result);
    };
    render.readAsDataURL(file);
  }
};

const removeImage = (index) => {
  imagePriview.value.splice(index, 1);
};

const setLocationFileds = (locationDetails) => {
  address.value = locationDetails.streetAddress;
  city.value = locationDetails.city;
  zipcode.value = locationDetails.zipcode;
  country.value = locationDetails.country;
};

const required = (value) => !!value || "Field is required !!";

const createProperty = async () => {
  if (!(await form.value.validate()).valid) return;
  try {
    const response = axios.post();
  } catch (err) {
    console.log(err);
  }
  console.log("submitting.....");
  form.value.reset();
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
