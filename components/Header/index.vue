<template>
  <header
    class="header"
    v-bind="$attrs">
    <div class="container">
      <div class="header__top">
        <span
          class="header__logo"
          aria-hidden="true">
          <user-group-icon class="header__icon header__icon--users" />
        </span>

        <div class="header__top__content">
          <slot name="headerTop" />
        </div>
      </div>

      <div class="header__bottom">
        <slot name="headerBottom" />
      </div>
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
  @apply bg-indigo-600 pb-24 w-full;

  &__top {
    @apply w-full py-5 flex items-center;
  }

  &__top__content {
    @apply flex flex-1 items-center justify-center clear-both;
  }

  &__bottom {
    @apply hidden lg:block border-t border-indigo-100 border-opacity-20 py-5;
  }

  &__logo {
    @apply flex-shrink-0 border-indigo-100 flex items-center justify-center mr-3 md:mr-0;
  }

  &__icon {
    @apply h-6 md:h-8 w-auto text-indigo-100;
  }
}
</style>
