import VueScrollTo from 'vue-scrollto'
import flushPromises from 'flush-promises'
import IndexPage from '.'

jest.mock('vue-scrollto')

describe('Index Page', () => {
  let wrapper

  const createWrapper = ({ store = {} } = {}) => {
    const { users, ...storeModules } = store

    return mountPreMocked(IndexPage, {
      store: {
        users: {
          getters: {
            results: jest.fn().mockReturnValue([]),
            currentSearchTerm: jest.fn().mockReturnValue(''),
            resultsPerPage: jest.fn().mockReturnValue(25),
            numberOfResults: jest.fn().mockReturnValue(0),
            currentPage: jest.fn().mockReturnValue(1),
            userDetailsByUsername: jest.fn().mockReturnValue(jest.fn().mockReturnValue()),
            selectedUser: jest.fn().mockReturnValue(null),
            ...(users?.getters || {})
          },
          actions: {
            search: jest.fn().mockResolvedValue(),
            setPage: jest.fn().mockResolvedValue(),
            get: jest.fn().mockResolvedValue(),
            setSelectedUser: jest.fn().mockResolvedValue(),
            ...(users?.actions || {})
          }
        },
        ...(storeModules || {})
      }
    })
  }

  beforeAll(() => {
    VueScrollTo.scrollTo = jest.fn()
  })

  describe('initial display', () => {
    beforeAll(() => {
      wrapper = createWrapper()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the search form', () => {
      expect(wrapper.get('#search-form').element).toBeVisible()
    })

    it('should display the results box', () => {
      expect(wrapper.get('#results-box').element).toBeVisible()
    })
  })

  describe('when the next page of results is clicked, and the results have already been fetched', () => {
    let results
    let mockedSearch
    let mockedSetPage
    let clickedPage
    let getElementByIdSpy

    beforeAll(async () => {
      getElementByIdSpy = jest.spyOn(global.window.document, 'getElementById')
      getElementByIdSpy.mockImplementation(() => ({}))

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
      mockedSearch = jest.fn().mockResolvedValue()
      mockedSetPage = jest.fn().mockResolvedValue()

      wrapper = createWrapper({
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue(results),
              numberOfResults: jest.fn().mockReturnValue(9),
              resultsPerPage: jest.fn().mockReturnValue(3),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              search: mockedSearch,
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
      getElementByIdSpy.mockRestore()
      mockedSetPage.mockReset()
      mockedSearch.mockReset()
      VueScrollTo.scrollTo.mockReset()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not fetch the page of results', () => {
      expect(mockedSearch).not.toHaveBeenCalled()
    })

    it('should call the set page action', () => {
      expect(mockedSetPage).toHaveBeenCalledWith(expect.any(Object), clickedPage)
    })

    it('should scroll to the clicked page', () => {
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
    let mockedSearch
    let mockedSetPage
    let clickedPage
    let getElementByIdSpy
    let currentSearchTerm

    beforeAll(async () => {
      currentSearchTerm = 'test'

      getElementByIdSpy = jest.spyOn(global.window.document, 'getElementById')
      getElementByIdSpy
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => ({
          scrollHeight: 100
        }))

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
      mockedSearch = jest.fn().mockResolvedValue()
      mockedSetPage = jest.fn().mockResolvedValue()

      wrapper = createWrapper({
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue(results),
              currentSearchTerm: jest.fn().mockReturnValue(currentSearchTerm),
              numberOfResults: jest.fn().mockReturnValue(9),
              resultsPerPage: jest.fn().mockReturnValue(3),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              search: mockedSearch,
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
      getElementByIdSpy.mockRestore()
      mockedSearch.mockReset()
      mockedSetPage.mockReset()
      VueScrollTo.scrollTo.mockReset()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should fetch the page of results', () => {
      expect(mockedSearch).toHaveBeenCalledWith(expect.any(Object), {
        searchTerm: currentSearchTerm,
        page: clickedPage,
        resultsPerPage: wrapper.vm.resultsPerPage
      })
    })

    it('should not call the set page action', () => {
      expect(mockedSetPage).not.toHaveBeenCalled()
    })

    it('should scroll to the clicked page', () => {
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

  describe('when the next page of results is clicked, but another scroll is taking place', () => {
    let results
    let mockedSearch
    let mockedSetPage
    let clickedPage
    let getElementByIdSpy

    beforeAll(async () => {
      getElementByIdSpy = jest.spyOn(global.window.document, 'getElementById')
      getElementByIdSpy.mockImplementation(() => undefined)

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
      mockedSearch = jest.fn().mockResolvedValue({})
      mockedSetPage = jest.fn().mockResolvedValue()

      wrapper = createWrapper({
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue(results),
              numberOfResults: jest.fn().mockReturnValue(9),
              resultsPerPage: jest.fn().mockReturnValue(3),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              search: mockedSearch,
              setPage: mockedSetPage
            }
          }
        }
      })

      wrapper.setData({ currentScrollCancellation: {} })
      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.get(`.page__link--${clickedPage}`).trigger('click')
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      getElementByIdSpy.mockRestore()
      mockedSetPage.mockReset()
      mockedSearch.mockReset()
      VueScrollTo.scrollTo.mockReset()
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not fetch the page of results', () => {
      expect(mockedSearch).not.toHaveBeenCalled()
    })

    it('should not call the set page action', () => {
      expect(mockedSetPage).not.toHaveBeenCalled()
    })

    it('should not scroll to the page', () => {
      expect(VueScrollTo.scrollTo).not.toHaveBeenCalled()
    })
  })

  describe('when a user from the results list is selected', () => {
    let results
    let selectedUser
    let mockSetSelectedUser

    beforeAll(async () => {
      selectedUser = { id: 2, login: 'user2' }

      results = [
        {
          id: 1,
          page: 1,
          users: [
            { id: 1, login: 'user1' },
            selectedUser,
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

      mockSetSelectedUser = jest.fn().mockResolvedValue()

      wrapper = createWrapper({
        store: {
          users: {
            getters: {
              results: jest.fn().mockReturnValue(results),
              numberOfResults: jest.fn().mockReturnValue(9),
              resultsPerPage: jest.fn().mockReturnValue(3),
              currentPage: jest.fn().mockReturnValue(1)
            },
            actions: {
              setSelectedUser: mockSetSelectedUser
            }
          }
        }
      })

      wrapper.vm.handleUserSelected(selectedUser)
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      mockSetSelectedUser.mockReset()
      wrapper.destroy()
    })

    it('should call the action to set the selected user', () => {
      expect(mockSetSelectedUser).toHaveBeenCalledWith(expect.any(Object), selectedUser)
    })

    it('should show the User Details Drawer', () => {
      expect(wrapper.vm.showUserDetailsDrawer).toBe(true)
    })
  })
})
