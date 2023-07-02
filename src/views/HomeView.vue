<template>
  <ChatHeader />
  <main class="main-area">
    <ChatSidebar />
    <RouterView :current-user="currentUser" />
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { db } from "@/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth } from "@/firebase";
import ChatHeader from "@/components/ChatHeader.vue";
import ChatSidebar from "@/components/ChatSidebar.vue";

const currentUser = ref({});

/*
  get current user
*/
const usersCollection = collection(db, "users");
onMounted(async () => {
  const docRef = doc(usersCollection, auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  currentUser.value = docSnap.data();
});
</script>

<style lang="scss">
.main-area {
  background-color: var(--bg-secondary);
  display: grid;
  grid-template-columns: 380px 1fr;
}
</style>
