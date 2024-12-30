import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { PropsWithChildren, useEffect } from 'react'
import { RootStackParams } from '../navigation/StackNavigator'
import { useAuthStore } from '../store/auth/useAuthStore'

interface Props extends PropsWithChildren { }

export const AuthProvider = ({ children }: Props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, []);


    useEffect(() => {
        if (status !== 'checking') {
            if (status === 'autheticated') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                })
            }
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }]
            })
        }
    }, [status]);

    return (
        <>{children}</>
    )
}
