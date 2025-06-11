import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    UserCredential,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import app from '../firebase/config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function signIn(
    email: string,
    password: string
): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(
    email: string,
    password: string,
    name: string
): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    await updateProfile(userCredential.user, {
        displayName: name,
    });
    return userCredential;
}

export async function signInWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(auth, googleProvider);
}

export async function logout(): Promise<void> {
    return signOut(auth);
}

export function getCurrentUser() {
    return auth.currentUser;
} 