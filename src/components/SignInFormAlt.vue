<template>
  <form
    @submit.prevent="signin"
    class="alt-authentication">
    <div class="alt-authentication__item">
      <label
        for="email-reg"
        class="visually-hidden"
        >Вкажіть пошту</label
      >
      <input
        v-model="email"
        id="email-reg"
        required
        type="text"
        class="alt-authentication__input" />
      <div class="alt-authentication__pseudo-ph">Пошта</div>
    </div>
    <div class="alt-authentication__item">
      <label
        for="password-reg"
        class="visually-hidden"
        >Вкажіть пароль</label
      >
      <input
        v-model="password"
        id="password-reg"
        required
        type="password"
        class="alt-authentication__input" />
      <div class="alt-authentication__pseudo-ph">Пароль</div>
    </div>

    <p class="error-message">{{ errMessage }}</p>

    <button
      @click="signin"
      class="alt-authentication__button button button_lg button_primary"
      type="submit">
      <ArrowRightOnRectangleIcon class="base-icon" />
      Вхід
    </button>
  </form>
</template>

<script setup>
import { ArrowRightOnRectangleIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errMessage = ref("");

async function signin() {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email.value, password.value);
    if (user) {
      router.push("/");
    }
  } catch (error) {
    console.log(error.code);
    switch (error.code) {
      case "auth/invalid-email":
        errMessage.value = "Неккоректна пошта";
        break;
      case "auth/user-not-found":
        errMessage.value = "Користувач не зареєстрований";
        break;
      case "auth/wrong-password":
        errMessage.value = "Невірний пароль";
        break;
      case "email-already-in-use":
        errMessage.value = "Такий користувач вже зареєстрований";
        break;
      default:
        errMessage.value = "Помилка";
        break;
    }
  }
}
</script>

<style lang="scss">
.error-message {
  font-size: 14px;
  margin: em(15, 14) 0;
  font-weight: 500;
  color: var(--color-danger);
}
</style>
