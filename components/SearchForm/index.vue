<template>
  <form-validator
    class="search__form"
    @submit="handleSearchSubmitted">
    <template #default="{ invalid }">
      <div class="search__form__container">
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
      </div>
    </template>
  </form-validator>
</template>
<script>
import CheckIcon from '@/components/Icons/Check'
import Button from '@/components/Button'
import FormValidator from '@/components/FormValidator'
import Searchfield from '@/components/Searchfield'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    CheckIcon,
    FormValidator,
    Searchfield,
    'kd-github-search-button': Button
  },

  data: () => ({
    searchTerm: '',
    performingSearch: false,
    fetchingTheNextPage: false
  }),

  computed: {
    ...mapGetters('users', [
      'currentSearchTerm',
      'resultsPerPage'
    ])
  },

  methods: {
    ...mapActions('users', [
      'setSearchTerm',
      'search'
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
    }
  }
}
</script>
<style lang="scss">
.search__form__container {
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
  @apply placeholder-indigo-50;

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
    @apply font-bold w-5 h-5;
  }
}
</style>
