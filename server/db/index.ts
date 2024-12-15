import mongoose from 'mongoose';
import { useRuntimeConfig } from '#imports';

export async function connectDb() {
  try {
    const config = useRuntimeConfig();
    const mongodbUri = config.mongodbUri || 'mongodb://localhost:27017/gogo-express';

    await mongoose.connect(mongodbUri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Remonte l'erreur pour une meilleure gestion
  }
}
