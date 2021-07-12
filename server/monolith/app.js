const express = require('express')
const PORT = process.env.PORT || 3002
const app = express()
const router = require('./routes')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})