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

    <div
      v-if="userDetails"
      class="user-list-item__followers">
      {{ userDetails.followers }}
      <users-icon
        aria-hidden="true"
        class="user-list-item__followers__icon" />
      <span class="sr-only">Followers</span>
    </div>

    <a
      :href="user.html_url"
      target="_blank"
      rel="noopener"
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
import UsersIcon from '@/components/Icons/Users'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    LinkIcon,
    UsersIcon
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
  @apply list-none flex items-center w-full border-b border-indigo-200 p-4;

  &:hover {
    @apply bg-indigo-50;
  }

  &__link {
    @apply ml-auto rounded-full border-transparent p-1 text-center flex justify-center items-center;
    @apply border;

    transition: border-color 0.3s ease-out;
  }

  &__link:hover,
  &__link:focus,
  &__link:active {
    @apply border-indigo-700 outline-none;

    box-shadow: none;
  }

  &__link__icon {
    @apply text-indigo-700;
    @apply w-4 h-4;
  }

  &__link__icon:hover,
  &__link__icon:focus {
    @apply outline-none border-0;
  }

  &__avatar {
    @apply inline-flex rounded-full mr-2.5;
    @apply w-10 h-10;
  }

  &__details {
    @apply inline-flex flex-col w-2/5;

    &__name {
      @apply text-gray-800 block;
      @apply sm:text-sm;
    }

    &__login {
      @apply text-gray-600 block;
      @apply text-xs;
      @apply sm:text-xs;
    }
  }

  &__followers {
    @apply text-indigo-700 inline-flex flex items-center ml-2.5 rounded-xl bg-indigo-100 px-1 py-0.5 text-sm font-bold border;
  }

  &__followers__icon {
    @apply w-4 h-4 text-indigo-700;
  }
}
</style>
