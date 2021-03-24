export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'github-search',
    meta: [ { charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' } ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/validation.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    corejs: 3,

    extractCSS: true,

    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },

    babel: {
      presets({ isServer }, [ preset, options ]) {
        const envName = isServer ? 'server' : 'client'
        const envTargets = {
          client: { browsers: [ '> 0.5%', 'last 2 versions', 'firefox ESR' ], ie: 11 },
          server: { node: 'current' }
        }

        return [
          [
            preset,
            {
              targets: envTargets[envName] || envTargets.client,
              shippedProposals: true,
              useBuiltIns: 'usage',
              bugfixes: true,
              corejs: {
                version: 3,
                proposals: true
              },
              ...options
            }
          ]
        ]
      }
    },

    transpile: ['vee-validate/dist/rules']
  }
}
