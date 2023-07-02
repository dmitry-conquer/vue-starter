<template>
  <div
    class="chat-actions"
    type="button">
    <button
      class="chat-actions__button"
      type="button">
      <PuzzlePieceIcon class="base-icon" />
    </button>
    <div class="chat-actions__list">
      <button
        @click="sendDog"
        class="chat-actions__item">
        <DogIcon class="base-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PuzzlePieceIcon } from "@heroicons/vue/24/outline";
import DogIcon from "@/components/icons/DogIcon.vue";
import { getDog } from "@/api";

const emit = defineEmits({
  "send-dog": value => typeof value === "string",
});

const url = ref("");

async function sendDog() {
  const data = await getDog();
  url.value = data;
  emit("send-dog", url.value);
}

setTimeout(() => {
  console.log(url.value);
}, 2000);
</script>

<style lang="scss"></style>
