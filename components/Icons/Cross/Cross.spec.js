import CrossIcon from '.'

describe('Cross Icon', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(CrossIcon)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
