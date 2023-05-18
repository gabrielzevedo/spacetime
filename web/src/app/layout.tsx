import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { ReactNode } from 'react'

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable}`}>
        {children}
      </body>
    </html>
  )
}
