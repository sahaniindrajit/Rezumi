"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Link,
  Mail,
  MapPin,
  Settings,
} from "lucide-react"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"

export function UserProfileSection({ session }: { session: Session }) {
  const router = useRouter()
  const completionPercentage = 75

  const handleUpdateDetails = () => {
    router.push('/updateDetails')
  }

  return (
    
    <div className="mb-8">
      
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={session.user?.image || "/placeholder.svg"} alt={session.user?.name || "User"} />
                <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
                  {session.user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">{session.user?.name || "User"}</h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {session.user?.email}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location not set
                </p>
              </div>
            </div>

            <div className="flex-1 md:ml-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Profile Completion</p>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{completionPercentage}%</span>
                  </div>
                </div>

                <Button 
                  onClick={handleUpdateDetails}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Update Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}