"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { UseFormRegister, UseFieldArrayReturn } from "react-hook-form"
import type { userProfile } from "@/types/userProfile.type"

interface EducationSectionProps {
    register: UseFormRegister<userProfile>
    educationFields: UseFieldArrayReturn<userProfile, "education", "id">["fields"]
    appendEducation: UseFieldArrayReturn<userProfile, "education", "id">["append"]
    removeEducation: UseFieldArrayReturn<userProfile, "education", "id">["remove"]
}

export function EducationSection({
    register,
    educationFields,
    appendEducation,
    removeEducation
}: EducationSectionProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                    <p className="text-sm text-gray-600">Add your educational background</p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendEducation({} as any)}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Education
                </Button>
            </div>

            <div className="space-y-6">
                {educationFields.map((field, index) => (
                    <Card key={field.id} className="relative">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">Education #{index + 1}</span>
                                </div>
                                {educationFields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeEducation(index)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Degree *</Label>
                                    <Input
                                        placeholder="e.g., Bachelor of Science"
                                        {...register(`education.${index}.degree`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Field of Study</Label>
                                    <Input
                                        placeholder="e.g., Computer Science"
                                        {...register(`education.${index}.field`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">School/University *</Label>
                                    <Input
                                        placeholder="Institution name"
                                        {...register(`education.${index}.university`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">GPA (Optional)</Label>
                                    <Input placeholder="3.8 / 4.0" {...register(`education.${index}.gpa`)} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Start Date</Label>
                                    <Input type="date" {...register(`education.${index}.startingDate`)} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Graduation Date</Label>
                                    <Input type="date" {...register(`education.${index}.endingDate`)} className="h-11" />
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Checkbox id={`edu-current-${index}`} {...register(`education.${index}.isCurrent`)} />
                                        <Label htmlFor={`edu-current-${index}`} className="text-sm">
                                            Currently studying
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
} 