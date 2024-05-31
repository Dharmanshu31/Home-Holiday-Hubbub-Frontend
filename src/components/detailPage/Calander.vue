<template>
  <v-date-picker
    color="#222222"
    multiple="range"
    show-adjacent-months
    :elevation="elevated"
    :allowed-dates="allowDate"
    @mouseover="elevated = 10"
    @mouseleave="elevated = 0"
  ></v-date-picker>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  bookingDate: Array,
});
const elevated = ref(0);


//show allow dates
const allowDate = (date) => {
  const currentDate = new Date(date);
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date

  // Block past dates
  if (currentDate < today) {
    return false;
  }

  // Block dates within any booked date ranges
  for (let booking of props.bookingDate) {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    start.setHours(0, 0, 0, 0); // Normalize start date
    end.setHours(0, 0, 0, 0); // Normalize end date

    if (currentDate >= start && currentDate <= end) {
      return false;
    }
  }
  return true;
};
</script>
