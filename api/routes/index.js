const express = require('express')
const router = express.Router()

const healthRoutes = require('./health')

router.use('/health', healthRoutes)

router.get('/', (req, res, next) => {
  res.json({ message: 'success' })
})

module.exports = router
