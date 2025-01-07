'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/order-management/overview')
  })
  return <div>Hello, this is manager's page</div>
}
