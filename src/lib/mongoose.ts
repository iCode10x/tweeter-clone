import mongoose from 'mongoose'
export async function connectToDB() {
  try {
    const connectionString = process.env.MONGODB_CONNECTION_STRING
    if (connectionString) await mongoose.connect(connectionString)
    else
      throw new Error(
        'Connection string not found!, cannot connect to database'
      )
    console.log('Database connected!')
  } catch (error: any) {
    throw new Error('Conection to database failed.', error.message)
  }
}
