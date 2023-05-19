import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, GITHUB_AUTHORIZE_URL } from './constants/app'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(GITHUB_AUTHORIZE_URL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly;`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
