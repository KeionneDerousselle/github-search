import CheckIcon from '.'

describe('Check Icon', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(CheckIcon)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
