import { state, mutations, actions, getters } from './users'

describe('state', () => {
  let defaultState

  beforeAll(() => {
    defaultState = state()
  })

  it('should have an empty results object on the default state', () => {
    const { results } = defaultState

    expect(results).toEqual({})
  })

  it('should have a default number of user search results per page on the default state', () => {
    const { resultsPerPage } = defaultState

    expect(resultsPerPage).toBe(25)
  })

  it('should have the current page of user search results on the default state', () => {
    const { currentPage } = defaultState

    expect(currentPage).toBe(1)
  })

  it('should have the total number of user search results on the default state', () => {
    const { numberOfResults } = defaultState

    expect(numberOfResults).toBe(0)
  })

  it('should have an empty cache of user detail results on the default state', () => {
    const { userDetailsCache } = defaultState

    expect(userDetailsCache).toEqual({})
  })

  it('should set the current search term to an empty string', () => {
    const { currentSearchTerm } = defaultState

    expect(currentSearchTerm).toBe('')
  })
})

describe('mutations', () => {
  describe('ADD_SEARCH_RESULTS - when there is no data in the cache', () => {
    let currentState
    let result

    beforeAll(() => {
      currentState = { results: {} }
      result = { cacheKey: '/search/usersTest25', id: 1, totalCount: 5000, page: 1, usersOnPage: 15, users: [], expiresAt: 1234 }

      mutations.ADD_SEARCH_RESULTS(currentState, result)
    })

    it('should add the result to the list of search results', () => {
      const { cacheKey, ...results } = result

      expect(currentState.results).toEqual({
        [cacheKey]: {
          1: results
        }
      })
    })
  })

  describe('ADD_SEARCH_RESULTS - when there is data in the cache', () => {
    let currentState
    let result1
    let result2

    beforeAll(() => {
      result1 = { cacheKey: '/search/usersTest25', id: 1, totalCount: 5000, page: 1, usersOnPage: 15, users: [], expiresAt: 1234 }
      result2 = { cacheKey: '/search/usersTest25', id: 2, totalCount: 5000, page: 2, usersOnPage: 15, users: [], expiresAt: 1234 }
      const { cacheKey, ...results1 } = result1

      currentState = {
        results: {
          [result1.cacheKey]: {
            1: results1
          }
        }
      }

      mutations.ADD_SEARCH_RESULTS(currentState, result2)
    })

    it('should add the result to the list of search results', () => {
      const { cacheKey, ...results1 } = result1
      const { cacheKey: cacheKey2, ...results2 } = result2

      expect(currentState.results).toEqual({
        [cacheKey]: {
          1: results1,
          2: results2
        }
      })
    })
  })

  describe('SET_NUMBER_OF_TOTAL_RESULTS', () => {
    let currentState
    let numberOfResults

    beforeAll(() => {
      currentState = { numberOfResults: 0 }
      numberOfResults = 30

      mutations.SET_NUMBER_OF_TOTAL_RESULTS(currentState, numberOfResults)
    })

    it('should assign the number of user search results to the number of results on the state', () => {
      expect(currentState.numberOfResults).toEqual(numberOfResults)
    })
  })

  describe('SET_USER_DETAILS', () => {
    let currentState
    let userDetails

    beforeAll(() => {
      currentState = { userDetailsCache: {} }
      userDetails = {
        username: 'test_user',
        data: {
          name: 'Test User'
        },
        expiresAt: 1234
      }

      mutations.SET_USER_DETAILS(currentState, userDetails)
    })

    it('should insert the user details into the cache by username', () => {
      expect(currentState.userDetailsCache[userDetails.username]).toEqual(userDetails)
    })
  })

  describe('SET_SEARCH_TERM', () => {
    let currentState
    let searchTerm

    beforeAll(() => {
      searchTerm = 'Test'

      currentState = {
        currentSearchTerm: ''
      }

      mutations.SET_SEARCH_TERM(currentState, searchTerm)
    })

    it('should increment the current page', () => {
      expect(currentState.currentSearchTerm).toBe(searchTerm)
    })
  })

  describe('RESET_RESULTS', () => {
    let currentState

    beforeAll(() => {
      currentState = {
        results: {
          cacheKey: {
            1: { id: 1, totalCount: 100, page: 2, usersOnPage: 50, users: [] }
          }
        }
      }

      mutations.RESET_RESULTS(currentState)
    })

    it('should increment the current page', () => {
      expect(currentState.results).toEqual({})
    })
  })

  describe('SET_CURRENT_PAGE', () => {
    let currentState
    let page

    beforeAll(() => {
      currentState = {
        currentPage: 32
      }

      page = 2

      mutations.SET_CURRENT_PAGE(currentState, page)
    })

    it('should set the current page to the passed in page', () => {
      expect(currentState.currentPage).toEqual(page)
    })
  })
})

