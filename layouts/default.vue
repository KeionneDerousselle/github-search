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
      <div class="github-search-container">
        <Nuxt />
      </div>
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
  @apply bg-indigo-900 overflow-hidden;
}

.github-search-app {
  @apply w-full flex flex-col h-screen;
}

.github-search-header {
  @apply flex-none;
}

.github-search-content {
  @apply w-full p-4 flex-1 min-h-0 h-full;
  @apply md:p-6;
}

.github-search-container {
  @apply flex flex-col;
  @apply -mt-52;
  @apply md:-mt-64;

  height: calc(100% + 13rem);

  @media (min-width: 768px) {
    height: calc(100% + 16rem);
  }
}

.github-search-footer {
  @apply flex-none;
}
</style>
