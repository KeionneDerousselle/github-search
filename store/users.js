import Vue from 'vue'
import { v4 as uuid } from 'uuid'

export const state = () => ({
  results: [],
  userDetailsCache: {},
  resultsPerPage: 25,
  currentPage: 1,
  numberOfResults: 0,
  currentSearchTerm: ''
})

export const mutations = {
  ADD_SEARCH_RESULTS(state, results) {
    state.results.push(results)
  },

  SET_NUMBER_OF_TOTAL_RESULTS(state, numberOfResults) {
    state.numberOfResults = numberOfResults
  },

  SET_USER_DETAILS(state, userDetails) {
    Vue.set(state.userDetailsCache, userDetails.username, userDetails)
  },

  INCREMENT_CURRENT_PAGE(state) {
    state.currentPage++
  },

  SET_SEARCH_TERM(state, searchTerm) {
    state.currentSearchTerm = searchTerm
  },

  RESET_RESULTS(state) {
    state.results = []
  },

  RESET_CURRENT_PAGE(state) {
    state.currentPage = 1
  }
}

const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000).getTime()

export const actions = {
  setSearchTerm({ commit, state: { currentSearchTerm } }, searchTerm) {
    if (searchTerm.toLowerCase() !== currentSearchTerm.toLowerCase()) {
      commit('SET_SEARCH_TERM', searchTerm)
      commit('RESET_RESULTS')
      commit('RESET_CURRENT_PAGE')
      commit('SET_NUMBER_OF_TOTAL_RESULTS', 0)
    }
  },

  search({ commit, state: { resultsPerPage, currentPage, currentSearchTerm } }) {
    return this.$axios.get('/api/users', {
      params: {
        q: currentSearchTerm,
        per_page: resultsPerPage,
        page: currentPage
      }
    }).then(({ data }) => {
      // eslint-disable-next-line camelcase
      const { total_count, items } = data

      commit('ADD_SEARCH_RESULTS', { id: uuid(), totalCount: total_count, page: currentPage, usersOnPage: items.length, users: items })
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
  },

  next({ commit, dispatch }) {
    commit('INCREMENT_CURRENT_PAGE')

    return dispatch('search')
  }
}

export const getters = {
  results: ({ results }) => results,
  userDetailsByUsername: ({ userDetailsCache }) => username => userDetailsCache[username],
  currentSearchTerm: ({ currentSearchTerm }) => currentSearchTerm,
  numberOfResults: ({ numberOfResults }) => numberOfResults,
  resultsPerPage: ({ resultsPerPage }) => resultsPerPage
}
