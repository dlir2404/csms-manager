'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        {children}
      </div>
    </QueryClientProvider>
  )
}
