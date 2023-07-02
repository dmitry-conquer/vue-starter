<template>
  <div class="users">
    <ul class="users__list">
      <li
        v-for="user in users"
        :key="user.username"
        class="user">
        <img
          :src="user.URL"
          :alt="user.username"
          class="user__avatar" />
        <p>{{ user.username }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { db } from "@/firebase";
import { onSnapshot, collection } from "firebase/firestore";

const users = ref([]);
const usersCollection = collection(db, "users");

onMounted(() => {
  onSnapshot(usersCollection, docs => {
    const tempUsers = [];
    docs.forEach(doc => {
      if (doc.data().username) {
        tempUsers.push(doc.data());
      }
    });
    users.value = tempUsers;
  });
});
</script>

<style lang="scss">
.users__list {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--gray-light);
  &__avatar {
    flex: 0 0 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
  }
}
</style>
