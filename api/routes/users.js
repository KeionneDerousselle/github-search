const { Router } = require('express')
const router = Router()

router.get('/', (req, res, next) => {
  res.json({ status: req.query.q })
})

module.exports = router
