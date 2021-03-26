<template>
  <div class="search-page">
    <form-validator
      class="search__form"
      @submit="handleSearchSubmitted">
      <template #default="{ pristine, invalid }">
        <textfield
          id="search-box"
          v-model="search"
          class="search__box"
          placeholder="Search"
          type="search"
          rules="required"
          label="Search Term"
          name="Search Term"
          vee-validate-name="A search term"
          :calc-input-classes="getSearchInputClasses"
          :calc-container-classes="getSearchInputContainerClasses">
          <template #left>
            <search-icon class="search__icon" />
          </template>

          <template #right>
            <kd-github-search-button
              v-show="search && search.length > 0"
              id="search-clear"
              class="search__clear"
              @click="clearSearch">
              <cross-icon class="search__clear__icon" />
            </kd-github-search-button>
          </template>
        </textfield>

        <kd-github-search-button
          id="search-button"
          class="search__button"
          type="submit"
          :disabled="pristine || invalid">
          <check-icon class="search__button__icon" />
        </kd-github-search-button>
      </template>
    </form-validator>

    <div class="results-box" />
  </div>
</template>

<script>
import Textfield from '@/components/Textfield'
import SearchIcon from '@/components/Icons/Search'
import CheckIcon from '@/components/Icons/Check'
import CrossIcon from '@/components/Icons/Cross'
import Button from '@/components/Button'
import FormValidator from '@/components/FormValidator'

export default {
  components: {
    Textfield,
    SearchIcon,
    CheckIcon,
    CrossIcon,
    FormValidator,
    'kd-github-search-button': Button
  },

  data: () => ({
    search: ''
  }),

  methods: {
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

    clearSearch() {
      this.search = ''
    },

    handleSearchSubmitted(event) {
      console.log(this.search)
    }
  }
}
</script>

<style lang="scss">
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

.search-page {
  @apply flex flex-col h-full;
}

.search__form {
  @apply flex items-start justify-between;
}

.search__box {
  @apply flex-grow w-11/12 mr-4;
}

.search__icon {
  @apply text-xl w-5;
}

.search__clear {
  @apply bg-transparent border-2 border-transparent m-0 p-0.5 outline-none rounded-full;

  &:hover {
    @apply border-2 border-white;
  }

  &__icon {
    @apply text-xl w-5;
  }
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
