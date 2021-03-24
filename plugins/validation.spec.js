import { validate } from 'vee-validate'
import { createLocalVue } from '@vue/test-utils'
import validation from './validation'

describe('Validation Plugin', () => {
  const name = 'My Field'
  let validationResult
  let localVue

  beforeAll(() => {
    localVue = createLocalVue()

    localVue.use(validation)
  })

  describe('when the regex validation rule is broken', () => {
    beforeAll(async () => {
      validationResult = await validate('12-34-56', { regex: /^\d{3}-?\d{2}-?\d{4}$/ }, { name })
    })

    it('should display the regex error message', () => {
      expect(validationResult.errors[0]).toBe(`${name} needs to be a valid format.`)
    })
  })

  describe('when the required validation rule is broken', () => {
    beforeAll(async () => {
      validationResult = await validate('', 'required', { name })
    })

    it('should display the required error message', () => {
      expect(validationResult.errors[0]).toBe(`${name} is required.`)
    })
  })
})
