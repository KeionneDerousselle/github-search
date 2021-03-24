<template>
  <ValidationProvider
    v-slot="{ errors, failedRules, aria, classes, validate, reset, valid, invalid, changed, touched, untouched, pristine, dirty, pending, required, validated, passed, failed }"
    :vid="vid"
    :tag="tag"
    :skip-if-empty="skipIfEmpty"
    :rules="rules"
    :name="name || label"
    :mode="mode"
    :immediate="immediate"
    :disabled="disabled"
    :debounce="debounce"
    :custom-messages="customMessages"
    :bails="bails"
    class="input">
    <label
      v-if="label"
      :for="labelFor"
      class="input__label sr-only">
      {{ label }}
    </label>

    <slot
      :errors="errors"
      :failedRules="failedRules"
      :aria="aria"
      :classes="classes"
      :validate="validate"
      :reset="reset"
      :valid="valid"
      :invalid="invalid"
      :changed="changed"
      :touched="touched"
      :untouched="untouched"
      :pristine="pristine"
      :dirty="dirty"
      :pending="pending"
      :required="required"
      :validated="validated"
      :passed="passed"
      :failed="failed" />

    <slot
      v-if="!errors || errors.length < 1"
      name="hint"
      :errors="errors"
      :failedRules="failedRules"
      :aria="aria"
      :classes="classes"
      :validate="validate"
      :reset="reset"
      :valid="valid"
      :invalid="invalid"
      :changed="changed"
      :touched="touched"
      :untouched="untouched"
      :pristine="pristine"
      :dirty="dirty"
      :pending="pending"
      :required="required"
      :validated="validated"
      :passed="passed"
      :failed="failed">
      <div
        v-if="hint"
        class="input__hint-container">
        <span class="input__hint text-black-500">{{ hint }}</span>
      </div>
    </slot>

    <slot
      v-if="showErrors && errors && errors.length > 0"
      name="errors"
      :errors="errors"
      :failedRules="failedRules"
      :classes="classes"
      :valid="valid"
      :invalid="invalid"
      :changed="changed"
      :touched="touched"
      :untouched="untouched"
      :pristine="pristine"
      :dirty="dirty"
      :pending="pending"
      :required="required"
      :validated="validated"
      :passed="passed"
      :failed="failed">
      <div class="input__errors">
        <span
          v-if="bails"
          class="input__error text-error-400">
          {{ errors[0] }}
        </span>
        <span
          v-for="error in errors"
          v-else
          :key="`${uuid}-error-${error}`"
          class="input__error text-error-400">
          {{ error }}
        </span>
      </div>
    </slot>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'InputValidator',

  components: {
    ValidationProvider
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

    disabled: {
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

    labelFor: {
      type: String,
      default: undefined
    },

    label: {
      type: String,
      default: undefined
    },

    hint: {
      type: String,
      default: ''
    },

    showErrors: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss">
.input__errors,
.input__hint-container {
  margin-top: 0.4rem;
}

.input__error {
  font-size: 1.2rem;
  font-weight: 500;
  display: block;
  font-family: inherit;
}

.input__hint {
  display: block;
  font-size: 1.2rem;
  font-family: inherit;
}
</style>
