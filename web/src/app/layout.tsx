import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { ReactNode } from 'react'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Copyright } from '@/components/Copyright'
import { isAuthenticated } from '@/lib/auth'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-alt',
})

export const metadata = {
  title: 'NLW Spacetime @gabrielzevedo',
  description:
    'Página desenvolvida durante o NLW Spacetime, por @gabrielzevedo',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const isLogged = await isAuthenticated()

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable}`}>
        <main className="grid min-h-screen grid-cols-2">
          {/* Left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {isLogged ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>

          {/* Right */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
