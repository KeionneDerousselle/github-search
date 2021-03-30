<template>
  <div class="app">
    <kd-github-search-header
      id="kd-github-search-header"
      class="github-search-header">
      <template #headerTop>
        <slot name="headerTop" />
      </template>

      <template #headerBottom>
        <slot name="headerBottom" />
      </template>
    </kd-github-search-header>

    <main class="content">
      <div class="container h-full">
        <h1 class="sr-only">
          {{ pageTitle }}
        </h1>

        <div class="flex h-full">
          <div class="content__left">
            <section
              class="h-full"
              aria-labelledby="content-left-title">
              <h2
                id="content-left-title"
                class="sr-only">
                {{ leftSectionTitle }}
              </h2>

              <div class="h-full flex flex-col">
                <slot name="leftSectionContent" />
              </div>
            </section>
          </div>

          <div class="content__right">
            <section
              class="h-full"
              aria-labelledby="content-right-title">
              <h2
                id="content-right-title"
                class="sr-only">
                {{ rightSectionTitle }}
              </h2>

              <div class="content__panel p-4">
                <slot name="rightSectionContent" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <kd-github-search-footer
      id="kd-github-search-footer"
      class="github-search-footer" />
    </kd-github-search-header>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    'kd-github-search-footer': Footer,
    'kd-github-search-header': Header
  },

  props: {
    pageTitle: {
      type: String,
      default: ''
    },

    leftSectionTitle: {
      type: String,
      default: ''
    },

    rightSectionTitle: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.app {
  @apply min-h-screen h-screen bg-indigo-900;
}

.container {
  @apply max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8;
}

.content {
  @apply -mt-24 pb-8;

  height: calc(100% - 12rem);

  @media (min-width: 768px) {
    height: calc(100% - 10rem);
  }

  @media (min-width: 1024px) {
    height: calc(100% - 12.5rem);
  }

  &__left {
    @apply md:max-w-xs w-full h-full;
  }

  &__right {
    @apply hidden flex-1 flex-col ml-4 lg:ml-8 md:flex h-full;
  }

  &__panel {
    @apply rounded-lg shadow-lg bg-white h-full;
  }
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 50;
  overflow: auto;
  background-color: white;
}
</style>
