/* eslint-disable camelcase */
import { AxiosResponse } from 'axios'
import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

type UserProps = {
  id?: number
  token?: string
  email?: string
  name?: string
  avatar?: string
  is_oauth_user: boolean
}

type AuthContextProps = {
  signed: boolean
  signIn: (email: string, password: string) => Promise<AxiosResponse>
  signInWithGoogle: (accessToken: string) => Promise<AxiosResponse>
  signOut: () => void
  user: UserProps
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps | null>(null)

  async function loadStorageData() {
    const userToken = localStorage.getItem('user-token')

    if (userToken) {
      api.defaults.headers.Authorization = `Bearer ${userToken}`

      await api
        .put('/auth/renew')
        .then(res => {
          const { avatar, email, id, name, is_oauth_user, token } =
            res.data as UserProps

          api.defaults.headers.Authorization = `Bearer ${token}`

          setUser({ avatar, email, id, name, is_oauth_user })
        })
        .catch(err => {
          console.error(err)
          api.defaults.headers.Authorization = ''
          localStorage.clear()
        })
    }
  }

  useEffect(() => {
    loadStorageData()
  }, [])

  function signIn(email: string, password: string) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      const data = {
        email,
        password
      } as { email: string; password: string }

      api
        .post('/auth/login', data)
        .then(res => {
          const { avatar, email, id, name, is_oauth_user, token } = res.data

          api.defaults.headers.Authorization = `Bearer ${token}`

          setUser({ avatar, email, id, name, is_oauth_user })
          localStorage.setItem('user-data', JSON.stringify(res.data))
          localStorage.setItem('user-token', token)

          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  function signInWithGoogle(accessToken: string) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      api
        .post('/auth/login/google', { access_token: accessToken })
        .then(res => {
          const { avatar, email, id, name, is_oauth_user, token } = res.data

          api.defaults.headers.Authorization = `Bearer ${token}`

          setUser({ avatar, email, id, name, is_oauth_user })
          localStorage.setItem('user-data', JSON.stringify(res.data))
          localStorage.setItem('user-token', token)

          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  function signOut() {
    localStorage.clear()

    api.defaults.headers.Authorization = ''

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user: user, signIn, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useAuth() {
  return useContext(AuthContext)
}
