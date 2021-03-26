import flushPromises from 'flush-promises'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import IndexPage from '.'

describe('Index Page', () => {
  let wrapper

  /**
   * https://vee-validate.logaretm.com/v3/advanced/testing.html#testing-error-messages
   */
  const flushValidationUpdates = async wrapper => {
    await flushPromises()
    jest.runAllTimers()
    await flushPromises()
    await wrapper.vm.$nextTick()
  }

  beforeAll(() => {
    extend('required', required)
    console.log = jest.fn()
    jest.useFakeTimers()
  })

  afterAll(() => {
    console.log.mockRestore()
    jest.useRealTimers()
  })

  describe('when a search is performed without a search term', () => {
    let searchButton
    let searchSubmitSpy

    beforeAll(async () => {
      searchSubmitSpy = jest.spyOn(IndexPage.methods, 'handleSearchSubmitted')
      wrapper = mountPreMocked(IndexPage)

      searchButton = wrapper.get('#search-button')

      searchButton.trigger('click')
      await flushValidationUpdates(wrapper)
    })

    afterAll(() => {
      searchSubmitSpy.mockRestore()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display an error message about the search term being required', () => {

    })

    it('should disable the search submit button', () => {
      expect(searchButton.attributes().disabled).toBeTruthy()
    })

    it('should not handle the search form submission', () => {
      expect(searchSubmitSpy).not.toHaveBeenCalled()
    })
  })

  describe('when an invalid search is performed', () => {
    let searchButton
    let searchSubmitSpy

    // TODO: include validation rules
    beforeAll(async () => {
      searchSubmitSpy = jest.spyOn(IndexPage.methods, 'handleSearchSubmitted')
      wrapper = mountPreMocked(IndexPage)

      const searchBox = wrapper.get('#search-box')

      searchButton = wrapper.get('#search-button')

      searchBox.setValue('')
      searchBox.trigger('blur')
      searchButton.trigger('click')

      await flushValidationUpdates(wrapper)
    })

    afterAll(() => {
      searchSubmitSpy.mockRestore()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display an error message about the search term being invalid', () => {

    })

    it('should disable the search submit button', () => {
      expect(searchButton.attributes().disabled).toBeTruthy()
    })

    it('should not handle the search form submission', () => {
      expect(searchSubmitSpy).not.toHaveBeenCalled()
    })
  })

  describe('when a valid search is performed', () => {
    let searchButton
    let searchSubmitSpy

    // TODO: include validation rules
    beforeAll(async () => {
      searchSubmitSpy = jest.spyOn(IndexPage.methods, 'handleSearchSubmitted')
      wrapper = mountPreMocked(IndexPage)

      const searchBox = wrapper.get('#search-box')

      searchButton = wrapper.get('#search-button')

      searchBox.setValue('test')
      searchBox.trigger('blur')
      await flushValidationUpdates(wrapper)

      searchButton.trigger('click')
      await flushValidationUpdates(wrapper)
    })

    afterAll(() => {
      searchSubmitSpy.mockRestore()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not display an error message about the search term being invalid', () => {

    })

    it('should not disable the search submit button', () => {
      expect(searchButton.attributes().disabled).toBeFalsy()
    })

    it('should handle the search form submission', () => {
      expect(searchSubmitSpy).toHaveBeenCalled()
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
      expect(searchContainerClasses).toContain('bg-indigo-500')
      expect(searchContainerClasses).toContain('text-white')
    })

    it('should contain the focused search container css classes', () => {
      expect(searchContainerClasses).toContain('ring-4')
      expect(searchContainerClasses).toContain('ring-indigo-400')
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
      expect(searchContainerClasses).toContain('bg-indigo-500')
      expect(searchContainerClasses).toContain('text-white')
    })

    it('should not contain the focused search container css classes', () => {
      expect(searchContainerClasses).not.toContain('ring-4')
      expect(searchContainerClasses).not.toContain('ring-indigo-400')
    })
  })

  describe('when the search term input is not focused and there are no errors', () => {
    let searchInputClasses

    beforeAll(() => {
      wrapper = mountPreMocked(IndexPage)

      searchInputClasses = wrapper.get('#search-box').classes()
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

  describe('when text is in the search bar', () => {
    beforeAll(async () => {
      wrapper = mountPreMocked(IndexPage)

      const searchBox = wrapper.get('#search-box')

      searchBox.setValue('test')
      await flushValidationUpdates(wrapper)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the clear search text button', () => {
      expect(wrapper.get('#search-clear').element).toBeVisible()
    })
  })

  describe('when clicking the clear search text button', () => {
    let searchClearButton
    let searchBox

    beforeAll(async () => {
      wrapper = mountPreMocked(IndexPage)

      searchBox = wrapper.get('#search-box')
      searchBox.setValue('test')
      searchBox.trigger('blur')
      await flushValidationUpdates(wrapper)

      searchClearButton = wrapper.get('#search-clear')
      searchClearButton.trigger('click')
      await flushValidationUpdates(wrapper)
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

    it('should disable the search submit button', () => {
      expect(wrapper.get('#search-button').attributes().disabled).toBeTruthy()
    })

    it('should clear the search text from the search box', () => {
      expect(wrapper.vm.search).toBe('')
      expect(searchBox.element.value).toBe('')
    })
  })

  describe('display', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(IndexPage)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the search box', () => {
      expect(wrapper.get('.search__box').element).toBeVisible()
    })

    it('should display a disabled the search button', () => {
      const searchButton = wrapper.get('.search__button')

      expect(searchButton.element).toBeVisible()
      expect(searchButton.attributes().disabled).toBeTruthy()
    })

    it('should render the search icon', () => {
      expect(wrapper.get('.search__icon').element).toBeVisible()
    })

    it('should not display the clear search text button', () => {
      expect(wrapper.get('#search-clear').element).not.toBeVisible()
    })

    it('should display the results box', () => {
      expect(wrapper.get('.results-box').element).toBeVisible()
    })
  })
})
