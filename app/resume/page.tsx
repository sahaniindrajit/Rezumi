// The main page where the user clicks download
// src/app/resumetemplate/page.tsx (or similar)

"use client";
import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import type { ResumeData } from '@/types/resume.type';
import { ResumePreview } from './preview/page';

export default function TailoredResume() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // This logic stays the same
    const data = sessionStorage.getItem('resumeData');
    if (data) setResumeData(JSON.parse(data));
  }, []);

  const handleDownload = async () => {
    if (!resumeData) return;
    setIsDownloading(true);
    try {
      const response = await fetch('/api/resume/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) throw new Error(`PDF generation failed: ${await response.text()}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resumeData.name.replace(' ', '_')}_Resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Sorry, there was an error generating the PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        <Download className="w-4 h-4" />
        {isDownloading ? 'Generating PDF...' : 'Download PDF'}
      </button>

      {/* Show the live preview on the page */}
      <ResumePreview resumeData={resumeData} />
    </div>
  );
}