<template>
  <div class="text-container">
    <form
      @submit.prevent="sendMessage(route.params.id)"
      class="text-container__form">
      <input
        required
        v-model="messageText"
        type="text"
        class="text-container__input" />
      <span class="text-container__pseudo-ph">Написати повідомлення</span>
    </form>
    <div class="text-container__footer">
      <button
        class="text-container__actions"
        type="button">
        <Squares2X2Icon class="base-icon" />
      </button>
      <button
        type="submit"
        class="text-container__button">
        <PaperAirplaneIcon class="text-container__button-icon base-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { PaperAirplaneIcon, Squares2X2Icon } from "@heroicons/vue/24/solid";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

const route = useRoute();

const props = defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
});

const messageText = ref("");

async function sendMessage(id) {
  const chatsCollection = collection(db, `rooms/${id}/messages`);
  await addDoc(chatsCollection, {
    content: messageText.value,
    user: props.currentUser.username,
    avatar: props.currentUser.URL,
    date: Date.now(),
  });
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
  messageText.value = "";
}
</script>

<style lang="scss">
.text-container {
  position: sticky;
  bottom: 40px;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--dark-border);
  &__form {
    background-color: var(--bg-interface-color);
    position: relative;
    padding: 18px 10px 10px 10px;
    border-bottom: 1px solid var(--dark-border);
  }
  &__input {
    width: 100%;
    flex-grow: 1;
    padding: 5px;
    &:focus + span,
    &:valid:required + span {
      font-size: 10px;
      top: 12px;
      left: 18px;
    }
  }
  &__pseudo-ph {
    pointer-events: none;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted-color);
    transition: all 0.3s ease;
    font-size: 14px;
    line-height: 1.3;
  }
  &__footer {
    background-color: var(--bg-interface-light-color);
    position: relative;
    padding: 14px;
    display: flex;
    justify-content: space-between;
  }
  &__actions {
    color: var(--primary-light-color);
  }
  &__button {
  }
  &__button-icon {
    color: var(--primary-light-color);
  }
}
</style>
