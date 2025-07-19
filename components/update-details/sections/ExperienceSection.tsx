"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { UseFormRegister, UseFieldArrayReturn } from "react-hook-form"
import type { userProfile } from "@/types/userProfile.type"

interface ExperienceSectionProps {
    register: UseFormRegister<userProfile>
    experienceFields: UseFieldArrayReturn<userProfile, "experience", "id">["fields"]
    appendExperience: UseFieldArrayReturn<userProfile, "experience", "id">["append"]
    removeExperience: UseFieldArrayReturn<userProfile, "experience", "id">["remove"]
}

export function ExperienceSection({
    register,
    experienceFields,
    appendExperience,
    removeExperience
}: ExperienceSectionProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                    <p className="text-sm text-gray-600">Add your professional work history</p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendExperience({} as any)}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Experience
                </Button>
            </div>

            <div className="space-y-6">
                {experienceFields.map((field, index) => (
                    <Card key={field.id} className="relative">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">Experience #{index + 1}</span>
                                </div>
                                {experienceFields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeExperience(index)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Job Title *</Label>
                                    <Input
                                        placeholder="e.g., Senior Frontend Developer"
                                        {...register(`experience.${index}.jobtitle`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Company *</Label>
                                    <Input
                                        placeholder="Company name"
                                        {...register(`experience.${index}.company`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Start Date</Label>
                                    <Input type="month" {...register(`experience.${index}.startingDate`)} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">End Date</Label>
                                    <Input
                                        type="month"
                                        placeholder="Leave empty if current"
                                        {...register(`experience.${index}.endingDate`)}
                                        className="h-11"
                                    />
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Checkbox id={`current-${index}`} {...register(`experience.${index}.isCurrent`)} />
                                        <Label htmlFor={`current-${index}`} className="text-sm">
                                            Currently working here
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mt-4">
                                <Label className="text-sm font-medium">Job Description</Label>
                                <Textarea
                                    placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Include quantifiable results when possible"
                                    className="min-h-[120px] resize-none"
                                    {...register(`experience.${index}.description`)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
} 