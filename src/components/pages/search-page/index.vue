<template>
  <div class="search-page">
    <h1>Book your hotel stay</h1>
    <p class="search-page__subtitle">
      Redeem your Hotelgift voucher for your next hotel stay.
    </p>
    <search-bar />
  </div>
</template>

<script setup>
import SearchBar from "@/components/organisms/search-bar/index.vue";
</script>

<script>
export default {
  name: "SearchPage",
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
