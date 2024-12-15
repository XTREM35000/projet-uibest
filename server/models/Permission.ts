import mongoose from 'mongoose'
import { UserRole } from './User'

const permissionSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true
  },
  resource: {
    type: String,
    required: true
  },
  actions: [{
    type: String,
    enum: ['create', 'read', 'update', 'delete'],
    required: true
  }]
}, {
  timestamps: true
})

export const Permission = mongoose.model('Permission', permissionSchema)