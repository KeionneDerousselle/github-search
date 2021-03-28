import ChevronLeftIcon from '.'

describe('Chevron Left Icon', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(ChevronLeftIcon)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
