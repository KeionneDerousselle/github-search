const { Router } = require('express')
const { KD_GITHUB_SEARCH_ACCESS_TOKEN } = process.env
const { Octokit } = require('@octokit/rest')
const axios = require('axios')
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
      .status(e.response.status || 500)
      .json({
        message: e.response.data || 'Unknown server error occurred!',
        status: e.status || 500,
        stack: e.stack
      })
  }
})

router.get('/:username', async (req, res) => {
  const username = req.params.username

  try {
    const { data } = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${KD_GITHUB_SEARCH_ACCESS_TOKEN}`
      }
    })

    res.json(data)
  } catch (e) {
    // TODO: handle 403 rate limit exceeded
    // https://github.com/axios/axios#handling-errors
    res
      .status(e.response.status || 500)
      .json({
        message: e.response.data || 'Unknown server error occurred!',
        status: e.status || 500,
        stack: e.stack
      })
  }
})

module.exports = router
