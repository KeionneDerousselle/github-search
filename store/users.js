export const state = () => ({
  users: [],
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
  }
}

export const actions = {
  search({ commit, state: { resultsPerPage, currentPage } }, { simpleSearchTerm }) {
    return this.$axios.get('/api/users', {
      params: {
        q: simpleSearchTerm,
        per_page: resultsPerPage,
        page: currentPage
      }
    }).then(res => {
      // eslint-disable-next-line camelcase
      const { total_count, items } = res.data

      commit('SET_USERS', items)
      commit('SET_NUMBER_OF_TOTAL_RESULTS', total_count)
      return items
    })
  }
}

export const getters = {
  users: ({ users }) => users
}
