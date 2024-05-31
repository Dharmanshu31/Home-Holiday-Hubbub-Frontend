<template>
  <div class="tw-flex tw-flex-wrap">
    <div ref="map" class="tw-w-[1500px] tw-h-[600px]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps(["lagLat"]);

const map = ref(null);
let marker = null;

const customIcon = L.icon({
  iconUrl: "../../../home.png",
  iconSize: [45, 45],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

//show map to in detail page
onMounted(() => {
  map.value = L.map(map.value).setView([props.lagLat[1], props.lagLat[0]], 13);
  L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png?lang=en", {
    maxZoom: 19,
  }).addTo(map.value);
  marker = L.marker([props.lagLat[1], props.lagLat[0]], {
    icon: customIcon,
  }).addTo(map.value);
});
</script>
