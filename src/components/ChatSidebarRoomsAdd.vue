<template>
  <div class="new-room">
    <form
      @submit.prevent=""
      class="new-room__form">
      <input
        v-model="name"
        required
        type="text"
        class="new-room__input" />
      <span class="new-room__pseudo-ph">Новий чат</span>
      <button
        @click="addRoom"
        class="new-room__button button button_sm button_primary"
        type="submit">
        <PlusCircleIcon class="base-icon" />
      </button>
    </form>
    <div
      @click="reloadAvatar"
      class="new-room__avatar">
      <img
        :src="`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${randomSeed}`"
        alt=""
        class="new-room__avatar-image" />
      <span
        class="new-room__reload"
        type="button">
        <ArrowPathIcon class="new-room__reload-icon" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "@/firebase";
import { PlusCircleIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
import { randNum } from "@/functions";

const name = ref("");
const randomSeed = ref(randNum());

const roomsRef = collection(db, "rooms");
async function addRoom() {
  await addDoc(roomsRef, {
    name: name.value,
    avatar: `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${randomSeed.value}`,
  });
  name.value = "";
}

function reloadAvatar() {
  randomSeed.value = randNum();
}
</script>

<style lang="scss">
.new-room {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  &__form {
    position: relative;
    display: flex;
    align-items: center;
  }
  &__input {
    border: 1px solid var(--message-self-color);
    border-radius: 8px;
    width: 100%;
    height: 100%;
    padding: 8px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    &:focus {
      border: 1px solid var(--message-self-color);
      border-right: 0;
    }
    &:focus + span,
    &:valid:required + span {
      font-size: 11px;
      top: 0;
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
    font-size: 14px;
    transition: all 0.3s ease;
    padding: 4px;
    background-color: var(--bg-interface-color);
  }
  &__button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &__avatar {
    position: relative;
    cursor: pointer;
    @media (any-hover: hover) {
      &:hover {
        .new-room__reload-icon {
          transform: rotate(360deg);
        }
      }
    }
  }
  &__avatar-image {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    overflow: hidden;
  }
  &__reload {
    padding: 3px;
    border-radius: 50%;
    background-color: var(--bg-interface-light-color);
    position: absolute;
    top: -8px;
    right: -8px;
  }
  &__reload-icon {
    width: 15px;
    height: 15px;
    color: var(--text-color);
    transition: all 0.8s ease;
  }
}
</style>
