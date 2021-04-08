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
        <h1
          id="main-content-title"
          class="sr-only">
          {{ pageTitle }}
        </h1>

        <div class="flex h-full">
          <div class="content__left">
            <section
              id="left-section"
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

          <div
            v-if="!$isMobile"
            class="content__right">
            <section
              id="right-section"
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

        <transition-group
          :name="drawerTransition.name"
          :mode="drawerTransition.mode"
          :appear="drawerTransition.appear"
          tag="div">
          <div
            v-if="$slots.drawer && $isMobile && displayDrawer"
            :key="drawerTransition.key"
            :style="$vh100"
            class="drawer">
            <slot name="drawer" />
          </div>
        </transition-group>
      </div>
    </main>

    <kd-github-search-footer
      id="kd-github-search-footer"
      class="github-search-footer" />
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
    },

    showDrawer: {
      type: Boolean,
      default: null
    }
  },

  data: ({ showDrawer }) => ({
    displayDrawer: showDrawer,
    drawerTransition: {
      key: false,
      name: '',
      mode: '',
      appear: false
    }
  }),

  watch: {
    showDrawer(newValue) {
      if (newValue) {
        this.openDrawer()
      } else {
        this.closeDrawer()
      }
    }
  },

  methods: {
    openDrawer() {
      this.displayDrawer = true
      this.drawerTransition = {
        key: true,
        name: 'slide-in',
        mode: 'in-out'
      }
    },

    closeDrawer() {
      this.displayDrawer = false
      this.drawerTransition = {
        key: false,
        name: 'slide-in',
        mode: 'out-in'
      }
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

  height: calc(100% - 11.5rem);

  @media (min-width: 768px) {
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
  @apply fixed top-0 left-0 bottom-0 h-full w-full overflow-auto bg-white z-50 block md:hidden;

  &.slide-in-enter-active,
  &.slide-in-leave-active {
    transition: all 0.3s;
  }

  &.slide-in-enter,
  &.slide-in-leave-to {
    transform: translateX(100%);
  }
}
</style>
