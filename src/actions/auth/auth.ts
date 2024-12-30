import { tesloApi } from "../../config/api/tesloApi";
import { User } from '../../domain/entities/user.entity';
import type { AuthResponse } from '../../infrastructure/interfaces/auth.response';

const returnUserToken = (data: AuthResponse) => {
    const user: User = {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        isActive: data.isActive,
        roles: data.roles
    }
    return {
        user: user,
        token: data.token
    };
}

export const authLogin = async (email: string, password: string) => {
    try {
        const { data } = await tesloApi.post<AuthResponse>(`/auth/login`, {email, password});
        console.log({data});
        
        return returnUserToken(data);
        
    } catch (error) {
        console.log({error})
       // throw new Error(`Error to login`);
        
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await tesloApi.get<AuthResponse>(`/auth/check-status`);
        return returnUserToken(data);
    } catch (error) {
        return null;
    }
}

export const authRegisterUser = async (fullName: string, email: string, password: string) => {
    try {
        const { data } = await tesloApi.post<AuthResponse>(`/auth/register`, {fullName, email, password});
        console.log('authRegisterUser data: ', data);
        
        return returnUserToken(data);
    } catch (error) {
        return null;
    }
}