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
      class="textfield-container">
      <div
        tabindex="0"
        :class="['textfield', 'rounded-lg', calcContainerClasses(errors, isFocused)]"
        @focus="handleContainerFocused"
        @click="handleContainerFocused"
        @blur="blur">
        <span
          v-if="$slots.left"
          class="textfield__left">
          <slot name="left" />
        </span>

        <input
          :ref="`textfield-input-${$attrs.id}`"
          v-model="text"
          :class="['textfield__input', {'textfield__input--readonly': readonly}, calcInputClasses(errors, isFocused)]"
          :type="$attrs.type || 'text'"
          :placeholder="placeholder || label"
          :readonly="readonly"
          :disabled="disabled"
          :name="name"
          v-bind="$attrs"
          @input="handleEvent"
          @blur="handleInputBlurred"
          @focus="focus">
      </div>
    </InputValidator>
  </div>
</template>
<script>
import InputValidator from '@/components/InputValidator'

export default {
  name: 'Textfield',

  components: {
    InputValidator
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
    }
  },

  data: () => ({
    text: '',
    isFocused: false
  }),

  watch: {
    value(newVal) {
      this.text = newVal
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
      const inputRef = `textfield-input-${this.$attrs.id}`

      this.focus()
      this.$refs[inputRef].focus()
    },

    blur() {
      this.isFocused = false
    },

    handleInputBlurred(event) {
      this.handleEvent(event)
      this.blur()
    }
  }
}
</script>
<style lang="scss">
.attrs-fix,
.textfield-container,
.textfield,
.textfield__input {
  width: 100%;
}

.textfield {
  position: relative;
  display: inline-flex;
  overflow: hidden;
  font-size: 1.4rem;
  padding: 1.2rem;
  border-style: solid;
  border-width: 2.5px;
  transition: all 0.5s;
  font-weight: 400;
  align-items: center;

  &__left {
    margin-right: 1.2rem;
  }
}

.textfield__input {
  -webkit-appearance: none;
  appearance: none;
  background: inherit;
  color: inherit;
  font-family: inherit;
  padding: 1.2rem 1.2rem 1.2rem 0;
  margin: 0;
  border: 0;
  outline: 0;
  font-weight: inherit;
  flex: 1;

  &::placeholder {
    font-family: inherit;
    font-size: 1.4rem;
    font-weight: 400;
  }

  &:disabled,
  &--readonly {
    cursor: default;
  }
}
</style>
