import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import mongoose from 'mongoose'
import { User, UserRole } from '../server/models/User' // Assure-toi que ce chemin correspond à la structure de ton projet
import { connect, disconnect } from 'mongoose'

describe('User model tests', () => {
  // Connexion à la base de données avant les tests, si ce n'est pas déjà fait
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await connect('mongodb://localhost/test_db') // Remplace par ton URI de base de données de test
    }
  })

  // Déconnexion après les tests
  afterAll(async () => {
    await disconnect()
  })

  it('should hash password and compare it correctly', async () => {
    const password = 'password123'
    const user = new User({
      email: 'test@example.com',
      password,
      role: UserRole.CLIENT,
      isActive: true
    })

    // Enregistrer l'utilisateur
    await user.save()

    // Comparer le mot de passe
    const isMatch = await user.comparePassword(password)
    expect(isMatch).toBe(true)
  })
})
