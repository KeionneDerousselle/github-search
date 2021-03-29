<template>
  <div class="search-page">
    <div
      v-show="numberOfResults"
      class="results__count text-indigo-100 flex items-center justify-center flex-none mb-6 text-lg">
      <p>
        We found <counter :number="numberOfResults" /> users!
      </p>
    </div>

    <form-validator
      class="search__form"
      @submit="handleSearchSubmitted">
      <template #default="{ invalid }">
        <searchfield
          id="search-box"
          v-model="searchTerm"
          class="search__box"
          placeholder="Search"
          rules="required"
          label="Search Term"
          name="Search Term"
          vee-validate-name="A search term"
          mode="aggressive"
          immediate
          :show-errors="false"
          :calc-input-classes="getSearchInputClasses"
          :calc-container-classes="getSearchInputContainerClasses" />

        <kd-github-search-button
          id="search-button"
          class="search__button"
          type="submit"
          :disabled="invalid || performingSearch"
          :loading="performingSearch">
          <span class="sr-only">Submit</span>
          <check-icon
            v-show="!performingSearch"
            class="search__button__icon"
            aria-hidden="true" />
        </kd-github-search-button>
      </template>
    </form-validator>

    <div
      id="results-box"
      class="results-box">
      <div
        id="results"
        ref="results"
        class="results">
        <ul
          v-for="result in results"
          :id="`page-${result.page}`"
          :key="result.id">
          <user-list-item
            v-for="user in result.users"
            :id="`search-result-${user.id}`"
            :key="user.id"
            :user="user"
            class="search__result" />
        </ul>
      </div>
      <div
        v-show="numberOfResults"
        class="results-toolbar">
        <pagination
          id="results-pagination"
          class="results__pagination"
          :total-items="numberOfResults"
          :items-per-page="resultsPerPage"
          :current-page="currentPage"
          @change="handlePageChanged" />
      </div>
    </div>
  </div>
</template>

<script>
import CheckIcon from '@/components/Icons/Check'
import Button from '@/components/Button'
import FormValidator from '@/components/FormValidator'
import Searchfield from '@/components/Searchfield'
import UserListItem from '@/components/UserListItem'
import Pagination from '@/components/Pagination'
import Counter from '@/components/Counter'

import { mapActions, mapGetters } from 'vuex'

import VueScrollTo from 'vue-scrollto'

