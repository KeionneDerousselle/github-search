<template>
  <li
    v-bind="$attrs"
    class="user-list-item"
    v-on="$listeners">
    <img
      :src="user.avatar_url"
      :alt="`Profile picture for ${user.login}`"
      class="user-list-item__avatar">

    <div class="user-list-item__details">
      <span
        v-if="userDetails"
        class="user-list-item__details__name">{{ userDetails.name }}</span>
      <span class="user-list-item__details__login">{{ user.login }}</span>
    </div>

    <a
      :href="user.html_url"
      target="_blank"
      class="user-list-item__link">
      <link-icon
        class="user-list-item__link__icon"
        aria-hidden="true" />
      <span class="sr-only"> Opens link to {{ user.login }}'s GitHub Account in a new window.</span>
    </a>
  </li>
</template>
<script>
import LinkIcon from '@/components/Icons/Link'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    LinkIcon
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    userDetails: null
  }),

  computed: {
    ...mapGetters('users', ['userDetailsByUsername'])
  },

  beforeMount() {
    this.get({ username: this.user.login })
      .then(() => {
        const result = this.userDetailsByUsername(this.user.login)

        this.userDetails = result ? result.data : null
      })
  },

  methods: {
    ...mapActions('users', ['get'])
  }
}
</script>
<style lang="scss">
.user-list-item {
  @apply list-none flex items-center pt-4 pb-4 pl-6 pr-6 w-full;

  &:not(:last-of-type) {
    @apply border-b border-gray-300;
  }

  &:hover {
    @apply bg-indigo-50;
  }

  &__link {
    @apply ml-auto rounded-full border-2 border-transparent p-1 text-center flex justify-center items-center;

    transition: border-color 0.3s ease-out;
  }

  &__link:hover,
  &__link:focus,
  &__link:active {
    @apply border-indigo-500 outline-none;

    box-shadow: none;
  }

  &__link__icon {
    @apply w-5 h-5 text-indigo-500;
  }

  &__link__icon:hover,
  &__link__icon:focus {
    @apply outline-none border-0;
  }

  &__avatar {
    @apply inline-flex rounded-full w-10 h-10 mr-2.5;
  }

  &__details {
    @apply inline-flex flex-col;

    &__name {
      @apply text-lg text-gray-800 block;
    }

    &__login {
      @apply text-sm text-gray-600 block;
    }
  }
}
</style>
