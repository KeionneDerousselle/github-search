const { Router } = require('express')
const { KD_GITHUB_SEARCH_ACCESS_TOKEN } = process.env
const { Octokit } = require('@octokit/rest')
const router = Router()

router.get('/', async (req, res) => {
  const appOctokit = new Octokit({
    auth: KD_GITHUB_SEARCH_ACCESS_TOKEN
  })

  // TODO: sanitize query and make sure it is validated

  try {
    // eslint-disable-next-line camelcase
    const { q, per_page, page } = req.query
    const { data } = await appOctokit.search.users({ q, per_page, page })

    res.json(data)
  } catch (e) {
    res
      .status(e.status || 500)
      .json({
        message: e.message || 'Unknown server error occurred!',
        status: e.status || 500,
        stack: e.stack
      })
  }
})

module.exports = router
