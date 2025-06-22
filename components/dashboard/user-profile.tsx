"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

  Plus,
  Mail,
  MapPin,
  Settings,
} from "lucide-react"
import { Session } from "next-auth"
import { userProfile } from "@/types/userProfile.type"

import { useForm, SubmitHandler } from "react-hook-form"
import { Checkbox } from "@radix-ui/react-checkbox"
import { submitUserDetails } from "@/server/action/submit-user-detail"

export function UserProfileSection({ session }: { session: Session }) {
  const completionPercentage = 75
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { register, handleSubmit } = useForm<userProfile>()

  const onSubmit: SubmitHandler<userProfile> = async (data) => {
    console.log(data)
    const submitDetails = await submitUserDetails({ userDetails: data, userId: session.user!.id! })

    if (!submitDetails.succes) {
      console.error("error in submittibg user details")
    }
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

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                      <Settings className="w-4 h-4 mr-2" />
                      Update Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">

                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="project">Project</TabsTrigger>
                          <TabsTrigger value="achievement">Achivement</TabsTrigger>
                          <TabsTrigger value="certificate">Certificate</TabsTrigger>
                        </TabsList>


                        <TabsContent value="personal" className="space-y-4 mt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                id="firstName"
                                placeholder="Enter your first name"
                                defaultValue={session.user?.name?.split(" ")[0] || ""}
                                {...register("user.name", { required: true })} // Registering the input with react-hook-form
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
                              <Input id="phone" placeholder="Enter your phone number"

                                {...register("user.phoneNumber")} // string or numeric

                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input id="location" placeholder="City, State"  {...register("user.location")} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="title">Professional Title</Label>
                              <Input id="title" placeholder="e.g., Senior Frontend Developer"  {...register("user.currentPosition")} />
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
                                  <Input id="jobTitle" placeholder="e.g., Senior Frontend Developer" {...register("experience.0.jobtitle")} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="company">Company</Label>
                                  <Input id="company" placeholder="Company name" {...register("experience.0.company")} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="startDate">Start Date</Label>
                                  <Input id="startDate" type="month" {...register("experience.0.startingDate")} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="endDate">End Date</Label>
                                  <Input id="endDate" type="month" placeholder="Leave empty if current" {...register("experience.0.endingDate")} />
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
                                  <Input id="degree" placeholder="e.g., Bachelor of Science" {...register("education.0.degree")} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="field">Field of Study</Label>
                                  <Input id="field" placeholder="e.g., Computer Science" {...register("education.0.field")} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="school">School/University</Label>
                                  <Input id="school" placeholder="Institution name" {...register("education.0.university")} />
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
                                  <Input id="gpa" placeholder="3.8" {...register("education.0.gpa")} />
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
                        </TabsContent>

                        <TabsContent value="project" className="space-y-4 mt-6">
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
                        </TabsContent>

                        {/* Certificates Tab (Single Entry) */}
                        <TabsContent value="certificate" className="space-y-4 mt-6">
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
                        </TabsContent>

                        {/* Achievements Tab (Single Entry) */}
                        <TabsContent value="achievement" className="space-y-4 mt-6">
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
                        </TabsContent>

                        {/* Additional Info Tab (Single Entry) */}
                        <TabsContent value="additional" className="space-y-4 mt-6">
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

                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
