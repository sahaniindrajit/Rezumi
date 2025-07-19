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

interface ProjectSectionProps {
    register: UseFormRegister<userProfile>
    projectFields: UseFieldArrayReturn<userProfile, "project", "id">["fields"]
    appendProject: UseFieldArrayReturn<userProfile, "project", "id">["append"]
    removeProject: UseFieldArrayReturn<userProfile, "project", "id">["remove"]
}

export function ProjectSection({
    register,
    projectFields,
    appendProject,
    removeProject
}: ProjectSectionProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
                    <p className="text-sm text-gray-600">Showcase your personal and professional projects</p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendProject({} as any)}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Project
                </Button>
            </div>

            <div className="space-y-6">
                {projectFields.map((field, index) => (
                    <Card key={field.id} className="relative">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">Project #{index + 1}</span>
                                </div>
                                {projectFields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeProject(index)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Project Name *</Label>
                                    <Input
                                        placeholder="e.g., E-commerce Platform"
                                        {...register(`project.${index}.name`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Project Link</Label>
                                    <Input
                                        placeholder="https://github.com/username/project"
                                        {...register(`project.${index}.link`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-sm font-medium">Description</Label>
                                    <Textarea
                                        placeholder="Describe what the project does, your role, and key achievements..."
                                        className="min-h-[100px] resize-none"
                                        {...register(`project.${index}.description`)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Technologies Used</Label>
                                    <Input
                                        placeholder="React, Node.js, MongoDB, AWS"
                                        {...register(`project.${index}.skills`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Start Date</Label>
                                    <Input type="date" {...register(`project.${index}.startingDate`)} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">End Date</Label>
                                    <Input type="date" {...register(`project.${index}.endingDate`)} className="h-11" />
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Checkbox id={`project-current-${index}`} {...register(`project.${index}.isCurrent`)} />
                                        <Label htmlFor={`project-current-${index}`} className="text-sm">
                                            Currently working on this
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