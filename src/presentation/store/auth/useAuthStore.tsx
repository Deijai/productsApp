import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { authCheckStatus, authLogin, authRegisterUser } from "../../../actions/auth/auth";
import { StorageAdapter } from '../../../config/adapters/async-storage';
import { AuthResponse } from "../../../infrastructure/interfaces/auth.response";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkStatus: () => Promise<void>;
    register: (fullName: string, email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);

        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }

        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'autheticated', token: resp.token, user: resp.user });
        return true;
    },
    logout: async () => {
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    },
    checkStatus: async () => {
        const resp = await authCheckStatus();

        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }
        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'autheticated', token: resp.token, user: resp.user });
        return;
    },
    register: async (fullName: string, email: string, password: string) => {
        const resp = await authRegisterUser(fullName, email, password);

        if (!resp) {
            return false;
        }
        return true;
    }

}))