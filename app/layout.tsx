import StoreProvider from '@/utils/StoreProvider'
import Footer from './Footer'
import Nav from './Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecom MN',
  description: 'Ecommerce store built with Next.js, MUI, Tailwind, and MongoDB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Nav />
          <ToastContainer />
          <main className="min-h-[70vh] w-11/12 max-w-[1350px] mx-auto">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
