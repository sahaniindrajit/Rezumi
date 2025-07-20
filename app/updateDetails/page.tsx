"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Save, CheckCircle } from "lucide-react"
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form"
import { submituserDetailsData } from "@/server/action/submit-user-detail"
import { fetchData } from "@/server/action/fetchdata"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import type { userProfile } from "@/types/userProfile.type"

// Import components
import { SectionNavigation, SECTIONS, type SectionId } from "@/components/update-details/SectionNavigation"
import { ProgressBar } from "@/components/update-details/ProgressBar"
import {
    PersonalSection,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    ProjectSection,
    CertificateSection,
    AchievementSection,
    AdditionalSection,
} from "@/components/update-details/sections"

// Import utilities
import { transformFormData } from "@/utils/formUtils"

// Helper function to format dates for form inputs
const formatDateForInput = (dateString: string | null | undefined): string => {
    if (!dateString) return ""
    try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) {
            console.warn("Invalid date string:", dateString)
            return ""
        }
        return date.toISOString().split('T')[0] // Format as YYYY-MM-DD
    } catch (error) {
        console.warn("Error formatting date:", dateString, error)
        return ""
    }
}

export default function UpdateDetails() {
    const { data: session, status } = useSession()
    if (!session) {
        redirect("/")
    }

    const router = useRouter()
    const [currentSection, setCurrentSection] = useState<SectionId>("personal")
    const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set())
    const [isLoading, setIsLoading] = useState(true)

    const { register, handleSubmit, control, setValue, reset } = useForm<userProfile>({
        defaultValues: {
            experience: [{}],
            education: [{}],
            project: [{}],
            certificate: [{}],
            achievement: [{}],
            additional: [{}],
        },
    })

    // Field arrays for dynamic sections
    const {
        fields: experienceFields,
        append: appendExperience,
        remove: removeExperience,
        replace: replaceExperience,
    } = useFieldArray({
        control,
        name: "experience",
    })

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
        replace: replaceEducation,
    } = useFieldArray({
        control,
        name: "education",
    })

    const {
        fields: projectFields,
        append: appendProject,
        remove: removeProject,
        replace: replaceProject,
    } = useFieldArray({
        control,
        name: "project",
    })

    const {
        fields: certificateFields,
        append: appendCertificate,
        remove: removeCertificate,
        replace: replaceCertificate,
    } = useFieldArray({
        control,
        name: "certificate",
    })

    const {
        fields: achievementFields,
        append: appendAchievement,
        remove: removeAchievement,
        replace: replaceAchievement,
    } = useFieldArray({
        control,
        name: "achievement",
    })

    const {
        fields: additionalFields,
        append: appendAdditional,
        remove: removeAdditional,
        replace: replaceAdditional,
    } = useFieldArray({
        control,
        name: "additional",
    })

    // Fetch and populate user data
    useEffect(() => {
        const loadUserData = async () => {
            if (session?.user?.id) {
                try {
                    console.log("Fetching user data for ID:", session.user.id)
                    const userData = await fetchData(session.user.id)
                    console.log("Fetched user data:", userData)

                    if (userData) {
                        // Set personal information
                        try {
                            setValue("user.name", userData.name || "")
                            setValue("user.email", userData.email || "")
                            setValue("user.phoneNumber", userData.phone || "")
                            setValue("user.linkedin", userData.linkedin || "")
                            setValue("user.portfolio", userData.portfolio || "")
                            setValue("user.description", userData.summary || "")
                        } catch (error) {
                            console.error("Error setting personal information:", error)
                        }

                        // Set experience data
                        try {
                            if (userData.experience && userData.experience.length > 0) {
                                console.log("Setting experience data:", userData.experience)
                                const experienceWithFormattedDates = userData.experience.map(exp => ({
                                    ...exp,
                                    startingDate: formatDateForInput(exp?.startingDate),
                                    endingDate: formatDateForInput(exp?.endingDate)
                                }))
                                replaceExperience(experienceWithFormattedDates)
                            } else {
                                replaceExperience([{
                                    id: "",
                                    jobtitle: "",
                                    company: "",
                                    isCurrent: false,
                                    startingDate: "",
                                    endingDate: "",
                                    description: "",
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                }])
                            }
                        } catch (error) {
                            console.error("Error setting experience data:", error)
                            replaceExperience([{
                                id: "",
                                jobtitle: "",
                                company: "",
                                isCurrent: false,
                                startingDate: "",
                                endingDate: "",
                                description: "",
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            }])
                        }

                        // Set education data
                        try {
                            if (userData.education && userData.education.length > 0) {
                                console.log("Setting education data:", userData.education)
                                const educationWithFormattedDates = userData.education.map(edu => ({
                                    ...edu,
                                    startingDate: formatDateForInput(edu?.startingDate),
                                    endingDate: formatDateForInput(edu?.endingDate)
                                }))
                                replaceEducation(educationWithFormattedDates)
                            } else {
                                replaceEducation([{
                                    id: "",
                                    degree: "",
                                    field: "",
                                    university: "",
                                    gpa: "",
                                    isCurrent: false,
                                    startingDate: "",
                                    endingDate: "",
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                }])
                            }
                        } catch (error) {
                            console.error("Error setting education data:", error)
                            replaceEducation([{
                                id: "",
                                degree: "",
                                field: "",
                                university: "",
                                gpa: "",
                                isCurrent: false,
                                startingDate: "",
                                endingDate: "",
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            }])
                        }

                        // Set skills data
                        try {
                            if (userData.skills && userData.skills.length > 0) {
                                console.log("Setting skills data:", userData.skills)
                                const skill = userData.skills[0]
                                setValue("skill.technical", skill?.technical || [])
                                setValue("skill.softSkill", skill?.softSkill || [])
                                setValue("skill.description", skill?.description || "")
                            } else {
                                setValue("skill.technical", [])
                                setValue("skill.softSkill", [])
                                setValue("skill.description", "")
                            }
                        } catch (error) {
                            console.error("Error setting skills data:", error)
                            setValue("skill.technical", [])
                            setValue("skill.softSkill", [])
                            setValue("skill.description", '')
                        }

                        // Set project data
                        try {
                            if (userData.projects && userData.projects.length > 0) {
                                console.log("Setting project data:", userData.projects)
                                // Convert skills arrays to comma-separated strings for each project
                                const projectsWithStringSkills = userData.projects.map(project => ({
                                    ...project,
                                    // skills: Array.isArray(project?.skills) ? project.skills.join(", ") : project?.skills || "",
                                    startingDate: formatDateForInput(project?.startingDate),
                                    endingDate: formatDateForInput(project?.endingDate)
                                }))
                                replaceProject(projectsWithStringSkills)
                            } else {
                                replaceProject([{
                                    id: "",
                                    name: "",
                                    link: "",
                                    description: "",
                                    skills: [''],
                                    startingDate: "",
                                    endingDate: "",
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    isCurrent: false,
                                }])

                            }
                        } catch (error) {
                            console.error("Error setting project data:", error)
                            replaceProject([{
                                id: "",
                                name: "",
                                link: "",
                                description: "",
                                skills: [''],
                                startingDate: "",
                                endingDate: "",
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                isCurrent: false,
                            }])
                        }

                        // Set certificate data
                        try {
                            if (userData.certifications && userData.certifications.length > 0) {
                                console.log("Setting certificate data:", userData.certifications)
                                // Convert skills arrays to comma-separated strings for each certificate
                                const certificatesWithStringSkills = userData.certifications.map(cert => ({
                                    ...cert,
                                    // skills: Array.isArray(cert?.skills) ? cert.skills.join(", ") : cert?.skills || ""
                                }))
                                replaceCertificate(certificatesWithStringSkills)
                            } else {
                                replaceCertificate([{
                                    link: "",
                                    id: "",
                                    name: "",
                                    description: "",
                                    skills: [''],

                                }])
                            }
                        } catch (error) {
                            console.error("Error setting certificate data:", error)
                            replaceCertificate([{
                                link: "",
                                id: "",
                                name: "",
                                description: "",
                                skills: [''],
                            }])
                        }

                        // Set achievement data
                        try {
                            if (userData.achievements && userData.achievements.length > 0) {
                                console.log("Setting achievement data:", userData.achievements)
                                replaceAchievement(userData.achievements)
                            } else {
                                replaceAchievement([{
                                    id: "",
                                    link: "",
                                    description: "",
                                    title: "",

                                }])
                            }
                        } catch (error) {
                            console.error("Error setting achievement data:", error)
                            replaceAchievement([{
                                id: "",
                                link: "",
                                description: "",
                                title: "",
                            }])
                        }

                        // Mark sections as completed if they have data
                        const sectionsWithData = new Set<SectionId>()
                        if (userData.name || userData.email) sectionsWithData.add("personal")
                        if (userData.experience?.length) sectionsWithData.add("experience")
                        if (userData.education?.length) sectionsWithData.add("education")
                        if (userData.skills) sectionsWithData.add("skills")
                        if (userData.projects?.length) sectionsWithData.add("project")
                        if (userData.certifications?.length) sectionsWithData.add("certificate")
                        if (userData.achievements?.length) sectionsWithData.add("achievement")

                        setCompletedSections(sectionsWithData)
                        console.log("Completed sections:", sectionsWithData)
                    } else {
                        console.log("No user data found")
                    }
                } catch (error) {
                    console.error("Error loading user data:", error)
                } finally {
                    setIsLoading(false)
                }
            }
        }

        loadUserData()
    }, [session?.user?.id, setValue, replaceExperience, replaceEducation, replaceProject, replaceCertificate, replaceAchievement])

    const currentSectionIndex = SECTIONS.findIndex((section) => section.id === currentSection)
    const isFirstSection = currentSectionIndex === 0
    const isLastSection = currentSectionIndex === SECTIONS.length - 1

    const onSubmit: SubmitHandler<userProfile> = async (data) => {
        console.log("Raw form data:", data)

        try {
            const transformedData = transformFormData(data)
            const submitDetails = await submituserDetailsData({
                userDetailsData: transformedData,
                userId: session.user!.id!,
            })

            if (!submitDetails.success) {
                console.error("Error in submitting user details")
            } else {
                console.log("Submission Successfully --->", submitDetails)
                router.push("/dashboard")
            }
        } catch (error) {
            console.error("Submission error:", error)
        }
    }

    const handleNext = () => {
        if (!isLastSection) {
            setCompletedSections((prev) => new Set(prev).add(currentSection))
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
            case "personal":
                return <PersonalSection register={register} session={session} />

            case "experience":
                return (
                    <ExperienceSection
                        register={register}
                        experienceFields={experienceFields}
                        appendExperience={appendExperience}
                        removeExperience={removeExperience}
                    />
                )

            case "education":
                return (
                    <EducationSection
                        register={register}
                        educationFields={educationFields}
                        appendEducation={appendEducation}
                        removeEducation={removeEducation}
                    />
                )

            case "skills":
                return <SkillsSection register={register} />

            case "project":
                return (
                    <ProjectSection
                        register={register}
                        projectFields={projectFields}
                        appendProject={appendProject}
                        removeProject={removeProject}
                    />
                )

            case "certificate":
                return (
                    <CertificateSection
                        register={register}
                        certificateFields={certificateFields}
                        appendCertificate={appendCertificate}
                        removeCertificate={removeCertificate}
                    />
                )

            case "achievement":
                return (
                    <AchievementSection
                        register={register}
                        achievementFields={achievementFields}
                        appendAchievement={appendAchievement}
                        removeAchievement={removeAchievement}
                    />
                )

            case "additional":
                return (
                    <AdditionalSection
                        register={register}
                        additionalFields={additionalFields}
                        appendAdditional={appendAdditional}
                        removeAdditional={removeAdditional}
                    />
                )

            default:
                return null
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your profile data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Update Profile</h1>
                            <p className="text-gray-600">Complete your profile to create better resumes</p>
                        </div>
                        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
                            <ChevronLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <SectionNavigation
                            currentSection={currentSection}
                            completedSections={completedSections}
                            onSectionClick={goToSection}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Card className="shadow-lg">
                                <CardContent className="p-8">
                                    {/* Progress Bar */}
                                    <ProgressBar currentSectionIndex={currentSectionIndex} totalSections={SECTIONS.length} />

                                    {/* Section Header */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-3xl">{SECTIONS[currentSectionIndex].icon}</span>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">{SECTIONS[currentSectionIndex].title}</h2>
                                                <p className="text-gray-600 text-sm">{SECTIONS[currentSectionIndex].description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Content */}
                                    <div className="mb-8">{renderSectionContent()}</div>

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handlePrevious}
                                            disabled={isFirstSection}
                                            className="flex items-center gap-2 bg-transparent"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Previous
                                        </Button>

                                        <div className="flex gap-3">
                                            <Button type="submit" variant="outline" className="flex items-center gap-2 bg-transparent">
                                                <Save className="w-4 h-4" />
                                                Save Draft
                                            </Button>

                                            {!isLastSection ? (
                                                <Button
                                                    type="button"
                                                    onClick={handleNext}
                                                    className="bg-gray-900 hover:bg-gray-800 flex items-center gap-2"
                                                >
                                                    Next Section
                                                    <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            ) : (
                                                <Button type="submit" className="bg-gray-900 hover:bg-gray-800 flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4" />
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
