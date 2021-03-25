<template>
  <div
    id="kd-github-search-app"
    class="github-search-app">
    <header />
    <main
      id="kd-github-search-content"
      class="github-search-content">
      <Nuxt />
    </main>
    <footer
      id="kd-github-search-footer"
      class="github-search-footer" />
  </div>
</template>

<style lang="scss">
.github-search-app {
  @apply relative w-full flex flex-col;
}

.github-search-content {
  flex: 1 0 auto;

  @apply w-full;
}

.github-search-footer {
  @apply flex-shrink-0;
}
</style>
