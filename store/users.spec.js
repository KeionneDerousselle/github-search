import { state, mutations, actions, getters } from './users'

describe('state', () => {
  let defaultState

  beforeAll(() => {
    defaultState = state()
  })

  it('should have an empty results array on the default state', () => {
    const { results } = defaultState

    expect(results).toEqual([])
  })

  it('should have a default number of user search results per page on the default state', () => {
    const { resultsPerPage } = defaultState

    expect(resultsPerPage).toBe(15)
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
  describe('ADD_SEARCH_RESULTS', () => {
    let currentState
    let result

    beforeAll(() => {
      currentState = { results: [] }
      result = { id: 1, totalCount: 5000, Term: 1, usersOnPage: 15, users: [] }

      mutations.ADD_SEARCH_RESULTS(currentState, result)
    })

    it('should add the result to the list of search results', () => {
      expect(currentState.results).toContainEqual(result)
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

  describe('INCREMENT_CURRENT_PAGE', () => {
    let currentState
    let currentPage

    beforeAll(() => {
      currentPage = 0

      currentState = {
        currentPage
      }

      mutations.INCREMENT_CURRENT_PAGE(currentState)
    })

    it('should increment the current page', () => {
      expect(currentState.currentPage).toBe(currentPage + 1)
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
        results: [{ id: 1, totalCount: 100, page: 2, usersOnPage: 50, users: [] }]
      }

      mutations.RESET_RESULTS(currentState)
    })

    it('should increment the current page', () => {
      expect(currentState.results).toEqual([])
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

    it('should make a commit to reset search results', () => {
      expect(commit).toBeCalledWith('RESET_RESULTS')
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

  describe('when a successful search action call is made', () => {
    let mockReturnedUsers
    let mockNumOfTotalResults
    let currentState

    beforeAll(async () => {
      mockReturnedUsers = [{ foo: 'bar' }]
      currentState = {
        currentSearchTerm: 'foo',
        resultsPerPage: 15,
        currentPage: 1
      }
      mockNumOfTotalResults = 1

      $axios.get = jest.fn().mockResolvedValue({
        data: {
          total_count: mockNumOfTotalResults,
          items: mockReturnedUsers
        }
      })

      await actions.search({ commit, state: currentState })
    })

    afterAll(() => {
      commit.mockReset()
      $axios.get.mockReset()
    })

    it('should make a get request to get users using the simple search term', () => {
      expect($axios.get).toHaveBeenCalledWith('/api/users', expect.objectContaining({
        params: {
          q: currentState.currentSearchTerm,
          per_page: currentState.resultsPerPage,
          page: currentState.currentPage
        }
      }))
    })

    it('should perform the SET_USERS mutation with the search results', () => {
      expect(commit).toHaveBeenCalledWith('ADD_SEARCH_RESULTS', {
        id: expect.any(String),
        totalCount: mockNumOfTotalResults,
        page: currentState.currentPage,
        usersOnPage: mockReturnedUsers.length,
        users: mockReturnedUsers
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

  describe('when getting the next page of search results', () => {
    beforeAll(async () => {
      await actions.next({ commit, dispatch })
    })

    afterAll(() => {
      commit.mockReset()
      dispatch.mockReset()
    })

    it('should make a commit to increment the current page', () => {
      expect(commit).toHaveBeenCalledWith('INCREMENT_CURRENT_PAGE')
    })

    it('should dispatch the search action', () => {
      expect(dispatch).toHaveBeenCalledWith('search')
    })
  })
})

describe('getters', () => {
  let currentState

  describe('results', () => {
    beforeAll(() => {
      currentState = {
        results: [ { id: 1, page: 1, users: [] }, { id: 2, page: 2, users: [] } ]
      }
    })

    it('should return the search results from the state', () => {
      expect(getters.results(currentState)).toBe(currentState.results)
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
})
