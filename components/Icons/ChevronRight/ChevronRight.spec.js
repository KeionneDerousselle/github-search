import ChevronRightIcon from '.'

describe('Chevron Right Icon', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(ChevronRightIcon)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
