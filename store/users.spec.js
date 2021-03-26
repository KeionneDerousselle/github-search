import { state, mutations, actions, getters } from './users'

describe('state', () => {
  let defaultState

  beforeAll(() => {
    defaultState = state()
  })

  it('should have an empty users arry on the default state', () => {
    const { users } = defaultState

    expect(users).toEqual([])
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

    beforeAll(async () => {
      simpleSearchTerm = 'test'
      mockReturnedUsers = []

      $axios.get = jest.fn().mockResolvedValue({ data: { users: mockReturnedUsers } })

      await actions.search({ commit }, { simpleSearchTerm })
    })

    afterAll(() => {
      commit.mockReset()
      $axios.get.mockReset()
    })

    it('should make a get request to get users using the simple search term', () => {
      expect($axios.get).toHaveBeenCalledWith('/api/users', expect.objectContaining({
        params: {
          q: simpleSearchTerm
        }
      }))
    })

    it('should perform the SET_USERS mutation with the search results', () => {
      expect(commit).toHaveBeenCalledWith('SET_USERS', mockReturnedUsers)
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
