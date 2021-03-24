import { extend } from 'vee-validate'
import { required, regex } from 'vee-validate/dist/rules'

export const rules = {
  regex: { ...regex, message: '{_field_} needs to be a valid format.' },
  required: { ...required, message: '{_field_} is required.' }
}

export default function() {
  Object.entries({ ...rules }).forEach(([ ruleName, ruleObject ]) => {
    extend(ruleName, ruleObject)
  })
}
