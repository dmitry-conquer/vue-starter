<template>
  <div class="form-auth__providers">
    <button
      @click="registerGoogle"
      class="form-auth__button button button_lg button_secondary">
      <div class="form-auth__icon">
        <img
          src="/images/svg/google-icon.svg"
          alt="google-icon"
          class="base-icon" />
      </div>
      Вхід через Google
    </button>
  </div>
</template>

<script setup>
import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function registerGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
}
</script>

<style lang="scss"></style>
