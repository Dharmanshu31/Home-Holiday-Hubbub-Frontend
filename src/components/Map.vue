<template>
  <div class="tw-flex tw-flex-wrap">
    <div ref="map" class="tw-w-[600px] tw-h-[400px]"></div>
  </div>
  <v-btn
    @click="getCurrentLocation"
    class="tw-mt-4 tw-py-2 tw-px-4"
    rounded="10"
    color="blue"
  >
    Get My Location
  </v-btn>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const map = ref(null);
let marker = null;
let emit = defineEmits(["locationSelected"]);

onMounted(() => {
  map.value = L.map(map.value).setView([21.1702, 72.8311], 13);

  L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png?lang=en", {
    maxZoom: 19,
  }).addTo(map.value);

  map.value.on("click", onMapClick);
});

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});

const onMapClick = (e) => {
  if (!marker) {
    // If marker is not initialized, create a new marker
    marker = L.marker(e.latlng).addTo(map.value);
  } else {
    // Update the marker position
    marker.setLatLng(e.latlng);
  }
  marker.bindPopup("Loading...").openPopup();
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${e.latlng.lat}%2C${e.latlng.lng}&key=80b4419f129642539df19bd163e569ce`
  )
    .then((response) => response.json())
    .then((data) => {
      const address = data.results[0].components;
      const popupContent = `
      <b>Latitude:</b> ${e.latlng.lat}<br/>
      <b>Longitude:</b> ${e.latlng.lng}<br/>
      <b>City:</b> ${address.city || "N/A"}<br/>
      <b>Country:</b> ${address.country || "N/A"}<br/>
      <b>Zipcode:</b> ${address.postcode || "N/A"}<br/>
      <b>Address:</b> ${data.results[0].formatted || "N/A"}<br/>
      `;
      marker.setPopupContent(popupContent);
      const locationDetails = {
        city: address.city || "",
        country: address.country || "",
        zipcode: address.postcode || "",
        streetAddress: data.results[0].formatted || "",
      };
      emit("locationSelected", locationDetails);
    });
};
const getCurrentLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const currentLatLng = L.latLng(latitude, longitude);
      map.value.setView(currentLatLng, 13);

      if (!marker) {
        marker = L.marker(currentLatLng).addTo(map.value);
      } else {
        marker.setLatLng(currentLatLng);
      }

      marker.bindPopup("Current Location").openPopup();

      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=80b4419f129642539df19bd163e569ce`
      )
        .then((response) => response.json())
        .then((data) => {
          const address = data.results[0].components;
          const popupContent = `
          <b>Latitude:</b> ${latitude}<br/>
          <b>Longitude:</b> ${longitude}<br/>
          <b>City:</b> ${address.city || "N/A"}<br/>
          <b>Country:</b> ${address.country || "N/A"}<br/>
          <b>Zipcode:</b> ${address.postcode || "N/A"}<br/>
          <b>Address:</b> ${data.results[0].formatted || "N/A"}<br/>
          `;
          marker.setPopupContent(popupContent);
          const locationDetails = {
            city: address.city || "",
            country: address.country || "",
            zipcode: address.postcode || "",
            streetAddress: data.results[0].formatted || "",
          };
          emit("locationSelected", locationDetails);
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
</script>

<style>
/* Add any additional styling here */
</style>
