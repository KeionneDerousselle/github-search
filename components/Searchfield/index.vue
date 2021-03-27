<template>
  <div class="attrs-fix">
    <InputValidator
      v-slot="{errors}"
      :vid="vid"
      :tag="tag"
      :skip-if-empty="skipIfEmpty"
      :rules="rules"
      :name="veeValidateName"
      :label="label"
      :label-for="$attrs.id"
      :mode="mode"
      :immediate="immediate"
      :disabled="validationDisabled"
      :debounce="debounce"
      :custom-messages="customMessages"
      :bails="bails"
      :hint="hint"
      :show-errors="showErrors"
      class="searchfield-container">
      <div
        tabindex="0"
        :class="['searchfield', 'rounded-lg', calcContainerClasses(errors, isFocused)]"
        @focus="handleContainerFocused"
        @click="handleContainerFocused"
        @blur="blur">
        <span class="searchfield__left">
          <search-icon class="searchfield__icon" />
        </span>

        <input
          :ref="`searchfield-input-${$attrs.id}`"
          v-model="searchTerm"
          :class="['searchfield__input', {'searchfield__input--readonly': readonly}, calcInputClasses(errors, isFocused)]"
          type="search"
          :placeholder="placeholder || label"
          :readonly="readonly"
          :disabled="disabled"
          :name="name"
          v-bind="$attrs"
          @input="handleEvent"
          @blur="handleInputBlurred"
          @focus="focus">

        <span class="searchfield__right">
          <kd-github-search-button
            v-show="searchTerm && searchTerm.length > 0"
            class="searchfield__clear"
            type="reset"
            @click="clearSearch">
            <cross-icon class="searchfield__clear__icon" />
          </kd-github-search-button>
        </span>
      </div>
    </InputValidator>
  </div>
</template>
<script>
import InputValidator from '@/components/InputValidator'
import SearchIcon from '@/components/Icons/Search'
import Button from '@/components/Button'
import CrossIcon from '@/components/Icons/Cross'

export default {
  components: {
    InputValidator,
    SearchIcon,
    CrossIcon,
    'kd-github-search-button': Button
  },

  inheritAttrs: false,

  props: {
    bails: {
      type: Boolean,
      default: true
    },

    customMessages: {
      type: Object,
      default: () => ({})
    },

    debounce: {
      type: Number,
      default: 0
    },

    validationDisabled: {
      type: Boolean,
      default: false
    },

    immediate: {
      type: Boolean,
      default: false
    },

    mode: {
      type: String,
      default: 'eager',
      validator: value =>
        [
          'aggressive',
          'passive',
          'lazy',
          'eager'
        ].includes(value)
    },

    veeValidateName: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: ''
    },

    rules: {
      type: [ String, Object ],
      default: null
    },

    skipIfEmpty: {
      type: Boolean,
      default: true
    },

    tag: {
      type: String,
      default: 'div'
    },

    vid: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      required: true
    },

    calcContainerClasses: {
      type: Function,
      default: () => ([])
    },

    calcInputClasses: {
      type: Function,
      default: () => ([])
    },

    value: {
      type: String,
      default: ''
    },

    hint: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    readonly: {
      type: Boolean,
      default: false
    },

    showErrors: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    searchTerm: '',
    isFocused: false
  }),

  watch: {
    value(newVal) {
      this.searchTerm = newVal
    }
  },

  methods: {
    handleEvent(event) {
      this.$emit(event.type, event.target.value)
    },

    focus() {
      this.isFocused = true
    },

    handleContainerFocused() {
      const inputRef = `searchfield-input-${this.$attrs.id}`

      this.focus()
      this.$refs[inputRef].focus()
    },

    blur() {
      this.isFocused = false
    },

    handleInputBlurred(event) {
      this.handleEvent(event)
      this.blur()
    },

    clearSearch() {
      this.searchTerm = ''
    }
  }
}
</script>
<style lang="scss">
.attrs-fix,
.searchfield-container,
.searchfield,
.searchfield__input {
  @apply w-full;
}

.searchfield {
  @apply relative inline-flex overflow-hidden items-center text-base p-4 font-normal;
  @apply p-3;
  @apply md:p-4;

  transition: all 0.5s;

  &__left {
    @apply mr-2.5;
  }

  &__right {
    @apply ml-2.5;
  }
}

.searchfield__input {
  @apply appearance-none pt-4 pr-4 pb-4 m-0 border-0 outline-none flex-1;
  @apply pt-3 pr-3 pb-3;
  @apply md:pt-4 md:pr-4 md:pb-4;

  background: inherit;
  color: inherit;
  font-family: inherit;
  font-weight: inherit;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active,
  &:-internal-autofill-selected {
    color: inherit;
    font-family: inherit;
    font-weight: inherit;
    background-clip: text;
  }

  &::placeholder {
    @apply font-normal;

    font-family: inherit;
  }

  &::-ms-clear,
  &::-ms-reveal {
    @apply hidden w-0 h-0;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    @apply appearance-none;
  }

  &:disabled,
  &--readonly {
    cursor: default;
  }
}

.searchfield__icon {
  @apply w-4 h-4;
  @apply md:w-5 md:h-5;
}

.searchfield__clear {
  @apply bg-transparent border-transparent m-0 p-0.5 outline-none rounded-full;
  @apply border;
  @apply md:border-2;

  &:hover,
  &:focus {
    @apply border border-white;
    @apply md:border-2;
  }

  &__icon {
    @apply w-4 h-4;
    @apply md:w-5 md:h-5;
  }
}
</style>
