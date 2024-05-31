<template>
  <div class="tw-flex tw-flex-wrap">
    <div ref="map" class="tw-w-[1500px] tw-h-[450px]"></div>
    <v-btn
      @click="getCurrentLocation"
      class="tw-mt-4 tw-py-2 tw-px-4"
      rounded="10"
      color="blue"
    >
      Current Position
    </v-btn>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["logAndPosition"]);

const map = ref(null);
const radius = ref();
const lag = ref();
const lat = ref();


//filter map 
onMounted(() => {
  const initializeMap = () => {
    const mapElement = map.value;

    if (!mapElement) return;

    const leafletMap = L.map(mapElement).setView([21.1702, 72.8311], 13);

    L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png?lang=en", {
      maxZoom: 19,
    }).addTo(leafletMap);

    //drwaning circal edit tools
    const drawnItems = new L.FeatureGroup();
    leafletMap.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        edit: false,
      },
      draw: {
        polyline: false,
        polygon: false,
        rectangle: false,
        marker: false,
        circlemarker: false,
      },
    });

    leafletMap.addControl(drawControl);

    // Handle the draw:created event
    leafletMap.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      if (layer instanceof L.Circle) {
        radius.value = layer.getRadius() / 1000;
        const center = layer.getBounds().getCenter();
        lat.value = center.lat;
        lag.value = center.lng;
      }
    });

    // Ensure that the map reference is correctly set
    map.value = leafletMap;
  };

  // Use setTimeout to defer initialization to ensure the map container is fully available
  setTimeout(() => {
    initializeMap();
  }, 100);
});

//get current lat and lng
const getCurrentLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const currentLatLng = L.latLng(latitude, longitude);
      map.value.setView(currentLatLng, 13);
    });
  } else {
    toast.error("Geolocation is not supported by this browser.");
  }
};

//emit map data the data
watch(radius, () => {
  emit("logAndPosition", { radius, lat, lag });
});
</script>
