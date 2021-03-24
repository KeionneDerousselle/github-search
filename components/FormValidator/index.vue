<template>
  <ValidationObserver
    slim
    class="form"
    :vid="vid">
    <template
      #default="{ dirty, pristine, valid, invalid, pending, touched, untouched, passed, failed, errors, validate, handleSubmit, reset }">
      <form
        v-bind="$attrs"
        @submit.prevent="event => handleSubmitForm(event, validate)">
        <slot
          :dirty="dirty"
          :pristine="pristine"
          :valid="valid"
          :invalid="invalid"
          :pending="pending"
          :touched="touched"
          :untouched="untouched"
          :passed="passed"
          :failed="failed"
          :errors="errors"
          :validate="validate"
          :handleSubmit="handleSubmit"
          :reset="reset" />
      </form>
    </template>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
export default {
  name: 'FormValidator',
  components: {
    ValidationObserver
  },
  props: {
    validateOnSubmit: {
      type: Boolean,
      default: true
    },
    submitOnEnter: {
      type: Boolean,
      default: true
    },
    vid: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSubmitForm(event, validate) {
      if (this.submitOnEnter) {
        if (this.validateOnSubmit) {
          validate().then(success => {
            if (success) {
              this.$emit('submit', event)
            }
          })
        } else {
          this.$emit('submit', event)
        }
      }
    }
  }
}
</script>
