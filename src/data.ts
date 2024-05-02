export const amenities = [
  { name: "mdi-bathtub", text: "Bath tub" },
  { name: "mdi-hair-dryer", text: "Personal care products" },
  { name: "mdi-shower-head", text: "Outdoor shower" },
  { name: "mdi-washing-machine", text: "Washer" },
  { name: "mdi-tumble-dryer", text: "Dryer" },
  { name: "mdi-hanger", text: "Hangers" },
  { name: "mdi-iron", text: "Iron" },
  { name: "mdi-youtube-tv", text: "TV" },
  { name: "mdi-human-male-board-poll", text: "Dedicated workspace" },
  { name: "mdi-snowflake", text: "Air Conditioning" },
  { name: "mdi-radiator", text: "Heating" },
  { name: "mdi-cctv", text: "Security cameras" },
  { name: "mdi-fire-extinguisher", text: "Fire extinguisher" },
  { name: "mdi-medication", text: "First Aid" },
  { name: "mdi-wifi", text: "Wifi" },
  { name: "mdi-countertop", text: "Cooking set" },
  { name: "mdi-fridge", text: "Refrigerator" },
  { name: "mdi-microwave", text: "Microwave" },
  { name: "mdi-stove", text: "Stove" },
  { name: "mdi-grill", text: "Barbecue grill" },
  { name: "mdi-beach", text: "Outdoor dining area" },
  { name: "mdi-balcony", text: "Private patio or Balcony" },
  { name: "mdi-campfire", text: "Camp fire" },
  { name: "mdi-flower-outline", text: "Garden" },
  { name: "mdi-car-back", text: "Free parking" },
  { name: "mdi-key-variant", text: "Self check-in" },
  { name: "mdi-paw", text: "Pet allowed" },
];

export const icons = [
  { name: "mdi-beach", text: "Beachfront" },
  { name: "mdi-wind-power", text: "Windmills" },
  { name: "mdi-home-city", text: "Iconic cities" },
  { name: "mdi-image-filter-hdr", text: "Countryside" },
  { name: "mdi-pool", text: "Amazing Pools" },
  { name: "mdi-island", text: "Islands" },
  { name: "mdi-waves", text: "Lakefront" },
  { name: "mdi-ski", text: "Ski-in/out" },
  { name: "mdi-castle", text: "Castles" },
  { name: "mdi-beach", text: "Caves" },
  { name: "mdi-campfire", text: "Camping" },
  { name: "mdi-snowflake", text: "Arctic" },
  { name: "mdi-cactus", text: "Desert" },
  { name: "mdi-barn", text: "Barns" },
  { name: "mdi-diamond-stone", text: "Luxury" },
  { name: "mdi-home-flood", text: "Other" },
];

export const plases = [
  {
    name: "An entire place",
    dis: "Guests have the whole place to themselves",
    icon: "mdi-home-account",
  },
  {
    name: "Room(s)",
    dis: "Guests have their own room in a house, plus access to shared places",
    icon: "mdi-door-open",
  },
  {
    name: "A Shared Room",
    dis: "Guests sleep in a room or common area that maybe shared with you or others",
    icon: "mdi-account-group",
  },
];

export const cImage = [
  { src: "/assets/imags/slide.jpg" },
  { src: "/assets/imags/pool_cat.jpg" },
  { src: "/assets/Listing1/1.jpg" },
  { src: "/assets/imags/island_cat.webp" },
  { src: "/assets/Listing1/7.jpg" },
  { src: "/assets/Listing2/7.jpg " },
];

import {
  mdiBeach,
  mdiForestOutline,
  mdiHomeCityOutline,
  mdiImageFilterHdrOutline,
  mdiIsland,
  mdiPool,
  mdiWindPower,
} from "@mdi/js";

export const images = [
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
