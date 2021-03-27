import LinkIcon from '.'

describe('Link Icon', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(LinkIcon)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
