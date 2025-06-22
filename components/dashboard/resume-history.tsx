"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    FileText,
    Download,
    Eye,
    Trash2,
    Edit,
    Plus,
    Calendar,
} from "lucide-react"
import Link from "next/link"

// Mock resume data - in real app, this would come from your database
const resumes = [
    {
        id: 1,
        jobTitle: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        createdAt: "2024-01-15",
        status: "Applied",
        matchScore: 92,
        downloads: 3,
    },
    {
        id: 2,
        jobTitle: "Full Stack Engineer",
        company: "StartupXYZ",
        createdAt: "2024-01-12",
        status: "Interview",
        matchScore: 88,
        downloads: 1,
    },
    {
        id: 3,
        jobTitle: "React Developer",
        company: "WebSolutions",
        createdAt: "2024-01-10",
        status: "Pending",
        matchScore: 85,
        downloads: 2,
    },
    {
        id: 4,
        jobTitle: "Frontend Lead",
        company: "DesignStudio",
        createdAt: "2024-01-08",
        status: "Rejected",
        matchScore: 78,
        downloads: 1,
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "Interview":
            return "bg-green-100 text-green-800"
        case "Applied":
            return "bg-blue-100 text-blue-800"
        case "Pending":
            return "bg-yellow-100 text-yellow-800"
        case "Rejected":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

function ResemueHistory() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Tailored Resumes</h2>
                    <p className="text-gray-600 mt-1">Manage and track your job-specific resumes</p>
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    {resumes.length} Resumes
                </Badge>
            </div>

            {resumes.length > 0 ? (
                <div className="grid gap-6">
                    {resumes.map((resume) => (
                        <Card key={resume.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{resume.jobTitle}</h3>
                                                <p className="text-gray-600">{resume.company}</p>
                                            </div>
                                            <Badge className={getStatusColor(resume.status)}>{resume.status}</Badge>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>Created: {new Date(resume.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Download className="w-4 h-4" />
                                                <span>{resume.downloads} downloads</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">Match Score:</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-emerald-600 to-blue-600 h-2 rounded-full"
                                                        style={{ width: `${resume.matchScore}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{resume.matchScore}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                                            <Eye className="w-4 h-4" />
                                            View
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                                            <Download className="w-4 h-4" />
                                            Download
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <FileText className="w-12 h-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
                        <p className="text-gray-600 text-center mb-6 max-w-md">
                            Start creating tailored resumes for your job applications. Each resume will be optimized for specific
                            job requirements.
                        </p>
                        <Link href="/create-resume">
                            <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Your First Resume
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default ResemueHistory