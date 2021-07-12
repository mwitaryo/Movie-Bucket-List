const express = require('express')
const PORT = process.env.PORT || 4001
const app = express()
const router = require('./routes')
const { connect } = require('./config/mongodb')
const errorHandler = require('./middlewares/errorHandler')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error);
  })

