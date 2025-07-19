"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const SECTIONS = [
    {
        id: "personal",
        title: "Personal Information",
        icon: "👤",
        description: "Basic contact information and professional summary",
    },
    {
        id: "experience",
        title: "Work Experience",
        icon: "💼",
        description: "Your professional work history and achievements",
    },
    { id: "education", title: "Education", icon: "🎓", description: "Academic background and qualifications" },
    { id: "skills", title: "Skills", icon: "🛠️", description: "Technical and soft skills" },
    { id: "project", title: "Projects", icon: "🚀", description: "Personal and professional projects" },
    { id: "certificate", title: "Certificates", icon: "📜", description: "Professional certifications and courses" },
    { id: "achievement", title: "Achievements", icon: "🏆", description: "Awards and notable accomplishments" },
    { id: "additional", title: "Additional Info", icon: "📋", description: "Any other relevant information" },
] as const

export type SectionId = (typeof SECTIONS)[number]["id"]

interface SectionNavigationProps {
    currentSection: SectionId
    completedSections: Set<SectionId>
    onSectionClick: (sectionId: SectionId) => void
}

export function SectionNavigation({ currentSection, completedSections, onSectionClick }: SectionNavigationProps) {
    return (
        <Card className="sticky top-8">
            <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Profile Sections</h3>
                <nav className="space-y-2">
                    {SECTIONS.map((section, index) => (
                        <button
                            key={section.id}
                            onClick={() => onSectionClick(section.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${currentSection === section.id
                                    ? "bg-gray-900 text-white shadow-md"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`}
                        >
                            <span className="text-lg">{section.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{section.title}</div>
                                <div
                                    className={`text-xs truncate ${currentSection === section.id ? "text-gray-300" : "text-gray-500"
                                        }`}
                                >
                                    Step {index + 1} of {SECTIONS.length}
                                </div>
                            </div>
                            {completedSections.has(section.id) && (
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            )}
                        </button>
                    ))}
                </nav>
            </CardContent>
        </Card>
    )
} 