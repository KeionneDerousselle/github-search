import flushPromises from 'flush-promises'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import SearchForm from '.'

describe('Search Form', () => {
  let wrapper

  beforeAll(() => {
    extend('required', required)
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('when a search is performed without a search term', () => {
    let searchButton
    let mockSearchAction

    beforeAll(async () => {
      mockSearchAction = jest.fn().mockResolvedValue()

      wrapper = mountPreMocked(SearchForm, {
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue(''),
              resultsPerPage: jest.fn().mockReturnValue(25)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: mockSearchAction
            }
          }
        }
      })

      searchButton = wrapper.get('#search-button')

      searchButton.trigger('click')
      await flushValidationUpdates(wrapper)
    })

    afterAll(() => {
      mockSearchAction.mockRestore()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should disable the search submit button', () => {
      expect(searchButton.attributes().disabled).toBeTruthy()
    })

    it('should not call the search action', () => {
      expect(mockSearchAction).not.toHaveBeenCalled()
    })
  })

  describe('when an invalid search is performed', () => {
    let searchButton
    let mockSearchAction

    // TODO: include validation rules
    beforeAll(async () => {
      mockSearchAction = jest.fn().mockResolvedValue()

      wrapper = mountPreMocked(SearchForm, {
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue(''),
              resultsPerPage: jest.fn().mockReturnValue(25)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: mockSearchAction
            }
          }
        }
      })

      const searchBox = wrapper.get('#search-box')

      searchButton = wrapper.get('#search-button')

      searchBox.setValue('')
      searchBox.trigger('blur')
      searchButton.trigger('click')

      await flushValidationUpdates(wrapper)
    })

    afterAll(() => {
      mockSearchAction.mockRestore()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should disable the search submit button', () => {
      expect(searchButton.attributes().disabled).toBeTruthy()
    })

    it('should not call the search action', () => {
      expect(mockSearchAction).not.toHaveBeenCalled()
    })
  })

  describe('when a valid search is performed', () => {
    let searchButton
    let mockSearchAction
    let mockSetSearchTermAction
    let searchTerm
    let page
    let resultsPerPage

    // TODO: include validation rules
    beforeAll(async () => {
      searchTerm = 'test'
      mockSearchAction = jest.fn().mockResolvedValue()
      mockSetSearchTermAction = jest.fn().mockResolvedValue()
      page = 1
      resultsPerPage = 25

      wrapper = mountPreMocked(SearchForm, {
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue(''),
              resultsPerPage: jest.fn().mockReturnValue(resultsPerPage)
            },
            actions: {
              setSearchTerm: mockSetSearchTermAction,
              search: mockSearchAction
            }
          }
        }
      })

      const searchBox = wrapper.get('#search-box')

      searchButton = wrapper.get('#search-button')

      searchBox.setValue(searchTerm)
      searchBox.trigger('blur')
      await flushValidationUpdates(wrapper)

      searchButton.trigger('click')
      await flushValidationUpdates(wrapper)
    })

    afterAll(() => {
      mockSearchAction.mockRestore()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not disable the search submit button', () => {
      expect(searchButton.attributes().disabled).toBeFalsy()
    })

    it('should set the current search term in the store', () => {
      expect(mockSetSearchTermAction).toHaveBeenCalledWith(expect.any(Object), searchTerm)
    })

    it('should call the search action', () => {
      expect(mockSearchAction).toHaveBeenCalledWith(expect.any(Object), { searchTerm, page, resultsPerPage })
    })
  })

  describe('when a search is performed that matches the current search term', () => {
    let searchButton
    let mockSearchAction
    let mockSetSearchTermAction
    let searchTerm

    // TODO: include validation rules
    beforeAll(async () => {
      searchTerm = 'test'
      mockSearchAction = jest.fn().mockResolvedValue([])
      mockSetSearchTermAction = jest.fn().mockResolvedValue()

      wrapper = mountPreMocked(SearchForm, {
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue('test'),
              resultsPerPage: jest.fn().mockReturnValue(25)
            },
            actions: {
              setSearchTerm: mockSetSearchTermAction,
              search: mockSearchAction
            }
          }
        }
      })

      const searchBox = wrapper.get('#search-box')

      searchButton = wrapper.get('#search-button')

      searchBox.setValue(searchTerm)
      searchBox.trigger('blur')
      await flushValidationUpdates(wrapper)

      searchButton.trigger('click')
      await flushValidationUpdates(wrapper)
    })

    afterAll(() => {
      mockSearchAction.mockRestore()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not disable the search submit button', () => {
      expect(searchButton.attributes().disabled).toBeFalsy()
    })

    it('should not set the current search term in the store', () => {
      expect(mockSetSearchTermAction).not.toHaveBeenCalled()
    })

    it('should not call the search action', () => {
      expect(mockSearchAction).not.toHaveBeenCalled()
    })
  })

  describe('when the search term container is focused', () => {
    let searchContainerClasses

    beforeAll(async () => {
      wrapper = mountPreMocked(SearchForm, {
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue(''),
              resultsPerPage: jest.fn().mockReturnValue(25)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue()
            }
          }
        }
      })

      const searchContainer = wrapper.get('.searchfield')

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
      expect(searchContainerClasses).toContain('search__container')
    })

    it('should contain the focused search container css classes', () => {
      expect(searchContainerClasses).toContain('search__container')
      expect(searchContainerClasses).toContain('search__container--focused')
    })
  })

  describe('when the search term container is not focused and there are no search errors', () => {
    let searchContainerClasses

    beforeAll(() => {
      wrapper = mountPreMocked(SearchForm, {
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue(''),
              resultsPerPage: jest.fn().mockReturnValue(25)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue()
            }
          }
        }
      })

      searchContainerClasses = wrapper.get('.searchfield').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should contain the default search container css classes', () => {
      expect(searchContainerClasses).toContain('search__container')
    })

    it('should not contain the focused search container css classes', () => {
      expect(searchContainerClasses).not.toContain('search__container--focused')
    })
  })

  describe('when the search term input is not focused and there are no errors', () => {
    let searchInputClasses

    beforeAll(() => {
      wrapper = mountPreMocked(SearchForm, {
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue(''),
              resultsPerPage: jest.fn().mockReturnValue(25)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue()
            }
          }
        }
      })

      searchInputClasses = wrapper.get('#search-box').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should contain the default search input css classes', () => {
      expect(searchInputClasses).toContain('search__input')
    })
  })

  describe('when clicking the clear search text button', () => {
    let searchClearButton
    let searchBox

    beforeAll(async () => {
      wrapper = mountPreMocked(SearchForm, {
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue(''),
              resultsPerPage: jest.fn().mockReturnValue(25)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue()
            }
          }
        }
      })

      searchBox = wrapper.get('#search-box')
      searchBox.setValue('test')
      searchBox.trigger('blur')
      await flushValidationUpdates(wrapper)

      searchClearButton = wrapper.get('.searchfield__clear')
      searchClearButton.trigger('click')
      await flushValidationUpdates(wrapper)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render the nuxt tag', () => {
      expect(wrapper.get('#search-button').attributes().disabled).toBeTruthy()
    })

    it('should set the search term to an empty string', () => {
      expect(wrapper.vm.searchTerm).toBe('')
    })

    it('should clear the search field', () => {
      expect(wrapper.get('#search-box').element.value).toBe('')
    })
  })
})
