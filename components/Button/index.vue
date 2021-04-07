<template>
  <button
    v-bind="$attrs"
    :class="['button', { 'button--loading': loading }]"
    v-on="$listeners">
    <div class="button__content">
      <span
        v-if="$slots.left"
        class="button__content--left">
        <span
          v-if="!$slots.right && loading"
          class="button__spinner" />
        <slot
          v-else
          name="left" />
      </span>

      <span class="button__content--center">
        <slot />
      </span>

      <span
        v-if="($slots.right || (!$slots.left && loading))"
        class="button__content--right">
        <span
          v-if="loading"
          class="button__spinner" />
        <slot
          v-else
          name="right" />
      </span>
    </div>
  </button>
</template>
<script>
export default {
  name: 'Button',

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.button {
  @apply appearance-none flex items-center justify-center align-middle rounded-md;
  @apply cursor-pointer no-underline select-none;
  @apply p-2 m-0;
  @apply font-bold text-center leading-5 sm:text-sm;
  @apply border border-gray-400 bg-gray-100;

  color: inherit;
  font-family: inherit;
  transition: all 0.3s ease-out;

  &__content {
    @apply mr-0 ml-0;

    color: inherit;
    transition: margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &__content,
  &__content--center,
  &__content--left,
  &__content--right {
    @apply flex items-center justify-center;
  }

  &__content--left,
  &__content--right {
    @apply text-sm font-normal;
  }

  &__content--left {
    @apply mr-2;
  }

  &__content--right {
    @apply ml-2;
  }

  &__spinner {
    @apply hidden w-5 h-5 bg-transparent border-solid border-2 border-r-0 rounded-full text-center normal-case sm:text-sm not-italic font-normal border-gray-600;

    color: inherit;
    transition: all 0.3s ease-in-out;
  }

  &:active,
  &:focus {
    @apply outline-none;
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  &--loading {
    .button__spinner {
      @apply inline-block;

      animation: spin 1s infinite;
    }
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    /* transform: translateY(-3px); */
  }

  &:active:not(:disabled) {
    transform: translateY(3px);
  }

  &:disabled {
    @apply cursor-not-allowed opacity-70;
  }
}
</style>
