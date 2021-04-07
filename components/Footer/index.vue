<template>
  <footer
    v-bind="$attrs"
    class="footer">
    <div class="container">
      <div class="footer__content">
        <p>
          Created with
          <heart-icon class="w-5 h-5 inline-flex fill-current text-pink-500" />
          by <a
            id="footer-dev-link"
            href="https://www.keionne.com"
            class="footer__link"
            target="_blank"
            rel="noopener">
            Keionne Derousselle<span class="sr-only">Opens the developer's website in a new window.</span>
          </a>. Take a look at the code
          <a
            id="footer-repo-link"
            href="https://www.github.com/KeionneDerousselle/github-search"
            class="footer__link"
            target="_blank"
            rel="noopener">
            here<span class="sr-only">Opens the source code repository for this website in a new window.</span>
          </a>.
        </p>
      </div>
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
  @apply border-indigo-500;

  &__content {
    @apply border-t border-indigo-100 py-8 text-sm text-indigo-100 text-center;
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
