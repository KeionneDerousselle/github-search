<template>
  <footer
    v-bind="$attrs"
    class="footer">
    <div class="footer__content">
      <span>
        Created with
        <heart-icon class="w-4 inline-flex fill-current text-pink-900" />
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
  .footer__content {
    @apply border-t-2 border-gray-200;
    @apply text-xs pt-2;
    @apply md:text-sm md:pt-2;
    @apply lg:text-base lg:pt-6;
  }

  .footer__link {
    @apply text-indigo-600 border-b border-transparent cursor-pointer;
    @apply hover:text-indigo-900 hover:border-indigo-900;
    @apply focus:text-indigo-900 focus:border-indigo-900 outline-none;
  }
}
</style>
