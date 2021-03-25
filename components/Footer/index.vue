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
          class="footer__link">Keionne Derousselle</a>.
      </span>
      <span>
        Take a look at the code
        <a
          id="footer-repo-link"
          href="https://www.github.com/KeionneDerousselle/github-search"
          class="footer__link">here</a>!
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
    @apply text-base border-t-2 border-gray-200 pt-6;
  }

  .footer__link {
    @apply text-indigo-600 hover:text-indigo-900 border-b border-transparent hover:border-indigo-900;
  }
}
</style>
