import mongoose from 'mongoose'
import { config } from 'dotenv'
import { afterAll, beforeAll } from 'vitest'

config() // Charge les variables d'environnement depuis .env

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', {
    
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
