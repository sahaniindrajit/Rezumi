"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Download,
  Eye,
  Trash2,
  Edit,
  Plus,
  Mail,
  MapPin,
  Briefcase,
  Award,
  Settings,
  Calendar,
  Loader2,
} from "lucide-react"
import Link from "next/link"

function Dashboard() {
  const { data: session, status } = useSession()
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  // Mock profile completion percentage - calculate based on filled fields
  const completionPercentage = 75

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Section */}
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

                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                          <Settings className="w-4 h-4 mr-2" />
                          Update Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">Update Your Profile</DialogTitle>
                          <DialogDescription>
                            Complete your profile to generate better tailored resumes
                          </DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="personal" className="w-full">
                          <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="personal">Personal</TabsTrigger>
                            <TabsTrigger value="experience">Experience</TabsTrigger>
                            <TabsTrigger value="education">Education</TabsTrigger>
                            <TabsTrigger value="skills">Skills</TabsTrigger>
                            <TabsTrigger value="additional">Additional</TabsTrigger>
                          </TabsList>

                          <TabsContent value="personal" className="space-y-4 mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  placeholder="Enter your first name"
                                  defaultValue={session.user?.name?.split(" ")[0] || ""}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                  id="lastName"
                                  placeholder="Enter your last name"
                                  defaultValue={session.user?.name?.split(" ").slice(1).join(" ") || ""}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="Enter your email"
                                  defaultValue={session.user?.email || ""}
                                  disabled
                                  className="bg-gray-50"
                                />
                                <p className="text-xs text-gray-500">Email cannot be changed</p>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" placeholder="Enter your phone number" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" placeholder="City, State" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="title">Professional Title</Label>
                                <Input id="title" placeholder="e.g., Senior Frontend Developer" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="summary">Professional Summary</Label>
                              <Textarea
                                id="summary"
                                placeholder="Write a brief professional summary..."
                                className="min-h-[100px]"
                              />
                            </div>
                          </TabsContent>

                          <TabsContent value="experience" className="space-y-4 mt-6">
                            <div className="space-y-6">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Work Experience</h3>
                                <Button variant="outline" size="sm">
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Experience
                                </Button>
                              </div>

                              <Card className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="jobTitle">Job Title</Label>
                                    <Input id="jobTitle" placeholder="e.g., Senior Frontend Developer" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" placeholder="Company name" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input id="startDate" type="month" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="endDate">End Date</Label>
                                    <Input id="endDate" type="month" placeholder="Leave empty if current" />
                                  </div>
                                </div>
                                <div className="space-y-2 mt-4">
                                  <Label htmlFor="description">Job Description</Label>
                                  <Textarea
                                    id="description"
                                    placeholder="Describe your responsibilities and achievements..."
                                    className="min-h-[100px]"
                                  />
                                </div>
                              </Card>
                            </div>
                          </TabsContent>

                          <TabsContent value="education" className="space-y-4 mt-6">
                            <div className="space-y-6">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Education</h3>
                                <Button variant="outline" size="sm">
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Education
                                </Button>
                              </div>

                              <Card className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="degree">Degree</Label>
                                    <Input id="degree" placeholder="e.g., Bachelor of Science" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="field">Field of Study</Label>
                                    <Input id="field" placeholder="e.g., Computer Science" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="school">School/University</Label>
                                    <Input id="school" placeholder="Institution name" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="gradYear">Graduation Year</Label>
                                    <Input id="gradYear" type="number" placeholder="2020" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="gpa">GPA (Optional)</Label>
                                    <Input id="gpa" placeholder="3.8" />
                                  </div>
                                </div>
                              </Card>
                            </div>
                          </TabsContent>

                          <TabsContent value="skills" className="space-y-4 mt-6">
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <Label htmlFor="technicalSkills">Technical Skills</Label>
                                <Textarea
                                  id="technicalSkills"
                                  placeholder="List your technical skills separated by commas (e.g., React, TypeScript, Node.js, Python)"
                                  className="min-h-[80px]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="softSkills">Soft Skills</Label>
                                <Textarea
                                  id="softSkills"
                                  placeholder="List your soft skills separated by commas (e.g., Leadership, Communication, Problem Solving)"
                                  className="min-h-[80px]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="languages">Languages</Label>
                                <Textarea
                                  id="languages"
                                  placeholder="List languages and proficiency levels (e.g., English - Native, Spanish - Conversational)"
                                  className="min-h-[80px]"
                                />
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="additional" className="space-y-4 mt-6">
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <Label htmlFor="certifications">Certifications</Label>
                                <Textarea
                                  id="certifications"
                                  placeholder="List your certifications (e.g., AWS Certified Developer, Google Cloud Professional)"
                                  className="min-h-[80px]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="projects">Notable Projects</Label>
                                <Textarea
                                  id="projects"
                                  placeholder="Describe your key projects and achievements"
                                  className="min-h-[100px]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="awards">Awards & Achievements</Label>
                                <Textarea
                                  id="awards"
                                  placeholder="List any awards, recognitions, or notable achievements"
                                  className="min-h-[80px]"
                                />
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>

                        <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Link href="/create-resume" className="flex-1">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Resume
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="sm:w-auto">
            <FileText className="w-5 h-5 mr-2" />
            View Templates
          </Button>
        </div>

        {/* Resume History Section */}
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

        {/* Quick Stats */}
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
      </div>
    </div>
  )
}

export default Dashboard
