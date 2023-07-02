<template>
  <header class="header">
    <a
      href="#"
      class="header__logo"
      >Conquer Chat</a
    >
    <div class="header__info">
      <div class="header__avatar">
        <img
          :src="currentUser.URL"
          alt=""
          class="header__avatar-image" />
      </div>
      <button
        @click="handleSignOut"
        class="header__button button button_md button_secondary">
        Вийти
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { auth, db } from "@/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { onSnapshot, collection } from "firebase/firestore";

const usersRef = collection(db, "users");

const currentUser = ref({});

const router = useRouter();
function handleSignOut() {
  signOut(auth)
    .then(() => {
      console.log("ok");
      router.push("/signin");
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
      // An error happened.
    });
}

onAuthStateChanged(auth, user => {
  onSnapshot(usersRef, docs => {
    docs.forEach(doc => {
      if (doc.id === user.uid) {
        currentUser.value = doc.data();
      }
    });
  });
});
</script>
<style lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 10px 20px;
  background-color: var(--bg-interface-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__logo {
    font-weight: bold;
    font-size: 26px;
    color: var(--primary-light-color);
  }
  &__info {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
  &__avatar-image {
    width: 100%;
    height: 100%;
    display: block;
  }
  &__username {
    font-size: 16px;
    color: var(--color-text-primary);
    font-weight: bold;
  }
  &__settings {
  }
  &__button {
  }
}
</style>
