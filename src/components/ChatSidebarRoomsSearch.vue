<template>
  <div class="search-room">
    <form
      @submit.prevent=""
      class="search-room__form">
      <input
        :value="search"
        @input="emit('update:search', $event.target.value)"
        required
        type="text"
        class="search-room__input" />
      <span class="search-room__pseudo-ph">Пошук</span>
    </form>
  </div>
</template>

<script setup>
defineProps({
  search: {
    type: String,
    required: false,
  },
});

const emit = defineEmits({
  "update:search": value => typeof value === "string",
});
</script>

<style lang="scss">
.search-room {
  margin-bottom: 20px;

  &__form {
    position: relative;
    display: flex;
    align-items: center;
  }
  &__pseudo-ph {
    pointer-events: none;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted-color);
    font-size: 14px;
    transition: all 0.3s ease;
    padding: 4px;
    background-color: var(--bg-interface-color);
  }
  &__input {
    border: 1px solid var(--message-self-color);
    border-radius: 8px;
    width: 100%;
    height: 100%;
    padding: 8px;
    &:focus {
      border: 1px solid var(--message-self-color);
    }
    &:focus + span,
    &:valid:required + span {
      font-size: 11px;
      top: 0;
      left: 18px;
    }
  }
}
</style>
