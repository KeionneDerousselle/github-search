<template>
  <div>
    <textfield
      id="search-textfield"
      v-model="search"
      placeholder="Search"
      type="search"
      rules="required"
      label="Search Term"
      name="Search Term"
      vee-validate-name="A search term"
      :calc-input-classes="getSearchInputClasses"
      :calc-container-classes="getSearchInputContainerClasses">
      <template #left>
        <search-icon class="text-4xl w-6" />
      </template>
    </textfield>
    <div>
      {{ search }}
    </div>
  </div>
</template>

<script>
import Textfield from '@/components/Textfield'
import SearchIcon from '@/components/Icons/Search'

export default {
  components: {
    Textfield,
    SearchIcon
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
            'bg-indigo-500',
            'text-white',
            'ring-4',
            'ring-indigo-300'
          ]
        },
        {
          shouldApply: () => true,
          classes: [
            'h-14',
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
</style>
