<template>
  <v-carousel
    class="slider tw-mt-8"
    hide-delimiters
    cycle
    :interval="4000"
    touch
  >
    <v-carousel-item
      v-for="(item, i) in cImage"
      :key="i"
      :src="item.src"
      cover
      content-class="slider"
    >
      <div
        class="tw-flex tw-h-full tw-justify-center tw-text-white tw-bg-black tw-bg-opacity-20 tw-shadow-lg tw-border-2 tw-border-emerald-900"
      >
        <div
          class="tw-text-center tw-font-bold tw-p-32 tw-text-base md:tw-text-3xl lg:tw-text-4xl xl:tw-text-4xl tw-shadow-black"
        >
          Welcome Home! Anywhere you roam
          <br />
          Stay in the moment. Make Your Memories
          <br />
          Discover the Joy of Simple Moments,
          <br />
          Find Your Adventure, Embrace the Journey
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>

  <v-container class="tw-bg-newbg">
    <v-row>
      <v-col
        class="tw-flex tw-justify-center tw-text-heading tw-font-bold tw-text-center tw-text-4xl tw-mt-10"
        >Explore Top Categories</v-col
      >
    </v-row>
    <v-row>
      <v-col
        class="tw-mt-3 tw-text-center tw-max-w-52 tw-px-9"
        style="padding-inline: 12%"
        >Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream
        destination.</v-col
      >
    </v-row>
    <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        class="tw-flex tw-justify-center tw-gap-2"
        style="padding: 50px 0"
      >
        <Image
          :link="image.link"
          :image="image.image"
          :alt="image.alt"
          :text="image.text"
          :path="image.path"
        />
      </v-col>
    </v-row>
  </v-container>
  <v-container class="tw-w-full">
    <v-row>
      <v-col xs="12" sm="6" md="4" lg="3" v-for="(item, i) in items" :key="i">
        <HomeCard :item="item" />
      </v-col>
    </v-row>
  </v-container>
  <br />
  <br />
</template>

<script setup>
import HomeCard from "../components/HomeCard.vue";
import Image from "../components/Image.vue";
import {
  mdiBeach,
  mdiForestOutline,
  mdiHomeCityOutline,
  mdiImageFilterHdrOutline,
  mdiIsland,
  mdiPool,
  mdiWindPower,
} from "@mdi/js";

const items = [
  {
    title: "Australian beaches",
    location: "Alisoana, Sydny Aus",
    type: "Betch",
    price: "12000",
  },
  {
    title: "Australian beaches",
    location: "Alisoana, Sydny Aus",
    type: "windmil",
    price: "1200",
  },
  {
    title: "Australian beaches",
    location: "Alisoana, Sydny Aus",
    type: "Lusarios",
    price: "2000",
  },
  {
    title: "Australian beaches",
    location: "Alisoana, Sydny Aus",
    type: "Nature",
    price: "1200",
  },
  {
    title: "Australian beaches",
    location: "Alisoana, Sydny Aus",
    type: "Betch",
    price: "1200",
  },
  {
    title: "Australian beaches",
    location: "Alisoana, Sydny Aus",
    type: "Betch",
    price: "1200",
  },
];

const cImage = [
  { src: "/assets/imags/slide.jpg" },
  { src: "/assets/imags/pool_cat.jpg" },
  { src: "/assets/Listing1/1.jpg" },
  { src: "/assets/imags/island_cat.webp" },
  { src: "/assets/Listing1/7.jpg" },
  { src: "/assets/Listing2/7.jpg " },
];
const images = [
  {
    link: "/property",
    image: "/assets/imags/beach_cat.jpg",
    alt: "view",
    text: "Beachfront",
    path: mdiBeach,
  },
  {
    link: "/property",
    image: "/assets/imags/windmill_cat.webp",
    alt: "view",
    text: "Windmills",
    path: mdiWindPower,
  },
  {
    link: "/property",
    image: "/assets/imags/modern_cat.webp",
    alt: "view",
    text: "Iconic cities",
    path: mdiHomeCityOutline,
  },
  {
    link: "/property",
    image: "/assets/imags/countryside_cat.webp",
    alt: "view",
    text: "Countryside",
    path: mdiImageFilterHdrOutline,
  },
  {
    link: "/property",
    image: "/assets/imags/pool_cat.jpg",
    alt: "view",
    text: "Amazing Pools",
    path: mdiPool,
  },
  {
    link: "/property",
    image: "/assets/imags/island_cat.webp",
    alt: "view",
    text: "Islands",
    path: mdiIsland,
  },
  {
    link: "/property",
    image: "/assets/imags/register.jpg",
    alt: "view",
    text: "Nature",
    path: mdiForestOutline,
  },
];
</script>
<style scoped>
:deep(.v-btn--icon.v-btn--size-default) {
  background-color: transparent;
  box-shadow: none;
}
:deep(.v-btn--icon.v-btn--size-default) {
  color: transparent;
}
:deep(.v-carousel-item) {
  transition: opacity 0.5s, transform 0.5s;
}
@media screen and (max-width: 600px) {
  .title-text {
    font-size: 2rem;
  }
}
</style>
