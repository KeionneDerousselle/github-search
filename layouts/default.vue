<template>
  <div
    id="kd-github-search-app"
    class="github-search-app">
    <kd-github-search-header
      id="kd-github-search-header"
      class="github-search-header" />

    <main
      id="kd-github-search-content"
      class="github-search-content">
      <Nuxt />
    </main>

    <kd-github-search-footer
      id="kd-github-search-footer"
      class="github-search-footer" />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default {
  components: {
    'kd-github-search-footer': Footer,
    'kd-github-search-header': Header
  }
}
</script>

<style lang="scss">
body {
  @apply bg-gray-100;
}

.github-search-app {
  @apply relative w-full flex flex-col h-screen;
}

.github-search-content {
  flex: 1 0 auto;

  @apply w-full p-6;
}

.github-search-footer {
  @apply flex-shrink-0 pb-6 pl-6 pr-6 w-full;
}
</style>
