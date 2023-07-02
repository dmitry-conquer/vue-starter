<template>
  <div class="form-auth">
    <RegistrationFormAvatar @change-avatar="changeAvatar" />
    <RegistrationFormAlt :random-seed="randomSeed" />
    <AuthenticationSeparator />
    <AuthenticationProviders />
  </div>
</template>

<script setup>
import { ref } from "vue";
import RegistrationFormAvatar from "@/components/RegistrationFormAvatar.vue";
import RegistrationFormAlt from "@/components/RegistrationFormAlt.vue";
import AuthenticationProviders from "@/components/AuthenticationProviders.vue";
import AuthenticationSeparator from "@/components/AuthenticationSeparator.vue";

const randomSeed = ref(0);

function changeAvatar(seed) {
  randomSeed.value = seed;
}
</script>

<style lang="scss">
.form-auth {
  &__providers {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &__button {
    font-size: 16px;
  }
  &__icon {
    position: relative;
    img {
      position: relative;
      z-index: 2;
      width: 20px;
      height: 20px;
    }
    &::after {
      content: "";
      position: absolute;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
    }
  }
  &__separator {
    margin: 25px 0;
    font-size: 14px;
    color: var(--gray);
  }
}
</style>
