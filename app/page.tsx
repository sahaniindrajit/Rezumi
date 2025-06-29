"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Zap, Target, Download, User, Settings, Menu, Plus, Eye, Loader2 } from "lucide-react"
import Image from "next/image"

import { useSession } from "next-auth/react"

import { redirect } from 'next/navigation'

export default function RezumiLanding() {
  // Mock user authentication state - in real app, this would come from auth context
  const isSignedIn = true // Change to true to see the resume history section
  const userResumes = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      createdAt: "2024-01-15",
      status: "Applied",
    },
    {
      id: 2,
      jobTitle: "Full Stack Engineer",
      company: "StartupXYZ",
      createdAt: "2024-01-12",
      status: "Interview",
    },
    {
      id: 3,
      jobTitle: "React Developer",
      company: "WebSolutions",
      createdAt: "2024-01-10",
      status: "Pending",
    },
  ];

  const { data: session, status } = useSession();

  if(status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }
  else if(status === "authenticated") {
    // User is authenticated, you can access session data
    console.log("User session:", session);
    redirect('/dashboard'); // Redirect to user dashboard 
  }


  return (
    <div className="min-h-screen bg-white">
     
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  🎯 AI-Powered Resume Tailoring
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Land Your Dream Job with
                  <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    {" "}
                    Tailored Resumes
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Generate ATS-optimized resumes tailored to specific job openings in seconds. Our AI analyzes job
                  descriptions and customizes your resume to match exactly what employers are looking for.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  Create Your Resume
                  <FileText className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View Templates
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>Generated in seconds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-emerald-500" />
                  <span>ATS-optimized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-emerald-500" />
                  <span>Multiple formats</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl blur-3xl opacity-20"></div>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Rezumi Resume Generator Interface"
                width={800}
                height={600}
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose Rezumi for Your Job Search?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform ensures your resume stands out and gets past ATS systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Job-Specific Tailoring</CardTitle>
                <CardDescription>
                  Our AI analyzes job descriptions and automatically tailors your resume to match specific requirements
                  and keywords
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>ATS Optimization</CardTitle>
                <CardDescription>
                  Ensure your resume passes Applicant Tracking Systems with optimized formatting and keyword placement
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Professional Templates</CardTitle>
                <CardDescription>
                  Choose from dozens of professionally designed templates that work across all industries and experience
                  levels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Multiple Formats</CardTitle>
                <CardDescription>
                  Download your tailored resume in PDF, Word, or plain text formats to meet any application requirement
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Previous Resumes Section - Conditional based on sign-in status */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isSignedIn ? (
            // Signed-in user view with resume history
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Your Tailored Resumes</h2>
                  <p className="text-gray-600 mt-2">Manage and track your job-specific resumes</p>
                </div>
                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Resume
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userResumes.map((resume) => (
                  <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{resume.jobTitle}</CardTitle>
                          <CardDescription>{resume.company}</CardDescription>
                        </div>
                        <Badge
                          variant={resume.status === "Interview" ? "default" : "secondary"}
                          className={resume.status === "Interview" ? "bg-emerald-100 text-emerald-800" : ""}
                        >
                          {resume.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Created: {new Date(resume.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Non-signed-in user view with sign-up prompt
            <div className="text-center space-y-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Track Your Job Applications</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Sign up to save your tailored resumes, track applications, and manage your job search all in one
                  place.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Save Resumes</h3>
                  <p className="text-gray-600">Keep all your tailored resumes organized and easily accessible</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Track Applications</h3>
                  <p className="text-gray-600">Monitor your job applications and their current status</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Personal Dashboard</h3>
                  <p className="text-gray-600">Get insights and analytics on your job search progress</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  Sign Up Free
                  <User className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How Rezumi Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your perfect resume in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold">Upload Your Details</h3>
              <p className="text-gray-600">
                Provide your basic information, work experience, skills, and education. Our system securely stores your
                data for future use.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold">Paste Job Description</h3>
              <p className="text-gray-600">
                Copy and paste the job description you're applying for. Our AI analyzes the requirements and key skills
                needed.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold">Get Tailored Resume</h3>
              <p className="text-gray-600">
                Receive your perfectly tailored, ATS-optimized resume in seconds. Download in your preferred format and
                apply with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Land Your Dream Job?</h2>
            <p className="text-xl text-emerald-100">
              Join thousands of job seekers who have successfully landed interviews with Rezumi's AI-powered resume
              tailoring. Start creating your perfect resume today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Start Creating Resumes
                <FileText className="ml-2 w-4 h-4" />
              </Button>
              
            </div>
            <p className="text-sm text-emerald-200">
              Free to start • No credit card required • Professional templates included
            </p>
          </div>
        </div>
      </section>

      
    </div>
  )
}
