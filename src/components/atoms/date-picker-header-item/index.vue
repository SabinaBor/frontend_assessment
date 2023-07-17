<template>
  <p>
    {{ date ? date.date : "" }}
    <br />
    <span>
      {{ date ? date.weekday : "" }}
    </span>
  </p>
</template>

<script setup>
const props = defineProps({
    date: {
        type: Object,
        default: () => ({})
    }
})
</script>

<script>
export default {
    name: 'DatePickerHeaderItem'
}
</script>