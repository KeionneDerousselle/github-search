import UsersIcon from '.'

describe('Users Icon', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(UsersIcon)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
