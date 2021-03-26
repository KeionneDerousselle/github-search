<template>
  <div class="search-page">
    <div class="search__bar">
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
      </textfield>
      <kd-github-search-button class="search__button">
        Hi
      </kd-github-search-button>
    </div>
    <div class="results-box" />
  </div>
</template>

<script>
import Textfield from '@/components/Textfield'
import SearchIcon from '@/components/Icons/Search'
import Button from '@/components/Button'

export default {
  components: {
    Textfield,
    SearchIcon,
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
          classes: ['placeholder-indigo-50']
        }
      ]

      return classStrats.find(cs => cs.shouldApply()).classes
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

.search__bar {
  @apply flex items-start justify-between;
}

.search__box {
  @apply flex-grow w-11/12 mr-4;
}

.search__icon {
  @apply text-4xl w-6;
}

.search__button {
  @apply shadow-lg border-transparent bg-indigo-200 h-14 w-14 flex-none;
  @apply hover:bg-indigo-300 hover:shadow-2xl;
  @apply focus:shadow-2xl focus:ring-indigo-400 focus:ring-4;
}

.results-box {
  @apply flex-1 shadow-lg bg-white rounded-lg p-6 mt-6 overflow-y-auto;
}
</style>
