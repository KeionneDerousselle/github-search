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

  it('should render the nuxt tag', () => {
    expect(wrapper.get('nuxt-stub').element).toBeVisible()
  })
})
