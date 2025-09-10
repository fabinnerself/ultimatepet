const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const dbName = process.env.MONGODB_DB_NAME || 'test'
        await mongoose.connect(process.env.MONGODB_CONNECT_URI, { dbName })
        const conn = mongoose.connection
        console.log(`Connect to MongoDB successfully (db: ${conn.name})`)
        if (!process.env.MONGODB_DB_NAME) {
            console.warn(`MONGODB_DB_NAME not set. Using default dbName='${dbName}'.`)
        }
    } catch (error) {
        console.log("Connect failed " + error.message )
    }
}

module.exports = connectDB