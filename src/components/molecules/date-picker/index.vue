<template>
  <datepicker
    ref="vueDatepicker"
    v-model="props.modelValue"
    range
    :min-date="props.minDate"
    :max-date="props.maxDate"
    :min-range="1"
    :max-range="29"
    :month-change-on-scroll="false"
    :enable-time-picker="false"
    :position="position"
    :auto-position="autoPosition"
    :close-on-scroll="isClosedOnScroll"
    no-today
    multi-calendars
    @internal-model-change="internalModelChange"
    @update:modelValue="onDateSelect"
    @closed="setValue"
  >
    <template #trigger>
      <div class="calendar__btn">
        <span>
          <icon-calendar />
        </span>
        <date-picker-header-item :date="chosenDatesObjects[0]" />
        <hr />
        <date-picker-header-item :date="chosenDatesObjects[1]" />
      </div>
      <date-picker-header-mobile :dates="chosenDatesObjects" />
    </template>
    <template #month-year="{ month, year, updateMonthYear, instance }">
      <div class="calendar__head">
        <span
          v-show="instance === 0"
          class="arrow-left"
          @click="updateMonth(month - 1, updateMonthYear, year)"
        >
          <icon-chevron-down />
        </span>
        <p>
          <span>{{ fullMonthNames[month] }}</span>
          {{ year }}
        </p>
        <span
          v-show="instance === instanceNumMobile"
          class="arrow-right"
          @click="updateMonth(month + 1, updateMonthYear, year)"
        >
          <icon-chevron-down />
        </span>
        <span
          v-show="instance === 0"
          class="calendar__head__close mobile"
          @click="closeDatePicker"
        >
          <icon-close />
        </span>
      </div>
    </template>
    <template #action-row="{ internalModelValue, selectDate }">
      <div class="calendar__action-row">
        <p>{{ calendarActionRowText }}</p>
        <custom-button is-small @click="closeDatePicker"> Done </custom-button>
      </div>
    </template>
  </datepicker>
</template>

<script setup>
import { onBeforeMount, ref, computed, onUnmounted } from "vue";
import IconChevronDown from "@/assets/icons/icon-chevron-down.svg";
import IconCalendar from "@/assets/icons/icon-calendar.svg";
import IconClose from "@/assets/icons/icon-close.svg";
import DatePickerHeaderMobile from "@/components/molecules/date-picker-header-mobile/index.vue";
import DatePickerHeaderItem from "@/components/atoms/date-picker-header-item/index.vue";
import CustomButton from "@/components/atoms/button/index.vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  minDate: {
    type: Date,
    default: new Date(),
  },
  maxDate: {
    type: Date,
    default: new Date(),
  },
  modelValue: {
    type: [Date, Array],
    default: new Date(),
  },
});

const vueDatepicker = ref();

// These are parameters that depend on the window size
const position = ref("center");
const autoPosition = ref(false);
const isClosedOnScroll = ref(false);
const instanceNumMobile = ref(1);

const chosenDates = ref([]);

const fullMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const chosenDatesObjects = computed(() => {
  return chosenDates.value.map((el) => ({
    date: formatDate(el),
    weekday: weekday[el.getDay()],
    day: el.getDate(),
    month: fullMonthNames[el.getMonth()].substring(0, 3),
    year: el.getFullYear(),
  }));
});

const calendarActionRowText = computed(() => {
  const firstDate = chosenDates.value[0] ? chosenDatesObjects.value[0] : null;
  const secondDate = chosenDates.value[1] ? chosenDatesObjects.value[1] : null;
  const nightsNum =
    chosenDates.value[0] && chosenDates.value[1]
      ? (chosenDates.value[1] - chosenDates.value[0]) / (1000 * 3600 * 24)
      : 0;
  return `${formatMobileDate(firstDate)}  -  ${formatMobileDate(
    secondDate
  )} (${nightsNum} nights)`;
});

onBeforeMount(() => {
  chosenDates.value = [...props.modelValue];
  changeParameters();
  window.addEventListener("resize", changeParameters);
});

onUnmounted(() => {
  window.removeEventListener("resize", changeParameters);
});

const changeParameters = () => {
  // This method changes the datepicker parameters depending on window size
  position.value = window.innerWidth <= 1024 ? "right" : "center";
  autoPosition.value = !(window.innerWidth <= 1024);
  isClosedOnScroll.value = !(window.innerWidth <= 1024);
  instanceNumMobile.value = window.innerWidth <= 600 ? 0 : 1;
};

const formatMobileDate = (dateObject) => {
  return dateObject
    ? `${dateObject.weekday.substring(0, 3)}, ${dateObject.month} ${
        dateObject.day
      }`
    : "";
};

const onDateSelect = (val) => {
  emit("update:modelValue", val);
};

const internalModelChange = (val) => {
  // Method is called when at least one date is selected
  if (val && val.length > 0) {
    chosenDates.value = [...val];
  }
};

const setValue = () => {
  if (chosenDates.value.length === 1) {
    const nextDate = new Date(chosenDates.value[0]);
    nextDate.setDate(nextDate.getDate() + 1);
    chosenDates.value.push(nextDate);
  }
  emit("update:modelValue", chosenDates.value);
};

const updateMonth = (month, updateMonthYear, year) => {
  // Method that changes months in calendar
  updateMonthYear(
    month === -1 ? 11 : month === 12 ? 0 : month,
    month === -1 ? year - 1 : month === 12 ? year + 1 : year
  );
};

const formatDate = (date) => {
  return (
    date.getDate() +
    " " +
    fullMonthNames[date.getMonth()].substring(0, 3) +
    " " +
    date.getFullYear()
  );
};

const closeDatePicker = () => {
  if (vueDatepicker) {
    vueDatepicker.value.closeMenu();
  }
};
</script>

<script>
export default {
  name: "CustomDatepicker",
};
</script>

<style lang="scss" src="./index.scss"></style>
