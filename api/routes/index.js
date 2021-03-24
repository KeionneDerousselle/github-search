const { Router } = require('express')
const router = Router()

const healthRoutes = require('./health')

router.use('/health', healthRoutes)

router.get('/', (req, res, next) => {
  res.json({ message: 'success' })
})

module.exports = router
