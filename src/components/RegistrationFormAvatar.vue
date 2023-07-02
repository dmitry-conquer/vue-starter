<template>
  <div class="avatar-auth">
    <h3 class="avatar-auth__title">Оберіть собі аватар</h3>
    <div class="avatar-auth__body">
      <img
        :src="`https://api.dicebear.com/6.x/adventurer/svg?seed=${randomSeed}`"
        alt=""
        class="avatar-auth__image" />
      <button
        @click="changeAvatar"
        class="avatar-auth__button button button_sm button_primary">
        <ArrowPathRoundedSquareIcon class="base-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ArrowPathRoundedSquareIcon } from "@heroicons/vue/24/outline";
import { randNum } from "@/functions";

const randomSeed = ref(randNum());

const emit = defineEmits({
  "change-avatar": value => typeof value === "number",
});

function changeAvatar() {
  randomSeed.value = randNum();
  emit("change-avatar", randomSeed.value);
}
</script>

<style lang="scss">
.avatar-auth {
  border: 1px solid var(--gray-light);
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;
  &__title {
    font-size: 18px;
    color: var(--color-text-secondary);
    font-weight: 500;
    margin-bottom: em(15, 20);
  }
  &__body {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  &__image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
    overflow: hidden;
  }
  &__button {
  }
}
</style>
