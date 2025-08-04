// src/components/ResumePreview.tsx
import type { ResumeData, SkillCategory } from '@/types/resume.type';
import { Mail, Phone, Globe, Github, Linkedin } from "lucide-react";

// This component is redesigned to precisely match the target single-page layout.
export const ResumePreview = ({ resumeData }: { resumeData: ResumeData }) => {
  const {
    name, contact, summary, skills, experience, projects, education, achievements, certifications
  } = resumeData;

  console.log('Resume Data:', resumeData);

  const skillsArray: SkillCategory[] = Object.entries(skills ?? {}).map(([category, skills]) => ({
    category,
    skills: Array.isArray(skills) ? skills : [],
  }));

  const renderDescription = (desc: string | string[]) => {
    const lines = Array.isArray(desc) ? desc : desc.split('\n').filter(line => line.trim() !== '');
    // Using a more compact style for list items
    return lines.map((line, i) => (
      <li key={i} className="text-sm leading-snug">{line}</li>
    ));
  };

  return (
    // Using a standard sans-serif font and precise padding for a clean look
    <div className="max-w-4xl mx-auto bg-white p-10 font-sans text-gray-800">
      
      {/* HEADER */}
      <header className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">{name}</h1>
          <span className="text-sm font-medium text-gray-600">{contact.location}</span>
        </div>
        <div className="text-xs text-gray-700 flex items-center gap-x-3 mt-1">
            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
            {/* Add portfolio link if it exists in your data */}
            {/* <a href={contact.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Portfolio</a> */}
            <span>{contact.phone}</span>
        </div>
      </header>
      
      {/* Blue Separator Line */}
      <hr className="border-t-2 border-blue-500 mb-4" />

      <main className="space-y-4">
        {/* EDUCATION */}
        <section>
          <h2 className="text-xs font-bold uppercase text-blue-600 mb-1">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="text-sm">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-black">{edu.institution}</h3>
                <span className="font-bold text-black">{edu.year}</span>
              </div>
              <div className="flex justify-between items-start">
                <span>{edu.degree}{edu.gpa && `, CGPA: ${edu.gpa}`}</span>
                <span className="text-xs italic">Delhi, India</span>
              </div>
            </div>
          ))}
        </section>

        {/* TECHNICAL SKILLS */}
        <section>
          <h2 className="text-xs font-bold uppercase text-blue-600 mb-1">Technical Skills</h2>
          <div className="text-sm space-y-0.5">
            {skillsArray.map((skillGroup, index) => (
              <div key={index} className="flex">
                <strong className="w-40 font-bold text-black">{skillGroup.category}</strong>
                <span className="flex-1">{skillGroup.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section>
          <h2 className="text-xs font-bold uppercase text-blue-600 mb-1">Work Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline text-sm">
                <h3 className="font-bold text-black">{exp.company}</h3>
                <span className="font-bold text-black">{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline text-sm">
                <p className="italic">{exp.role}</p>
                <span className="text-xs italic">Delhi</span>
              </div>
              <ul className="list-disc list-outside ml-5 mt-1 space-y-0.5">
                {renderDescription(exp.description)}
              </ul>
            </div>
          ))}
        </section>

        {/* PROJECTS */}
        <section>
          <h2 className="text-xs font-bold uppercase text-blue-600 mb-1">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
               <div className="flex justify-between items-baseline text-sm">
                <h3 className="font-bold text-black">
                  <a  className="text-black hover:underline">{project.title} </a>
                  {project.link && <a href={project.link} className="text-blue-600 hover:underline ml-1">[Link]</a>}
                </h3>
                <span className="font-bold text-black">{project.date}</span>
              </div>
              <ul className="list-disc list-outside ml-5 mt-1 space-y-0.5">
                {renderDescription(project.description)}
              </ul>
              {project.technologies && (
                <p className="text-xs mt-1">
                  <strong className="font-bold">Technologies:</strong> {project.technologies}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* ACHIEVEMENTS */}
        <section>
          <h2 className="text-xs font-bold uppercase text-blue-600 mb-1">Achievements</h2>
          <ul className="list-disc list-outside ml-5 space-y-0.5">
            {achievements.map(({ title, description, link }, index) => (
              <li key={index} className="text-sm">
                {description}
                {link && <a href={link} className="text-blue-600 hover:underline ml-1">[Link]</a>}
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
};