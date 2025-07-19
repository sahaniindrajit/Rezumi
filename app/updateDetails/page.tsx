"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Save, CheckCircle } from "lucide-react"
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form"
import { submituserDetailsData } from "@/server/action/submit-user-detail"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import type { userProfile } from "@/types/userProfile.type"

// Import components
import { SectionNavigation, SECTIONS, type SectionId } from "../../components/update-details/SectionNavigation"
import { ProgressBar } from "../../components/update-details/ProgressBar"
import {
    PersonalSection,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    ProjectSection,
    CertificateSection,
    AchievementSection,
    AdditionalSection,
} from "../../components/update-details/sections"

// Import utilities
import { transformFormData } from "../../utils/formUtils"

export default function UpdateDetails() {
    const { data: session, status } = useSession()
    if (!session) {
        redirect("/")
    }

    const router = useRouter()
    const [currentSection, setCurrentSection] = useState<SectionId>("personal")
    const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set())

    const { register, handleSubmit, control } = useForm<userProfile>({
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
    } = useFieldArray({
        control,
        name: "experience",
    })

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control,
        name: "education",
    })

    const {
        fields: projectFields,
        append: appendProject,
        remove: removeProject,
    } = useFieldArray({
        control,
        name: "project",
    })

    const {
        fields: certificateFields,
        append: appendCertificate,
        remove: removeCertificate,
    } = useFieldArray({
        control,
        name: "certificate",
    })

    const {
        fields: achievementFields,
        append: appendAchievement,
        remove: removeAchievement,
    } = useFieldArray({
        control,
        name: "achievement",
    })

    const {
        fields: additionalFields,
        append: appendAdditional,
        remove: removeAdditional,
    } = useFieldArray({
        control,
        name: "additional",
    })

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

            if (!submitDetails.succes) {
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
