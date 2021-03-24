import flushPromises from 'flush-promises'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import FormValidator from '.'

describe('FormValidator', () => {
  let wrapper

  beforeAll(() => {
    extend('required', required)
  })

  describe('when submit on enter and validate on submit are enabled, and the form is valid', () => {
    beforeAll(async () => {
      const Component = {
        components: {
          ValidationProvider,
          FormValidator
        },

        data: () => ({
          text: ''
        }),

        template: `
          <FormValidator :submit-on-enter="true" :validate-on-submit="true">
            <ValidationProvider rules="required">
              <input type="text" v-model="text"/>
            </ValidationProvider>
          </FormValidator>
        `
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('valid input')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('form').trigger('submit.prevent')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should emit the submit event', () => {
      expect(wrapper.findComponent(FormValidator).emitted().submit).toBeTruthy()
    })
  })

  describe('when submit on enter and validate on submit are enabled, and the form is invalid', () => {
    beforeAll(async () => {
      const Component = {
        components: {
          ValidationProvider,
          FormValidator
        },

        data: () => ({
          text: ''
        }),

        template: `
          <FormValidator :submit-on-enter="true" :validate-on-submit="true">
            <ValidationProvider rules="required">
              <input type="text" v-model="text"/>
            </ValidationProvider>
          </FormValidator>
        `
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('form').trigger('submit.prevent')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should not emit the submit event', () => {
      expect(wrapper.findComponent(FormValidator).emitted().submit).toBeFalsy()
    })
  })

  describe('when submit on enter is enabled, but validate on submit is disabled', () => {
    beforeAll(async () => {
      const Component = {
        components: {
          ValidationProvider,
          FormValidator
        },

        data: () => ({
          text: ''
        }),

        template: `
          <FormValidator :submit-on-enter="true" :validate-on-submit="false">
            <ValidationProvider rules="required">
              <input type="text" v-model="text"/>
            </ValidationProvider>
          </FormValidator>
        `
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('form').trigger('submit.prevent')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should emit the submit event', () => {
      expect(wrapper.findComponent(FormValidator).emitted().submit).toBeTruthy()
    })
  })

  describe('when submit on enter is disabled', () => {
    beforeAll(async () => {
      const Component = {
        components: {
          ValidationProvider,
          FormValidator
        },

        data: () => ({
          text: ''
        }),

        template: `
          <FormValidator :submit-on-enter="false">
            <ValidationProvider rules="required">
              <input type="text" v-model="text"/>
            </ValidationProvider>
          </FormValidator>
        `
      }

      wrapper = mountPreMocked(Component)

      wrapper.get('input').setValue('something')
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get('form').trigger('submit.prevent')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should not emit the submit event', () => {
      expect(wrapper.findComponent(FormValidator).emitted().submit).toBeFalsy()
    })
  })
})
