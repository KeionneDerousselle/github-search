import UserGroupIcon from '.'

describe('User Group Icon', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(UserGroupIcon)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
