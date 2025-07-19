"use client"

interface ProgressBarProps {
    currentSectionIndex: number
    totalSections: number
}

export function ProgressBar({ currentSectionIndex, totalSections }: ProgressBarProps) {
    const progressPercentage = ((currentSectionIndex + 1) / totalSections) * 100

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">
                    Progress: {currentSectionIndex + 1} of {totalSections}
                </span>
                <span className="text-sm text-gray-500">
                    {Math.round(progressPercentage)}% Complete
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-gray-900 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
    )
} 