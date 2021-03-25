import Footer from '.'

describe('Footer', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowPreMocked(Footer)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should display a link to my website', () => {
    const devLink = wrapper.get('#footer-dev-link')

    expect(devLink.element).toBeVisible()
    expect(devLink.attributes().href).toBe('https://www.keionne.com')
    expect(devLink.text()).toBe('Keionne Derousselle')
  })

  it('should display a link to this project\'s repo', () => {
    const repoLink = wrapper.get('#footer-repo-link')

    expect(repoLink.element).toBeVisible()
    expect(repoLink.attributes().href).toBe('https://www.github.com/KeionneDerousselle/github-search')
    expect(repoLink.text()).toBe('here')
  })
})
