<template>
  <div class="container search-page">
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
          :disabled="invalid">
          <check-icon class="search__button__icon" />
        </kd-github-search-button>
      </template>
    </form-validator>

    <div
      id="results-box"
      class="results-box">
      <li
        v-for="user in users"
        :id="`search-result-${user.id}`"
        :key="user.id"
        class="search__result">
        {{ user.login }}
      </li>
    </div>
  </div>
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
    searchTerm: ''
  }),

  computed: {
    ...mapGetters('users', ['users'])
  },

  methods: {
    ...mapActions('users', ['search']),

    getSearchInputContainerClasses(errors, isFocused) {
      const classStrats = [
        {
          shouldApply: () => isFocused,
          classes: [
            'h-14',
            'shadow-lg',
            'bg-indigo-500',
            'text-white',
            'ring-4',
            'ring-indigo-400'
          ]
        },
        {
          shouldApply: () => true,
          classes: [
            'h-14',
            'shadow-lg',
            'bg-indigo-500',
            'text-white'
          ]
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
          classes: [ 'placeholder-indigo-50', 'text-xl', 'placeholder-text-lg' ]
        }
      ]

      return classStrats.find(cs => cs.shouldApply()).classes
    },

    handleSearchSubmitted(event) {
      // TODO: Loading State
      // TODO: Handle Errors

      return this.search({ simpleSearchTerm: this.searchTerm })
        .then(() => console.log('did it'))
        .catch(console.error)
    }
  }
}
</script>

<style lang="scss">
.search-page {
  @apply container mx-auto flex flex-col h-full;
}

.search__form {
  @apply flex items-start justify-between;
}

.search__box {
  @apply flex-grow w-11/12 mr-4;
}

.search__button {
  @apply shadow-lg border-transparent bg-indigo-200 h-14 w-14 flex-none;

  &:hover:not(:disabled) {
    @apply bg-indigo-300 shadow-2xl;
  }

  &:focus:not(:active) {
    @apply shadow-2xl ring-indigo-400 ring-4;
  }

  &:disabled {
    @apply bg-gray-300;
  }

  &__icon {
    @apply text-gray-600 text-xl w-5 h-5 font-bold;
  }
}

.results-box {
  @apply flex-1 shadow-lg bg-white rounded-lg p-6 mt-6 overflow-y-auto;
}
</style>
