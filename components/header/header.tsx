"use client"
import { Button } from "@/components/ui/button"
import { FileText, Menu } from "lucide-react"
import Link from "next/link"
import { signInWithGoogle } from '@/server/action/signIn'
import { useSession } from "next-auth/react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Rezumi</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">
              Templates
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {
              session?.user ? (
              <Avatar className="w-9 h-9">
                <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                <AvatarFallback>
                  {session.user.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            )
              :(
              <>
                <Button variant="ghost" className="hidden sm:inline-flex" onClick={signInWithGoogle}>
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700" onClick={signInWithGoogle}>
                Sign Up Free
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}