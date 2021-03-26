import { state, mutations, actions, getters } from './users'

describe('state', () => {
  let defaultState

  beforeAll(() => {
    defaultState = state()
  })

  it('should have an empty users array on the default state', () => {
    const { users } = defaultState

    expect(users).toEqual([])
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
})

describe('mutations', () => {
  describe('SET_USERS', () => {
    let currentState
    let users

    beforeAll(() => {
      currentState = { users: [] }
      users = [{ a: 'b' }]

      mutations.SET_USERS(currentState, users)
    })

    it('should assign the returned users to the users on the users on the state', () => {
      expect(currentState.users).toEqual(users)
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
})

describe('actions', () => {
  let commit
  let $axios

  beforeAll(() => {
    commit = jest.fn()

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

  describe('when a successful search action call is made', () => {
    let simpleSearchTerm
    let mockReturnedUsers
    let mockNumOfTotalResults
    let currentState

    beforeAll(async () => {
      simpleSearchTerm = 'test'
      mockReturnedUsers = []
      currentState = {
        resultsPerPage: 15,
        currentPage: 1
      }
      mockNumOfTotalResults = 30

      $axios.get = jest.fn().mockResolvedValue({
        data: {
          total_count: mockNumOfTotalResults,
          items: mockReturnedUsers
        }
      })

      await actions.search({ commit, state: currentState }, { simpleSearchTerm })
    })

    afterAll(() => {
      commit.mockReset()
      $axios.get.mockReset()
    })

    it('should make a get request to get users using the simple search term', () => {
      expect($axios.get).toHaveBeenCalledWith('/api/users', expect.objectContaining({
        params: {
          q: simpleSearchTerm,
          per_page: currentState.resultsPerPage,
          page: currentState.currentPage
        }
      }))
    })

    it('should perform the SET_USERS mutation with the search results', () => {
      expect(commit).toHaveBeenCalledWith('SET_USERS', mockReturnedUsers)
    })

    it('should perform the SET_NUMBER_OF_TOTAL_RESULTS mutation with the number of total returned search results', () => {
      expect(commit).toHaveBeenCalledWith('SET_NUMBER_OF_TOTAL_RESULTS', mockNumOfTotalResults)
    })
  })
})

describe('getters', () => {
  let currentState

  describe('users', () => {
    beforeAll(() => {
      currentState = {
        users: []
      }
    })

    it('should return the users from the state', () => {
      expect(getters.users(currentState)).toBe(currentState.users)
    })
  })
})
