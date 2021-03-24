import flushPromises from 'flush-promises'
import { ValidationProvider, extend } from 'vee-validate'
import { required, min } from 'vee-validate/dist/rules'
import InputValidator from '.'

describe('InputValidator', () => {
  let wrapper
  const requiredValidationErrorMessage = '{_field_} is required.'
  const minValidationErrorMessage = '{_field_} cannot be less than {length} characters.'

  beforeAll(() => {
    extend('required', { ...required, message: requiredValidationErrorMessage })
    extend('min', { ...min, message: minValidationErrorMessage })
  })

  describe('when using the input validator', () => {
    let validationProvider

    beforeAll(() => {
      wrapper = mountPreMocked(InputValidator, {
        propsData: {
          name: 'myInputField'
        }
      })

      validationProvider = wrapper.findComponent(ValidationProvider)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it("should pass vid prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().vid).toBe(wrapper.vm.vid)
    })

    it("should pass tag prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().tag).toBe(wrapper.vm.tag)
    })

    it("should pass skip-if-empty prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().skipIfEmpty).toBe(wrapper.vm.skipIfEmpty)
    })

    it("should pass rule prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().rules).toBe(wrapper.vm.rules)
    })

    it("should pass name prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().name).toBe(wrapper.vm.name)
    })

    it("should pass mode prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().mode).toBe(wrapper.vm.mode)
    })

    it("should pass immediate prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().immediate).toBe(wrapper.vm.immediate)
    })

    it("should pass disabled prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().disabled).toBe(wrapper.vm.disabled)
    })

    it("should pass debounce prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().debounce).toBe(wrapper.vm.debounce)
    })

    it("should pass custom-messages prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().customMessages).toBe(wrapper.vm.customMessages)
    })

    it("should pass bails prop to vee-validate's ValidationProvider", () => {
      expect(validationProvider.props().bails).toBe(wrapper.vm.bails)
    })
  })

  describe('when passing a label string to the input validator', () => {
    let labelText

    beforeAll(() => {
      labelText = 'myLabel'

      wrapper = mountPreMocked(InputValidator, {
        propsData: {
          name: 'myInputField',
          label: labelText
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the label', () => {
      expect(wrapper.get('.input__label').text()).toContain(labelText)
    })

    it('should set the screen reader only css class', () => {
      expect(wrapper.get('.input__label').classes()).toContain('sr-only')
    })
  })

  describe('when no label string is provided to the input validator', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(InputValidator, {
        propsData: {
          name: 'myInputField'
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not display the default label', () => {
      expect(() => wrapper.get('.input__label')).toThrow()
    })
  })

  describe('when there are no validation errors', () => {
    beforeAll(async () => {
      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator rules="required" label="My Label">
            <input v-model="text"/>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('abc')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('input').trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not display the errors container', () => {
      expect(() => wrapper.get('.input__errors')).toThrow()
    })

    it('should not display any errors', () => {
      expect(() => wrapper.get('.input__error')).toThrow()
    })
  })

  describe('when there are validation errors, but the show errors property is false', () => {
    const inputId = 'my-input'
    const label = 'My Label'

    beforeAll(async () => {
      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator rules="required" label="${label}" bails :show-errors="false">
            <input id="${inputId}" v-model="text"/>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('input').trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not display the errors container', () => {
      expect(() => wrapper.get('.input__errors')).toThrow()
    })

    it('should not display any error messages', () => {
      expect(() => wrapper.get('.input__error')).toThrow()
    })
  })

  describe('when there are validation errors and the input validator should bail', () => {
    const inputId = 'my-input'
    const label = 'My Label'

    beforeAll(async () => {
      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator rules="required" label="${label}" bails>
            <input id="${inputId}" v-model="text"/>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('input').trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the errors container', () => {
      expect(wrapper.get('.input__errors').element).toBeVisible()
    })

    it('should display a single error', () => {
      expect(wrapper.get('.input__error').element).toBeVisible()
    })

    it('should set the color of the error to text-error-400', () => {
      expect(wrapper.get('.input__error').classes()).toContain('text-error-400')
    })

    it('should display the error message', () => {
      expect(wrapper.get('.input__error').text()).toContain(requiredValidationErrorMessage.replace('{_field_}', label))
    })
  })

  describe('when there are validation errors and the input validator should not bail after the first error', () => {
    const inputId = 'my-input'
    const label = 'My Label'
    const length = 3

    beforeAll(async () => {
      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator rules="required|min:${length}" label="${label}" :bails="false">
            <input id="${inputId}" v-model="text"/>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('input').trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the errors container', () => {
      expect(wrapper.get('.input__errors').element).toBeVisible()
    })

    it('should display the first error', () => {
      expect(wrapper.get('.input__error').element).toBeVisible()
    })

    it('should display the second error ', () => {
      expect(wrapper.get('.input__error + .input__error').element).toBeVisible()
    })

    it('should set the color of the first error to text-error-400', () => {
      expect(wrapper.get('.input__error').classes()).toContain('text-error-400')
    })

    it('should set the color of the second error to text-error-400', () => {
      expect(wrapper.get('.input__error + .input__error').classes()).toContain('text-error-400')
    })

    it('should display the first error message', () => {
      expect(wrapper.get('.input__error').text()).toContain(requiredValidationErrorMessage.replace('{_field_}', label))
    })

    it('should display the second error message', () => {
      expect(wrapper.get('.input__error + .input__error').text()).toContain(minValidationErrorMessage.replace('{_field_}', label).replace('{length}', length))
    })
  })

  describe('when a custom error slot is provided', () => {
    const inputId = 'my-input'
    const customErrorsSlotId = 'custom-error-message-slot'
    const customErrorId = 'custom-error-message'

    beforeAll(async () => {
      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator rules="required" label="My Label">
            <input id="${inputId}" v-model="text"/>
            <div slot="errors" id="${customErrorsSlotId}">
              <span id="${customErrorId}">Uh oh! Please provide valid input.</span>
            </div>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('input').trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the custom error slot', () => {
      expect(wrapper.get(`#${customErrorsSlotId}`).element).toBeVisible()
    })

    it('should display the custom error message', () => {
      expect(wrapper.get(`#${customErrorId}`).element).toBeVisible()
    })

    it('should not display the default error messages container', () => {
      expect(() => wrapper.get('.input__errors')).toThrow()
    })

    it('should not display the default error message', () => {
      expect(() => wrapper.get('.input__error')).toThrow()
    })
  })

  describe('when a validator name is not provided', () => {
    const inputId = 'my-input'
    const inputLabel = 'My Input Field'

    beforeAll(async () => {
      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator rules="required" label="${inputLabel}">
            <input id="${inputId}" v-model="text"/>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('input').trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should use the label in the displayed error message', () => {
      expect(wrapper.get('.input__error').text()).toContain(requiredValidationErrorMessage.replace('{_field_}', inputLabel))
    })
  })

  describe('when a validator name is provided', () => {
    const inputId = 'my-input'
    const validatorName = 'Some Custom Message'

    beforeAll(async () => {
      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator rules="required" name="${validatorName}">
            <input id="${inputId}" v-model="text"/>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('input').trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should use the label in the displayed error message', () => {
      expect(wrapper.get('.input__error').text()).toContain(requiredValidationErrorMessage.replace('{_field_}', validatorName))
    })
  })

  describe('when a hint string is provided', () => {
    let hintText

    beforeAll(() => {
      hintText = 'This is a hint.'

      wrapper = mountPreMocked(InputValidator, {
        propsData: {
          name: 'myInputField',
          hint: hintText
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the hint', () => {
      expect(wrapper.get('.input__hint').text()).toContain(hintText)
    })

    it('should set the color of the hint to text black 500', () => {
      expect(wrapper.get('.input__hint').classes()).toContain('text-black-500')
    })
  })

  describe('when a hint slot is provided', () => {
    const inputId = 'my-input'
    const customHintsSlotId = 'custom-hints-slot'
    const customHintId = 'custom-hint'

    beforeAll(() => {
      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator label="My Label">
            <input id="${inputId}" v-model="text"/>
            <div slot="hint" id="${customHintsSlotId}">
              <span id="${customHintId}">This is a hint.</span>
            </div>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the custom hints slot', () => {
      expect(wrapper.get(`#${customHintsSlotId}`).element).toBeVisible()
    })

    it('should display the custom hint', () => {
      expect(wrapper.get(`#${customHintId}`).element).toBeVisible()
    })

    it('should not display the default hint container', () => {
      expect(() => wrapper.get('.input__hint-container')).toThrow()
    })

    it('should not display the default hint', () => {
      expect(() => wrapper.get('.input__hint')).toThrow()
    })
  })

  describe('when a hint string is provided, but there is a validation error', () => {
    const inputId = 'my-input'
    const label = 'My Label'
    let hintText

    beforeAll(async () => {
      hintText = 'This is a hint.'

      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator label="${label}" hint="${hintText}" rules="required">
            <input id="${inputId}" v-model="text"/>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('input').trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not display the hints container', () => {
      expect(() => wrapper.get('.input__hint-container')).toThrow()
    })

    it('should not display the hint', () => {
      expect(() => wrapper.get('.input__hint')).toThrow()
    })

    it('should display the errors container', () => {
      expect(wrapper.get('.input__errors').element).toBeVisible()
    })

    it('should display a single error', () => {
      expect(wrapper.get('.input__error').element).toBeVisible()
    })

    it('should set the color of the error to text-error-400', () => {
      expect(wrapper.get('.input__error').classes()).toContain('text-error-400')
    })

    it('should display the error message', () => {
      expect(wrapper.get('.input__error').text()).toContain(requiredValidationErrorMessage.replace('{_field_}', label))
    })
  })

  describe('when a hint slot is provided, but there is a validation error', () => {
    const inputId = 'my-input'
    const customHintsSlotId = 'custom-hints-slot'
    const customHintId = 'custom-hint'
    const label = 'My Label'

    beforeAll(async () => {
      const Component = {
        components: {
          InputValidator
        },

        template: `
          <InputValidator label="${label}" rules="required">
            <input id="${inputId}" v-model="text"/>
            <div slot="hint" id="${customHintsSlotId}">
              <span id="${customHintId}">This is a hint.</span>
            </div>
          </InputValidator>
        `,

        data() {
          return {
            text: ''
          }
        }
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('input').trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })
    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not display the custom hints slot', () => {
      expect(() => wrapper.get(`#${customHintsSlotId}`)).toThrow()
    })

    it('should not display the custom hint', () => {
      expect(() => wrapper.get(`#${customHintId}`)).toThrow()
    })

    it('should not display the default hint container', () => {
      expect(() => wrapper.get('.input__hint-container')).toThrow()
    })

    it('should not display the default hint', () => {
      expect(() => wrapper.get('.input__hint')).toThrow()
    })

    it('should display the errors container', () => {
      expect(wrapper.get('.input__errors').element).toBeVisible()
    })

    it('should display a single error', () => {
      expect(wrapper.get('.input__error').element).toBeVisible()
    })

    it('should set the color of the error to text-error-400', () => {
      expect(wrapper.get('.input__error').classes()).toContain('text-error-400')
    })

    it('should display the error message', () => {
      expect(wrapper.get('.input__error').text()).toContain(requiredValidationErrorMessage.replace('{_field_}', label))
    })
  })
})
