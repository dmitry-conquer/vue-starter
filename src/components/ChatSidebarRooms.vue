<template>
  <div class="rooms">
    <h2 class="rooms__title"></h2>
    <ChatSidebarRoomsAdd />
    <ChatSidebarRoomsSearch v-model:search="search" />
    {{ search }}
    <ul class="rooms__list">
      <li
        v-for="room in filteredRooms"
        :key="room.id"
        class="rooms__item room-item">
        <img
          :src="room.avatar"
          alt=""
          class="room-item__avatar" />
        <RouterLink
          :to="`/room/${room.id}`"
          class="room-item__name">
          {{ room.name }}
        </RouterLink>
        <span @click="deleteRoom(room.id)">x</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { db } from "@/firebase";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import ChatSidebarRoomsAdd from "@/components/ChatSidebarRoomsAdd.vue";
import ChatSidebarRoomsSearch from "@/components/ChatSidebarRoomsSearch.vue";

const roomsList = ref([]);
const search = ref("");

const roomsRef = collection(db, "rooms");

onSnapshot(roomsRef, docs => {
  const newRooms = [];
  docs.forEach(doc => {
    newRooms.push({ ...doc.data(), id: doc.id });
  });
  roomsList.value = newRooms;
});

function deleteRoom(id) {
  deleteDoc(doc(roomsRef, id));
}

const filteredRooms = computed(() => {
  return roomsList.value.filter(room => {
    return room.name.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>

<style lang="scss">
.rooms {
  &__button {
    margin-bottom: 10px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px 0;
  }
}

.room-item {
  padding: 6px;
  display: flex;
  align-items: center;
  gap: 15px;
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    overflow: hidden;
  }
  &__name {
    font-size: 18px;
    font-weight: medium;
  }
}
</style>
