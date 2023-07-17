<template>
  <div class="calendar__btn__content">
    <div class="calendar__btn__content__left">
      {{ date ? date.day : "" }}
    </div>
    <div class="calendar__btn__content__right">
      <span>
        {{ date ? date.month + " " + date.year : "" }}
      </span>
      <span>
        {{ date ? date.weekday : "" }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  date: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<script>
export default {
  name: "DatePickerHeaderItemMobile",
};
</script>

<style lang="scss" src="./index.scss"></style>
