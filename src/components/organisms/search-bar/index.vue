<template>
  <div class="search-bar">
    <form @submit.prevent="onSubmit">
      <destination-select
        v-model="destination"
        :destinations="filteredDestionations"
        @setDestination="setDestination"
      />
      <custom-datepicker
        v-model="form.dates"
        :min-date="startDate"
        :max-date="maxDate"
        class="search__datepicker"
      />
      <guests-select @submitValue="setRooms" />
      <custom-button class="search-bar__btn" type="submit">Search</custom-button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DestinationSelect from "@/components/organisms/destination-select/index.vue";
import GuestsSelect from "@/components/organisms/guests-select/index.vue";
import CustomDatepicker from "@/components/molecules/date-picker/index.vue";
import CustomButton from "@/components/atoms/button/index.vue";
import destinations from "@/utils/destinations";

const today = new Date();
const startDate = new Date(today);
const endDate = new Date(today);
const maxDate = new Date(today);

startDate.setDate(startDate.getDate() + 2);
endDate.setDate(endDate.getDate() + 3);
maxDate.setFullYear(maxDate.getFullYear() + 1);

const destination = ref("");

const form = ref({
  destination: {},
  dates: [startDate, endDate],
});

const filteredDestionations = computed(() => {
  return destinations
    .filter((dest) => dest.name.includes(destination.value))
    .slice(0, 10);
});

const setDestination = (destination) => {
  form.value.destination = destination;
};

const setRooms = (rooms) => {
  form.value.rooms = [...rooms];
};

const onSubmit = () => {
  if (
    form.value.destination.name !== destination.value &&
    filteredDestionations.value.length > 0
  ) {
    // If no destination is chosen then the program takes the first destination from a destinations list
    destination.value = filteredDestionations.value[0].name;
    form.value.destination = { ...filteredDestionations.value[0] };
  }
  console.log(form.value);
};
</script>

<script>
export default {
  name: "SearchBar",
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