describe('actions', () => {
  let dispatch
  let commit
  let $axios

  beforeAll(() => {
    commit = jest.fn()
    dispatch = jest.fn()

    $axios = {
      get: jest.fn().mockResolvedValue(),
      delete: jest.fn().mockResolvedValue(),
      post: jest.fn().mockResolvedValue(),
      put: jest.fn().mockResolvedValue()
    }

    Object.keys(actions).forEach(actionFnName => {
      actions[actionFnName] = actions[actionFnName].bind({ $axios })
    })
  })

  describe('when setting a new search term', () => {
    let searchTerm
    let currentState

    beforeAll(async () => {
      searchTerm = 'Test'
      currentState = {
        currentSearchTerm: ''
      }

      await actions.setSearchTerm({ commit, state: currentState }, searchTerm)
    })

    afterAll(() => {
      commit.mockReset()
    })

    it('should make a commit to set the new search term', () => {
      expect(commit).toBeCalledWith('SET_SEARCH_TERM', searchTerm)
    })
  })

  describe('when setting a search term that matches the current search term ', () => {
    let searchTerm
    let currentState

    beforeAll(async () => {
      searchTerm = 'Test'
      currentState = {
        currentSearchTerm: 'test'
      }

      await actions.setSearchTerm({ commit, state: currentState }, searchTerm)
    })

    afterAll(() => {
      commit.mockReset()
    })

    it('should not make a commit to set the new search term or reset the search results', () => {
      expect(commit).not.toBeCalled()
    })
  })

  describe('when a search action call is made for results that have not been cached', () => {
    let mockReturnedUsers
    let mockNumOfTotalResults
    let currentState
    let page
    let resultsPerPage
    let searchTerm
    let cacheKey

    beforeAll(async () => {
      mockReturnedUsers = [{ foo: 'bar' }]
      searchTerm = 'foo'
      resultsPerPage = 15
      page = 1
      cacheKey = `/api/users${searchTerm}${resultsPerPage}`

      currentState = {
        results: {}
      }
      mockNumOfTotalResults = 25

      $axios.get = jest.fn().mockResolvedValue({
        data: {
          total_count: mockNumOfTotalResults,
          items: mockReturnedUsers
        }
      })

      await actions.search({ commit, state: currentState }, { searchTerm, page, resultsPerPage })
    })

    afterAll(() => {
      commit.mockReset()
      $axios.get.mockReset()
    })

    it('should make a get request to get users using the simple search term', () => {
      expect($axios.get).toHaveBeenCalledWith('/api/users', expect.objectContaining({
        params: {
          q: searchTerm,
          per_page: resultsPerPage,
          page
        }
      }))
    })

    it('should perform the SET_USERS mutation with the search results', () => {
      expect(commit).toHaveBeenCalledWith('ADD_SEARCH_RESULTS', {
        cacheKey,
        id: expect.any(String),
        totalCount: mockNumOfTotalResults,
        page,
        usersOnPage: mockReturnedUsers.length,
        users: mockReturnedUsers,
        expiresAt: expect.any(Number)
      })
    })

    it('should perform the SET_NUMBER_OF_TOTAL_RESULTS mutation with the number of total returned search results', () => {
      expect(commit).toHaveBeenCalledWith('SET_NUMBER_OF_TOTAL_RESULTS', mockNumOfTotalResults)
    })
  })

  describe('when a search action call is made for results that have been cached', () => {
    let mockReturnedUsers
    let mockNumOfTotalResults
    let currentState
    let page
    let resultsPerPage
    let searchTerm
    let cacheKey

    beforeAll(async () => {
      mockReturnedUsers = [{ foo: 'bar' }]
      searchTerm = 'foo'
      resultsPerPage = 15
      page = 1
      cacheKey = `/api/users${searchTerm}${resultsPerPage}`

      currentState = {
        results: {
          [cacheKey]: {
            [page]: {
              page,
              users: [],
              expiresAt: new Date(new Date().getTime() + 60 * 60000).getTime()
            }
          }
        }
      }
      mockNumOfTotalResults = 25

      $axios.get = jest.fn().mockResolvedValue({
        data: {
          total_count: mockNumOfTotalResults,
          items: mockReturnedUsers
        }
      })

      await actions.search({ commit, state: currentState }, { searchTerm, page, resultsPerPage })
    })

    afterAll(() => {
      commit.mockReset()
      $axios.get.mockReset()
    })

    it('should not make a get request to get users using the simple search term', () => {
      expect($axios.get).not.toHaveBeenCalled()
    })

    it('should not perform the SET_USERS mutation with the search results', () => {
      expect(commit).not.toHaveBeenCalled()
    })

    it('should not perform the SET_NUMBER_OF_TOTAL_RESULTS mutation with the number of total returned search results', () => {
      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('when a search action call is made for results that have been cached and are expired', () => {
    let mockReturnedUsers
    let mockNumOfTotalResults
    let currentState
    let page
    let resultsPerPage
    let searchTerm
    let cacheKey

    beforeAll(async () => {
      mockReturnedUsers = [{ foo: 'bar' }]
      searchTerm = 'foo'
      resultsPerPage = 15
      page = 1
      cacheKey = `/api/users${searchTerm}${resultsPerPage}`

      currentState = {
        results: {
          [cacheKey]: {
            [page]: {
              page,
              users: [],
              expiresAt: new Date(2021, 1, 1).getTime()
            }
          }
        }
      }
      mockNumOfTotalResults = 25

      $axios.get = jest.fn().mockResolvedValue({
        data: {
          total_count: mockNumOfTotalResults,
          items: mockReturnedUsers
        }
      })

      await actions.search({ commit, state: currentState }, { searchTerm, page, resultsPerPage })
    })

    afterAll(() => {
      commit.mockReset()
      $axios.get.mockReset()
    })

    it('should make a get request to get users using the simple search term', () => {
      expect($axios.get).toHaveBeenCalledWith('/api/users', expect.objectContaining({
        params: {
          q: searchTerm,
          per_page: resultsPerPage,
          page
        }
      }))
    })

    it('should perform the SET_USERS mutation with the search results', () => {
      expect(commit).toHaveBeenCalledWith('ADD_SEARCH_RESULTS', {
        cacheKey,
        id: expect.any(String),
        totalCount: mockNumOfTotalResults,
        page,
        usersOnPage: mockReturnedUsers.length,
        users: mockReturnedUsers,
        expiresAt: expect.any(Number)
      })
    })

    it('should perform the SET_NUMBER_OF_TOTAL_RESULTS mutation with the number of total returned search results', () => {
      expect(commit).toHaveBeenCalledWith('SET_NUMBER_OF_TOTAL_RESULTS', mockNumOfTotalResults)
    })
  })

  describe('when getting user details for a user that is not in the cache', () => {
    let currentState
    let username
    let mockedUserDetails

    beforeAll(async () => {
      username = 'test_user'
      mockedUserDetails = {
        name: 'Test User'
      }
      currentState = {
        userDetailsCache: {}
      }

      $axios.get = jest.fn().mockResolvedValue({
        data: mockedUserDetails
      })

      await actions.get({ commit, state: currentState }, { username })
    })

    afterAll(() => {
      commit.mockReset()
      $axios.get.mockReset()
    })

    it('should make a get request to get a user\'s details', () => {
      expect($axios.get).toHaveBeenCalledWith(`/api/users/${username}`)
    })

    it('should perform the SET_USER_DETAILS mutation with the user details results', () => {
      expect(commit).toHaveBeenCalledWith('SET_USER_DETAILS', {
        username,
        data: mockedUserDetails,
        expiresAt: expect.any(Number)
      })
    })
  })

  describe('when getting user details for a user that is in the cache', () => {
    let currentState
    let username
    let mockedUserDetails

    beforeAll(async () => {
      username = 'test_user'
      mockedUserDetails = {
        name: 'Test User'
      }
      currentState = {
        userDetailsCache: {
          [username]: mockedUserDetails
        }
      }

      $axios.get = jest.fn().mockResolvedValue()

      await actions.get({ commit, state: currentState }, { username })
    })

    afterAll(() => {
      commit.mockReset()
      $axios.get.mockReset()
    })

    it('should not make a get request to get a user\'s details', () => {
      expect($axios.get).not.toHaveBeenCalled()
    })

    it('should not perform the SET_USER_DETAILS mutation with the user details results', () => {
      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('when getting user details for a user that is in the cache, but the cached data is expired', () => {
    let currentState
    let username
    let mockedUserDetails

    beforeAll(async () => {
      jest.useFakeTimers()

      username = 'test_user'
      mockedUserDetails = {
        name: 'Test User'
      }
      currentState = {
        userDetailsCache: {}
      }

      $axios.get = jest.fn().mockResolvedValue({
        data: mockedUserDetails
      })

      await actions.get({ commit, state: currentState }, { username })

      jest.advanceTimersByTime(10 * 60000)

      await actions.get({ commit, state: currentState }, { username })
    })

    afterAll(() => {
      jest.useRealTimers()
      commit.mockReset()
      $axios.get.mockReset()
    })

    it('should make two get requests to get a user\'s details', () => {
      expect($axios.get).toHaveBeenNthCalledWith(1, `/api/users/${username}`)
      expect($axios.get).toHaveBeenNthCalledWith(2, `/api/users/${username}`)
    })

    it('should perform the SET_USER_DETAILS mutation twice with the user details results', () => {
      expect(commit).toHaveBeenNthCalledWith(1, 'SET_USER_DETAILS', {
        username,
        data: mockedUserDetails,
        expiresAt: expect.any(Number)
      })

      expect(commit).toHaveBeenNthCalledWith(2, 'SET_USER_DETAILS', {
        username,
        data: mockedUserDetails,
        expiresAt: expect.any(Number)
      })
    })
  })

  describe('when setting the current page of search results', () => {
    let page

    beforeAll(async () => {
      page = 4
      await actions.setPage({ commit, dispatch }, page)
    })

    afterAll(() => {
      commit.mockReset()
      dispatch.mockReset()
    })

    it('should make a commit to set the current page', () => {
      expect(commit).toHaveBeenCalledWith('SET_CURRENT_PAGE', page)
    })

    it('should not dispatch the search action', () => {
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})

describe('getters', () => {
  let currentState

  describe('when getting results, and results for the current search term exist', () => {
    let currentSearchTerm
    let resultsPerPage
    let cacheKey

    beforeAll(() => {
      currentSearchTerm = 'Test'
      resultsPerPage = 25
      cacheKey = `/api/users${currentSearchTerm}${resultsPerPage}`

      currentState = {
        currentSearchTerm,
        resultsPerPage,
        results: {
          [cacheKey]: {
            1: { id: 1, page: 1, users: [] },
            2: { id: 2, page: 2, users: [] }
          }
        }
      }
    })

    it('should return the search results from the state', () => {
      expect(getters.results(currentState)).toEqual(Object.values(currentState.results[cacheKey]))
    })
  })

  describe('when getting results, and results for the current search term don\'t exist', () => {
    let currentSearchTerm
    let resultsPerPage

    beforeAll(() => {
      currentSearchTerm = 'Test'
      resultsPerPage = 25

      currentState = {
        currentSearchTerm,
        resultsPerPage,
        results: {}
      }
    })

    it('should return an empty array of search results from the state', () => {
      expect(getters.results(currentState)).toEqual([])
    })
  })

  describe('userDetailsByUsername', () => {
    let username
    let userDetails

    beforeAll(() => {
      username = 'test_user'
      userDetails = {
        name: 'Test User'
      }

      currentState = {
        userDetailsCache: {
          [username]: userDetails
        }
      }
    })

    it('should return the user\'s details by username from the state', () => {
      expect(getters.userDetailsByUsername(currentState)(username)).toBe(currentState.userDetailsCache[username])
    })
  })

  describe('currentSearchTerm', () => {
    beforeAll(() => {
      currentState = {
        currentSearchTerm: 'Test'
      }
    })

    it('should return the current search term from the state', () => {
      expect(getters.currentSearchTerm(currentState)).toBe(currentState.currentSearchTerm)
    })
  })

  describe('numberOfResults', () => {
    beforeAll(() => {
      currentState = {
        numberOfResults: 100
      }
    })

    it('should return the total number of results from the state', () => {
      expect(getters.numberOfResults(currentState)).toBe(currentState.numberOfResults)
    })
  })

  describe('resultsPerPage', () => {
    beforeAll(() => {
      currentState = {
        resultsPerPage: 25
      }
    })

    it('should return the number of results per page from the state', () => {
      expect(getters.resultsPerPage(currentState)).toBe(currentState.resultsPerPage)
    })
  })

  describe('currentPage', () => {
    beforeAll(() => {
      currentState = {
        currentPage: 25
      }
    })

    it('should return the current page from the state', () => {
      expect(getters.currentPage(currentState)).toBe(currentState.currentPage)
    })
  })
})
