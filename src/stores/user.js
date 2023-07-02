import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const currentUser = ref({});
  const saveUser = user => {
    currentUser.value = user;
  };
  return {
    currentUser,
    saveUser,
  };
});