export default {
  components: {
    CheckIcon,
    FormValidator,
    Searchfield,
    UserListItem,
    Pagination,
    Counter,
    'kd-github-search-button': Button
  },

  data: () => ({
    searchTerm: '',
    performingSearch: false,
    maxScrollPosition: 0,
    fetchingTheNextPage: false,
    currentScrollCancellation: null
  }),

  computed: {
    ...mapGetters('users', [
      'results',
      'currentSearchTerm',
      'numberOfResults',
      'resultsPerPage',
      'currentPage'
    ])
  },

  mounted() {
    this.addScrollListener(this.$refs.results)
  },

  beforeDestroy() {
    this.removeScrollListener(this.$refs.results)
  },

  methods: {
    ...mapActions('users', [
      'setSearchTerm',
      'search',
      'setPage'
    ]),

    getSearchInputContainerClasses(errors, isFocused) {
      const classStrats = [
        {
          shouldApply: () => isFocused,
          classes: [ 'search__container', 'search__container--focused' ]
        },
        {
          shouldApply: () => true,
          classes: ['search__container']
        }
      ]

      return classStrats.find(cs => cs.shouldApply()).classes
    },

    getSearchInputClasses(errors, isFocused) {
      // const anyErrors = errors && errors.length > 0

      const classStrats = [
        {
          shouldApply: () => true,
          classes: ['search__input']
        }
      ]

      return classStrats.find(cs => cs.shouldApply()).classes
    },

    handleSearchSubmitted() {
      // TODO: Loading State
      // TODO: Handle Errors

      if (this.searchTerm && (this.searchTerm.toLowerCase() !== this.currentSearchTerm.toLowerCase())) {
        this.performingSearch = true

        return this.search({ searchTerm: this.searchTerm, page: 1, resultsPerPage: this.resultsPerPage })
          .then(() => this.setSearchTerm(this.searchTerm))
          .catch(console.error)
          .finally(() => {
            this.performingSearch = false
          })
      }
    },

    handleResultsScrolled() {
      this.handleScrollHelper(this.$refs.results)
    },

    addScrollListener(el) {
      el.addEventListener('scroll', this.handleResultsScrolled)
    },

    removeScrollListener(el) {
      el.removeEventListener('scroll', this.handleResultsScrolled)
    },

    async handleScrollHelper(el) {
      // when height of content under the view window (the bottom of the scroll: (this.$refs.results.scrollHeight - this.$refs.results.scrollTop))
      // is less than 1.5 pages: (this.$refs.results.offsetHeight * 1.5)
      if ((el.scrollHeight - el.scrollTop) < (el.offsetHeight * 1.5)) {
        // if the bottom of the content is not the same as the max position we've scrolled to
        if ((el.scrollHeight >= this.maxScrollPosition) && !this.fetchingTheNextPage) {
          this.fetchingTheNextPage = true
          this.setMaxScollHeight(el)

          await this.search({
            searchTerm: this.searchTerm,
            page: this.currentPage + 1,
            resultsPerPage: this.resultsPerPage
          }).finally(() => {
            this.fetchingTheNextPage = false
          })
        }
      }

      this.updateScrolledPage(el)
    },

    setMaxScollHeight(el) {
      this.maxScrollPosition = el.scrollHeight
    },

    updateScrolledPage(el) {
      const calculatedPage = this.calculateScrolledToPage(el)

      if (calculatedPage !== this.currentPage) {
        return this.setPage(calculatedPage)
      }
    },

    calculateScrolledToPage(el) {
      const children = el.children
      let previousMax = 0
      let currentMax = 0
      const scrollTop = el.scrollTop

      // for every ul.page el in #results
      for (let i = 0; i < children.length; i++) {
        // console.log('hi')
        // get the height of that page
        currentMax += children[i].clientHeight
        // if the scroll position is between the start of the page and the end of the page, return that we are on that page
        if (scrollTop >= previousMax && scrollTop <= currentMax) return i + 1
        // else, add the height of this page to the height of all the pages we've already checked, (reset the start looking position)
        previousMax = currentMax
      }
    },

    handlePageChanged(page) {
      const pageId = `#page-${page}`

      if (!this.currentScrollCancellation) {
        if (document.getElementById(pageId)) {
          return this.setPage(page)
            .then(() => {
              this.currentScrollCancellation = this.scrollToPage(pageId)
            }).finally(() => {
              this.currentScrollCancellation = null
            })
        } else {
          this.fetchingTheNextPage = true

          return this.search({ searchTerm: this.searchTerm, page, resultsPerPage: this.resultsPerPage })
            .then(() => {
              this.setMaxScollHeight(this.$refs.results)
              this.currentScrollCancellation = this.scrollToPage(pageId)
            }).finally(() => {
              this.currentScrollCancellation = null
              this.fetchingTheNextPage = false
            })
        }
      }
    },

    scrollToPage(pageId) {
      return VueScrollTo.scrollTo(pageId, 500, {
        container: '#results',
        easing: 'ease-in',
        lazy: false,
        offset: 0,
        force: true,
        cancelable: true,
        x: false,
        y: true
      })
    }
  }
}
</script>

<style lang="scss">
.search-page {
  @apply max-w-md flex flex-col h-full;
}

.search__form {
  @apply flex items-start justify-between flex-none;
}

.search__box {
  @apply flex-grow w-11/12;
  @apply mr-3;
  @apply md:mr-4;
}

.search__container {
  @apply shadow-lg bg-indigo-500 text-white;

  &--focused {
    @apply ring-4 ring-indigo-400;
  }
}

.search__input {
  @apply placeholder-indigo-50 text-sm md:text-base;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active,
  &:-internal-autofill-selected {
    @apply bg-indigo-500 text-white;

    -webkit-text-fill-color: white;
    caret-color: white;
  }
}

.search__button {
  @apply shadow-lg border-0 bg-indigo-200 flex-none text-indigo-800 h-full;

  &:hover:not(:disabled) {
    @apply bg-indigo-300 shadow-2xl;
  }

  &:focus:not(:active) {
    @apply shadow-2xl ring-indigo-400 ring-4;
  }

  &:disabled {
    @apply bg-gray-300;
  }

  &:disabled .search__button__icon {
    @apply text-gray-600;
  }

  &__icon {
    @apply font-bold w-4 h-4;
  }
}

.results-box {
  @apply shadow-lg bg-white rounded-lg mt-6 flex flex-1 flex-col h-full overflow-hidden;
}

.results {
  @apply flex-1 overflow-y-auto h-full;
}

.results-toolbar {
  @apply flex-none bg-indigo-500 p-4 text-white text-sm md:text-base flex justify-center items-center;

  transition: all 0.3s ease-in;
}
</style>
