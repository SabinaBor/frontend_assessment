<template>
  <div ref="dropdown" class="drop-down" :class="{ small: props.isSmall }">
    <div class="drop-down__btn" @click.stop="isDropDownOpen = true">
      <slot name="button"></slot>
    </div>
    <div
      class="drop-down__list"
      :class="[{ show: isDropDownOpen }, { visible: props.isVisible }]"
      :style="[{ 'max-height': isDropDownOpen ? props.maxHeight : 0 }]"
    >
      <slot name="content" :close="onClickOutside"></slot>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onUnmounted, ref } from "vue";

const emit = defineEmits(["close"]);

const props = defineProps({
  isSmall: {
    type: Boolean,
    default: false,
  },
  maxHeight: {
    type: String,
    default: "calc(100vh / 3.6)",
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const isDropDownOpen = ref(false);

onBeforeMount(() => {
  const body = document.body;
  if (body)
    // Event used to close the dropdown by clicking outside
    body.addEventListener("click", () => {
      onClickOutside();
    });
});

onUnmounted(() => {
  const body = document.body;
  body.removeEventListener("click", () => {
    onClickOutside();
  });
});

const onClickOutside = () => {
  isDropDownOpen.value = false;
  console.log('close')
  emit("close");
};
</script>

<script>
export default {
  name: "DropDown",
};
</script>

<style lang="scss" src="./index.scss"></style>
