"use client";
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string | string[];
}

interface Project {
  title: string;
  date?: string;
  description: string | string[];
  technologies?: string;
  Link: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
  gpa?: string;
}

interface SkillCategory {
  category: string;
  items: string[];
}

interface ResumeData {
  name: string;
  contact: ContactInfo;
  summary: string;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  achievements: string[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
  }[];
}
export default function TailoredResume() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const componentRef = useRef(null);

  const handleDownload = async () => {
    if (!componentRef.current) return;

    try {
      const element = componentRef.current;


      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    const data = sessionStorage.getItem('resumeData');
    if (data) {
      try {
        setResumeData(JSON.parse(data));
      } catch (error) {
        console.error("Error parsing resume data:", error);
      }
    }
  }, []);

  if (!resumeData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading resume data...</p>
        </div>
      </div>
    );
  }

  const rawSkills = (resumeData as any).skills;
  const skillsArray: SkillCategory[] = Array.isArray(rawSkills)
    ? rawSkills
    : Object.entries(rawSkills).map(([category, skills]) => ({
      category,
      items: Array.isArray(skills) ? skills : [],
    }));


  console.log('rawSkills', rawSkills);

  console.log("SkillArray", skillsArray)
  const {
    name,
    contact,
    summary,
    skills,
    experience,
    projects,
    education,
    achievements,
    certifications
  } = resumeData;

  const currentRole = experience[0].role ? experience[0].role : "Software Developer";

  const renderDescription = (desc: string | string[]) => {
    if (Array.isArray(desc)) {
      return desc.map((line, i) => <li key={i}>{line}</li>);
    }
    return desc.split('\n').map((line, i) => <li key={i}>{line}</li>);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleDownload}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-resume-header text-black rounded hover:bg-resume-accent"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </button>

      <div ref={componentRef} className="max-w-4xl mx-auto bg-white border border-gray-200 print:border-none print:shadow-none print:max-w-none">
        {/* Header */}
        <div className="border-b-2 border-gray-200 p-8 print:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{name}</h1>
              <p className="text-xl">{currentRole}</p>
              <p className="text-base mt-2 max-w-2xl leading-relaxed">
                {summary}
              </p>
            </div>
            <div className="text-sm space-y-2 md:text-right">
              <div className="flex items-center gap-2 md:justify-end">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <Phone className="w-4 h-4" />
                <a href={`tel:${contact.phone}`} className="hover:underline">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <MapPin className="w-4 h-4" />
                <span>{contact.location}</span>
              </div>
              {contact.github && (
                <div className="flex items-center gap-2 md:justify-end">
                  <Github className="w-4 h-4" />
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {contact.github.replace('https://', '')}
                  </a>
                </div>
              )}
              {contact.linkedin && (
                <div className="flex items-center gap-2 md:justify-end">
                  <Linkedin className="w-4 h-4" />
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {contact.linkedin.replace('https://', '')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 print:p-6 space-y-6">
          {/* Skills */}
          {skillsArray.length > 0 && (
            <section className="border-b pb-6">
              <h2 className="text-xl font-bold mb-4 uppercase">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsArray.map((skillGroup, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-2">{skillGroup.category}</h3>
                    <p>{skillGroup.items.join(', ')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="border-b pb-6">
              <h2 className="text-xl font-bold mb-4 uppercase">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{exp.role}</h3>
                        <p className="font-medium">{exp.company}</p>
                      </div>
                      <p>{exp.duration}</p>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      {renderDescription(exp.description)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="border-b pb-6">
              <h2 className="text-xl font-bold mb-4 uppercase">Projects</h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      {project.date && <p>{project.date}</p>}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4 mb-2">
                      {renderDescription(project.description)}
                    </ul>
                    {project.technologies && (
                      <p className="text-sm mb-2">
                        <strong>Technologies:</strong> {project.technologies}
                      </p>
                    )}
                    <a href={project.Link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:underline">
                      <Globe className="w-4 h-4" /> View Project
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="border-b pb-6">
              <h2 className="text-xl font-bold mb-4 uppercase">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="font-medium">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <p>{edu.year}</p>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="border-b pb-6">
              <h2 className="text-xl font-bold mb-4 uppercase">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm">{cert.issuer} - {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 uppercase">Achievements</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};