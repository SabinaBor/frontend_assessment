<template>
  <div class="room">
    <div class="room__main">
      <span>Room</span>
      <number-dropdown
        v-model="props.room.adults_num"
        :min="1"
        :max="9"
        :disabled="props.disabled"
        :is-closed="closeNumberDropDown"
        @dropdownClosed="dropdownClosed"
      />
      <number-dropdown
        v-model="childrenNum"
        :min="0"
        :max="8"
        :disabled="props.disabled"
        :disabled-more="childrenMore"
        :is-closed="closeNumberDropDown"
      />
      <span
        v-show="props.room.id !== 1"
        class="room__main__btn"
        @click.stop="deleteRoom"
      >
        <icon-delete
      /></span>
    </div>
    <div v-show="childrenNum > 0" class="room__extra">
      <span>Children ages</span>
      <div class="room__extra__list">
        <number-dropdown
          v-for="child in props.room.children"
          :key="child.id"
          v-model="child.age"
          :min="0"
          :max="17"
          :is-closed="closeNumberDropDown"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import IconDelete from "@/assets/icons/icon-delete.svg";
import NumberDropdown from "@/components/molecules/number-drop-down/index.vue";

const emit = defineEmits(["updateChildren", "deleteRoom", "dropdownClosed"]);

const props = defineProps({
  room: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Function,
    default: () => {},
  },
  totalPeople: {
    type: Number,
    default: 1,
  },
  closeNumberDropDowns: {
    type: Boolean,
    default: false,
  },
});

const childrenNum = ref(0);
const closeNumberDropDown = ref(false);

watch(childrenNum, (val) => {
  // This watch helps us to update the children array of a room
  const children = [...props.room.children];
  if (val > children.length) {
    const tmp = [];
    let idx = children.length + 1;
    for (let i = 0; i < val - children.length; i++) {
      tmp.push({
        id: idx,
        age: 0,
      });
      idx += 1;
    }
    children.splice(children.length, 0, ...tmp);
    emit("updateChildren", children);
  } else if (val < children.length) {
    children.splice(val);
    emit("updateChildren", children);
  }
});

watch(
  () => props.closeNumberDropDowns,
  (val) => {
    closeNumberDropDown.value = val;
  }
);

onMounted(() => {
  childrenNum.value = props.room.children.length;
});

const childrenMore = (i) => {
  return i > props.room.adults_num;
};

const deleteRoom = () => {
  emit("deleteRoom");
};

const dropdownClosed = () => {
  emit("dropdownClosed");
};
</script>

<script>
export default {
  name: "RoomComponent",
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
