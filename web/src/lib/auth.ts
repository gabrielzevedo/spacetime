import { COOKIE_NAME } from '@/constants/app'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

interface IUser {
  sub: string
  name: string
  avatarUrl: string
}

export function isAuthenticated(): Boolean {
  return cookies().has(COOKIE_NAME)
}

export function getUser(): IUser {
  const token = cookies().get(COOKIE_NAME)?.value

  if (!token) {
    throw new Error('Unauthenticated')
  }

  const user: IUser = jwtDecode(token)
  return user
}
