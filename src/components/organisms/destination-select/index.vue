<template>
  <drop-down>
    <template #button>
      <div class="select__btn">
        <span><icon-bed /></span>
        <input
          :value="props.modelValue"
          type="text"
          placeholder="Destination"
          @input="onInput"
        />
        <span class="select__btn__trigger mobile">
          <icon-chevron-down />
        </span>
      </div>
    </template>
    <template #content>
      <destination-select-content
        :model-value="props.modelValue"
        :destinations="props.destinations"
        @set-destination="setDestination"
      />
    </template>
  </drop-down>
</template>

<script setup>
import { defineProps } from "vue";
import IconBed from "@/assets/icons/icon-bed.svg";
import IconChevronDown from "@/assets/icons/icon-chevron-down.svg";
import DropDown from "@/components/atoms/drop-down/index.vue";
import DestinationSelectContent from "@/components/molecules/destination-select-content/index.vue";

const emit = defineEmits(["update:modelValue", "setDestination"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  destinations: {
    type: Array,
    default: () => [],
  },
});

const onInput = (event) => {
  emit("update:modelValue", event.target.value);
};

const setDestination = (dest) => {
  emit("update:modelValue", dest.name);
  emit("setDestination", dest);
};
</script>

<script>
export default {
  name: "DestinationSelect",
};
</script>

<style lang="scss" src="./index.scss"></style>
