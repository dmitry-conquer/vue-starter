<template>
  <aside class="sidebar">
    <div class="sidebar__categories categories">
      <button
        v-for="category in categories"
        :key="category.name"
        @click="currentCategory = category.name"
        :class="{ active: category.name === currentCategory }"
        class="categories__item"
        type="button">
        <component
          :is="category.icon"
          class="categories__item-icon base-icon" />
      </button>
    </div>
    <div class="sidebar__section">
      <ChatSidebarRooms v-if="currentCategory === 'rooms'" />
      <ChatSidebarUsers v-if="currentCategory === 'users'" />
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import ChatSidebarUsers from "@/components/ChatSidebarUsers.vue";
import ChatSidebarRooms from "@/components/ChatSidebarRooms.vue";
import { UsersIcon, ChatBubbleLeftRightIcon } from "@heroicons/vue/24/outline";

const currentCategory = ref("rooms");

const categories = [
  {
    name: "rooms",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "users",
    icon: UsersIcon,
  },
];
</script>

<style lang="scss">
.sidebar {
  padding: 15px 0;
  display: grid;
  align-items: start;
  grid-template-columns: 65px 1fr;
  border-right: 1px solid var(--dark-border);
  background-color: var(--bg-interface-color);
  &__section {
    position: sticky;
    top: 90px;
    padding: 0 15px;
  }
}

.categories {
  position: sticky;
  top: 90px;
  border-right: 1px solid var(--dark-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: var(--bg-interface-light-color);
    padding: 10px;
    &.active {
      background-color: var(--primary-light-color);
    }
  }
  &__item-icon {
    color: var(--text-color);
  }
}
</style>
