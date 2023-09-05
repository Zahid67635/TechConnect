"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Navbar from '@/components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export const metadata = {
  title: 'TechConnect',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <Toaster/>
        <Navbar />
          <div className='min-h-[90vh]'>
            {children}
          </div>
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  )
}
