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
      ref="results"
      class="results-box">
      <user-list-item
        v-for="user in users"
        :id="`search-result-${user.id}`"
        :key="user.id"
        :user="user"
        class="search__result" />
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
    currentScroll: 0,
    maxScrollHeight: 0
  }),

  computed: {
    ...mapGetters('users', ['users'])
  },

  // mounted() {
  //   this.$refs.results.addEventListener('scroll', this.handleElScrolled)
  //   window.addEventListener('resize', this.handleWindoResized)
  // },

  methods: {
    ...mapActions('users', ['search']),

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

    handleSearchSubmitted(event) {
      // TODO: Loading State
      // TODO: Handle Errors
      this.performingSearch = true

      return this.search({ simpleSearchTerm: this.searchTerm })
        .catch(console.error)
        .finally(() => {
          this.performingSearch = false
        })
    }

    // handleElScrolled(event) {
    //   this.currentScroll = this.$refs.results.scrollTop
    //   // console.log('Scroll Top: ', this.$refs.results.scrollTop)
    //   // console.log('Offset Height: ', this.$refs.results.offsetHeight)
    //   // console.log('Scroll Height: ', this.$refs.results.scrollHeight)
    //   // console.log('Client Height: ', this.$refs.results.clientHeight)

    //   // the bottom of the scroll: (this.$refs.results.scrollHeight - this.$refs.results.scrollTop)
    //   // how many pages: (this.$refs.results.offsetHeight * 3)
    //   if ((this.$refs.results.scrollHeight - this.$refs.results.scrollTop) < (this.$refs.results.offsetHeight * 3)) {
    //     // set the maxium scrolled position to the bottom of the container (containing all items)
    //     if (this.$refs.results.scrollHeight !== this.maxScrollHeight) {
    //       console.log('fetch dat data')

    //       // in the then
    //       this.maxScrollHeight = this.$refs.results.scrollHeight
    //     }
    //   }
    // },

    // handleWindoResized(event) {
    //   console.log('window resize')
    // }
  }
}
</script>

<style lang="scss">
.search-page {
  @apply max-w-2xl mx-auto flex flex-col h-full;
}

.search__form {
  @apply flex items-start justify-between;
}

.search__box {
  @apply flex-grow w-11/12;
  @apply mr-3;
  @apply md:mr-4;
}

.search__container {
  @apply shadow-lg bg-indigo-500 text-white;
  @apply h-12;
  @apply md:h-14;

  &--focused {
    @apply ring-4 ring-indigo-400;
  }
}

.search__input {
  @apply placeholder-indigo-50 text-sm md:text-base lg:text-lg xl:text-xl;

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
  @apply shadow-lg border-0 bg-indigo-200 flex-none text-indigo-800;
  @apply h-12 w-12;
  @apply md:h-14 md:w-14;

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
    @apply font-bold;
    @apply w-4 h-4;
    @apply md:w-5 md:h-5;
  }
}

.results-box {
  @apply flex-1 shadow-lg bg-white rounded-lg mt-6 overflow-y-auto;
}
</style>
