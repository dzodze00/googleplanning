"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"
import { useState } from "react"

export function DashboardHeader() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold">Google Planning System</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}

