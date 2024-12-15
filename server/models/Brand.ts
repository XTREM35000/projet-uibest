import mongoose, { Document, Model } from 'mongoose';

// Interface TypeScript pour le modèle Brand
export interface IBrand extends Document {
  companyName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  welcomeMessage?: string; // Optionnel car pas toujours dans les deux modèles
  isConfigured: boolean;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Schéma Mongoose pour le modèle Brand
const brandSchema = new mongoose.Schema<IBrand>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
    },
    primaryColor: {
      type: String,
      default: '#4F46E5', // Couleur par défaut
    },
    secondaryColor: {
      type: String,
      default: '#10B981', // Couleur par défaut
    },
    welcomeMessage: {
      type: String,
      trim: true,
    },
    isConfigured: {
      type: Boolean,
      default: false,
    },
    contact: {
      email: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// Export du modèle
export const Brand: Model<IBrand> =
  mongoose.models.Brand || mongoose.model<IBrand>('Brand', brandSchema);
