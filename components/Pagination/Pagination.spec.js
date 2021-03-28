import Pagination from '.'

describe('Pagination', () => {
  let wrapper

  describe('when the first page is active', () => {
    beforeAll(async () => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75
        }
      })

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should disable the previous link', () => {
      const prev = wrapper.get('.page__item--previous .page__link')

      expect(prev.element).toBeVisible()
      expect(prev.attributes().disabled).toBeTruthy()
      expect(prev.classes()).toContain('page__link--disabled')
    })

    it('should enable the next page link', () => {
      const next = wrapper.get('.page__item--next .page__link')

      expect(next.element).toBeVisible()
      expect(next.attributes().disabled).toBeFalsy()
      expect(next.classes()).not.toContain('page__link--disabled')
    })

    it('should set the current page as the active page', () => {
      const currentPage = wrapper.get(`.page__link--${wrapper.vm.currentPage}`)

      expect(currentPage.element).toBeVisible()
      expect(currentPage.attributes().disabled).toBeTruthy()
      expect(currentPage.classes()).toContain('page__link--active')
    })

    it('should enable all other pages', () => {
      wrapper.vm.pages.forEach(page => {
        if (!page.active) {
          const pageEl = wrapper.get(`.page__link--${page.label}`)

          expect(pageEl.element).toBeVisible()
          expect(pageEl.attributes().disabled).toBeFalsy()
          expect(pageEl.classes()).not.toContain('page__link--active')
        }
      })
    })
  })

  describe('when the first page is not active', () => {
    beforeAll(() => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75,
          currentPage: 2
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should enable the previous link', () => {
      const prev = wrapper.get('.page__item--previous .page__link')

      expect(prev.element).toBeVisible()
      expect(prev.attributes().disabled).toBeFalsy()
      expect(prev.classes()).not.toContain('page__link--disabled')
    })

    it('should enable the next page link', () => {
      const next = wrapper.get('.page__item--next .page__link')

      expect(next.element).toBeVisible()
      expect(next.attributes().disabled).toBeFalsy()
      expect(next.classes()).not.toContain('page__link--disabled')
    })

    it('should set the current page as the active page', () => {
      const currentPage = wrapper.get(`.page__link--${wrapper.vm.currentPage}`)

      expect(currentPage.element).toBeVisible()
      expect(currentPage.attributes().disabled).toBeTruthy()
      expect(currentPage.classes()).toContain('page__link--active')
    })

    it('should enable all other pages', () => {
      wrapper.vm.pages.forEach(page => {
        if (!page.active) {
          const pageEl = wrapper.get(`.page__link--${page.label}`)

          expect(pageEl.element).toBeVisible()
          expect(pageEl.attributes().disabled).toBeFalsy()
          expect(pageEl.classes()).not.toContain('page__link--active')
        }
      })
    })
  })

  describe('when the last page is active', () => {
    beforeAll(() => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75,
          currentPage: 3
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should enable the previous link', () => {
      const prev = wrapper.get('.page__item--previous .page__link')

      expect(prev.element).toBeVisible()
      expect(prev.attributes().disabled).toBeFalsy()
      expect(prev.classes()).not.toContain('page__link--disabled')
    })

    it('should disable the next page link', () => {
      const next = wrapper.get('.page__item--next .page__link')

      expect(next.element).toBeVisible()
      expect(next.attributes().disabled).toBeTruthy()
      expect(next.classes()).toContain('page__link--disabled')
    })

    it('should set the current page as the active page', () => {
      const currentPage = wrapper.get(`.page__link--${wrapper.vm.currentPage}`)

      expect(currentPage.element).toBeVisible()
      expect(currentPage.attributes().disabled).toBeTruthy()
      expect(currentPage.classes()).toContain('page__link--active')
    })

    it('should enable all other pages', () => {
      wrapper.vm.pages.forEach(page => {
        if (!page.active) {
          const pageEl = wrapper.get(`.page__link--${page.label}`)

          expect(pageEl.element).toBeVisible()
          expect(pageEl.attributes().disabled).toBeFalsy()
          expect(pageEl.classes()).not.toContain('page__link--active')
        }
      })
    })
  })

  describe('when the last page is not active', () => {
    beforeAll(() => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75,
          currentPage: 2
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should enable the previous link', () => {
      const prev = wrapper.get('.page__item--previous .page__link')

      expect(prev.element).toBeVisible()
      expect(prev.attributes().disabled).toBeFalsy()
      expect(prev.classes()).not.toContain('page__link--disabled')
    })

    it('should enable the next page link', () => {
      const next = wrapper.get('.page__item--next .page__link')

      expect(next.element).toBeVisible()
      expect(next.attributes().disabled).toBeFalsy()
      expect(next.classes()).not.toContain('page__link--disabled')
    })

    it('should set the current page as the active page', () => {
      const currentPage = wrapper.get(`.page__link--${wrapper.vm.currentPage}`)

      expect(currentPage.element).toBeVisible()
      expect(currentPage.attributes().disabled).toBeTruthy()
      expect(currentPage.classes()).toContain('page__link--active')
    })

    it('should enable all other pages', () => {
      wrapper.vm.pages.forEach(page => {
        if (!page.active) {
          const pageEl = wrapper.get(`.page__link--${page.label}`)

          expect(pageEl.element).toBeVisible()
          expect(pageEl.attributes().disabled).toBeFalsy()
          expect(pageEl.classes()).not.toContain('page__link--active')
        }
      })
    })
  })

  describe('when clicking a page that is active', () => {
    beforeAll(async () => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75,
          currentPage: 2
        }
      })

      const currentPage = wrapper.get(`.page__link--${wrapper.vm.currentPage}`)

      currentPage.trigger('click')

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should not emit the change page event', () => {
      expect(wrapper.emitted().change).toBeFalsy()
    })
  })

  describe('when clicking a page that is not active', () => {
    beforeAll(async () => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75,
          currentPage: 2
        }
      })

      const page = wrapper.get('.page__link--1')

      page.trigger('click')

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should emit the change page event with the clicked page', () => {
      expect(wrapper.emitted().change[0]).toEqual([1])
    })
  })

  describe('when clicking a next page link while the last page is active', () => {
    beforeAll(async () => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75,
          currentPage: 3
        }
      })

      const nextPageLink = wrapper.get('.page__item--next .page__link')

      nextPageLink.trigger('click')

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should not emit the change page event', () => {
      expect(wrapper.emitted().change).toBeFalsy()
    })
  })

  describe('when clicking a next page link while the last page is not active', () => {
    beforeAll(async () => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75,
          currentPage: 2
        }
      })

      const nextPageLink = wrapper.get('.page__item--next .page__link')

      nextPageLink.trigger('click')

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should emit the change page event with the next page', () => {
      expect(wrapper.emitted().change[0]).toEqual([3])
    })
  })

  describe('when clicking a previous page link while the first page is active', () => {
    beforeAll(async () => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75,
          currentPage: 1
        }
      })

      const previousPageLink = wrapper.get('.page__item--previous .page__link')

      previousPageLink.trigger('click')

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should not emit the change page event', () => {
      expect(wrapper.emitted().change).toBeFalsy()
    })
  })

  describe('when clicking a previous page link while the first page is not active', () => {
    beforeAll(async () => {
      wrapper = shallowPreMocked(Pagination, {
        propsData: {
          itemsPerPage: 25,
          totalItems: 75,
          currentPage: 2
        }
      })

      const previousPageLink = wrapper.get('.page__item--previous .page__link')

      previousPageLink.trigger('click')

      await wrapper.vm.$nextTick()
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should emit the change page event with the previous page', () => {
      expect(wrapper.emitted().change[0]).toEqual([1])
    })
  })
})
