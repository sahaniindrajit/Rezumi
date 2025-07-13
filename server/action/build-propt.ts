/* eslint-disable @typescript-eslint/no-explicit-any */


export function buildPrompt(user: any) {
  const exp = user.experience.map((exp: any) => {
    const description =
      Array.isArray(exp.description)
        ? exp.description.map((d: any) => `• ${d}`).join("\n  ")
        : `• ${exp.description}`;

    return `- ${exp.role} at ${exp.company} (${exp.duration})\n  ${description}`;
  }).join("\n");

  const proj = user.projects
    .map((p: { title: any; description: any; link:any }) => `- ${p.title}: ${p.description}: ${p.link}`)
    .join("\n");

  const edu = user.education
    .map((e: { degree: any; institution: any; year: any; }) => `- ${e.degree} from ${e.institution} (${e.year})`)
    .join("\n");

  const achievements = user.achievements.map((a: any) => `- ${a}`).join("\n");

  return `
You are an expert resume writer with a deep understanding of ATS (Applicant Tracking Systems), keyword optimization, and resume formatting best practices.
Your task is to take the following **user-provided job application details** and return a **professionally written, ATS-optimized resume**.
The resume must:
- Match the tone and keyword requirements of the **target job description**
- Be written in a clear, concise, and professional tone
- Focus on achievements and impact (use numbers and metrics where appropriate)
- Emphasize skills and experience relevant to the job description
- Be returned **only in structured JSON format**, no explanation or text outside the JSON.
---
📦 Output JSON format:
{
  "name": "",
  "contact": {
    "email": "",
    "phone": "",
    "location": ""
  },
  "summary": "",
  "skills": [],
  "experience": [
    {
      "company": "",
      "role": "",
      "duration": "",
      "description": ""
    }
  ],
  "projects": [
    {
      "title": "",
      "description": "",
      "Link":""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "year": ""
    }
  ],
  "achievements": []
}
---
📥 User Input:
Name: ${user.name}
Email: ${user.email}
Phone: ${user.phone}
Location: ${user.location}
Job Experience:
${exp}
Projects:
${proj}
Skills:
${user.skills.join(", ")}
Achievements:
${achievements}
Education:
${edu}
Target Job Description:
${user.targetJobDescription}

👉 Respond with the completed JSON resume only.
`;
}
