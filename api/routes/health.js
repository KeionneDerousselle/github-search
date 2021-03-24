
const { Router } = require('express')
const router = Router()

router.get('/', (req, res, next) => {
  res.json({ status: 'healthy' })
})

module.exports = router
