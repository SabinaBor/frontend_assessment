<template>
  <button
    v-bind="$attrs"
    class="the-button"
    :class="[{ outlined: props.isOutlined }, { small: props.isSmall }]"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  isOutlined: {
    type: Boolean,
    default: false,
  },
  isSmall: {
    type: Boolean,
    default: false,
  },
});
</script>

<script>
export default {
  name: "CustomButton",
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
