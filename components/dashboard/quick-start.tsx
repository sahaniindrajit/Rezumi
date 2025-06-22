"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
    FileText,
    Download,
    Briefcase,
    Award,
} from "lucide-react"


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


export function QuickStart() {
    return (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{resumes.length}</h3>
                    <p className="text-gray-600">Total Resumes</p>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                        {resumes.reduce((sum, resume) => sum + resume.downloads, 0)}
                    </h3>
                    <p className="text-gray-600">Downloads</p>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Briefcase className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                        {resumes.filter((r) => r.status === "Interview").length}
                    </h3>
                    <p className="text-gray-600">Interviews</p>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                        {Math.round(resumes.reduce((sum, resume) => sum + resume.matchScore, 0) / resumes.length) || 0}%
                    </h3>
                    <p className="text-gray-600">Avg Match Score</p>
                </CardContent>
            </Card>
        </div>
    )
}
