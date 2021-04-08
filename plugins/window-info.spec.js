import { createLocalVue } from '@vue/test-utils'
import windowInfo from './window-info'

describe('Window Info', () => {
  let wrapper

  describe('when calculating the $isMobile property, and the inner window width is less than 768 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 767
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $isMobile computed property is true', () => {
      expect(wrapper.vm.$isMobile).toBe(true)
    })
  })

  describe('when calculating the $isMobile property, and the inner window width is equal to 768 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 768
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $isMobile computed property is false', () => {
      expect(wrapper.vm.$isMobile).toBe(false)
    })
  })

  describe('when calculating the $isMobile property, and the inner window width is greater than 768 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 769
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $isMobile computed property is false', () => {
      expect(wrapper.vm.$isMobile).toBe(false)
    })
  })

  describe('when calculating the viewport height ($vh)', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerHeight = 767
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $vh is one hundredth of the window innerHeight', () => {
      expect(wrapper.vm.$vh).toEqual(window.innerHeight * 0.01)
    })
  })

  describe('when calculating 100% of the viewport height', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerHeight = 767
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that $vh100 is the window innerHeight', () => {
      expect(wrapper.vm.$vh100).toEqual({
        height: `${window.innerHeight}px`
      })
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is less than 480 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 320
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "xs"', () => {
      expect(wrapper.vm.$breakpoint).toBe('xs')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is equal to 480 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 480
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "xs"', () => {
      expect(wrapper.vm.$breakpoint).toBe('xs')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is greater than 640 pixels and less than 768 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 700
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "sm"', () => {
      expect(wrapper.vm.$breakpoint).toBe('sm')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is equal to 768 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 768
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "md"', () => {
      expect(wrapper.vm.$breakpoint).toBe('md')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is greater than 768 pixels and less than 992 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 800
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "md"', () => {
      expect(wrapper.vm.$breakpoint).toBe('md')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is equal to 1024 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 1024
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "lg"', () => {
      expect(wrapper.vm.$breakpoint).toBe('lg')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is greater than 992 pixels and less than 1200 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 1024
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "lg"', () => {
      expect(wrapper.vm.$breakpoint).toBe('lg')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is equal to 1280 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 1280
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "xl"', () => {
      expect(wrapper.vm.$breakpoint).toBe('xl')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is greater than 1200 and less than 1600 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 1400
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "xl"', () => {
      expect(wrapper.vm.$breakpoint).toBe('xl')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is equal to 1600 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 1600
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "xxl"', () => {
      expect(wrapper.vm.$breakpoint).toBe('xxl')
    })
  })

  describe('when calculating the $breakpoint property, and the inner window width is greater than 1600 pixels', () => {
    beforeAll(async () => {
      const TestComponent = {
        template: '<div>test</div>',
        name: 'TestComponent'
      }

      wrapper = mountPreMocked(TestComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      window.innerWidth = 1650
      window.dispatchEvent(new Event('resize'))

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should return that the $breakpoint computed property is "xxl"', () => {
      expect(wrapper.vm.$breakpoint).toBe('xxl')
    })
  })

  describe('when the window-info plugin is mounted', () => {
    beforeAll(() => {
      window.addEventListener = jest.fn().mockImplementation((type, listener, useCapture = false) => {
        window.eventListenerList = {}
        if (!window.eventListenerList[type]) window.eventListenerList[type] = []
        window.eventListenerList[type].push({ type, listener, useCapture })
      })

      const ChildComponent = {
        name: 'ChildComponent',
        template: '<div>Hello, World!</div>'
      }

      const ParentComponent = {
        name: 'ParentComponent',
        template: '<ChildComponent />',
        components: {
          ChildComponent
        }
      }

      wrapper = mountPreMocked(ParentComponent, {
        localVue: createLocalVue().use(windowInfo)
      })
    })

    afterAll(() => {
      wrapper.destroy()
      window.addEventListener.mockRestore()
      window.eventListenerList = undefined
    })

    it('should only add the window resize listener once for the entire component tree', () => {
      expect(window.eventListenerList.resize.length).toBe(1)
    })
  })

  describe('when a child component is destroyed', () => {
    beforeAll(() => {
      window.addEventListener = jest.fn().mockImplementation((type, listener, useCapture = false) => {
        window.eventListenerList = {}
        if (!window.eventListenerList[type]) window.eventListenerList[type] = []
        window.eventListenerList[type].push({ type, listener, useCapture })
      })

      window.removeEventListener = jest.fn().mockImplementation((type, listener) => {
        if (window.eventListenerList && window.eventListenerList[type]) {
          const index = window.eventListenerList[type].findIndex(el => el.listener === listener && el.type === type)

          if (index > -1) {
            window.eventListenerList[type].splice(index, 1)
          }
        }
      })

      const ChildComponent = {
        name: 'ChildComponent',
        template: '<div>Hello, World!</div>'
      }

      const ParentComponent = {
        name: 'ParentComponent',
        template: '<ChildComponent />',
        components: {
          ChildComponent
        }
      }

      wrapper = mountPreMocked(ParentComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      wrapper.findComponent({ name: 'ChildComponent' }).destroy()
    })

    afterAll(() => {
      wrapper.findComponent({ name: 'ParentComponent' }).destroy()
      window.addEventListener.mockRestore()
      window.removeEventListener.mockRestore()
      window.eventListenerList = undefined
    })

    it('should not remove the window resize listener', () => {
      expect(window.eventListenerList.resize.length).toBe(1)
    })
  })

  describe('when the top level component in the component tree is destroyed', () => {
    let rootParentComponent

    beforeAll(() => {
      window.addEventListener = jest.fn().mockImplementation((type, listener, useCapture = false) => {
        window.eventListenerList = {}
        if (!window.eventListenerList[type]) window.eventListenerList[type] = []
        window.eventListenerList[type].push({ type, listener, useCapture })
      })

      window.removeEventListener = jest.fn().mockImplementation((type, listener) => {
        if (window.eventListenerList && window.eventListenerList[type]) {
          const index = window.eventListenerList[type].findIndex(el => el.listener === listener && el.type === type)

          if (index > -1) {
            window.eventListenerList[type].splice(index, 1)
          }
        }
      })

      const ChildComponent = {
        name: 'ChildComponent',
        template: '<div>Hello, World!</div>'
      }

      const ParentComponent = {
        name: 'ParentComponent',
        template: '<ChildComponent />',
        components: {
          ChildComponent
        }
      }

      wrapper = mountPreMocked(ParentComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      rootParentComponent = wrapper.findComponent({ name: 'ParentComponent' }).vm

      while (rootParentComponent.$parent) {
        rootParentComponent = rootParentComponent.$parent
      }

      rootParentComponent.$destroy()
    })

    afterAll(() => {
      window.addEventListener.mockRestore()
      window.removeEventListener.mockRestore()
      window.eventListenerList = undefined
    })

    it('should remove the window resize listener', () => {
      expect(window.eventListenerList.resize.length).toBe(0)
    })
  })

  describe('when the parent component in the component tree is destroyed, and a new component is mounted', () => {
    beforeAll(() => {
      window.addEventListener = jest.fn().mockImplementation((type, listener, useCapture = false) => {
        window.eventListenerList = {}
        if (!window.eventListenerList[type]) window.eventListenerList[type] = []
        window.eventListenerList[type].push({ type, listener, useCapture })
      })

      window.removeEventListener = jest.fn().mockImplementation((type, listener) => {
        if (window.eventListenerList && window.eventListenerList[type]) {
          const index = window.eventListenerList[type].findIndex(el => el.listener === listener && el.type === type)

          if (index > -1) {
            window.eventListenerList[type].splice(index, 1)
          }
        }
      })

      const ChildComponent = {
        name: 'ChildComponent',
        template: '<div>Hello, World!</div>'
      }

      const ParentComponent = {
        name: 'ParentComponent',
        template: '<ChildComponent />',
        components: {
          ChildComponent
        }
      }

      wrapper = mountPreMocked(ParentComponent, {
        localVue: createLocalVue().use(windowInfo)
      })
    })

    afterAll(() => {
      wrapper.destroy()
      window.addEventListener.mockRestore()
      window.removeEventListener.mockRestore()
      window.eventListenerList = undefined
    })

    it('should remove the window resize listener for the parent component', () => {
      let rootParentComponent = wrapper.findComponent({ name: 'ParentComponent' }).vm

      while (rootParentComponent.$parent) {
        rootParentComponent = rootParentComponent.$parent
      }

      rootParentComponent.$destroy()

      expect(window.eventListenerList.resize.length).toBe(0)
    })

    it('should add the window resize listener for a newly mounted component if it is the new parent in the component tree', () => {
      const newComponent = {
        name: 'newComponent',
        template: '<h1>Hello, again!</h1>'
      }

      wrapper = mountPreMocked(newComponent, {
        localVue: createLocalVue().use(windowInfo)
      })

      expect(window.eventListenerList.resize.length).toBe(1)
    })
  })
})
