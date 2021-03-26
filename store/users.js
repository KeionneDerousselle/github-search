export const state = () => ({
  users: []
})

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  }
}

export const actions = {
  search({ commit }, { simpleSearchTerm }) {
    return this.$axios.get('/api/users', {
      params: {
        q: simpleSearchTerm
      }
    }).then(res => {
      const { users } = res.data

      commit('SET_USERS', users)
      return users
    })
  }
}

export const getters = {
  users: ({ users }) => users
}
