import SearchIcon from '.'

describe('Search Icon', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(SearchIcon)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
