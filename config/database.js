const mongoose = require('mongoose')

module.exports = () => {
  const dbHost = 'localhost'
  const dbName = 'fcc-poll'
  const uri = `mongodb://${dbHost}/${dbName}`

  mongoose.connect(uri)
  mongoose.Promise = global.Promise

  mongoose.connection.on('Connected', () => {
    console.log('Database connected to: ${uri}')
  })

  mongoose.connection.on('Disconnected', () => {
    console.log('Database disconnected from: ${uri}')
  })

  mongoose.connection.on('error', err => {
        console.log(`Database error on connection: ${err}`);
    });


  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database disconnected due to end of app')
      process.exit(0)
    })
  })
}
