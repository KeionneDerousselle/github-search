<template>
  <header
    class="header"
    v-bind="$attrs">
    <div class="header__content">
      <h1 class="header__title">
        <span
          class="header__icons"
          aria-hidden="true">
          <user-group-icon class="header__icon header__icon--users" />
        </span>

        <span>
          Github User Search
        </span>
      </h1>
    </div>
  </header>
</template>

<script>
import UserGroupIcon from '@/components/Icons/UserGroup'

export default {
  components: {
    UserGroupIcon
  }
}
</script>

<style lang="scss">
.header {
  @apply w-full bg-indigo-600 p-6;
  @apply h-72;
  @apply md:h-96;

  &__content {
    @apply border-b-2 border-indigo-500;
  }

  &__title {
    @apply text-indigo-100 mb-4 flex items-center font-bold;
    @apply text-lg;
    @apply lg:mb-6;
    @apply lg:text-xl;
    @apply xl:text-2xl;
  }

  &__icons {
    @apply mr-2.5 border-2 border-indigo-100 p-2 rounded-full flex items-center justify-center;
  }

  &__icon {
    @apply inline-flex;
  }

  &__icon--users {
    @apply w-6 h-6 text-indigo-100;
  }
}
</style>
