const { MongoClient } = require('mongodb')
// const uri = "mongodb://localhost:27017"
const uri = "mongodb://melisa:mongodb@apollo-graphql-shard-00-00.xwndi.mongodb.net:27017,apollo-graphql-shard-00-01.xwndi.mongodb.net:27017,apollo-graphql-shard-00-02.xwndi.mongodb.net:27017/Entertainment?ssl=true&replicaSet=atlas-m8xp87-shard-0&authSource=admin&retryWrites=true&w=majority"

let database = null

const connect = async () => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await client.connect()
    const db = await client.db('Entertainment')
    database = db

  } catch (error) {
    console.log(error);
  }
}

const getDatabase = () => database

module.exports = {connect,getDatabase}