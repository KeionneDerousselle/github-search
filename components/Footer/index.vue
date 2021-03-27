<template>
  <footer
    v-bind="$attrs"
    class="footer">
    <div class="footer__content">
      <span>
        Created with
        <heart-icon class="w-5 h-5 inline-flex fill-current text-pink-500" />
        by <a
          id="footer-dev-link"
          href="https://www.keionne.com"
          class="footer__link"
          target="_blank">
          Keionne Derousselle<span class="sr-only">Opens the developer's website in a new window.</span>.
        </a>
      </span>
      <span>
        Take a look at the code
        <a
          id="footer-repo-link"
          href="https://www.github.com/KeionneDerousselle/github-search"
          class="footer__link"
          target="_blank">
          here<span class="sr-only">Opens the source code repository for this website in a new window.</span>.
        </a>
      </span>
    </div>
  </footer>
</template>
<script>
import HeartIcon from '@/components/Icons/Heart'

export default {
  components: {
    HeartIcon
  }
}
</script>
<style lang="scss">
.footer {
  @apply pb-6 pl-6 pr-6 w-full;

  .footer__content {
    @apply border-t-2 border-indigo-500 text-indigo-100;
    @apply text-sm pt-4;
    @apply md:text-base;
    @apply lg:text-lg lg:pt-6;
  }

  .footer__link {
    @apply text-white border-b border-white cursor-pointer font-bold;

    &:hover,
    &:focus {
      @apply border-pink-500 outline-none;
    }
  }
}
</style>
