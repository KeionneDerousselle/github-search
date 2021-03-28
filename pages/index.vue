<template>
  <div class="search-page">
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
      <div class="pagination">
        TEST
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

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    CheckIcon,
    FormValidator,
    Searchfield,
    UserListItem,
    'kd-github-search-button': Button
  },

  data: () => ({
    searchTerm: '',
    performingSearch: false,
    maxScrollPosition: 0,
    fetchingTheNextPage: false
  }),

  computed: {
    ...mapGetters('users', [ 'results', 'currentSearchTerm' ])
  },

  mounted() {
    this.addScrollListener(this.$refs.results)
  },

  beforeDestroy() {
    this.removeScrollListener(this.$refs.results)
  },

  methods: {
    ...mapActions('users', [ 'setSearchTerm', 'search', 'next' ]),

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
        // {
        //   shouldApply: () => this.disabled,
        //   classes: [
        //     'bg-black-10',
        //     'border-black-20',
        //     'text-black-40',
        //     'placeholder:text-black-30'
        //   ]
        // },
        // {
        //   shouldApply: () => anyErrors,
        //   classes: [
        //     'text-error-400',
        //     'border-error-200',
        //     'placeholder:text-error-400',
        //     'hover:border-error-400',
        //     'hover:placeholder:text-error-400',
        //     'focus:border-error-500',
        //     'focus:placeholder:text-error-500'
        //   ]
        // },

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

        return this.setSearchTerm(this.searchTerm).then(() => this.search()
          .catch(console.error)
          .finally(() => {
            this.performingSearch = false
          }))
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

    handleScrollHelper(el) {
      // when height of content under the view window (the bottom of the scroll: (this.$refs.results.scrollHeight - this.$refs.results.scrollTop))
      // is less than 1.5 pages: (this.$refs.results.offsetHeight * 1.5)
      if ((el.scrollHeight - el.scrollTop) < (el.offsetHeight * 1.5)) {
        // if the bottom of the content is not the same as the max position we've scrolled to
        if ((el.scrollHeight !== this.maxScrollPosition) && !this.fetchingTheNextPage) {
          this.fetchingTheNextPage = true

          return this.next().then(() => {
            // set the maxium scrolled position to the bottom of the newly drawn content (containing all items)
            this.maxScrollPosition = el.scrollHeight
          }).finally(() => {
            this.fetchingTheNextPage = false
          })
        }
      }
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

.pagination {
  @apply flex-none;
}
</style>
