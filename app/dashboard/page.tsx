"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Plus,
    Eye,
    Settings,
    Edit3,
    Calendar,
    TrendingUp,
    Users,
    Bell,
    LogOut,
    FileText,
    Lightbulb,
    Loader2,
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { CreateResumeModal } from "./modals/createResumeModal"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

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

    const handleViewTemplates = () => {
        router.push("/resumetemplate");
    }

    const handleUpdateDetails = () => {
        router.push('/updateDetails')
    }

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - User Profile */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* User Profile Card */}
                        <Card>
                            <CardHeader className="text-center pb-4">
                                <div className="flex justify-center mb-4">
                                    <Avatar className="w-20 h-20">
                                        <AvatarImage src={session?.user?.image || "/placeholder.svg"} alt={session?.user?.name || "User"} />
                                        <AvatarFallback className="text-xl font-semibold bg-gray-900 text-white">
                                            {session?.user?.name!
                                                .split(" ")
                                                .map((n: string) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <CardTitle className="text-xl text-gray-900">{session?.user?.name}</CardTitle>
                                <p className="text-gray-600 text-sm">{session?.user?.email}</p>
                                {/* <p className="text-gray-500 text-xs">Member since {session?.user?.createdAt!}</p> */}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" onClick={handleUpdateDetails}>
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Update Details
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Tips Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                                    Quick Tips
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="text-sm text-gray-600">
                                    <p className="mb-2">
                                        💡 <strong>Pro tip:</strong> Use action verbs to make your resume more impactful
                                    </p>
                                    <p className="mb-2">📝 Keep your resume to 1-2 pages for best results</p>
                                    <p>✨ Customize your resume for each job application</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Welcome Section */}
                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {session?.user?.name?.split(" ")[0]}! 👋</h1>
                            <p className="text-gray-600 mb-6">Ready to create your next professional resume? Let's get started.</p>

                            {/* Main Action Buttons */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white h-16 group" onClick={() => setOpen(true)}>
                                    <Plus className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                                    <div className="text-left">
                                        <div className="font-semibold" >Create Resume</div>
                                        <div className="text-xs opacity-90">Start from scratch</div>
                                    </div>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50 h-16 group bg-transparent"
                                    onClick={handleViewTemplates}
                                >
                                    <Eye className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                                    <div className="text-left">
                                        <div className="font-semibold">View Templates</div>
                                        <div className="text-xs opacity-70">Browse designs</div>
                                    </div>
                                </Button>
                            </div>
                        </div>

                        {/* Getting Started Guide */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center">
                                    <FileText className="w-5 h-5 mr-2" />
                                    Getting Started
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            1
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Choose Your Template</h3>
                                            <p className="text-sm text-gray-600">
                                                Browse our collection of professional templates and pick one that matches your style
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            2
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Fill in Your Information</h3>
                                            <p className="text-sm text-gray-600">
                                                Add your personal details, work experience, education, and skills
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            3
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Download & Apply</h3>
                                            <p className="text-sm text-gray-600">
                                                Export your resume as PDF and start applying to your dream jobs
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        {/* <div className="grid md:grid-cols-3 gap-4">
                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Import LinkedIn</h3>
                                    <p className="text-sm text-gray-600">Auto-fill from your profile</p>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Schedule Review</h3>
                                    <p className="text-sm text-gray-600">Get expert feedback</p>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <TrendingUp className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
                                    <p className="text-sm text-gray-600">Get support & tips</p>
                                </CardContent>
                            </Card>
                        </div> */}

                        <CreateResumeModal open={open} onOpenChange={setOpen} />


                    </div>
                </div>
            </div>
        </div>
    )
}
