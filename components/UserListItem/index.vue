<template>
  <li
    v-bind="$attrs"
    class="user-list-item"
    v-on="$listeners">
    <img
      :src="user.avatar_url"
      :alt="`Profile picture for ${user.login}`"
      class="user-list-item__avatar">
    <div class="user-list-item__details">
      <span class="user-list-item__details__name">Test</span>
      <span class="user-list-item__details__login">{{ user.login }}</span>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
.user-list-item {
  @apply list-none flex items-center pt-4 pb-4 pl-6 pr-6;

  &:not(:last-of-type) {
    @apply border-b border-gray-300;
  }

  &:hover {
    @apply bg-indigo-50;
  }

  &__avatar {
    @apply rounded-full w-10 h-10 mr-2.5;
  }

  &__details {
    &__name {
      @apply text-lg text-gray-800 block;
    }

    &__login {
      @apply text-sm text-gray-600 block;
    }
  }
}
</style>
