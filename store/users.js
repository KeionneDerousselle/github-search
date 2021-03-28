import Vue from 'vue'
import { v4 as uuid } from 'uuid'

export const state = () => ({
  results: {},
  userDetailsCache: {},
  resultsPerPage: 25,
  currentPage: 1,
  numberOfResults: 0,
  currentSearchTerm: ''
})

export const mutations = {
  ADD_SEARCH_RESULTS(state, { cacheKey, ...results }) {
    if (!state.results[cacheKey]) {
      Vue.set(state.results, cacheKey, { [results.page]: results })
    } else {
      const prevResults = state.results[cacheKey]

      Vue.set(state.results, cacheKey, { ...prevResults, [results.page]: results })
    }
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
  },

  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page
  }
}

// USERS SEARCH API CACHE EXAMPLE
// const example = {
//   '/api/users/{search}/{reqPerPage}': {
//     1: {
//       page: 1,
//       users: []
//     },

//     2: {
//       page: 2,
//       users: []
//     }
//   }
// }

const searchUsersUrl = '/api/users'
const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000).getTime()
const generateSearchCacheKey = (currentSearchTerm, resultsPerPage) => `${searchUsersUrl}${currentSearchTerm}${resultsPerPage}`

export const actions = {
  setSearchTerm({ commit, state: { currentSearchTerm } }, searchTerm) {
    if (searchTerm.toLowerCase() !== currentSearchTerm.toLowerCase()) {
      commit('SET_SEARCH_TERM', searchTerm)
      commit('RESET_RESULTS')
      commit('RESET_CURRENT_PAGE')
      commit('SET_NUMBER_OF_TOTAL_RESULTS', 0)
    }
  },

  search({ commit, state: { resultsPerPage, currentPage, currentSearchTerm, results } }) {
    const cacheKey = generateSearchCacheKey(currentSearchTerm, resultsPerPage)
    const cacheData = results[cacheKey]?.[currentPage]
    const now = new Date().getTime()

    if (!cacheData || cacheData.expiresAt <= now) {
      return this.$axios.get(searchUsersUrl, {
        params: {
          q: currentSearchTerm,
          per_page: resultsPerPage,
          page: currentPage
        }
      }).then(({ data }) => {
        // eslint-disable-next-line camelcase
        const { total_count, items } = data

        const results = {
          cacheKey,
          id: uuid(),
          totalCount: total_count,
          page: currentPage,
          usersOnPage: items.length,
          users: items,
          expiresAt: addMinutes(new Date(), 10)
        }

        commit('ADD_SEARCH_RESULTS', results)
        commit('SET_NUMBER_OF_TOTAL_RESULTS', total_count)
      })
    }
  },

  async get({ commit, state: { userDetailsCache } }, { username }) {
    const cacheData = userDetailsCache[username]
    const now = new Date().getTime()

    if (!cacheData || cacheData.expiresAt <= now) {
      const { data } = await this.$axios.get(`/api/users/${username}`)

      commit('SET_USER_DETAILS', { username, data, expiresAt: addMinutes(new Date(), 10) })
    }
  },

  fetchNextPage({ commit, dispatch }) {
    commit('INCREMENT_CURRENT_PAGE')

    return dispatch('search')
  },

  fetchPage({ commit, dispatch }, page) {
    commit('SET_CURRENT_PAGE', page)

    return dispatch('search')
  },

  setPage({ commit }, page) {
    commit('SET_CURRENT_PAGE', page)
  }
}

export const getters = {
  results: ({ results, currentSearchTerm, resultsPerPage }) => {
    const currentSearchResults = results[generateSearchCacheKey(currentSearchTerm, resultsPerPage)]

    return currentSearchResults ? Object.values(currentSearchResults) : []
  },
  userDetailsByUsername: ({ userDetailsCache }) => username => userDetailsCache[username],
  currentSearchTerm: ({ currentSearchTerm }) => currentSearchTerm,
  numberOfResults: ({ numberOfResults }) => numberOfResults,
  resultsPerPage: ({ resultsPerPage }) => resultsPerPage,
  currentPage: ({ currentPage }) => currentPage
}
