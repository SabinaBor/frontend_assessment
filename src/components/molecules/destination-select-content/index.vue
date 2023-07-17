<template>
  <div class="select__list">
    <div
      v-for="dest in destinations"
      class="select__list__item"
      @click="setDestination(dest)"
    >
      <span>
        <icon-city v-if="dest.type === 'city'" />
        <icon-location v-else-if="dest.type === 'destination'" />
        <icon-flag v-else />
      </span>
      <p>{{ dest.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import IconCity from "@/assets/icons/icon-city.svg";
import IconLocation from "@/assets/icons/icon-location.svg";
import IconFlag from "@/assets/icons/icon-flag.svg";

const emit = defineEmits(["setDestination"]);

const props = defineProps({
  destinations: {
    type: Array,
    default: () => [],
  },
});

const setDestination = (dest) => {
  emit("setDestination", dest);
};
</script>

<script>
export default {
  name: "DestinationSelect",
};
</script>

<style lang="scss" src="./index.scss"></style>
