<template>
  <div class="authentication">
    <div class="authentication__body">
      <h1 class="authentication__title">
        <ChatBubbleBottomCenterTextIcon class="authentication__title-icon base-icon" />
        Conquer Chat
      </h1>
      <div class="authentication__captions">
        <RouterLink
          to="/register"
          class="authentication__caption button button_md button_primary">
          Реєстрація
        </RouterLink>
        <RouterLink
          to="/signin"
          class="authentication__caption button button_md button_primary">
          Вхід
        </RouterLink>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/vue/24/outline";


</script>

<style lang="scss">
.authentication {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  &__body {
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: var(--bg-secondary);
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    box-shadow: rgba(143, 143, 143, 0.2) 0px 8px 15px;
  }
  &__title {
    font-size: 40px;
    font-weight: bold;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: em(25, 40);
  }
  &__title-icon {
    width: 30px;
    height: 30px;
  }
  &__captions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  &__caption {
    &.router-link-active {
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.6) 0px 6px 6px;
    }
  }
}
.base-icon {
}
</style>
