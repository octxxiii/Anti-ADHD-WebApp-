import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import { app } from './config'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const signUp = async (email: string, password: string, name: string): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName: name })
    return userCredential
}

export const signInWithGoogle = async (): Promise<UserCredential> => {
    return signInWithPopup(auth, googleProvider)
}

export const logout = async (): Promise<void> => {
    return signOut(auth)
}

export const getCurrentUser = () => {
    return auth.currentUser
} 