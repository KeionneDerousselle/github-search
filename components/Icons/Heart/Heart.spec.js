import HeartIcon from '.'

describe('Heart Icon', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(HeartIcon)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
