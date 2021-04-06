<template>
  <div
    ref="results"
    class="results"
    v-bind="$attrs">
    <ul
      v-for="result in results"
      :id="`page-${result.page}`"
      :key="result.id">
      <user-list-item
        v-for="user in result.users"
        :id="`search-result-${user.id}`"
        :key="user.id"
        :user="user"
        :selected="selectedUser && selectedUser.id === user.id"
        class="search__result"
        @click="handleUserSelected(user)" />
    </ul>
  </div>
</template>
<script>
import UserListItem from '@/components/UserListItem'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    UserListItem
  },

  data: () => ({
    maxScrollPosition: 0,
    fetchingTheNextPage: false,
    currentScrollCancellation: null,
    selectedUser: null
  }),

  computed: {
    ...mapGetters('users', [
      'results',
      'currentSearchTerm',
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

    addScrollListener(el) {
      el.addEventListener('scroll', this.handleResultsScrolled)
    },

    removeScrollListener(el) {
      el.removeEventListener('scroll', this.handleResultsScrolled)
    },

    handleResultsScrolled() {
      this.handleScrollHelper(this.$refs.results)
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

    handleUserSelected(user) {

    }
  }
}
</script>
