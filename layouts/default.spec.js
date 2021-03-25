import DefaultLayout from './default'

describe('Default Layout', () => {
  let wrapper

  beforeAll(() => {
    wrapper = mountPreMocked(DefaultLayout)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the header', () => {
    expect(wrapper.get('header#kd-github-search-header').element).toBeVisible()
  })

  it('should render the content', () => {
    expect(wrapper.get('main#kd-github-search-content').element).toBeVisible()
  })

  it('should render the footer', () => {
    expect(wrapper.get('footer#kd-github-search-footer').element).toBeVisible()
  })
})
