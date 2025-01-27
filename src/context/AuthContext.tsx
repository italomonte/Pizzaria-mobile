import React, {useState, createContext, ReactNode, useEffect} from "react";
import { api } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    signIn: (credential: SignInProps)=> Promise<void>
    loadingAuth: boolean
    loading: boolean,
    signOut: () => Promise<void>
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
    const [loading, setLoading] = useState(true)

    const isAuthenticated = (user.name !== '')

    useEffect(() => {
      async function getUser() {
          try { 
              const userInfo = await AsyncStorage.getItem('@pizzaToken');
            //   console.log("UserInfo from storage:", userInfo);
  
              if (!userInfo) {
                //   console.log("No user found in storage.");
                  return;
              }
  
              const hasUser: UserProps = JSON.parse(userInfo);
  
              if (Object.keys(hasUser).length > 0) {
                  api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;
                  setUser({
                      id: hasUser.id,
                      name: hasUser.name,
                      email: hasUser.email,
                      token: hasUser.token,
                  });

                  setLoading(false)
              }
          } catch (error) {
              console.error("Error fetching user from storage:", error);
          }
      }
  
      getUser();
  }, []);
  

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

            await AsyncStorage.setItem('@pizzaToken', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id, name, email, token
            })

            setLoadingAuth(false)

        } catch (error) {
            // console.log("erro ao acesar: ", error)
            setLoadingAuth(false)
        }
        
    }

    async function signOut() {
      await AsyncStorage.clear() 
      .then(() => {
        setUser({
          id: '',
          name: '',
          email: '',
          token: ''
        })
      })
    }

    return(
        <AuthContext.Provider 
          value={{
            user, 
            isAuthenticated, 
            signIn, 
            loadingAuth, 
            loading,
            signOut
            }}>
            {children}
        </AuthContext.Provider>
    )
}