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
  })
})
