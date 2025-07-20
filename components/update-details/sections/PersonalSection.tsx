"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UseFormRegister } from "react-hook-form"
import type { userProfile } from "@/types/userProfile.type"

interface PersonalSectionProps {
    register: UseFormRegister<userProfile>
    session: any
}

export function PersonalSection({ register, session }: PersonalSectionProps) {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={session.user?.image || "/placeholder.svg"} alt={session.user?.name || "User"} />
                    <AvatarFallback className="text-xl font-semibold bg-gray-900 text-white">
                        {session.user?.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "U"}
                    </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-900">{session.user?.name}</h2>
                <p className="text-gray-600">Complete your basic information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name *
                    </Label>
                    <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        {...register("user.name", { required: true })}
                        className="h-11"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                    </Label>
                    <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="h-11"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Email *
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        disabled
                        className="bg-gray-50 h-11"
                        {...register("user.email", { required: true })}
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                    </Label>
                    <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        {...register("user.phoneNumber")}
                        className="h-11"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                        Location
                    </Label>
                    <Input
                        id="location"
                        placeholder="City, State, Country"
                        {...register("user.location")}
                        className="h-11"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                        Professional Title
                    </Label>
                    <Input
                        id="title"
                        placeholder="e.g., Senior Frontend Developer"
                        {...register("user.currentPosition")}
                        className="h-11"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="summary" className="text-sm font-medium">
                    Professional Summary
                </Label>
                <Textarea
                    id="summary"
                    placeholder="Write a brief professional summary that highlights your key skills and experience..."
                    className="min-h-[120px] resize-none"
                    {...register("user.description")}
                />
                <p className="text-xs text-gray-500">2-3 sentences that summarize your professional background</p>
            </div>
        </div>
    )
} 