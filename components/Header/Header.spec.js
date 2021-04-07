import Header from '.'

describe('Header', () => {
  let wrapper

  beforeAll(() => {
    wrapper = mountPreMocked(Header)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should display the header', () => {
    expect(wrapper.get('.header').element).toBeVisible()
    expect(wrapper.get('.header__top').element).toBeVisible()
    expect(wrapper.get('.header__logo').element).toBeVisible()
    expect(wrapper.get('.header__top__content').element).toBeVisible()
    expect(wrapper.get('.header__bottom').element).toBeVisible()
  })
})
