// types\index.ts
export interface User {
  id: string
  firstName: string
  lastName: string
  name: string
  email?: string
  role: 'superadmin' | 'admin' | 'client' | 'guest' | 'user'
  countryCode?: string
  phoneNumber?: string
  fullPhoneNumber?: string
  avatar?: string
}

export interface LoginCredentials {
  phoneNumber: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  countryCode: string
  password: string
  role: 'superadmin' | 'admin' | 'client' | 'guest' | 'user'  // Typage spécifique pour le rôle
}

export interface AuthResponse {
  user: User
  token: string
}

export interface DropdownItem {
  label: string
  icon?: string
  to?: string
  onClick?: () => void
}
