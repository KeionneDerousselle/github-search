import UserListItem from '.'

describe('User List Item', () => {
  let wrapper
  let user

  beforeAll(() => {
    user = {
      name: 'Test',
      login: 'test_user',
      avatar_url: 'https://some.fake.com/avatar.png',
      html_url: 'https://www.some.external.link.com'
    }

    wrapper = shallowPreMocked(UserListItem, {
      propsData: {
        user
      }
    })
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the user\'s avatar', () => {
    const avatar = wrapper.get('.user-list-item__avatar')

    expect(avatar.element).toBeVisible()
    expect(avatar.attributes().src).toBe(user.avatar_url)
    expect(avatar.attributes().alt).toBe(`Profile picture for ${user.login}`)
  })

  it('should render the user\'s usernane', () => {
    const username = wrapper.get('.user-list-item__details__login')

    expect(username.element).toBeVisible()
    expect(username.text()).toBe(user.login)
  })

  it('should render the user\'s name', () => {
    const name = wrapper.get('.user-list-item__details__name')

    expect(name.element).toBeVisible()
    expect(name.text()).toBe(user.name)
  })

  it('should render an external link to the user\'s GitHub page', () => {
    const externalLink = wrapper.get('.user-list-item__link')

    expect(externalLink.attributes().href).toBe(user.html_url)
    expect(externalLink.attributes().target).toBe('_blank')
  })
})
