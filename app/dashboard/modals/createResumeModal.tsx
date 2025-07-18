"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface CreateResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ResumeFormData {
  companyName: string;
  jobDescription: string;
  jobLink: string;
}

export function CreateResumeModal({ open, onOpenChange }: CreateResumeModalProps) {
  const [formData, setFormData] = useState<ResumeFormData>({
    companyName: "",
    jobDescription: "",
    jobLink: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { data: session, status } = useSession();

  const handleInputChange = (field: keyof ResumeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    setFormData({
      companyName: "",
      jobDescription: "",
      jobLink: "",
    });
    onOpenChange(false);
  };

  const handleCreateResume = async () => {
    setIsLoading(true);
    

    try {
      console.log("USER ID-->", session?.user?.id);
      const res = await fetch("/api/prompt/gemini_1.5", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobDetails: {
          companyName: formData.companyName,
          jobDescription: formData.jobDescription,
          jobLink: formData.jobLink,
        },
        userId: session!.user!.id, // Assuming you store user ID in sessionStorage
      }),
    });

        const apiResponse = await res.json();

      if (apiResponse.success) {
        // Close modal and reset form
        await sessionStorage.setItem('resumeData', JSON.stringify(apiResponse.data));
        onOpenChange(false);
        setFormData({
          companyName: "",
          jobDescription: "",
          jobLink: "",
        });

        // Navigate to tailored resume page with data
        router.push("/tailoredResume");
      }
    } catch (error) {
      alert("Failed to create resume. Please try again.");
      console.error("Error creating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Tailored Resume
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium">
              Company Name *
            </Label>
            <Input
              id="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription" className="text-sm font-medium">
              Job Description *
            </Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              className="min-h-[120px] resize-none"
              value={formData.jobDescription}
              onChange={(e) => handleInputChange("jobDescription", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobLink" className="text-sm font-medium">
              Job Posting Link
            </Label>
            <Input
              id="jobLink"
              placeholder="https://example.com/job-posting"
              value={formData.jobLink}
              onChange={(e) => handleInputChange("jobLink", e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateResume}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Resume...
              </>
            ) : (
              "Create Resume"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}