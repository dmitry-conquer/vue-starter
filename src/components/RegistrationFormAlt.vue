<template>
  <form
    @submit.prevent="register"
    class="alt-authentication">
    <div class="alt-authentication__item">
      <label
        for="username-reg"
        class="visually-hidden"
        >Вкажіть нікнейм</label
      >
      <input
        v-model="username"
        id="username-reg"
        type="text"
        required
        class="alt-authentication__input" />
      <div class="alt-authentication__pseudo-ph">Нікнейм</div>
    </div>
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
      class="alt-authentication__button button button_lg button_primary"
      type="submit">
      <UserPlusIcon class="base-icon" />
      Реєстрація
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { UserPlusIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const props = defineProps({
  randomSeed: {
    type: Number,
    required: true,
  },
});

const router = useRouter();

const email = ref("");
const password = ref("");
const username = ref("");
const errMessage = ref("");

const usersCollection = collection(db, "users");

async function register() {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value);
    // await updateProfile(user, {
    //   displayName: `${username.value}`,
    //   photoURL: `https://api.dicebear.com/6.x/adventurer/svg?seed=${props.randomSeed}`,
    // });
    console.log(user);
    await setDoc(doc(usersCollection, user.uid), {
      URL: `https://api.dicebear.com/6.x/adventurer/svg?seed=${props.randomSeed}`,
      email: email.value,
      password: password.value,
      username: username.value,
      info: "info text about me",
      id: user.uid,
    });

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

// onMounted(() => {
//   onAuthStateChanged(auth, user => {
//     if (user) {
//     } else {
//       console.log("error!!!!");
//     }
//   });
// });

/*
  registration
*/
</script>

<style lang="scss">
.error-message {
  font-size: 14px;
  margin: em(15, 14) 0;
  font-weight: 500;
  color: var(--color-danger);
}
</style>
