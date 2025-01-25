import React, {useState, createContext, ReactNode} from "react";
import SessionStorage from 'react-native-session-storage';
import { api } from "../services/api";

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    signIn: (credential: SignInProps)=> Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

type UserProps = {
    id: string
    name: string
    email: string
    token: string
}

type SignInProps = {
    email: string
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false)

    const isAuthenticated = (user.name !== '')

    async function signIn({email, password}: SignInProps) {

        setLoadingAuth(true)

        try {
            const response = await api.post('/session', {
                email,
                password
            })

            console.log(response.data)

            const {id, name, token} = response.data

            const data = {
                ...response.data
            } 

            SessionStorage.setItem('@pizzaToken', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id, name, email, token
            })

            setLoadingAuth(false)

        } catch (error) {
            console.log("erro ao acesar: ", error)
            setLoadingAuth(false)
        }
        
    }


    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}