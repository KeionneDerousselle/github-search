import flushPromises from 'flush-promises'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import IndexPage from '.'

describe('Index Page', () => {
  let wrapper

  beforeAll(() => {
    extend('required', required)
  })

  describe('when a search is performed without a search term', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(IndexPage)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display an error message about the search term being required', () => {

    })
  })

  describe('when the search term container is focused', () => {
    let searchContainerClasses

    beforeAll(async () => {
      wrapper = mountPreMocked(IndexPage)

      const searchContainer = wrapper.get('.textfield')

      searchContainer.trigger('focus')
      await flushPromises()
      await wrapper.vm.$nextTick()

      searchContainerClasses = searchContainer.classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should contain the default search container css classes', () => {
      expect(searchContainerClasses).toContain('h-14')
      expect(searchContainerClasses).toContain('bg-indigo-600')
      expect(searchContainerClasses).toContain('text-white')
    })

    it('should contain the focused search container css classes', () => {
      expect(searchContainerClasses).toContain('ring-4')
      expect(searchContainerClasses).toContain('ring-indigo-300')
    })
  })

  describe('when the search term container is not focused and there are no search errors', () => {
    let searchContainerClasses

    beforeAll(() => {
      wrapper = mountPreMocked(IndexPage)

      searchContainerClasses = wrapper.get('.textfield').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should contain the default search container css classes', () => {
      expect(searchContainerClasses).toContain('h-14')
      expect(searchContainerClasses).toContain('bg-indigo-600')
      expect(searchContainerClasses).toContain('text-white')
    })

    it('should not contain the focused search container css classes', () => {
      expect(searchContainerClasses).not.toContain('ring-4')
      expect(searchContainerClasses).not.toContain('ring-indigo-300')
    })
  })

  describe('when the search term input is not focused and there are no errors', () => {
    let searchInputClasses

    beforeAll(() => {
      wrapper = mountPreMocked(IndexPage)

      searchInputClasses = wrapper.get('#search-textfield').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should contain the default search input css classes', () => {
      expect(searchInputClasses).toContain('placeholder-indigo-50')
    })
  })
})
