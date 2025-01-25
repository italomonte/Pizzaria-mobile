import React, {useState, createContext, ReactNode} from "react";
import SessionStorage from 'react-native-session-storage';

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
}

type UserProps = {
    id: string
    name: string
    email: string
    token: string
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        id: '123',
        name: 'ABC',
        email: 'ABC@GMAIL',
        token: 'AAWDADA'
    })

    const isAuthenticated = !!user.name

    return(
        <AuthContext.Provider value={{user, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}