<template>
  <nav aria-label="Search results navigation">
    <ul class="pagination">
      <li class="page__item page__item--previous">
        <a
          href="#"
          :class="['page__link', {'page__link--disabled': firstPageIsActive}]"
          :disabled="firstPageIsActive"
          @click="handlePreviousClicked">
          <chevron-left-icon
            aria-hidden="true"
            class="page__link__icon" />

          <span class="sr-only">Navigate to Previous Page</span>
        </a>
      </li>

      <li
        v-for="page in pages"
        :key="page.label"
        :class="['page__item', 'page__item--page', `page__item--${page.label}`]"
        :aria-label="`Navigate to page number ${page.label}`">
        <a
          href="#"
          :class="['page__link', `page__link--${page.label}`, {'page__link--active': page.active} ]"
          :disabled="page.active"
          @click="handlePageClicked(page)">
          {{ page.label }}
        </a>
      </li>

      <li class="page__item page__item--next">
        <a
          href="#"
          :class="['page__link', {'page__link--disabled': lastPageIsActive }]"
          :disabled="lastPageIsActive"
          @click="handleNextClicked">
          <chevron-right-icon
            aria-hidden="true"
            class="page__link__icon" />

          <span class="sr-only">Navigate to Next Page</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import ChevronLeftIcon from '@/components/Icons/ChevronLeft'
import ChevronRightIcon from '@/components/Icons/ChevronRight'

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },

  props: {
    currentPage: {
      type: Number,
      default: 1
    },

    itemsPerPage: {
      type: Number,
      required: true
    },

    totalItems: {
      type: Number,
      required: true
    },

    maxVisibilePages: {
      type: Number,
      default: 3
    }
  },

  computed: {
    firstVisiblePage() {
      if (this.currentPage === 1) {
        return 1
      } else if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibilePages + 1
      } else {
        return this.currentPage - 1
      }
    },

    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },

    lastVisiblePage() {
      return Math.min(this.firstVisiblePage + this.maxVisibilePages - 1, this.totalPages)
    },

    pages() {
      const currentPages = []

      for (let i = this.firstVisiblePage; i <= this.lastVisiblePage; i++) {
        currentPages.push({
          label: i,
          active: i === this.currentPage
        })
      }

      return currentPages
    },

    firstPageIsActive() {
      return this.currentPage === 1
    },

    lastPageIsActive() {
      return this.currentPage === this.totalPages
    }
  },

  methods: {
    handlePageClicked(page) {
      if (!page.active) {
        this.$emit('change', page.label)
      }
    },

    handleNextClicked() {
      if (this.currentPage < this.totalPages) {
        this.$emit('change', this.currentPage + 1)
      }
    },

    handlePreviousClicked() {
      if (this.currentPage > 1) {
        this.$emit('change', this.currentPage - 1)
      }
    }
  }
}
</script>
<style lang="scss">
.pagination {
  @apply flex w-full h-full clear-both;

  .page__item {
    &--page:not(:last-of-type) {
      @apply ml-2;
    }

    &--previous {
      @apply mr-6;
    }

    &--next {
      @apply ml-6;
    }
  }

  .page__link {
    @apply rounded-full border border-transparent inline-flex w-10 h-10 flex items-center justify-center text-sm md:text-base;

    transition: all 0.3s ease-in;

    &:hover:not(.page__link--disabled),
    &:focus:not(.page__link--disabled) {
      @apply border-indigo-100;
    }

    &__icon {
      @apply text-indigo-100 w-4 h-4;
    }

    &--active {
      @apply bg-indigo-200 text-indigo-900;
    }

    &--disabled {
      @apply cursor-not-allowed bg-gray-300 bg-opacity-60;

      .page__link__icon {
        @apply text-gray-600 w-4 h-4;
      }
    }
  }
}
</style>
