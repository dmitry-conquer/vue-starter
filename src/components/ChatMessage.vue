<template>
  <li
    :class="{ self: currentUser.username === message.user }"
    class="message">
    <div class="message__avatar">
      <img
        :src="message.avatar"
        :alt="message.user"
        class="message__avatar-image" />
    </div>
    <div class="message__outer">
      <div class="message__body">
        <div class="message__username">{{ message.user }}</div>
        <div class="message__content">
          {{ message.content }}
        </div>
      </div>
      <div class="message__date">{{ dateNormalize(message.date) }}</div>
    </div>

    <!-- <button @click="deleteMessage(message.id)">x</button> -->
  </li>
</template>

<script setup>
import { useRoute } from "vue-router";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

const route = useRoute();

defineProps({
  message: {
    type: Object,
    required: true,
  },
  currentUser: {
    type: Object,
    required: true,
  },
});

/*
   delete message
 */

function deleteMessage(id) {
  const chatsCollection = collection(db, `rooms/${route.params.id}/messages`);
  deleteDoc(doc(chatsCollection, id));
}

function dateNormalize(date) {
  return new Date(date).toLocaleTimeString();
}
</script>

<style lang="scss">
.message {
  display: flex;
  gap: 15px;
  &.self {
    flex-direction: row-reverse;
    align-self: flex-end;
    .message__body {
      background-color: var(--message-self-color);
      &::before {
        border-right: 15px solid var(--message-self-color);
        transform: rotate(180deg);
        right: -12px;
      }
    }
  }
  &__body {
    min-width: 150px;
    background-color: var(--message-color);
    padding: 10px 20px;
    border-radius: 8px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 8px;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 15px solid var(--message-color);
      right: 100%;
      transform: rotate(0);
    }
  }
  &__outer {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__avatar {
    flex: 0 0 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__avatar-image {
    width: 100%;
    height: 100%;
  }
  &__username {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: em(10, 16);
  }
  &__content {
  }
  &__date {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    font-size: 12px;
    color: var(--text-muted-color);
  }
  &__image {
    width: 200px;
    height: 200px;
    display: block;
    object-fit: cover;
  }
}
</style>
