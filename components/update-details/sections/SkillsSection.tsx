"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UseFormRegister } from "react-hook-form"
import type { userProfile } from "@/types/userProfile.type"

interface SkillsSectionProps {
    register: UseFormRegister<userProfile>
}

export function SkillsSection({ register }: SkillsSectionProps) {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills & Expertise</h3>
                <p className="text-sm text-gray-600">List your technical and soft skills</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="technicalSkills" className="text-sm font-medium">
                        Technical Skills
                    </Label>
                    <Textarea
                        id="technicalSkills"
                        placeholder="React, TypeScript, Node.js, Python, AWS, Docker, MongoDB"
                        className="min-h-[100px] resize-none"
                        {...register("skill.technical")}
                    />
                    <p className="text-xs text-gray-500">Separate skills with commas</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="softSkills" className="text-sm font-medium">
                        Soft Skills
                    </Label>
                    <Textarea
                        id="softSkills"
                        placeholder="Leadership, Communication, Problem Solving, Team Collaboration, Project Management"
                        className="min-h-[100px] resize-none"
                        {...register("skill.softSkill")}
                    />
                    <p className="text-xs text-gray-500">Separate skills with commas</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="skillDescription" className="text-sm font-medium">
                        Skills Summary
                    </Label>
                    <Textarea
                        id="skillDescription"
                        placeholder="Provide a brief overview of your expertise and how you apply these skills..."
                        className="min-h-[100px] resize-none"
                        {...register("skill.description")}
                    />
                </div>
            </div>
        </div>
    )
} 