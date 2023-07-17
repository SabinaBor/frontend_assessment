<template>
  <div class="calendar__btn mobile">
    <div class="calendar__btn__header">
      <div class="calendar__btn__header__item">
        <span>
          <icon-calendar />
        </span>
        CHECK IN
      </div>
      <div class="calendar__btn__header__item">
        <span>
          <icon-calendar />
        </span>
        CHECK OUT
      </div>
    </div>
    <div class="calendar__btn__bottom">
      <date-picker-header-item-mobile :date="dates[0] ? dates[0] : {}" />
      <span>
        <icon-arrow-right />
      </span>
      <date-picker-header-item-mobile :date="dates[1] ? dates[1] : {}" />
    </div>
  </div>
</template>

<script setup>
import IconCalendar from "@/assets/icons/icon-calendar.svg";
import IconArrowRight from "@/assets/icons/icon-arrow-right.svg";
import DatePickerHeaderItemMobile from "@/components/atoms/date-picker-header-item-mobile/index.vue";

const props = defineProps({
  dates: {
    type: Array,
    default: () => [],
  },
});
</script>

<script>
export default {
  name: "DatePickerHeaderMobile",
};
</script>

<style lang="scss" src="./index.scss"></style>
