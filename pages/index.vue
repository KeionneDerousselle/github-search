<template>
  <layout
    :page-title="pageTitle"
    :left-section-title="leftSectionTitle"
    :right-section-title="rightSectionTitle">
    <template #headerTop>
      <search-form
        id="search-form"
        class="md:hidden md:max-w-xs w-full" />
    </template>

    <template #leftSectionContent>
      <search-form
        id="search-form"
        class="hidden md:flex md:max-w-xs w-full mb-4" />

      <div
        id="results-box"
        class="results-box content__panel">
        <search-results id="results" />

        <div
          v-show="numberOfResults"
          class="results-toolbar">
          <pagination
            id="results-pagination"
            class="results__pagination"
            :total-items="numberOfResults"
            :items-per-page="resultsPerPage"
            :current-page="currentPage"
            @change="handlePageChanged" />
        </div>
      </div>
    </template>

    <template #rightSectionContent>
      <div class="user__details">
        <user-details
          v-if="selectedUser"
          :user="selectedUser" />
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from '@/components/Layout'
import SearchForm from '@/components/SearchForm'
import SearchResults from '@/components/SearchResults'
import Pagination from '@/components/Pagination'
import UserDetails from '@/components/UserDetails'
// import Counter from '@/components/Counter'

import { mapActions, mapGetters } from 'vuex'

import VueScrollTo from 'vue-scrollto'

export default {
  components: {
    Layout,
    SearchForm,
    SearchResults,
    Pagination,
    UserDetails
    // Counter,
  },

  data: () => ({
    maxScrollPosition: 0,
    fetchingTheNextPage: false,
    currentScrollCancellation: null,
    pageTitle: 'GitHub Users Search',
    leftSectionTitle: 'Search',
    rightSectionTitle: 'User Details',
    selectedUser: null
  }),

  computed: {
    ...mapGetters('users', [
      'results',
      'currentSearchTerm',
      'numberOfResults',
      'resultsPerPage',
      'currentPage'
    ])
  },

  methods: {
    ...mapActions('users', [
      'search',
      'setPage'
    ]),

    setMaxScollHeight(el) {
      this.maxScrollPosition = el.scrollHeight
    },

    handlePageChanged(page) {
      const pageId = `#page-${page}`

      if (!this.currentScrollCancellation) {
        if (document.getElementById(pageId)) {
          return this.setPage(page)
            .then(() => {
              this.currentScrollCancellation = this.scrollToPage(pageId)
            }).finally(() => {
              this.currentScrollCancellation = null
            })
        } else {
          this.fetchingTheNextPage = true

          return this.search({ searchTerm: this.currentSearchTerm, page, resultsPerPage: this.resultsPerPage })
            .then(() => {
              const resultsEl = document.getElementById('results')

              this.setMaxScollHeight(resultsEl)
              this.currentScrollCancellation = this.scrollToPage(pageId)
            }).finally(() => {
              this.currentScrollCancellation = null
              this.fetchingTheNextPage = false
            })
        }
      }
    },

    scrollToPage(pageId) {
      return VueScrollTo.scrollTo(pageId, 500, {
        container: '#results',
        easing: 'ease-in',
        lazy: false,
        offset: 0,
        force: true,
        cancelable: true,
        x: false,
        y: true
      })
    }
  }
}
</script>

<style lang="scss">
.results-box {
  @apply flex flex-col overflow-hidden relative;

  flex: 1 1 1px;
}

.results {
  @apply overflow-y-auto h-full;

  flex: 1 1 auto;
}

.results-toolbar {
  @apply bottom-0 left-0 right-0 bg-indigo-500 text-indigo-100 p-4;

  transition: all 0.3s ease-in;
}
</style>
