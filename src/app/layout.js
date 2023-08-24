"use client"
import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>

        <Navbar />
        <QueryClientProvider client={queryClient}>
          <div className='min-h-screen'>
            {children}
          </div>
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  )
}
