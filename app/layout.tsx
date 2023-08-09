import StoreProvider from '@/utils/StoreProvider'
import Footer from './Footer'
import Nav from './Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { use } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecom MN',
  description: 'Ecommerce store built with Next.js, MUI, Tailwind, and MongoDB',
}

async function fetchCategories() {
  return fetch(`http://localhost:3000/api/layout`)
    .then(res => res.json());
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const categories = use(fetchCategories());

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-[100vh] flex flex-col`}>
        <StoreProvider>
          <Nav navItems={categories} />
          <ToastContainer />
          <main className="w-11/12 max-w-[1350px] mx-auto grow mb-8">
            {children}
          </main>
          <Footer categories={categories} />
        </StoreProvider>
      </body>
    </html>
  )
}
