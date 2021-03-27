import flushPromises from 'flush-promises'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import InputValidator from '../InputValidator'
import Searchfield from '.'

describe('Searchfield', () => {
  let wrapper
  let inputClasses
  const label = 'My Label'

  beforeAll(() => {
    extend('required', required)
  })

  describe('when no props are provided', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })
      inputClasses = wrapper.get('.searchfield__input').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not add the readonly attribute to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().readonly).toBeFalsy()
    })

    it('should not add the readonly classes to the search field', () => {
      expect(inputClasses).not.toContain('searchfield__input--readonly')
    })

    it('should not add the disabled attribute to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().disabled).toBeFalsy()
    })

    // it('should not add the disabled classes to the search field', () => {
    // })

    it('should add the label as the placeholder to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().placeholder).toBe(label)
    })

    it('should not add the name to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().name).toBe('')
    })

    it('should render the search icon', () => {
      expect(wrapper.get('.searchfield__icon').element).toBeVisible()
    })

    it('should not display the clear search text button', () => {
      expect(wrapper.get('.searchfield__clear').element).not.toBeVisible()
    })
  })

  describe('when a placeholder is provided', () => {
    let placeholder

    beforeAll(() => {
      placeholder = 'My Placeholder'

      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          placeholder,
          label
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should add the placeholder to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().placeholder).toBe(placeholder)
    })
  })

  describe('when a placeholder is not provided', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should add the placeholder to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().placeholder).toBe(label)
    })
  })

  describe('when a name is provided', () => {
    let name

    beforeAll(() => {
      name = 'inputName'

      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          name,
          label
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should add the name to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().name).toBe(name)
    })
  })

  describe('when a name is not provided', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not add the name to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().name).toBe('')
    })
  })

  describe('when the search field is disabled', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          disabled: true,
          label
        }
      })

      inputClasses = wrapper.get('.searchfield__input').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should add the disabled attribute to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().disabled).toBeTruthy()
    })

    // it('should add the disabled classes to the search field', () => {
    // })
  })

  describe('when the search field is enabled', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          disabled: false,
          label
        }
      })

      inputClasses = wrapper.get('.searchfield__input').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not add the disabled attribute to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().disabled).toBeFalsy()
    })

    // it('should not add the disabled classes to the search field', () => {
    // })
  })

  describe('when the search field is readonly', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          readonly: true,
          label
        }
      })
      inputClasses = wrapper.get('.searchfield__input').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should add the readonly attribute to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().readonly).toBeTruthy()
    })

    it('should add the readonly classes to the search field', () => {
      expect(inputClasses).toContain('searchfield__input--readonly')
    })
  })

  describe('when the search field is not readonly', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          readonly: false,
          label
        }
      })
      inputClasses = wrapper.get('.searchfield__input').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not add the readonly attribute to the search field', () => {
      expect(wrapper.get('.searchfield__input').attributes().readonly).toBeFalsy()
    })

    it('should not add the readonly classes to the search field', () => {
      expect(inputClasses).not.toContain('searchfield__input--readonly')
    })
  })

  describe('when input classes are provided', () => {
    let customClass
    let calcInputClasses

    beforeAll(() => {
      customClass = 'my-custom-class'
      calcInputClasses = jest.fn(() => customClass)

      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          calcInputClasses,
          label
        }
      })

      inputClasses = wrapper.get('.searchfield__input').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should call the custom input classes function', () => {
      expect(calcInputClasses).toHaveBeenCalled()
    })

    it('should add custom css classes to the search field input tag', () => {
      expect(inputClasses).toContain(customClass)
    })
  })

  describe('when input classes are not provided', () => {
    let customClass
    let calcInputClasses

    beforeAll(() => {
      customClass = 'my-custom-class'
      calcInputClasses = jest.fn(() => customClass)

      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })

      inputClasses = wrapper.get('.searchfield__input').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should not call the custom input classes function', () => {
      expect(calcInputClasses).not.toHaveBeenCalled()
    })

    it('should not add custom css classes to the search field input tag', () => {
      expect(inputClasses).not.toContain(customClass)
    })
  })

  describe('when container classes are provided', () => {
    let customClass
    let calcContainerClasses

    beforeAll(() => {
      customClass = 'my-custom-class'
      calcContainerClasses = jest.fn(() => customClass)

      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          calcContainerClasses,
          label
        }
      })

      inputClasses = wrapper.get('.searchfield').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should call the custom container classes function', () => {
      expect(calcContainerClasses).toHaveBeenCalled()
    })

    it('should add custom css classes to the search field container', () => {
      expect(inputClasses).toContain(customClass)
    })
  })

  describe('when container classes are not provided', () => {
    let customClass
    let calcContainerClasses

    beforeAll(() => {
      customClass = 'my-custom-class'
      calcContainerClasses = jest.fn(() => customClass)

      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })

      inputClasses = wrapper.get('.searchfield').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should not call the custom container classes function', () => {
      expect(calcContainerClasses).not.toHaveBeenCalled()
    })

    it('should not add custom css classes to the search field container', () => {
      expect(inputClasses).not.toContain(customClass)
    })
  })

  describe('when validation errors are present', () => {
    beforeAll(async () => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          rules: 'required',
          label
        }
      })

      const input = wrapper.get('.searchfield__input')

      input.setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      input.trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()

      inputClasses = input.classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should add the error classes to the search field', () => {
    })
  })

  describe('when validation errors are not present', () => {
    beforeAll(async () => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          rules: 'required',
          label
        }
      })

      const input = wrapper.get('.searchfield__input')

      input.setValue('abc')
      await flushPromises()
      await wrapper.vm.$nextTick()

      input.trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()

      inputClasses = input.classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not add the error classes to the search field', () => {
    })
  })

  describe('when text is in the search bar', () => {
    beforeAll(async () => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })

      const input = wrapper.get('.searchfield__input')

      input.setValue('abc')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the clear search text button', () => {
      expect(wrapper.get('.searchfield__clear').element).toBeVisible()
    })
  })

  describe('when text is not in the search bar', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not display the clear search text button', () => {
      expect(wrapper.get('.searchfield__clear').element).not.toBeVisible()
    })
  })

  describe('when clicking the clear search text button', () => {
    let searchClearButton
    let searchBox

    beforeAll(async () => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })

      searchBox = wrapper.get('.searchfield__input')

      searchBox.setValue('abc')
      await flushPromises()
      await wrapper.vm.$nextTick()

      searchClearButton = wrapper.get('.searchfield__clear')
      searchClearButton.trigger('click')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not display the clear search text button', () => {
      expect(searchClearButton.element).not.toBeVisible()
    })

    it('should clear the search text from the search box', () => {
      expect(wrapper.vm.searchTerm).toBe('')
      expect(searchBox.element.value).toBe('')
    })
  })

  describe('when the input event is emitted from the input', () => {
    beforeAll(async () => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })

      const input = wrapper.get('.searchfield__input')

      input.setValue('a')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should emit the input event from the search field', () => {
      expect(wrapper.emitted().input[0][0]).toBe('a')
    })
  })

  describe('when the focus event is emitted from the input', () => {
    beforeAll(async () => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })

      const input = wrapper.get('.searchfield__input')

      input.trigger('focus')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should set the \'isFocused\' to be true', () => {
      expect(wrapper.vm.isFocused).toBe(true)
    })
  })

  describe('when the blur event is emitted from the input', () => {
    beforeAll(async () => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })

      const input = wrapper.get('.searchfield__input')

      input.setValue('a')
      await flushPromises()
      await wrapper.vm.$nextTick()

      input.trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should emit the blur event from the search field', () => {
      expect(wrapper.emitted().blur[0][0]).toBe('a')
    })

    it('should set the \'isFocused\' flag to false', () => {
      expect(wrapper.vm.isFocused).toBe(false)
    })
  })

  describe('when the focus event is emitted from the container element', () => {
    let inputFocusSpy

    beforeAll(async () => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })
      await wrapper.vm.$nextTick()

      inputFocusSpy = jest.spyOn(wrapper.vm.$refs[`searchfield-input-${wrapper.vm.$attrs.id}`], 'focus')

      const input = wrapper.get('.searchfield')

      input.trigger('focus')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      inputFocusSpy.mockRestore()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should focus the inner input element', () => {
      expect(inputFocusSpy).toHaveBeenCalled()
    })

    it('should set the \'isFocused\' to be true', () => {
      expect(wrapper.vm.isFocused).toBe(true)
    })
  })

  describe('when the blur event is emitted from the container element', () => {
    beforeAll(async () => {
      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })

      const input = wrapper.get('.searchfield')

      input.trigger('focus')
      await flushPromises()
      await wrapper.vm.$nextTick()

      input.trigger('blur')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should set the \'isFocused\' flag to false', () => {
      expect(wrapper.vm.isFocused).toBe(false)
    })
  })

  describe('when a new value is passed into the search field', () => {
    let value

    beforeAll(async () => {
      value = 'abc'

      wrapper = mountPreMocked(Searchfield, {
        propsData: {
          label
        }
      })
      await wrapper.vm.$nextTick()

      wrapper.setProps({
        value
      })
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should set the search term data to the passed in value', () => {
      expect(wrapper.vm.searchTerm).toBe(value)
    })
  })

  describe('when rendering the search field', () => {
    let inputValidator

    beforeAll(() => {
      wrapper = mountPreMocked(Searchfield, {
        attrs: {
          id: 'my-search-field'
        },

        propsData: {
          vid: 'mySearchFieldValidationId',
          tag: 'p',
          skipIfEmpty: true,
          rules: 'required',
          veeValidateName: 'Validation Field Name',
          label,
          mode: 'aggressive',
          immediate: true,
          validationDisabled: false,
          debounce: 300,
          bails: false,
          customMessages: { required: '{_field_} is missing.' },
          hint: 'This is a hint.'
        }
      })
      inputValidator = wrapper.findComponent(InputValidator)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should pass the vid prop to the input validator', () => {
      expect(inputValidator.vm.vid).toBe(wrapper.vm.vid)
    })

    it('should pass the tag prop to the input validator', () => {
      expect(inputValidator.vm.tag).toBe(wrapper.vm.tag)
    })

    it('should pass the skip if empty prop to the input validator', () => {
      expect(inputValidator.vm.skipIfEmpty).toBe(wrapper.vm.skipIfEmpty)
    })

    it('should pass the rules prop to the input validator', () => {
      expect(inputValidator.vm.rules).toBe(wrapper.vm.rules)
    })

    it('should pass the vee validate name prop to the input validator', () => {
      expect(inputValidator.vm.name).toBe(wrapper.vm.veeValidateName)
    })

    it('should pass the label prop to the input validator', () => {
      expect(inputValidator.vm.label).toBe(wrapper.vm.label)
    })

    it('should pass the id attribute as the label-for prop to input validator', () => {
      expect(inputValidator.vm.labelFor).toBe(wrapper.vm.$attrs.id)
    })

    it('should pass the mode prop to the input validator', () => {
      expect(inputValidator.vm.mode).toBe(wrapper.vm.mode)
    })

    it('should pass the immediate prop to the input validator', () => {
      expect(inputValidator.vm.immediate).toBe(wrapper.vm.immediate)
    })

    it('should pass the validation disabled prop to the input validator', () => {
      expect(inputValidator.vm.disabled).toBe(wrapper.vm.validationDisabled)
    })

    it('should pass the debounce prop to the input validator', () => {
      expect(inputValidator.vm.debounce).toBe(wrapper.vm.debounce)
    })

    it('should pass the custom messages prop to the input validator', () => {
      expect(inputValidator.vm.customMessages).toBe(wrapper.vm.customMessages)
    })

    it('should pass the bails prop to the input validator', () => {
      expect(inputValidator.vm.bails).toBe(wrapper.vm.bails)
    })

    it('should pass the hint prop to the input validator', () => {
      expect(inputValidator.vm.hint).toBe(wrapper.vm.hint)
    })
  })
})
