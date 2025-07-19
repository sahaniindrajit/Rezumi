"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { UseFormRegister, UseFieldArrayReturn } from "react-hook-form"
import type { userProfile } from "@/types/userProfile.type"

interface CertificateSectionProps {
    register: UseFormRegister<userProfile>
    certificateFields: UseFieldArrayReturn<userProfile, "certificate", "id">["fields"]
    appendCertificate: UseFieldArrayReturn<userProfile, "certificate", "id">["append"]
    removeCertificate: UseFieldArrayReturn<userProfile, "certificate", "id">["remove"]
}

export function CertificateSection({
    register,
    certificateFields,
    appendCertificate,
    removeCertificate
}: CertificateSectionProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Certificates</h3>
                    <p className="text-sm text-gray-600">Add your professional certifications and courses</p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendCertificate({} as any)}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Certificate
                </Button>
            </div>

            <div className="space-y-6">
                {certificateFields.map((field, index) => (
                    <Card key={field.id} className="relative">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">Certificate #{index + 1}</span>
                                </div>
                                {certificateFields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeCertificate(index)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Certificate Name *</Label>
                                    <Input
                                        placeholder="e.g., AWS Certified Solutions Architect"
                                        {...register(`certificate.${index}.name`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Certificate Link</Label>
                                    <Input
                                        placeholder="https://credential-url.com"
                                        {...register(`certificate.${index}.link`)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-sm font-medium">Description</Label>
                                    <Textarea
                                        placeholder="Describe what you learned and how it applies to your work..."
                                        className="min-h-[80px] resize-none"
                                        {...register(`certificate.${index}.description`)}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-sm font-medium">Related Skills</Label>
                                    <Input
                                        placeholder="AWS, Cloud Computing, DevOps"
                                        {...register(`certificate.${index}.skills`)}
                                        className="h-11"
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