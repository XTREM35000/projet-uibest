import { Brand } from '../models/Brand'
import mongoose from 'mongoose'

export async function clearDatabase() {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany({})
  }
}

export const mockBrandData = {
  companyName: 'Gogo Express Test',
  logo: 'https://example.com/logo.png',
  primaryColor: '#4F46E5',
  secondaryColor: '#10B981',
  welcomeMessage: 'Bienvenue sur Gogo Express Test',
  isConfigured: true
}