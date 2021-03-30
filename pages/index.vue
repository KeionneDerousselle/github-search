<template>
  <layout
    :page-title="pageTitle"
    :left-section-title="leftSectionTitle"
    :right-section-title="rightSectionTitle">
    <template #headerTop>
      <search-form class="md:hidden md:max-w-xs w-full" />
    </template>

    <template #leftSectionContent>
      <search-form class="hidden md:flex md:max-w-xs w-full mb-4" />

      <div
        id="results-box"
        class="results-box content__panel">
        <div
          id="results"
          ref="results"
          class="results">
          <ul
            v-for="result in results"
            :id="`page-${result.page}`"
            :key="result.id">
            <user-list-item
              v-for="user in result.users"
              :id="`search-result-${user.id}`"
              :key="user.id"
              :user="user"
              class="search__result" />
          </ul>
        </div>

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
        coming soon...
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from '@/components/Layout'
import SearchForm from '@/components/SearchForm'
import UserListItem from '@/components/UserListItem'
import Pagination from '@/components/Pagination'
// import Counter from '@/components/Counter'

import { mapActions, mapGetters } from 'vuex'

import VueScrollTo from 'vue-scrollto'

export default {
  components: {
    Layout,
    SearchForm,
    UserListItem,
    Pagination
    // Counter,
  },

  data: () => ({
    maxScrollPosition: 0,
    fetchingTheNextPage: false,
    currentScrollCancellation: null,
    pageTitle: 'GitHub Users Search',
    leftSectionTitle: 'Search',
    rightSectionTitle: 'User Details'
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

  mounted() {
    this.addScrollListener(this.$refs.results)
  },

  beforeDestroy() {
    this.removeScrollListener(this.$refs.results)
  },

  methods: {
    ...mapActions('users', [
      'search',
      'setPage'
    ]),

    handleResultsScrolled() {
      this.handleScrollHelper(this.$refs.results)
    },

    addScrollListener(el) {
      el.addEventListener('scroll', this.handleResultsScrolled)
    },

    removeScrollListener(el) {
      el.removeEventListener('scroll', this.handleResultsScrolled)
    },

    async handleScrollHelper(el) {
      // when height of content under the view window (the bottom of the scroll: (this.$refs.results.scrollHeight - this.$refs.results.scrollTop))
      // is less than 1.5 pages: (this.$refs.results.offsetHeight * 1.5)
      if ((el.scrollHeight - el.scrollTop) < (el.offsetHeight * 1.5)) {
        // if the bottom of the content is not the same as the max position we've scrolled to
        if ((el.scrollHeight >= this.maxScrollPosition) && !this.fetchingTheNextPage) {
          this.fetchingTheNextPage = true
          this.setMaxScollHeight(el)

          await this.search({
            searchTerm: this.currentSearchTerm,
            page: this.currentPage + 1,
            resultsPerPage: this.resultsPerPage
          }).finally(() => {
            this.fetchingTheNextPage = false
          })
        }
      }

      this.updateScrolledPage(el)
    },

    setMaxScollHeight(el) {
      this.maxScrollPosition = el.scrollHeight
    },

    updateScrolledPage(el) {
      const calculatedPage = this.calculateScrolledToPage(el)

      if (calculatedPage !== this.currentPage) {
        return this.setPage(calculatedPage)
      }
    },

    calculateScrolledToPage(el) {
      const children = el.children
      let previousMax = 0
      let currentMax = 0
      const scrollTop = el.scrollTop

      // for every ul.page el in #results
      for (let i = 0; i < children.length; i++) {
        // console.log('hi')
        // get the height of that page
        currentMax += children[i].clientHeight
        // if the scroll position is between the start of the page and the end of the page, return that we are on that page
        if (scrollTop >= previousMax && scrollTop <= currentMax) return i + 1
        // else, add the height of this page to the height of all the pages we've already checked, (reset the start looking position)
        previousMax = currentMax
      }
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
              this.setMaxScollHeight(this.$refs.results)
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
