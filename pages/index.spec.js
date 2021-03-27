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
    let mockSearchAction

    beforeAll(async () => {
      mockSearchAction = jest.fn().mockResolvedValue([])
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue([])
            },
            actions: {
              search: jest.fn().mockResolvedValue([])
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

    it('should display an error message about the search term being required', () => {

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
      mockSearchAction = jest.fn().mockResolvedValue([])
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue([])
            },
            actions: {
              search: jest.fn().mockResolvedValue([])
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

    it('should display an error message about the search term being invalid', () => {

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
    let searchTerm

    // TODO: include validation rules
    beforeAll(async () => {
      searchTerm = 'test'
      mockSearchAction = jest.fn().mockResolvedValue([])
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue([])
            },
            actions: {
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

    it('should not display an error message about the search term being invalid', () => {

    })

    it('should not disable the search submit button', () => {
      expect(searchButton.attributes().disabled).toBeFalsy()
    })

    it('should call the search action', () => {
      expect(mockSearchAction).toHaveBeenCalledWith(expect.any(Object), { simpleSearchTerm: searchTerm })
    })
  })

  describe('when the search term container is focused', () => {
    let searchContainerClasses

    beforeAll(async () => {
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue([])
            },
            actions: {
              search: jest.fn().mockResolvedValue([])
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
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue([])
            },
            actions: {
              search: jest.fn().mockResolvedValue([])
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
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue([])
            },
            actions: {
              search: jest.fn().mockResolvedValue([])
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
      expect(searchInputClasses).toContain('placeholder-indigo-50')
    })
  })

  describe('when clicking the clear search text button', () => {
    let searchClearButton
    let searchBox

    beforeAll(async () => {
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue([])
            },
            actions: {
              search: jest.fn().mockResolvedValue([])
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

    it('should disable the search submit button', () => {
      expect(wrapper.get('#search-button').attributes().disabled).toBeTruthy()
    })
  })

  describe('initial display', () => {
    beforeAll(async () => {
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue([])
            },
            actions: {
              search: jest.fn().mockResolvedValue([])
            }
          }
        }
      })

      await flushValidationUpdates(wrapper)
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
      const searchButton = wrapper.get('#search-button')

      expect(searchButton.element).toBeVisible()
      expect(searchButton.attributes().disabled).toBeTruthy()
    })

    it('should display the results box', () => {
      expect(wrapper.get('#results-box').element).toBeVisible()
    })
  })

  describe('when there are search results to be displayed', () => {
    let users

    beforeAll(() => {
      users = [
        { id: 1, login: 'user1' },
        { id: 2, login: 'user2' },
        { id: 3, login: 'user3' }
      ]

      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue(users)
            },
            actions: {
              search: jest.fn().mockResolvedValue([])
            }
          }
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display a search result for each user', () => {
      users.forEach(user => {
        const userSearchResult = wrapper.get(`#search-result-${user.id}`)

        expect(userSearchResult.element).toBeVisible()
      })
    })
  })

  describe('when there are no search results to be displayed', () => {
    let users

    beforeAll(() => {
      users = []

      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              users: jest.fn().mockReturnValue(users)
            },
            actions: {
              search: jest.fn().mockResolvedValue([])
            }
          }
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not display any search results ', () => {
      expect(() => wrapper.get('.search__result')).toThrow()
    })
  })
})
