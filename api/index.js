const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const { NODE_ENV, PORT } = process.env
const inDevEnv = NODE_ENV !== 'production'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', require('./routes/index'))

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  const statusCode = err.status || 500

  res.status(statusCode)
  res.json({
    message: err.message || 'Unknown server error occurred!',
    status: statusCode,
    stack: inDevEnv ? err.stack : undefined
  })
})

module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = PORT || 3001

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
