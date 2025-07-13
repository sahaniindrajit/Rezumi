import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";

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
  description: string;
}

interface Project {
  title: string;
  description: string;
  Link: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface ResumeData {
  name: string;
  contact: ContactInfo;
  summary: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  achievements: string[];
}

interface ResumeTemplateProps {
  resumeData: ResumeData;
}

const ResumeTemplate = ({ resumeData }: ResumeTemplateProps) => {
  const {
    name,
    contact,
    summary,
    skills,
    experience,
    projects,
    education,
    achievements
  } = resumeData;

  // Extract role from first experience entry
  const currentRole = experience.length > 0 ? experience[0].role : "Software Developer";

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
      {/* Header */}
      <div className="bg-resume-header text-black p-8 print:p-6">
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
                className="underline hover:text-resume-accent"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <Phone className="w-4 h-4" />
              <a
                href={`tel:${contact.phone}`}
                className="underline hover:text-resume-accent"
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
                className="underline hover:text-resume-accent"
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
                  className="underline hover:text-resume-accent"
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
                  className="underline hover:text-resume-accent"
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
        <section>
          <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
            SKILLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="text-resume-text">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
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
                  {exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
            PROJECTS
          </h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-resume-text">{project.title}</h3>
                </div>
                <p className="text-resume-text text-sm mb-2">
                  {project.description}
                </p>
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm underline hover:text-resume-accent"
                >
                  <Globe className="w-4 h-4" /> View Project
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <h3 className="text-lg font-semibold text-resume-text">{edu.degree}</h3>
                <p className="text-resume-section font-medium">{edu.institution}</p>
              </div>
              <p className="text-resume-section">{edu.year}</p>
            </div>
          ))}
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
            ACHIEVEMENTS
          </h2>
          <ul className="list-disc list-inside space-y-1 text-resume-text">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ResumeTemplate;