<template>
  <div class="select">
    <drop-down max-height="1000px" @close="setRooms" is-visible>
      <template #button>
        <div class="select__btn">
          <span><icon-passengers /></span>
          <div class="select__btn__value">
            <span class="select__btn__value__text">
              {{ adultsNum }} {{ adultsNum === 1 ? "Adult" : "Adults" }} -
              {{ childrenNum }}
              {{ childrenNum === 1 ? "Child" : "Children" }}
              <span class="select__btn__value__text_hidden">
                &nbsp-&nbsp{{ roomsNumber }}
                {{ roomsNumber === 1 ? "Room" : "Rooms" }}
              </span>
            </span>
            <span class="hidden-mobile">
              {{ roomsNumber }} {{ roomsNumber === 1 ? "room" : "rooms" }}
            </span>
          </div>
          <span class="select__btn__trigger">
            <icon-chevron-down />
          </span>
        </div>
      </template>
      <template #content="{ close }">
        <guests-select-content
          :rooms="form.rooms"
          @updateChildren="updateChildren"
          @addRoom="addRoom"
          @cancelChanges="cancelChanges"
          @deleteRoom="deleteRoom"
          @close="close"
        />
      </template>
    </drop-down>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import IconPassengers from "@/assets/icons/icon-passengers.svg";
import IconChevronDown from "@/assets/icons/icon-chevron-down.svg";
import DropDown from "@/components/atoms/drop-down/index.vue";
import GuestsSelectContent from "@/components/molecules/guests-select-content/index.vue";

const emit = defineEmits(["submitValue"]);

const form = ref({
  rooms: [
    {
      id: 1,
      adults_num: 1,
      children: [],
    },
  ],
});

const adultsNum = computed(() =>
  form.value.rooms.reduce((acc, curr) => acc + curr.adults_num, 0)
);

const childrenNum = computed(() =>
  form.value.rooms.reduce((acc, curr) => acc + curr.children.length, 0)
);

const roomsNumber = computed(() => form.value.rooms.length);

const updateChildren = (children, roomId) => {
  form.value.rooms[roomId].children = children;
};

const addRoom = (room) => {
  form.value.rooms.push(room);
};

const cancelChanges = (previousArray) => {
  form.value.rooms = [...previousArray];
};

const deleteRoom = (roomId) => {
  const idx = form.value.rooms.findIndex((el) => el.id === roomId);
  if (idx > -1) form.value.rooms.splice(idx, 1);
};

const setRooms = () => {
  emit("submitValue", form.value.rooms);
};
</script>

<script>
export default {
  name: "GuestsSelect",
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
