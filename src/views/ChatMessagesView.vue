<template>
  <div class="messages">
    <ul
      class="messages__list"
      name="list">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :current-user="currentUser" />
    </ul>
    <ChatTextContainer :current-user="currentUser" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import ChatMessage from "@/components/ChatMessage.vue";
import ChatTextContainer from "@/components/ChatTextContainer.vue";
import { db } from "@/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useRoute } from "vue-router";

defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
});

const route = useRoute();

const messages = ref([]);
let unsubscribe = null;

onMounted(() => {
  const chatsCollection = collection(db, `rooms/${route.params.id}/messages`);
  unsubscribe = onSnapshot(chatsCollection, docs => {
    messages.value = [];
    docs.forEach(doc => {
      messages.value.push({ ...doc.data(), id: doc.id });
    });
  });
});

watch(
  () => route.params.id,
  () => {
    if (unsubscribe) {
      unsubscribe();
      const chatsCollection = collection(db, `rooms/${route.params.id}/messages`);
      unsubscribe = onSnapshot(chatsCollection, docs => {
        messages.value = [];

        docs.forEach(doc => {
          messages.value.push({ ...doc.data(), id: doc.id });
        });
      });
    }
  },
);
</script>

<style lang="scss">
.messages {
  background: var(--bg-chat-color);
  padding: 40px;
  display: flex;
  flex-direction: column;
  // height: 100vh;
  &__list {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    flex-grow: 1;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
