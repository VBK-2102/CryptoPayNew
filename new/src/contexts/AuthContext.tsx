import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { mongoDBService } from '../services/mongodb'
import type { User as MongoDBUser } from '../services/mongodb'
import toast from 'react-hot-toast'

export interface UserProfile {
  userId: string
  email: string
  displayName?: string
  name?: string
  phone?: string
  address?: string
  walletAddress: string
  inrBalance: number
  cryptoBalances: {
    BTC: number
    USDT: number
    BXC: number
  }
  preferences?: {
    emailNotifications: boolean
    pushNotifications: boolean
    autoRefresh: boolean
  }
  createdAt: Date
  updatedAt: Date
}

interface AuthContextType {
  currentUser: User | null
  userProfile: UserProfile | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>
  refreshUserProfile: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const generateWalletAddress = (): string => {
    const chars = '0123456789abcdef'
    let address = '0x'
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)]
    }
    return address
  }

  const createUserProfile = async (user: User): Promise<UserProfile> => {
    const mongoUser = await mongoDBService.initializeUserIfNotExists(
      user.uid,
      user.email || '',
      user.displayName || undefined
    )

    const profile: UserProfile = {
      userId: user.uid,
      email: mongoUser.email,
      displayName: mongoUser.displayName,
      walletAddress: generateWalletAddress(),
      inrBalance: mongoUser.inrBalance,
      cryptoBalances: mongoUser.cryptoBalances,
      preferences: {
        emailNotifications: true,
        pushNotifications: false,
        autoRefresh: true
      },
      createdAt: mongoUser.createdAt,
      updatedAt: mongoUser.updatedAt
    }

    return profile
  }

  const loadUserProfile = async (user: User): Promise<void> => {
    try {
      const mongoUser = await mongoDBService.getUserByUid(user.uid)
      
      if (mongoUser) {
        const profile: UserProfile = {
          userId: user.uid,
          email: mongoUser.email,
          displayName: mongoUser.displayName,
          name: mongoUser.name,
          phone: mongoUser.phone,
          walletAddress: generateWalletAddress(),
          inrBalance: mongoUser.inrBalance,
          cryptoBalances: mongoUser.cryptoBalances,
          preferences: {
            emailNotifications: true,
            pushNotifications: false,
            autoRefresh: true
          },
          createdAt: mongoUser.createdAt,
          updatedAt: mongoUser.updatedAt
        }
        setUserProfile(profile)
      } else {
        const newProfile = await createUserProfile(user)
        setUserProfile(newProfile)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
      toast.error('Error loading profile')
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Login successful!')
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(getErrorMessage(error.code))
      throw error
    }
  }

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('Account created successfully!')
    } catch (error: any) {
      console.error('Signup error:', error)
      toast.error(getErrorMessage(error.code))
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
      setUserProfile(null)
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Error logging out')
      throw error
    }
  }

  const updateUserProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!currentUser || !userProfile) return

    try {
      const mongoUpdates: Partial<MongoDBUser> = {}
      
      if (updates.inrBalance !== undefined) {
        mongoUpdates.inrBalance = updates.inrBalance
      }
      if (updates.cryptoBalances) {
        mongoUpdates.cryptoBalances = updates.cryptoBalances
      }
      if (updates.email) {
        mongoUpdates.email = updates.email
      }
      if (updates.displayName) {
        mongoUpdates.displayName = updates.displayName
      }
      if (updates.name) {
        mongoUpdates.name = updates.name
      }
      if (updates.phone) {
        mongoUpdates.phone = updates.phone
      }

      await mongoDBService.updateUser(currentUser.uid, mongoUpdates)
      
      const updatedProfile = {
        ...updates,
        updatedAt: new Date()
      }
      
      setUserProfile(prev => prev ? { ...prev, ...updatedProfile } : null)
      
      console.log('Profile updated successfully:', updatedProfile)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Error updating profile')
      throw error
    }
  }

  const refreshUserProfile = async (): Promise<void> => {
    if (currentUser) {
      await loadUserProfile(currentUser)
    }
  }

  const sendPasswordReset = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Password reset email sent! Check your inbox.')
    } catch (error: any) {
      console.error('Password reset error:', error)
      toast.error(getErrorMessage(error.code))
      throw error
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    if (!currentUser || !currentUser.email) {
      throw new Error('No user logged in')
    }

    try {
      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword)
      await reauthenticateWithCredential(currentUser, credential)
      
      // Update password
      await updatePassword(currentUser, newPassword)
      toast.success('Password updated successfully!')
    } catch (error: any) {
      console.error('Change password error:', error)
      toast.error(getErrorMessage(error.code))
      throw error
    }
  }

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email'
      case 'auth/wrong-password':
        return 'Incorrect password'
      case 'auth/email-already-in-use':
        return 'Email already registered'
      case 'auth/weak-password':
        return 'Password is too weak'
      case 'auth/invalid-email':
        return 'Invalid email address'
      case 'auth/invalid-credential':
        return 'Invalid credentials. Please check your current password.'
      case 'auth/requires-recent-login':
        return 'Please log out and log back in before changing your password'
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.'
      default:
        return 'An error occurred. Please try again.'
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        await loadUserProfile(user)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    userProfile,
    login,
    signup,
    logout,
    loading,
    updateUserProfile,
    refreshUserProfile,
    sendPasswordReset,
    changePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
