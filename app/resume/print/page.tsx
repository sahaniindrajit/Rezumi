
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ResumeData, SkillCategory } from '@/types/resume.type';
import { ResumePreview } from '@/components/resume/preview';



const ResumePrintPageContent = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // The resume data will be passed as a compressed, base64 encoded string in the URL
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decodedData = Buffer.from(dataParam, 'base64').toString('utf-8');
        setResumeData(JSON.parse(decodedData));
      } catch (error) {
        console.error("Failed to parse resume data from URL", error);
      }
    }
  }, [searchParams]);

  if (!resumeData) {
    return <div>Loading Preview...</div>;
  }

  // visual resume part.
  return <ResumePreview resumeData={resumeData} />;
};


export default function ResumePrintPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResumePrintPageContent />
        </Suspense>
    )
}