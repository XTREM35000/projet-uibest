//server\models\User.ts
import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

// Enum pour les rôles utilisateur
export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  PARTNER = 'partner',
}

// Interface pour les documents utilisateur (propriétés et méthodes)
export interface IUser extends Document {
  _id: ObjectId;
  username?: string; // Nom d'utilisateur optionnel
  email: string;
  avatar: string;
  password: string;
  firstName?: string;
  lastName?: string;
  name?: string; // Champ name généré automatiquement
  phoneNumber?: string; // Numéro de téléphone (optionnel)
  countryCode?: string; // Code du pays (optionnel)
  fullPhoneNumber?: string; // Numéro de téléphone complet, combinant countryCode et phoneNumber
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schéma utilisateur
const userSchema = new mongoose.Schema<IUser>(
  {
    avatar: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    countryCode: {
      type: String,
      trim: true,
    },
    fullPhoneNumber: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CLIENT,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

// Middleware : Hacher le mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Middleware pour générer `fullPhoneNumber` avant la sauvegarde
userSchema.pre('save', function (next) {
  if (this.phoneNumber && this.countryCode) {
    this.fullPhoneNumber = `${this.countryCode}${this.phoneNumber}`;
  }
  next();
});

// Middleware pour générer `name` avant la sauvegarde
userSchema.pre('save', function (next) {
  if (this.firstName && this.lastName) {
    this.name = `${this.lastName} ${this.firstName}`;
  }
  next();
});

// Méthode : Comparer les mots de passe
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export du modèle utilisateur
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
