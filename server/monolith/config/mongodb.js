const { MongoClient } = require('mongodb')
const uri = process.env.URI

let database = null


const connect = async () => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await client.connect()
    const db = await client.db('EntertainMe')
    database = db

  } catch (error) {
    console.log(error);
  }
}

const getDatabase = () => database


module.exports = { getDatabase, connect }

