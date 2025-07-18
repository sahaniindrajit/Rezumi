"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Save,
} from "lucide-react"
import { Session } from "next-auth"
import { userProfile } from "@/types/userProfile.type"
import { useForm, SubmitHandler } from "react-hook-form"
import { Checkbox } from "@radix-ui/react-checkbox"
import { submitUserDetails } from "@/server/action/submit-user-detail"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'

// Define the sections
const SECTIONS = [
  { id: 'personal', title: 'Personal Information', icon: '👤' },
  { id: 'experience', title: 'Work Experience', icon: '💼' },
  { id: 'education', title: 'Education', icon: '🎓' },
  { id: 'skills', title: 'Skills', icon: '🛠️' },
  { id: 'project', title: 'Projects', icon: '🚀' },
  { id: 'certificate', title: 'Certificates', icon: '📜' },
  { id: 'achievement', title: 'Achievements', icon: '🏆' },
  { id: 'additional', title: 'Additional Info', icon: '📋' },
] as const

type SectionId = typeof SECTIONS[number]['id']

export default function updateDetails() {
  const { data: session, status } = useSession();
    if (!session) {
    // Optionally redirect or show a sign-in prompt
      redirect('/')
    }
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState<SectionId>('personal')
  const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set())
  
  const { register, handleSubmit, watch } = useForm<userProfile>()

  const currentSectionIndex = SECTIONS.findIndex(section => section.id === currentSection)
  const isFirstSection = currentSectionIndex === 0
  const isLastSection = currentSectionIndex === SECTIONS.length - 1

  const onSubmit: SubmitHandler<userProfile> = async (data) => {
    console.log(data)
    try {
      const submitDetails = await submitUserDetails({ 
        userDetails: data, 
        userId: session.user!.id! 
      })

      if (!submitDetails.succes) {
        console.error("Error in submitting user details")
      } else {
        // Redirect back to profile or show success message
        router.push('/profile')
      }
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  const handleNext = () => {
    if (!isLastSection) {
      // Mark current section as completed
      setCompletedSections(prev => new Set(prev).add(currentSection))
      setCurrentSection(SECTIONS[currentSectionIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSection(SECTIONS[currentSectionIndex - 1].id)
    }
  }

  const goToSection = (sectionId: SectionId) => {
    setCurrentSection(sectionId)
  }

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={session.user?.image || "/placeholder.svg"} alt={session.user?.name || "User"} />
                <AvatarFallback className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
                  {session.user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-gray-900">{session.user?.name}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  defaultValue={session.user?.name?.split(" ")[0] || ""}
                  {...register("user.name", { required: true })}
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
                  {...register("user.email", { required: true })}
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  placeholder="Enter your phone number"
                  {...register("user.phoneNumber")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="City, State" 
                  {...register("user.location")} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Senior Frontend Developer" 
                  {...register("user.currentPosition")} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                placeholder="Write a brief professional summary..."
                className="min-h-[100px]"
                {...register("user.description")}
              />
            </div>
          </div>
        )

      case 'experience':
        return (
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
                  <Input 
                    id="jobTitle" 
                    placeholder="e.g., Senior Frontend Developer" 
                    {...register("experience.0.jobtitle")} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    placeholder="Company name" 
                    {...register("experience.0.company")} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="month" 
                    {...register("experience.0.startingDate")} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input 
                    id="endDate" 
                    type="month" 
                    placeholder="Leave empty if current" 
                    {...register("experience.0.endingDate")} 
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[100px]"
                  {...register("experience.0.description")}
                />
              </div>
            </Card>
          </div>
        )

      case 'education':
        return (
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
                  <Input 
                    id="degree" 
                    placeholder="e.g., Bachelor of Science" 
                    {...register("education.0.degree")} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input 
                    id="field" 
                    placeholder="e.g., Computer Science" 
                    {...register("education.0.field")} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School/University</Label>
                  <Input 
                    id="school" 
                    placeholder="Institution name" 
                    {...register("education.0.university")} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startYear">Start Date</Label>
                  <Input
                    id="startYear"
                    type="date"
                    placeholder="2018-01-01"
                    {...register("education.0.startingDate")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradYear">Graduation Date</Label>
                  <Input
                    id="gradYear"
                    type="date"
                    placeholder="2022-06-01"
                    {...register("education.0.endingDate")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA (Optional)</Label>
                  <Input 
                    id="gpa" 
                    placeholder="3.8" 
                    {...register("education.0.gpa")} 
                  />
                </div>
              </div>
            </Card>
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="technicalSkills">Technical Skills</Label>
              <Textarea
                id="technicalSkills"
                placeholder="List your technical skills separated by commas (e.g., React, TypeScript, Node.js, Python)"
                className="min-h-[80px]"
                {...register("skill.technical")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="softSkills">Soft Skills</Label>
              <Textarea
                id="softSkills"
                placeholder="List your soft skills separated by commas (e.g., Leadership, Communication, Problem Solving)"
                className="min-h-[80px]"
                {...register("skill.softSkill")}
              />
            </div>
          </div>
        )

      case 'project':
        return (
          <Card className="p-4">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="Project name"
                    {...register("project.0.name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-link">Project Link</Label>
                  <Input
                    id="project-link"
                    placeholder="https://example.com"
                    {...register("project.0.link")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    placeholder="Project description"
                    {...register("project.0.description")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-skills">Skills (comma separated)</Label>
                  <Input
                    id="project-skills"
                    placeholder="React, Node.js, TypeScript"
                    {...register("project.0.skills")}
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="project-current"
                      {...register("project.0.isCurrent")}
                    />
                    <Label htmlFor="project-current">Currently working</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-start">Start Date</Label>
                  <Input
                    type="date"
                    id="project-start"
                    {...register("project.0.startingDate")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-end">End Date</Label>
                  <Input
                    type="date"
                    id="project-end"
                    {...register("project.0.endingDate")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'certificate':
        return (
          <Card className="p-4">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="certificate-name">Certificate Name</Label>
                  <Input
                    id="certificate-name"
                    placeholder="Certificate name"
                    {...register("certificate.0.name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificate-link">Certificate Link</Label>
                  <Input
                    id="certificate-link"
                    placeholder="https://example.com"
                    {...register("certificate.0.link")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="certificate-description">Description</Label>
                  <Textarea
                    id="certificate-description"
                    placeholder="Certificate description"
                    {...register("certificate.0.description")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="certificate-skills">Skills (comma separated)</Label>
                  <Input
                    id="certificate-skills"
                    placeholder="AWS, Cloud Computing"
                    {...register("certificate.0.skills")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'achievement':
        return (
          <Card className="p-4">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="achievement-title">Title</Label>
                  <Input
                    id="achievement-title"
                    placeholder="Achievement title"
                    {...register("achievement.0.title")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievement-link">Related Link</Label>
                  <Input
                    id="achievement-link"
                    placeholder="https://example.com"
                    {...register("achievement.0.link")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="achievement-description">Description</Label>
                  <Textarea
                    id="achievement-description"
                    placeholder="Details about your achievement"
                    className="min-h-[100px]"
                    {...register("achievement.0.description")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'additional':
        return (
          <Card className="p-4">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="additional-title">Title</Label>
                  <Input
                    id="additional-title"
                    placeholder="Item title"
                    {...register("additional.0.title")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additional-link">Related Link</Label>
                  <Input
                    id="additional-link"
                    placeholder="https://example.com"
                    {...register("additional.0.link")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="additional-description">Description</Label>
                  <Textarea
                    id="additional-description"
                    placeholder="Detailed information"
                    className="min-h-[100px]"
                    {...register("additional.0.description")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Update Profile</h1>
              <p className="text-gray-600">Complete your profile to generate better tailored resumes</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Sections</h3>
                <nav className="space-y-2">
                  {SECTIONS.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => goToSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        currentSection === section.id
                          ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{section.title}</div>
                        <div className="text-xs opacity-70">Step {index + 1}</div>
                      </div>
                      {completedSections.has(section.id) && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progress: {currentSectionIndex + 1} of {SECTIONS.length}
                      </span>
                      <span className="text-sm text-gray-500">
                        {Math.round(((currentSectionIndex + 1) / SECTIONS.length) * 100)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentSectionIndex + 1) / SECTIONS.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Section Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{SECTIONS[currentSectionIndex].icon}</span>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {SECTIONS[currentSectionIndex].title}
                      </h2>
                    </div>
                    <p className="text-gray-600">
                      Fill in your {SECTIONS[currentSectionIndex].title.toLowerCase()} details
                    </p>
                  </div>

                  {/* Section Content */}
                  <div className="mb-8">
                    {renderSectionContent()}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={isFirstSection}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Draft
                      </Button>

                      {!isLastSection ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 flex items-center gap-2"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Complete Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}