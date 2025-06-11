import { create } from 'zustand';
import { User as FirebaseUser } from 'firebase/auth';
import { getCurrentUser } from '../services/auth';

interface AuthState {
    user: FirebaseUser | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: FirebaseUser | null) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    initializeAuth: () => Promise<void>;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    error: null,

    setUser: (user) => set({ user }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    initializeAuth: async () => {
        try {
            set({ isLoading: true, error: null });
            const user = await getCurrentUser();
            set({ user, isLoading: false });
        } catch (error) {
            set({ error: '인증 상태 초기화 실패', isLoading: false });
        }
    },

    clearAuth: () => {
        set({
            user: null,
            error: null,
        });
    },
})); 