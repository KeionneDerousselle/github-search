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

    <a
      :href="user.html_url"
      target="_blank"
      class="user-list-item__link">
      <link-icon
        class="user-list-item__link__icon"
        aria-hidden="true" />
      <span class="sr-only"> Opens link to {{ user.login }}'s GitHub Account in a new window.</span>
    </a>
  </li>
</template>
<script>
import LinkIcon from '@/components/Icons/Link'

export default {
  components: {
    LinkIcon
  },

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
  @apply list-none flex items-center pt-4 pb-4 pl-6 pr-6 w-full;

  &:not(:last-of-type) {
    @apply border-b border-gray-300;
  }

  &:hover {
    @apply bg-indigo-50;
  }

  &__link {
    @apply ml-auto;
  }

  &__link__icon {
    @apply w-5 h-5 text-indigo-500;
  }

  &__avatar {
    @apply inline-flex rounded-full w-10 h-10 mr-2.5;
  }

  &__details {
    @apply inline-flex flex-col;

    &__name {
      @apply text-lg text-gray-800 block;
    }

    &__login {
      @apply text-sm text-gray-600 block;
    }
  }
}
</style>
