import flushPromises from 'flush-promises'
import SearchResults from '.'

describe('Search Results', () => {
  let wrapper

  const createWrapper = ({ store = {} } = {}) => {
    const { users, ...storeModules } = store

    return mountPreMocked(SearchResults, {
      store: {
        users: {
          getters: {
            results: jest.fn().mockReturnValue([]),
            currentSearchTerm: jest.fn().mockReturnValue(''),
            resultsPerPage: jest.fn().mockReturnValue(25),
            currentPage: jest.fn().mockReturnValue(1),
            userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
            ...(users?.getters || {})
          },

          actions: {
            search: jest.fn().mockResolvedValue(),
            setPage: jest.fn().mockResolvedValue(),
            get: jest.fn().mockResolvedValue(),
            ...(users?.actions || {})
          }
        },
        ...storeModules
      }
    })
  }

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

      wrapper = createWrapper({
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue(results),
              resultsPerPage: jest.fn().mockReturnValue(1),
              currentPage: jest.fn().mockReturnValue(1)
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
      wrapper = createWrapper()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the search results container', () => {
      expect(wrapper.get('.results').element).toBeVisible()
    })

    it('should not display any search results ', () => {
      expect(() => wrapper.get('.search__result')).toThrow()
    })
  })

  describe('when the adding the scroll listener', () => {
    let mockedResultsScrollBox

    beforeAll(() => {
      wrapper = createWrapper()

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
      wrapper = createWrapper()

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
      wrapper = createWrapper()
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
    let mockedSearch
    let updateScrolledPageSpy

    beforeAll(async () => {
      mockedSearch = jest.fn().mockResolvedValue()
      wrapper = createWrapper({
        store: {
          users: {
            actions: {
              search: mockedSearch
            }
          }
        }
      })

      mockedResultsScrollBox = {
        scrollHeight: 770,
        scrollTop: 0,
        offsetHeight: 500
      }

      updateScrolledPageSpy = jest.spyOn(wrapper.vm, 'updateScrolledPage')
      updateScrolledPageSpy.mockImplementation(() => {})

      await wrapper.vm.handleScrollHelper(mockedResultsScrollBox)
    })

    afterAll(() => {
      updateScrolledPageSpy.mockRestore()
      wrapper.destroy()
    })

    it('should not fetch the next page of results', () => {
      expect(mockedSearch).not.toHaveBeenCalled()
    })

    it('should not set the max scroll position to the height of the scrollable content', () => {
      expect(wrapper.vm.maxScrollPosition).not.toBe(mockedResultsScrollBox.scrollHeight)
    })

    it('should update the current page to the scrolled page', () => {
      expect(updateScrolledPageSpy).toBeCalled()
    })
  })

  describe('when scrolling and the scrollable content under the results box is less than 1.5 pages', () => {
    let mockedResultsScrollBox
    let mockedSearch
    let updateScrolledPageSpy
    let currentSearchTerm

    beforeAll(async () => {
      currentSearchTerm = 'test'
      mockedSearch = jest.fn().mockResolvedValue()

      wrapper = createWrapper({
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue(currentSearchTerm)
            },
            actions: {
              search: mockedSearch
            }
          }
        }
      })

      mockedResultsScrollBox = {
        scrollHeight: 500,
        scrollTop: 300,
        offsetHeight: 500
      }

      updateScrolledPageSpy = jest.spyOn(wrapper.vm, 'updateScrolledPage')
      updateScrolledPageSpy.mockImplementation(() => {})

      await wrapper.vm.handleScrollHelper(mockedResultsScrollBox)
      await flushPromises()
    })

    afterAll(() => {
      updateScrolledPageSpy.mockRestore()
      wrapper.destroy()
    })

    it('should fetch the next page of results', () => {
      expect(mockedSearch).toHaveBeenCalledWith(expect.any(Object), {
        searchTerm: currentSearchTerm,
        page: wrapper.vm.currentPage + 1,
        resultsPerPage: wrapper.vm.resultsPerPage
      })
    })

    it('should set the max scroll position to the height of the scrollable content', () => {
      expect(wrapper.vm.maxScrollPosition).toBe(mockedResultsScrollBox.scrollHeight)
    })

    it('should update the current page to the scrolled page', () => {
      expect(updateScrolledPageSpy).toHaveBeenCalled()
    })
  })

  describe('when scrolling and the scrollable content under the results box is less than 1.5 pages, but we are already fetching the next page', () => {
    let mockedResultsScrollBox
    let mockedSearch
    let updateScrolledPageSpy
    let currentSearchTerm

    beforeAll(async () => {
      currentSearchTerm = 'test'
      mockedSearch = jest.fn().mockResolvedValue()

      wrapper = createWrapper({
        store: {
          users: {
            getters: {
              currentSearchTerm: jest.fn().mockReturnValue(currentSearchTerm)
            },
            actions: {
              search: mockedSearch
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

      updateScrolledPageSpy = jest.spyOn(wrapper.vm, 'updateScrolledPage')
      updateScrolledPageSpy.mockImplementation(() => { })

      await wrapper.vm.handleScrollHelper(mockedResultsScrollBox)
      await flushPromises()
    })

    afterAll(() => {
      updateScrolledPageSpy.mockRestore()
      wrapper.destroy()
    })

    it('should not fetch the next page of results', () => {
      expect(mockedSearch).not.toHaveBeenCalled()
    })

    it('should not set the max scroll position to the height of the scrollable content', () => {
      expect(wrapper.vm.maxScrollPosition).not.toBe(mockedResultsScrollBox.scrollHeight)
    })

    it('should update the current page to the scrolled page', () => {
      expect(updateScrolledPageSpy).toHaveBeenCalled()
    })
  })

  describe('when updating the scrolled to page, and the scrolled page is greater than the current page', () => {
    let mockedSetPage
    let mockedResultsScrollBox

    beforeAll(async () => {
      mockedSetPage = jest.fn().mockResolvedValue()
      wrapper = createWrapper({
        store: {
          users: {
            actions: {
              setPage: mockedSetPage
            }
          }
        }
      })

      mockedResultsScrollBox = {
        scrollTop: 300,
        children: [ { clientHeight: 150 }, { clientHeight: 300 } ]
      }

      await wrapper.vm.updateScrolledPage(mockedResultsScrollBox)
    })

    afterAll(() => {
      mockedSetPage.mockReset()
      wrapper.destroy()
    })

    it('should set the current page to the scrolled to page ', () => {
      expect(mockedSetPage).toHaveBeenCalledWith(expect.any(Object), 2)
    })
  })

  describe('when updating the scrolled to page, and the scrolled page is less than the current page', () => {
    let mockedSetPage
    let mockedResultsScrollBox

    beforeAll(async () => {
      mockedSetPage = jest.fn().mockResolvedValue()
      wrapper = createWrapper({
        store: {
          users: {
            getters: {
              currentPage: jest.fn().mockReturnValue(2)
            },

            actions: {
              setPage: mockedSetPage
            }
          }
        }
      })

      mockedResultsScrollBox = {
        scrollTop: 100,
        children: [ { clientHeight: 150 }, { clientHeight: 300 } ]
      }
      await wrapper.vm.updateScrolledPage(mockedResultsScrollBox)
    })

    afterAll(() => {
      mockedSetPage.mockReset()
      wrapper.destroy()
    })

    it('should set the current page to the scrolled to page ', () => {
      expect(mockedSetPage).toHaveBeenCalledWith(expect.any(Object), 1)
    })
  })

  describe('when updating the scrolled to page, and the scrolled page is the same as the current page', () => {
    let mockedSetPage
    let mockedResultsScrollBox

    beforeAll(async () => {
      mockedSetPage = jest.fn().mockResolvedValue()
      wrapper = createWrapper({
        store: {
          users: {
            actions: {
              setPage: mockedSetPage
            }
          }
        }
      })

      mockedResultsScrollBox = {
        scrollTop: 150,
        children: [ { clientHeight: 150 }, { clientHeight: 300 } ]
      }

      await wrapper.vm.updateScrolledPage(mockedResultsScrollBox)
    })

    afterAll(() => {
      mockedSetPage.mockReset()
      wrapper.destroy()
    })

    it('should not set the current page to the scrolled to page ', () => {
      expect(mockedSetPage).not.toBeCalled()
    })
  })
})
