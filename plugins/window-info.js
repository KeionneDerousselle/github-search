import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'

const MAX_SAFE_INT = Math.pow(2, 53)
const MIN_SAFE_INT = (-(MAX_SAFE_INT))

export const BREAKPOINTS = {
  XS: { MIN: MIN_SAFE_INT, MAX: 640 },
  SM: { MIN: 640, MAX: 768 },
  MD: { MIN: 768, MAX: 1024 },
  LG: { MIN: 1024, MAX: 1280 },
  XL: { MIN: 1280, MAX: 1536 },
  XXL: { MIN: 1536, MAX: MAX_SAFE_INT }
}

export const mediaQueries = new Map([
  [ 'xs', windowWidth => windowWidth <= BREAKPOINTS.XS.MAX ],
  [ 'sm', windowWidth => windowWidth < BREAKPOINTS.SM.MAX && windowWidth > BREAKPOINTS.SM.MIN ],
  [ 'md', windowWidth => windowWidth < BREAKPOINTS.MD.MAX && windowWidth >= BREAKPOINTS.MD.MIN ],
  [ 'lg', windowWidth => windowWidth < BREAKPOINTS.LG.MAX && windowWidth >= BREAKPOINTS.LG.MIN ],
  [ 'xl', windowWidth => windowWidth < BREAKPOINTS.XL.MAX && windowWidth >= BREAKPOINTS.XL.MIN ],
  [ 'xxl', windowWidth => windowWidth >= BREAKPOINTS.XXL.MIN ]
])

export default function() {
  let hasSetupListeners = false
  let firstComponentInTree = null

  const isWindowMobile = () => window.innerWidth < 768
  const getWindowVh = () => window.innerHeight * 0.01
  const getBreakpoint = () => {
    let currentBreakpoint

    for (const [ breakpoint, mediaQuery ] of mediaQueries) {
      if (mediaQuery(window.innerWidth)) {
        currentBreakpoint = breakpoint
        break
      }
    }

    return currentBreakpoint
  }

  const globalWindowInfoComponent = new Vue({
    name: 'GlobalWindowInfo',
    data: () => ({
      isMobile: false,
      vh: 100,
      breakpoint: 'xs'
    })
  })

  const calculateWindowInfo = () => {
    globalWindowInfoComponent.isMobile = isWindowMobile()
    globalWindowInfoComponent.vh = getWindowVh()
    globalWindowInfoComponent.breakpoint = getBreakpoint()
  }

  Vue.mixin({
    data: () => ({
      uuid: uuidv4()
    }),

    computed: {
      $isMobile() {
        return globalWindowInfoComponent.isMobile
      },

      $vh() {
        return globalWindowInfoComponent.vh
      },

      $vh100() {
        return {
          height: `${this.$vh * 100}px` // 100vh - using 100vh in plain CSS in iOS Safari isn't accurate because it returns the device height, not the browser height
        }
      },

      $breakpoint() {
        return globalWindowInfoComponent.breakpoint
      }
    },

    beforeMount() {
      if (!firstComponentInTree) {
        firstComponentInTree = this.uuid
      }
    },

    mounted() {
      if (!hasSetupListeners) {
        window.addEventListener('resize', calculateWindowInfo)
        calculateWindowInfo()
        hasSetupListeners = true
      }
    },

    beforeDestroy() {
      if (firstComponentInTree === this.uuid) {
        window.removeEventListener('resize', calculateWindowInfo)
        hasSetupListeners = false
        firstComponentInTree = null
      }
    }
  })
}
