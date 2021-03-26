import Button from '.'

describe('Button', () => {
  let wrapper
  let buttonClasses

  describe('when the button props are not provided', () => {
    beforeAll(() => {
      wrapper = shallowPreMocked(Button)
      buttonClasses = wrapper.get('.button').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the button', () => {
      expect(wrapper.get('.button').element).toBeVisible()
    })

    it('should render the center button content', () => {
      expect(wrapper.get('.button .button__content--center').element).toBeVisible()
    })

    it('should not render either the left or right loading spinner by default', () => {
      expect(() => wrapper.get('.button .button__spinner')).toThrow()
    })

    it('should not render the loading button class', () => {
      expect(buttonClasses).not.toContain('button--loading')
    })

    it('should not set the disabled attribute on the button', () => {
      // The disabled attribute should not be defined, but most likely will not equal the value false
      // <button></button>
      expect(wrapper.get('.button').attributes().disabled).toBeFalsy()
    })
  })

  describe('when the button is disabled', () => {
    beforeAll(() => {
      wrapper = shallowPreMocked(Button, {
        attrs: {
          disabled: true
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not set the disabled attribute on the button', () => {
      // The disabled attribute should be defined, but most likely will not equal the value true
      // <button disabled="disabled"></button>
      expect(wrapper.get('.button').attributes().disabled).toBeTruthy()
    })
  })

  describe('when the button is not disabled', () => {
    beforeAll(() => {
      wrapper = shallowPreMocked(Button, {
        attrs: {
          disabled: false
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not set the disabled attribute on the button', () => {
      // The disabled attribute should not be defined, but most likely will not equal the value false
      // <button></button>
      expect(wrapper.get('.button').attributes().disabled).toBeFalsy()
    })
  })

  describe('when providing the button with a default slot', () => {
    let contentSlotId

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      wrapper = shallowPreMocked(Button, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render the content slot', () => {
      expect(wrapper.get(`.button .button__content .button__content--center #${contentSlotId}`).element).toBeVisible()
    })
  })

  describe('when not providing the button with a default slot', () => {
    let contentSlotId

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      wrapper = shallowPreMocked(Button)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not render the content slot', () => {
      expect(() => wrapper.get(`.button .button__content .button__content--center #${contentSlotId}`)).toThrow()
    })
  })

  describe('when listeners are provided to the button', () => {
    let onClickHandler

    beforeAll(async () => {
      onClickHandler = jest.fn()

      wrapper = mountPreMocked(Button, {
        listeners: {
          click: onClickHandler
        }
      })

      wrapper.trigger('click')
      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should trigger listener handlers on the appropriate events', () => {
      expect(onClickHandler).toHaveBeenCalled()
    })
  })

  describe('when attributes are provided to the button', () => {
    beforeAll(() => {
      wrapper = mountPreMocked(Button, {
        attrs: {
          type: 'submit'
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should pass any attributes to the button component', () => {
      expect(wrapper.attributes().type).toBe('submit')
    })
  })

  describe('when a right button slot is provided, but the button is not loading', () => {
    let contentSlotId
    let rightSlotId

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      rightSlotId = 'right-slot'

      wrapper = shallowPreMocked(Button, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`,
          right: `<span id="${rightSlotId}">R</span>`
        },

        propsData: {
          loading: false
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render the right content slot', () => {
      expect(wrapper.get(`.button .button__content .button__content--right #${rightSlotId}`).element).toBeVisible()
    })

    it('should not render the right loading spinner', () => {
      expect(() => wrapper.get('.button .button__content .button__content--right .button__spinner')).toThrow()
    })

    it('should not render the left slot', () => {
      expect(() => wrapper.get('.button .button__content--left')).toThrow()
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when a right button slot is provided, and the button is loading', () => {
    let contentSlotId
    let rightSlotId

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      rightSlotId = 'right-slot'

      wrapper = shallowPreMocked(Button, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`,
          right: `<span id="${rightSlotId}">R</span>`
        },

        propsData: {
          loading: true
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not render the right content slot', () => {
      expect(() => wrapper.get(`.button .button__content .button__content--right #${rightSlotId}`)).toThrow()
    })

    it('should render the right loading spinner', () => {
      expect(wrapper.get('.button .button__content .button__content--right .button__spinner').element).toBeVisible()
    })

    it('should not render the left slot', () => {
      expect(() => wrapper.get('.button .button__content--left')).toThrow()
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when a left button slot is provided, but the button is not loading', () => {
    let contentSlotId
    let leftSlotId

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      leftSlotId = 'left-slot'

      wrapper = shallowPreMocked(Button, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`,
          left: `<span id="${leftSlotId}">L</span>`
        },

        propsData: {
          loading: false
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not render the right content slot', () => {
      expect(() => wrapper.get('.button .button__content .button__content--right')).toThrow()
    })

    it('should not render the right loading spinner', () => {
      expect(() => wrapper.get('.button .button__content .button__content--right .button__spinner')).toThrow()
    })

    it('should render the left slot', () => {
      expect(wrapper.get(`.button .button__content--left #${leftSlotId}`).element).toBeVisible()
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when a left button slot is provided, and the button is loading', () => {
    let contentSlotId
    let leftSlotId

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      leftSlotId = 'left-slot'

      wrapper = shallowPreMocked(Button, {
        slots: {
          default: `<span id="${contentSlotId}"></span>`,
          left: `<span id="${leftSlotId}">L</span>`
        },

        propsData: {
          loading: true
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not render the right content slot', () => {
      expect(() => wrapper.get('.button .button__content .button__content--right')).toThrow()
    })

    it('should not render the right loading spinner', () => {
      expect(() => wrapper.get('.button .button__content .button__content--right .button__spinner')).toThrow()
    })

    it('should not render the left slot', () => {
      expect(() => wrapper.get(`.button .button__content--left #${leftSlotId}`)).toThrow()
    })

    it('should render the left loading spinner', () => {
      expect(wrapper.get('.button .button__content .button__content--left .button__spinner').element).toBeVisible()
    })
  })

  describe('when a right and left button slot is provided', () => {
    let contentSlotId
    let rightSlotId
    let leftSlotId

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      rightSlotId = 'right-slot'
      leftSlotId = 'left-slot'

      wrapper = shallowPreMocked(Button, {
        slots: {
          left: `<span id="${leftSlotId}">L</span>`,
          default: `<span id="${contentSlotId}"></span>`,
          right: `<span id="${rightSlotId}">R</span>`
        },

        propsData: {
          loading: false
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render the right slot', () => {
      expect(wrapper.get(`.button .button__content .button__content--right #${rightSlotId}`).element).toBeVisible()
    })

    it('should not render the right loading spinner', () => {
      expect(() => wrapper.get('.button .button__content .button__content--right .button__spinner')).toThrow()
    })

    it('should render the left slot', () => {
      expect(wrapper.get(`.button .button__content .button__content--left #${leftSlotId}`).element).toBeVisible()
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when a right and left button slot is provided, and the button is loading', () => {
    let contentSlotId
    let rightSlotId
    let leftSlotId

    beforeAll(() => {
      contentSlotId = 'button-content-slot'
      rightSlotId = 'right-slot'
      leftSlotId = 'left-slot'

      wrapper = shallowPreMocked(Button, {
        slots: {
          left: `<span id="${leftSlotId}">L</span>`,
          default: `<span id="${contentSlotId}"></span>`,
          right: `<span id="${rightSlotId}">R</span>`
        },

        propsData: {
          loading: true
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not render the right slot', () => {
      expect(() => wrapper.get(`.button .button__content .button__content--right #${rightSlotId}`)).toThrow()
    })

    it('should render the right loading spinner', () => {
      expect(wrapper.get('.button .button__content .button__content--right .button__spinner').element).toBeVisible()
    })

    it('should render the left slot', () => {
      expect(wrapper.get(`.button .button__content .button__content--left #${leftSlotId}`).element).toBeVisible()
    })

    it('should not render the left loading spinner', () => {
      expect(() => wrapper.get('.button .button__content .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when no left or right slot are provided, and the button is loading', () => {
    beforeAll(() => {
      wrapper = shallowPreMocked(Button, {
        propsData: {
          loading: true
        }
      })

      buttonClasses = wrapper.get('.button').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should set the loading class on the button', () => {
      expect(buttonClasses).toContain('button--loading')
    })

    it('should render the loading spinner on the right side of the button', () => {
      expect(wrapper.get('.button .button__content--right .button__spinner').element).toBeVisible()
    })

    it('should not render the loading spinner on the left side of the button', () => {
      expect(() => wrapper.get('.button .button__content--left .button__spinner')).toThrow()
    })
  })

  describe('when no left or right slot are provided, and the button is not loading', () => {
    beforeAll(() => {
      wrapper = shallowPreMocked(Button, {
        propsData: {
          loading: false
        }
      })

      buttonClasses = wrapper.get('.button').classes()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not set the loading class on the button', () => {
      expect(buttonClasses).not.toContain('button--loading')
    })

    it('should not render the loading spinner on the right side of the button', () => {
      expect(() => wrapper.get('.button .button__content--right .button__spinner')).toThrow()
    })

    it('should not render the loading spinner on the left side of the button', () => {
      expect(() => wrapper.get('.button .button__content--left .button__spinner')).toThrow()
    })
  })
})
