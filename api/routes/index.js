const { Router } = require('express')
const router = Router()

const healthRoutes = require('./health')
const usersRoutes = require('./users')

router.use('/health', healthRoutes)
router.use('/users', usersRoutes)

router.get('/', (req, res, next) => {
  res.json({ message: 'success' })
})

module.exports = router
