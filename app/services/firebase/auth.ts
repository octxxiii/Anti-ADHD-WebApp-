import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, UserCredential, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { app } from './config'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// 세션 지속성 설정: 브라우저를 닫을 때까지 로그인 유지
setPersistence(auth, browserLocalPersistence)

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
    await setPersistence(auth, browserLocalPersistence)
    return signInWithEmailAndPassword(auth, email, password)
}

export const signUp = async (email: string, password: string, name: string): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName: name })
    return userCredential
}

export const signInWithGoogle = async (): Promise<UserCredential> => {
    await setPersistence(auth, browserLocalPersistence)
    return signInWithPopup(auth, googleProvider)
}

export const logout = async (): Promise<void> => {
    return signOut(auth)
}

export const getCurrentUser = () => {
    return auth.currentUser
} 