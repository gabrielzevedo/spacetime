import { COOKIE_NAME } from '@/constants/app'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'
import { api } from './api'

interface IUser {
  sub: string
  name: string
  avatarUrl: string
}

export async function LogIn() {
  api.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`
    return config
  })
}

export async function isAuthenticated() {
  return cookies().has(COOKIE_NAME)
}

export async function getToken() {
  return cookies().get(COOKIE_NAME)?.value
}

export async function getUser() {
  const token = await getToken()

  if (!token) {
    throw new Error('Unauthenticated')
  }

  const user: IUser = jwtDecode(token)
  return user
}
