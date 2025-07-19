"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { UseFormRegister, UseFieldArrayReturn } from "react-hook-form"
import type { userProfile } from "@/types/userProfile.type"

interface AchievementSectionProps {
    register: UseFormRegister<userProfile>
    achievementFields: UseFieldArrayReturn<userProfile, "achievement", "id">["fields"]
    appendAchievement: UseFieldArrayReturn<userProfile, "achievement", "id">["append"]
    removeAchievement: UseFieldArrayReturn<userProfile, "achievement", "id">["remove"]
}

export function AchievementSection({
    register,
    achievementFields,
    appendAchievement,
    removeAchievement
}: AchievementSectionProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                    <p className="text-sm text-gray-600">Highlight your notable accomplishments and awards</p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendAchievement({} as any)}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Achievement
                </Button>
            </div>

            <div className="space-y-6">
                {achievementFields.map((field, index) => (
                    <Card key={field.id} className="relative">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">Achievement #{index + 1}</span>
                                </div>
                                {achievementFields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeAchievement(index)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Achievement Title *</Label>
                                    <Input
                                        placeholder="e.g., Employee of the Year 2023"
                                        {...register(`achievement.${index}.title`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Related Link</Label>
                                    <Input
                                        placeholder="https://example.com/award"
                                        {...register(`achievement.${index}.link`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-sm font-medium">Description</Label>
                                    <Textarea
                                        placeholder="Describe the achievement, its significance, and the impact it had..."
                                        className="min-h-[100px] resize-none"
                                        {...register(`achievement.${index}.description`)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
} 