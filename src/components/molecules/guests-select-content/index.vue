<template>
  <div class="select__list" @click.stop="closeAllNumberDropdowns">
    <div class="select__list__header">
      <span> Adults </span>
      <span> Children </span>
    </div>
    <div class="select__list__body">
      <room-component
        v-for="(room, id) in props.rooms"
        :key="room.id"
        :room="room"
        :total-people="totalPeople"
        :disabled="isDisabled"
        :close-number-drop-downs="closeNumberDropdowns"
        @updateChildren="(children) => updateChildren(children, id)"
        @deleteRoom="deleteRoom(room.id)"
        @dropdownClosed="closeNumberDropdowns = false"
      />
    </div>
    <div class="select__list__footer">
      <custom-button
        is-outlined
        is-small
        :disabled="props.rooms.length === 4 || totalPeople === 9"
        @click.stop="addRoom"
        type="button"
      >
        Add room
      </custom-button>
      <custom-button
        is-outlined
        is-small
        @click.stop="cancelChanges"
        type="button"
      >
        Cancel
      </custom-button>
      <custom-button is-small type="button" @click="close">Done</custom-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import CustomButton from "@/components/atoms/button/index.vue";
import RoomComponent from "@/components/molecules/room/index.vue";

const emit = defineEmits([
  "updateChildren",
  "addRoom",
  "cancelChanges",
  "deleteRoom",
  "close",
]);

const props = defineProps({
  rooms: {
    type: Array,
    default: () => [],
  },
});

const closeNumberDropdowns = ref(false)

const savedRooms = ref([]);

const totalPeople = computed(() => {
  return props.rooms.reduce(
    (acc, curr) => acc + curr.adults_num + curr.children.length,
    0
  );
});

onMounted(() => {
  savedRooms.value = [...props.rooms]; // Initialize rooms that were before the user chooses different values
});

const updateChildren = (children, roomId) => {
  emit("updateChildren", children, roomId);
};

const addRoom = () => {
  emit("addRoom", {
    id: props.rooms.length + 1,
    adults_num: 1,
    children: [],
  });
};

const cancelChanges = () => {
  emit("cancelChanges", savedRooms.value);
};

const deleteRoom = (roomId) => {
  emit("deleteRoom", roomId);
};

const close = () => {
  emit("close");
};

const isDisabled = (i, init) => {
  // Sets the rule to disable Numbers dropdown
  return i + totalPeople.value - init > 9;
};

const closeAllNumberDropdowns = () => {
    closeNumberDropdowns.value = true
}
</script>

<script>
export default {
  name: "GuestsSelectContent",
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
