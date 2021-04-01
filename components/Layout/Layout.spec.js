import Layout from '.'

describe('Layout', () => {
  let wrapper

  describe('when a header top slot is provided', () => {
    let headerTopId

    beforeAll(() => {
      headerTopId = 'header-top'

      wrapper = mountPreMocked(Layout, {
        slots: {
          headerTop: `<div id="${headerTopId}">Header Top Content</div>`
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render the header', () => {
      expect(wrapper.get('#kd-github-search-header').element).toBeVisible()
    })

    it('should render the top header slot', () => {
      expect(wrapper.get(`#kd-github-search-header .header__top #${headerTopId}`).element).toBeVisible()
    })
  })

  describe('when a header top slot is not provided', () => {
    let headerTopId

    beforeAll(() => {
      headerTopId = 'header-top'

      wrapper = mountPreMocked(Layout)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render the header', () => {
      expect(wrapper.get('#kd-github-search-header').element).toBeVisible()
    })

    it('should not render the top header slot', () => {
      expect(() => wrapper.get(`#kd-github-search-header .header__top #${headerTopId}`)).toThrow()
    })
  })

  describe('when a header bottom slot is provided', () => {
    let headerBottomId

    beforeAll(() => {
      headerBottomId = 'header-bottom'

      wrapper = mountPreMocked(Layout, {
        slots: {
          headerBottom: `<div id="${headerBottomId}">Header Bottom Content</div>`
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render the header', () => {
      expect(wrapper.get('#kd-github-search-header').element).toBeVisible()
    })

    it('should render the bottom header slot', () => {
      expect(wrapper.get(`#kd-github-search-header .header__bottom #${headerBottomId}`).element).toBeVisible()
    })
  })

  describe('when a header bottom slot is not provided', () => {
    let headerBottomId

    beforeAll(() => {
      headerBottomId = 'header-bottom'

      wrapper = mountPreMocked(Layout)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render the header', () => {
      expect(wrapper.get('#kd-github-search-header').element).toBeVisible()
    })

    it('should not render the bottom header slot', () => {
      expect(() => wrapper.get(`#kd-github-search-header .header__bottom #${headerBottomId}`)).toThrow()
    })
  })

  describe('when a page title is provided', () => {
    let pageTitle

    beforeAll(() => {
      pageTitle = 'Page Title'
      wrapper = mountPreMocked(Layout, {
        propsData: {
          pageTitle
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should add an h1 to the page containing the page title', () => {
      const mainTitle = wrapper.get('h1#main-content-title')

      expect(mainTitle.element).toBeVisible()
      expect(mainTitle.text()).toBe(pageTitle)
    })
  })

  describe('when a left section title is provided', () => {
    let leftSectionTitle

    beforeAll(() => {
      leftSectionTitle = 'Left Section Title'
      wrapper = mountPreMocked(Layout, {
        propsData: {
          leftSectionTitle
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should add an h2 to the left section containing the left section title', () => {
      const leftSectionTitleEl = wrapper.get('h2#content-left-title')

      expect(leftSectionTitleEl.element).toBeVisible()
      expect(leftSectionTitleEl.text()).toBe(leftSectionTitle)
    })
  })

  describe('when a left section content is provided', () => {
    let leftSectionContentId

    beforeAll(() => {
      leftSectionContentId = 'left-section-content'
      wrapper = mountPreMocked(Layout, {
        slots: {
          leftSectionContent: `<div id="${leftSectionContentId}">Left Section Content</div>`
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the left section', () => {
      expect(wrapper.get('#left-section').element).toBeVisible()
    })

    it('should display the left section content', () => {
      expect(wrapper.get(`#left-section #${leftSectionContentId}`).element).toBeVisible()
    })
  })

  describe('when a left section content is not provided', () => {
    let leftSectionContentId

    beforeAll(() => {
      leftSectionContentId = 'left-section-content'
      wrapper = mountPreMocked(Layout)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the left section', () => {
      expect(wrapper.get('#left-section').element).toBeVisible()
    })

    it('should not display the left section content', () => {
      expect(() => wrapper.get(`#left-section #${leftSectionContentId}`)).toThrow()
    })
  })

  describe('when a right section title is provided', () => {
    let rightSectionTitle

    beforeAll(() => {
      rightSectionTitle = 'Right Section Title'
      wrapper = mountPreMocked(Layout, {
        propsData: {
          rightSectionTitle
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should add an h2 to the right section containing the right section title', () => {
      const rightSectionTitleEl = wrapper.get('h2#content-right-title')

      expect(rightSectionTitleEl.element).toBeVisible()
      expect(rightSectionTitleEl.text()).toBe(rightSectionTitle)
    })
  })

  describe('when a right section content is provided', () => {
    let rightSectionContentId

    beforeAll(() => {
      rightSectionContentId = 'right-section-content'
      wrapper = mountPreMocked(Layout, {
        slots: {
          rightSectionContent: `<div id="${rightSectionContentId}">Right Section Content</div>`
        }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the right section', () => {
      expect(wrapper.get('#right-section').element).toBeVisible()
    })

    it('should display the right section content', () => {
      expect(wrapper.get(`#right-section #${rightSectionContentId}`).element).toBeVisible()
    })
  })

  describe('when a right section content is not provided', () => {
    let rightSectionContentId

    beforeAll(() => {
      rightSectionContentId = 'right-section-content'
      wrapper = mountPreMocked(Layout)
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('should render as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display the right section', () => {
      expect(wrapper.get('#right-section').element).toBeVisible()
    })

    it('should not display the right section content', () => {
      expect(() => wrapper.get(`#right-section #${rightSectionContentId}`)).toThrow()
    })
  })
})
