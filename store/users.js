import Vue from 'vue'

export const state = () => ({
  users: [],
  userDetailsCache: {},
  resultsPerPage: 15,
  currentPage: 1,
  numberOfResults: 0
})

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },

  SET_NUMBER_OF_TOTAL_RESULTS(state, numberOfResults) {
    state.numberOfResults = numberOfResults
  },

  SET_USER_DETAILS(state, userDetails) {
    Vue.set(state.userDetailsCache, userDetails.username, userDetails)
  }
}

const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000).getTime()

export const actions = {
  search({ commit, state: { resultsPerPage, currentPage } }, { simpleSearchTerm }) {
    return this.$axios.get('/api/users', {
      params: {
        q: simpleSearchTerm,
        per_page: resultsPerPage,
        page: currentPage
      }
    }).then(({ data }) => {
      // eslint-disable-next-line camelcase
      const { total_count, items } = data

      commit('SET_USERS', items)
      commit('SET_NUMBER_OF_TOTAL_RESULTS', total_count)
      return items
    })
  },

  async get({ commit, state: { userDetailsCache } }, { username }) {
    const cacheData = userDetailsCache[username]
    const now = new Date().getTime()

    if (!cacheData || cacheData.expiresAt <= now) {
      const { data } = await this.$axios.get(`/api/users/${username}`)

      commit('SET_USER_DETAILS', { username, data, expiresAt: addMinutes(new Date(), 10) })
    }
  }
}

export const getters = {
  users: ({ users }) => users,
  userDetailsByUsername: ({ userDetailsCache }) => username => userDetailsCache[username]
}
