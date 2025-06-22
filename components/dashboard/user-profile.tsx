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

export function UserProfileSection({ session }: { session: Session }) {
    const completionPercentage = 75
    const [isModalOpen, setIsModalOpen] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userDetail, setUserDetails] = useState<Partial<userProfile>>({})

    const handleSubmit = () => {

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
                                        <form onSubmit={handleSubmit}>
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
