export type ContactInfo= {
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
}

export type Experience ={
  company: string;
  role: string;
  duration: string;
  description: string | string[];
}

export type Project= {
  title: string;
  date?: string;
  description: string | string[];
  technologies?: string[];
  link: string;
}

export type Education= {
  institution: string;
  degree: string;
  year: string;
  gpa?: string;
}

export type SkillCategory= {
  category: string;
  skills: string[];
}

export type Achievement= {
  title: string;
  description: string;
  link?: string;
}

export type ResumeData ={
  name: string;
  contact: ContactInfo;
  summary: string;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
  certifications?: {
    title: string;
    link: string;
    description: string;
    skills: string;
  }[];
}