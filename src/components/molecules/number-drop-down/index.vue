<template>
  <div class="drop-down small">
    <div class="drop-down__btn select__btn" @click.stop="isDropDownOpen = true">
      <input :value="props.modelValue" disabled />
      <span class="select__btn__trigger">
        <icon-chevron-down />
      </span>
    </div>
    <div
      class="drop-down__list"
      :class="[{ show: isDropDownOpen }]"
      :style="[{ 'max-height': isDropDownOpen ? '100px' : 0 }]"
    >
      <div class="select__list">
        <div
          v-for="i in minMaxArray"
          class="select__item"
          :class="{
            disabled: props.disabled(i, props.modelValue) || disabledMore(i),
          }"
          @click.stop="updateValue(i, close)"
        >
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, watch, ref } from "vue";
import IconChevronDown from "@/assets/icons/icon-chevron-down.svg";

const emit = defineEmits(["update:modelValue", "dropdownClosed"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Function,
    default: () => {
      return false;
    },
  },
  disabledMore: {
    // This prop is required if there are more than one condition for numbers to be disabled
    type: Function,
    default: () => {
      return false;
    },
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
});

const isDropDownOpen = ref(false);

const minMaxArray = computed(() => {
  // Creates an array of numbers between min and max
  const arr = [];
  let min = props.min;
  while (min <= props.max) {
    arr.push(min);
    min += 1;
  }
  return arr;
});

watch(
  () => props.isClosed,
  (val) => {
    if (val) {
      isDropDownOpen.value = false;
      emit("dropdownClosed");
    }
  }
);

const updateValue = (val) => {
  emit("update:modelValue", val);
  isDropDownOpen.value = false;
};
</script>

<script>
export default {
  name: "NumberDropdown",
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
