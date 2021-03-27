<template>
  <div
    id="kd-github-search-app"
    class="github-search-app">
    <div class="github-search-container">
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
  @apply bg-gray-100 overflow-hidden;
}

.github-search-app {
  @apply w-full flex flex-col h-screen absolute;

  top: 0;
  left: 0;
  bottom: 0;
}

.github-search-container {
  @apply flex flex-col min-h-0 flex-grow;
}

.github-search-header {
  @apply flex-none;
}

.github-search-content {
  @apply w-full p-6 flex-1 overflow-y-auto;

  margin-top: -15rem;
}

.github-search-footer {
  @apply flex-none pb-6 pl-6 pr-6 w-full;
}
</style>
