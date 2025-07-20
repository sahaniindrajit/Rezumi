"use client";

import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

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

const TailoredResume = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resume data...</p>
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

  const {
    name,
    contact,
    summary,
    experience,
    projects,
    education,
    achievements,
    certifications
  } = resumeData;

  // Extract role from first experience entry
  const currentRole = experience[0]?.role || "Professional";

  // Helper to render description (handles both string and array)
  const renderDescription = (desc: string | string[]) => {
    if (Array.isArray(desc)) {
      return desc.map((line, i) => <li key={i}>{line}</li>);
    }
    return desc.split('\n').map((line, i) => <li key={i}>{line}</li>);
  };

  return (
    <div className="max-w-4xl mx-auto bg-background shadow-lg print:shadow-none print:max-w-none">
      {/* Header */}
      <div className="bg-resume-header text-resume-header-foreground p-8 print:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{name}</h1>
            <p className="text-xl opacity-90">{currentRole}</p>
            <p className="text-base opacity-80 mt-2 max-w-2xl">
              {summary}
            </p>
          </div>
          <div className="text-sm space-y-2 md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${contact.email}`}
                className="underline hover:text-resume-accent transition-colors"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <Phone className="w-4 h-4" />
              <a
                href={`tel:${contact.phone}`}
                className="underline hover:text-resume-accent transition-colors"
              >
                {contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <MapPin className="w-4 h-4" />
              <a
                href={`https://www.google.com/maps/place/${encodeURIComponent(contact.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-resume-accent transition-colors"
              >
                {contact.location}
              </a>
            </div>
            {contact.github && (
              <div className="flex items-center gap-2 md:justify-end">
                <Github className="w-4 h-4" />
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-resume-accent transition-colors"
                >
                  {contact.github.replace('https://', '')}
                </a>
              </div>
            )}
            {contact.linkedin && (
              <div className="flex items-center gap-2 md:justify-end">
                <Linkedin className="w-4 h-4" />
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-resume-accent transition-colors"
                >
                  {contact.linkedin.replace('https://', '')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 print:p-6 space-y-8">
        {/* Skills */}
        {skillsArray.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
              SKILLS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillsArray.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-resume-section mb-2">
                    {skillGroup.category}
                  </h3>
                  <p className="text-resume-text">
                    {skillGroup.items.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
              EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-resume-text">{exp.role}</h3>
                      <p className="text-resume-section font-medium">{exp.company}</p>
                    </div>
                    <p className="text-resume-section">{exp.duration}</p>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-resume-text text-sm ml-4">
                    {renderDescription(exp.description)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-resume-text">{project.title}</h3>
                    {project.date && (
                      <p className="text-resume-section">{project.date}</p>
                    )}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-resume-text text-sm ml-4 mb-2">
                    {renderDescription(project.description)}
                  </ul>
                  {project.technologies && (
                    <p className="text-resume-section text-sm mb-2">
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                  )}
                  <a
                    href={project.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm underline hover:text-resume-accent transition-colors"
                  >
                    <Globe className="w-4 h-4" /> View Project
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
              EDUCATION
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-resume-text">{edu.degree}</h3>
                  <p className="text-resume-section font-medium">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-resume-section text-sm">GPA: {edu.gpa}</p>
                  )}
                </div>
                <p className="text-resume-section">{edu.year}</p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
              CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-resume-text">{cert.name}</h3>
                  <p className="text-resume-section text-sm">
                    {cert.issuer} - {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
              ACHIEVEMENTS
            </h2>
            <ul className="list-disc list-inside space-y-2 text-resume-text text-sm">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default TailoredResume;