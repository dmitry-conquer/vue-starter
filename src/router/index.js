import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AuthenticationView from "@/views/AuthenticationView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import SignInView from "@/views/SignInView.vue";
import ChatMessagesView from "@/views/ChatMessagesView.vue";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomeView,
      children: [
        {
          name: "Room",
          path: "/room/:id",
          component: ChatMessagesView,
        },
      ],
    },
    {
      name: "AuthenticationView",
      path: "/authentication",
      component: AuthenticationView,
      children: [
        {
          name: "Registration",
          path: "/register",
          component: RegistrationView,
        },
        {
          name: "SignIn",
          path: "/signin",
          component: SignInView,
        },
      ],
    },
  ],
});

export default router;

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        resolve(user);
        unsubscribe();
      },
      error => {
        reject(error);
      },
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();

  if (!user && to.name === "Home") {
    console.log("User not logged in");
    next({ name: "SignIn" });
  } else {
    next();
  }
});
