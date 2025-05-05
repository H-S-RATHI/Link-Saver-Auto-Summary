"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { BookmarkIcon, LogOut } from "lucide-react"

export default function DashboardHeader() {
  const { logout, user } = useAuth()

  return (
    <header className="border-b">
      <div className=" px-6 px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BookmarkIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Bookmark Saver</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-muted-foreground">{user.email}</span>}
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
