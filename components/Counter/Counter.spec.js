import flushPromises from 'flush-promises'
import Counter from '.'

describe('Counter', () => {
  let wrapper
  let clearIntervalSpy
  let setIntervalSpy

  describe('when a number that doesn\'t match the displayed number is passed in ', () => {
    beforeAll(async () => {
      clearIntervalSpy = jest.spyOn(global.window, 'clearInterval')
      clearIntervalSpy.mockImplementation(p => p)

      setIntervalSpy = jest.spyOn(global.window, 'setInterval')
      setIntervalSpy.mockImplementation(p => p)

      wrapper = shallowPreMocked(Counter, {
        propsData: {
          number: 10
        }
      })

      wrapper.setProps({
        number: 20
      })

      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      clearIntervalSpy.mockRestore()
      setIntervalSpy.mockRestore()
      wrapper.destroy()
    })

    it('should clear the interval', () => {
      expect(clearIntervalSpy).toHaveBeenCalled()
    })

    it('should set the interval', () => {
      expect(setIntervalSpy).toHaveBeenCalledWith(wrapper.vm.calcNextStep, 20)
    })
  })

  describe('when a number matching the displayed number is passed in', () => {
    beforeAll(async () => {
      clearIntervalSpy = jest.spyOn(global.window, 'clearInterval')
      clearIntervalSpy.mockImplementation(p => p)

      setIntervalSpy = jest.spyOn(global.window, 'setInterval')
      setIntervalSpy.mockImplementation(p => p)

      wrapper = shallowPreMocked(Counter, {
        propsData: {
          number: 20
        }
      })

      wrapper.setProps({
        number: 20
      })

      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      clearIntervalSpy.mockRestore()
      setIntervalSpy.mockRestore()
      wrapper.destroy()
    })

    it('should clear the interval', () => {
      expect(clearIntervalSpy).not.toHaveBeenCalled()
    })

    it('should not set the interval', () => {
      expect(setIntervalSpy).not.toHaveBeenCalled()
    })
  })

  describe('when calculating the next number to be displayed and the display number less than the number', () => {
    beforeAll(async () => {
      clearIntervalSpy = jest.spyOn(global.window, 'clearInterval')
      setIntervalSpy = jest.spyOn(global.window, 'setInterval')

      wrapper = shallowPreMocked(Counter, {
        propsData: {
          number: 10
        }
      })

      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.setProps({
        number: 20
      })

      await flushPromises()
      await wrapper.vm.$nextTick()

      clearIntervalSpy.mockReset()

      wrapper.vm.calcNextStep()
    })

    afterAll(() => {
      clearIntervalSpy.mockRestore()
      setIntervalSpy.mockRestore()
      wrapper.destroy()
    })

    it('should set the displayed number', () => {
      expect(wrapper.vm.displayedNumber).toBe(11)
    })

    it('should not clear the interval', () => {
      expect(clearIntervalSpy).not.toBeCalled()
    })
  })

  describe('when calculating the next number to be displayed and the display number greater than number', () => {
    beforeAll(async () => {
      clearIntervalSpy = jest.spyOn(global.window, 'clearInterval')
      setIntervalSpy = jest.spyOn(global.window, 'setInterval')
      setIntervalSpy.mockImplementation(() => ({}))

      wrapper = shallowPreMocked(Counter, {
        propsData: {
          number: 20
        }
      })

      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.setProps({
        number: 10
      })

      await flushPromises()
      await wrapper.vm.$nextTick()

      clearIntervalSpy.mockReset()

      wrapper.vm.calcNextStep()
    })

    afterAll(() => {
      clearIntervalSpy.mockRestore()
      setIntervalSpy.mockRestore()
      wrapper.destroy()
    })

    it('should set the displayed number', () => {
      expect(wrapper.vm.displayedNumber).toBe(19)
    })

    it('should not clear the interval', () => {
      expect(clearIntervalSpy).not.toBeCalled()
    })
  })

  describe('when calculating the next number to be displayed and the display number equals the number', () => {
    beforeAll(async () => {
      clearIntervalSpy = jest.spyOn(global.window, 'clearInterval')
      setIntervalSpy = jest.spyOn(global.window, 'setInterval')
      setIntervalSpy.mockImplementation(() => ({}))

      wrapper = shallowPreMocked(Counter, {
        propsData: {
          number: 20
        }
      })

      await flushPromises()
      await wrapper.vm.$nextTick()

      wrapper.setProps({
        number: 20
      })

      await flushPromises()
      await wrapper.vm.$nextTick()

      clearIntervalSpy.mockReset()

      wrapper.vm.calcNextStep()
    })

    afterAll(() => {
      clearIntervalSpy.mockRestore()
      setIntervalSpy.mockRestore()
      wrapper.destroy()
    })

    it('should set the displayed number', () => {
      expect(wrapper.vm.displayedNumber).toBe(20)
    })

    it('should clear the interval', () => {
      expect(clearIntervalSpy).toBeCalled()
    })
  })
})
