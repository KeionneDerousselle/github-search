import UserListItem from '.'

describe('User List Item', () => {
  let wrapper
  let user
  let mockGetUserDetails
  let mockGetUserDetailsByUsername

  describe('when user details are not returned', () => {
    beforeAll(() => {
      user = {
        login: 'test_user',
        avatar_url: 'https://some.fake.com/avatar.png',
        html_url: 'https://www.some.external.link.com'
      }

      mockGetUserDetails = jest.fn().mockResolvedValue()
      mockGetUserDetailsByUsername = jest.fn().mockReturnValue()

      wrapper = shallowPreMocked(UserListItem, {
        store: {
          users: {
            actions: {
              get: mockGetUserDetails
            },
            getters: {
              userDetailsByUsername: jest.fn().mockReturnValue(mockGetUserDetailsByUsername)
            }
          }
        },
        propsData: {
          user
        }
      })
    })

    afterAll(() => {
      mockGetUserDetails.mockReset()
      wrapper.destroy()
    })

    it('should make a call to get the user\'s details', () => {
      expect(mockGetUserDetails).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({
        username: user.login
      }))
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

    it('should not render the user\'s followers', () => {
      expect(() => wrapper.get('.user-list-item__followers')).toThrow()
    })

    it('should not render the user\'s name', () => {
      expect(() => wrapper.get('.user-list-item__details__name')).toThrow()
    })

    it('should render an external link to the user\'s GitHub page', () => {
      const externalLink = wrapper.get('.user-list-item__link')

      expect(externalLink.attributes().href).toBe(user.html_url)
      expect(externalLink.attributes().target).toBe('_blank')
    })
  })

  describe('when user details are returned', () => {
    let userDetails

    beforeAll(() => {
      user = {
        login: 'test_user',
        avatar_url: 'https://some.fake.com/avatar.png',
        html_url: 'https://www.some.external.link.com'
      }

      userDetails = {
        name: 'Test User'
      }

      mockGetUserDetails = jest.fn().mockResolvedValue()
      mockGetUserDetailsByUsername = jest.fn().mockReturnValue({ data: userDetails })

      wrapper = shallowPreMocked(UserListItem, {
        store: {
          users: {
            actions: {
              get: mockGetUserDetails
            },
            getters: {
              userDetailsByUsername: jest.fn().mockReturnValue(mockGetUserDetailsByUsername)
            }
          }
        },
        propsData: {
          user
        }
      })
    })

    afterAll(() => {
      mockGetUserDetails.mockReset()
      wrapper.destroy()
    })

    it('should make a call to get the user\'s details', () => {
      expect(mockGetUserDetails).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({
        username: user.login
      }))
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

    it('should render the user\'s followers', () => {
      const followers = wrapper.get('.user-list-item__followers')

      expect(followers.element).toBeVisible()
    })

    it('should render the user\'s name', () => {
      const name = wrapper.get('.user-list-item__details__name')

      expect(name.element).toBeVisible()
      expect(name.text()).toBe(userDetails.name)
    })

    it('should render an external link to the user\'s GitHub page', () => {
      const externalLink = wrapper.get('.user-list-item__link')

      expect(externalLink.attributes().href).toBe(user.html_url)
      expect(externalLink.attributes().target).toBe('_blank')
    })
  })
})
