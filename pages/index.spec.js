import VueScrollTo from 'vue-scrollto'
import flushPromises from 'flush-promises'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import IndexPage from '.'

jest.mock('vue-scrollto')

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
    VueScrollTo.scrollTo = jest.fn()
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
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
      mockSearchAction = jest.fn().mockResolvedValue([])
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
    let mockSetSearchTermAction
    let searchTerm

    // TODO: include validation rules
    beforeAll(async () => {
      searchTerm = 'test'
      mockSearchAction = jest.fn().mockResolvedValue([])
      mockSetSearchTermAction = jest.fn().mockResolvedValue()

      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: mockSetSearchTermAction,
              search: mockSearchAction,
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
      expect(mockSearchAction).toHaveBeenCalledWith(expect.any(Object), undefined)
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

      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue('test'),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: mockSetSearchTermAction,
              search: mockSearchAction,
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
    let results

    beforeAll(() => {
      results = [
        {
          id: 1,
          page: 1,
          users: [
            { id: 1, login: 'user1' },
            { id: 2, login: 'user2' },
            { id: 3, login: 'user3' }
          ]
        },
        {
          id: 2,
          page: 2,
          users: [
            { id: 4, login: 'user4' },
            { id: 5, login: 'user5' },
            { id: 6, login: 'user6' }
          ]
        }
      ]

      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue(results),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(1),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
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
      results.forEach(result => {
        const resultList = wrapper.get(`#page-${result.page}`)

        expect(resultList.element).toBeVisible()

        result.users.forEach(user => {
          const userSearchResult = wrapper.get(`#search-result-${user.id}`)

          expect(userSearchResult.element).toBeVisible()
        })
      })
    })
  })

  describe('when there are no search results to be displayed', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue()
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

  describe('when the adding the scroll listener', () => {
    let mockedResultsScrollBox

    beforeAll(() => {
      wrapper = shallowPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
            }
          }
        }
      })

      mockedResultsScrollBox = {
        addEventListener: jest.fn()
      }

      wrapper.vm.addScrollListener(mockedResultsScrollBox)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should add an event listener to the element that is passed in', () => {
      expect(mockedResultsScrollBox.addEventListener).toHaveBeenCalledWith('scroll', wrapper.vm.handleResultsScrolled)
    })
  })

  describe('when removing the scroll listener', () => {
    let mockedResultsScrollBox

    beforeAll(() => {
      wrapper = shallowPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
            }
          }
        }
      })

      mockedResultsScrollBox = {
        removeEventListener: jest.fn()
      }

      wrapper.vm.removeScrollListener(mockedResultsScrollBox)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should remove an event listener to the element that is passed in', () => {
      expect(mockedResultsScrollBox.removeEventListener).toHaveBeenCalledWith('scroll', wrapper.vm.handleResultsScrolled)
    })
  })

  describe('handleResultsScrolled', () => {
    let handleScrollHelperSpy

    beforeAll(() => {
      wrapper = shallowPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
            }
          }
        }
      })
      handleScrollHelperSpy = jest.spyOn(wrapper.vm, 'handleScrollHelper')

      wrapper.vm.handleResultsScrolled()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should remove an event listener to the element that is passed in', () => {
      expect(handleScrollHelperSpy).toHaveBeenCalledWith(wrapper.vm.$refs.results)
    })
  })

  describe('when scrolling and the scrollable content under the results box is greater than 1.5 pages', () => {
    let mockedResultsScrollBox
    let mockedNextAction

    beforeAll(async () => {
      mockedNextAction = jest.fn().mockResolvedValue()
      wrapper = shallowPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: mockedNextAction,
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
            }
          }
        }
      })

      mockedResultsScrollBox = {
        scrollHeight: 770,
        scrollTop: 0,
        offsetHeight: 500
      }

      await wrapper.vm.handleScrollHelper(mockedResultsScrollBox)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should not fetch the next page of results', () => {
      expect(mockedNextAction).not.toHaveBeenCalled()
    })

    it('should not set the max scroll position to the height of the scrollable content', () => {
      expect(wrapper.vm.maxScrollPosition).not.toBe(mockedResultsScrollBox.scrollHeight)
    })
  })

  describe('when scrolling and the scrollable content under the results box is less than 1.5 pages', () => {
    let mockedResultsScrollBox
    let mockedNextAction

    beforeAll(async () => {
      mockedNextAction = jest.fn().mockResolvedValue()
      wrapper = shallowPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: mockedNextAction,
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
            }
          }
        }
      })

      mockedResultsScrollBox = {
        scrollHeight: 500,
        scrollTop: 300,
        offsetHeight: 500
      }

      await wrapper.vm.handleScrollHelper(mockedResultsScrollBox)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should fetch the next page of results', () => {
      expect(mockedNextAction).toHaveBeenCalled()
    })

    it('should set the max scroll position to the height of the scrollable content', () => {
      expect(wrapper.vm.maxScrollPosition).toBe(mockedResultsScrollBox.scrollHeight)
    })
  })

  describe('when scrolling and the scrollable content under the results box is less than 1.5 pages, but we are already fetching the next page', () => {
    let mockedResultsScrollBox
    let mockedNextAction

    beforeAll(async () => {
      mockedNextAction = jest.fn().mockResolvedValue()
      wrapper = shallowPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue([]),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              numberOfResults: jest.fn().mockReturnValue(0),
              resultsPerPage: jest.fn().mockReturnValue(25),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: mockedNextAction,
              fetchPage: jest.fn().mockResolvedValue(),
              setPage: jest.fn().mockResolvedValue()
            }
          }
        }
      })

      mockedResultsScrollBox = {
        scrollHeight: 500,
        scrollTop: 300,
        offsetHeight: 500
      }

      wrapper.setData({
        fetchingTheNextPage: true
      })

      await wrapper.vm.handleScrollHelper(mockedResultsScrollBox)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should not fetch the next page of results', () => {
      expect(mockedNextAction).not.toHaveBeenCalled()
    })

    it('should not set the max scroll position to the height of the scrollable content', () => {
      expect(wrapper.vm.maxScrollPosition).not.toBe(mockedResultsScrollBox.scrollHeight)
    })
  })

  describe('when the next page of results is clicked, and the results have already been fetched', () => {
    let results
    let mockedFetchPage
    let mockedSetPage
    let clickedPage

    beforeAll(async () => {
      results = [
        {
          id: 1,
          page: 1,
          users: [
            { id: 1, login: 'user1' },
            { id: 2, login: 'user2' },
            { id: 3, login: 'user3' }
          ]
        },
        {
          id: 2,
          page: 2,
          users: [
            { id: 4, login: 'user4' },
            { id: 5, login: 'user5' },
            { id: 6, login: 'user6' }
          ]
        },
        {
          id: 3,
          page: 3,
          users: [
            { id: 7, login: 'user7' },
            { id: 8, login: 'user8' },
            { id: 9, login: 'user9' }
          ]
        }
      ]

      clickedPage = 2
      mockedFetchPage = jest.fn().mockResolvedValue()
      mockedSetPage = jest.fn().mockResolvedValue()

      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue(results),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(9),
              resultsPerPage: jest.fn().mockReturnValue(3),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: mockedFetchPage,
              setPage: mockedSetPage
            }
          }
        }
      })

      wrapper.get(`.page__link--${clickedPage}`).trigger('click')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      mockedSetPage.mockReset()
      mockedFetchPage.mockReset()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not fetch the page of results', () => {
      expect(mockedFetchPage).not.toHaveBeenCalled()
    })

    it('should call the set page action', () => {
      expect(mockedSetPage).toHaveBeenCalledWith(expect.any(Object), clickedPage)
    })

    it('should set the pagination page to the next page', () => {
      expect(VueScrollTo.scrollTo).toHaveBeenCalledWith(`#page-${clickedPage}`, 500, {
        container: '#results',
        easing: 'ease-in',
        lazy: false,
        offset: 0,
        force: true,
        cancelable: true,
        x: false,
        y: true
      })
    })
  })

  describe('when the next page of results is clicked, and the results have not already been fetched', () => {
    let results
    let mockedFetchPage
    let mockedSetPage
    let clickedPage

    beforeAll(async () => {
      results = [
        {
          id: 1,
          page: 1,
          users: [
            { id: 1, login: 'user1' },
            { id: 2, login: 'user2' },
            { id: 3, login: 'user3' }
          ]
        }
      ]

      clickedPage = 2
      mockedFetchPage = jest.fn().mockResolvedValue()
      mockedSetPage = jest.fn().mockResolvedValue()

      wrapper = mountPreMocked(IndexPage, {
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue(results),
              currentSearchTerm: jest.fn().mockReturnValue(''),
              userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
              numberOfResults: jest.fn().mockReturnValue(9),
              resultsPerPage: jest.fn().mockReturnValue(3),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSearchTerm: jest.fn().mockResolvedValue(),
              search: jest.fn().mockResolvedValue([]),
              fetchNextPage: jest.fn().mockResolvedValue(),
              get: jest.fn().mockResolvedValue(),
              fetchPage: mockedFetchPage,
              setPage: mockedSetPage
            }
          }
        }
      })

      wrapper.get(`.page__link--${clickedPage}`).trigger('click')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      mockedFetchPage.mockReset()
      mockedSetPage.mockReset()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should fetch the page of results', () => {
      expect(mockedFetchPage).toHaveBeenCalledWith(expect.any(Object), clickedPage)
    })

    it('should not call the set page action', () => {
      expect(mockedSetPage).not.toHaveBeenCalled()
    })

    it('should set the pagination page to the next page', () => {
      expect(VueScrollTo.scrollTo).toHaveBeenCalledWith(`#page-${clickedPage}`, 500, {
        container: '#results',
        easing: 'ease-in',
        lazy: false,
        offset: 0,
        force: true,
        cancelable: true,
        x: false,
        y: true
      })
    })
  })
})
