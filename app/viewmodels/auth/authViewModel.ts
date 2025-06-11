import { create } from 'zustand'
import { AuthState, User, LoginCredentials, SignUpCredentials } from '@/app/models/auth/types'
import { signIn, signUp, signInWithGoogle, logout } from '@/app/services/firebase/auth'

interface AuthViewModel extends AuthState {
    setUser: (user: User | null) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
    login: (credentials: LoginCredentials) => Promise<void>
    signup: (credentials: SignUpCredentials) => Promise<void>
    googleLogin: () => Promise<void>
    logout: () => Promise<void>
}

export const useAuthViewModel = create<AuthViewModel>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    login: async (credentials) => {
        try {
            set({ isLoading: true, error: null })
            const userCredential = await signIn(credentials.email, credentials.password)
            set({
                user: {
                    id: userCredential.user.uid,
                    email: userCredential.user.email!,
                    name: userCredential.user.displayName || 'User',
                    avatar: userCredential.user.photoURL || undefined,
                },
                isLoading: false,
            })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    signup: async (credentials) => {
        try {
            set({ isLoading: true, error: null })
            const userCredential = await signUp(credentials.email, credentials.password, credentials.name)
            set({
                user: {
                    id: userCredential.user.uid,
                    email: userCredential.user.email!,
                    name: userCredential.user.displayName || credentials.name,
                    avatar: userCredential.user.photoURL || undefined,
                },
                isLoading: false,
            })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    googleLogin: async () => {
        try {
            set({ isLoading: true, error: null })
            const userCredential = await signInWithGoogle()
            set({
                user: {
                    id: userCredential.user.uid,
                    email: userCredential.user.email!,
                    name: userCredential.user.displayName || 'Google User',
                    avatar: userCredential.user.photoURL || undefined,
                },
                isLoading: false,
            })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    logout: async () => {
        try {
            set({ isLoading: true, error: null })
            await logout()
            set({ user: null, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },
})) 