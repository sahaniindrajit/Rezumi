"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  FileText,
  Plus,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { UserProfileSection } from "@/components/dashboard/user-profile"
import { QuickStart } from "@/components/dashboard/quick-start"
import ResemueHistory from "@/components/dashboard/resume-history"
import { redirect } from "next/navigation"
import { CreateResumeModal } from "./modals/createResumeModal"
import { useState } from "react"

const handleOnClick = () => {
  redirect('/ResumeTemplate');
}

function Dashboard() {
  const { data: session, status } = useSession()
  const [open, onOpenChange] = useState(false);
  
  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Not signed in state
  if (!session) {
    return (
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="text-gray-600">Please sign in to access your dashboard</p>
            <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CreateResumeModal open={open} onOpenChange={onOpenChange} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Section */}

        <UserProfileSection session={session} />

        {/* Action Buttons */}
        <div className="mb-8 flex flex-1 sm:flex-row gap-4">
          <span className="flex-1">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
              onClick={()=>onOpenChange(!open)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Resume
            </Button>
          </span>
          <Button onClick={handleOnClick} size="lg" variant="outline" className="sm:w-auto">
            <FileText className="w-5 h-5 mr-2" />
            View Templates
          </Button>
        </div>

        {/* Resume History Section */}
        {/* <ResemueHistory /> */}

        {/* Quick Stats */}
        {/* <QuickStart /> */}
      </div>
    </div>
  )
}

export default Dashboard
