/* eslint-disable @typescript-eslint/no-explicit-any */


export function buildPrompt(user: any, jobDetails: any) {
  console.log("user--->",user)
  const exp = user.experience.map((exp: any) => {
    const description =
      Array.isArray(exp.description)
        ? exp.description.map((d: any) => `• ${d}`).join("\n  ")
        : `• ${exp.description}`;

    return `- ${exp.jobtitle} at ${exp.company} from (${exp.startingDate}) to (${exp.endingDate})\n  ${description}`;
  }).join("\n");

  const proj = user.projects
    .map((p: { title: any; description: any; link: any }) => `- ${p.title}: ${p.description}: ${p.link}`)
    .join("\n");

  const edu = user.education
    .map((e: { degree: any; university: any; startingDate: any; endingDate:any ;gpa: any }) => `- ${e.degree} from ${e.university} starting date (${e.startingDate}) ending date (${e.endingDate}) GPA ${e.gpa}`)
    .join("\n");

  const achievements = user.achievements.map((a: {title:any,description:any,link:any}) =>`achievement ${a.title} description ${a.description} link ${a.link}`);
  const certifications = user.certifications.map((a:{ name: any; description: any; link: any; skills: any }) => `-certificate of ${a.name} description ${a.description} skills learned ${a.skills} certificate link ${a.link} `);


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
  "skills": [...],
  "experience": [
    {
      "company": "", 
      "role": "",
      "duration": "from - to",
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
      "gpa:"",
      "degree": "",
      "year": "from - to"
    }
  ],
  "achievements": [],
  "certifications":[{
    "title":"",
    "description":"",
    "skills":"",
    "link":"",

  }],
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
Certifications:
${certifications}
Education:
${edu}
Target Company Name:
${jobDetails.name}
Target Job Description:
${jobDetails.description}
Target Job Link:
${jobDetails.link}

👉 CRITICAL INSTRUCTIONS:
1. Analyze and categorize skills into MAXIMUM 4 concise sections like:
   - "Programming Languages"
   - "Frontend Technologies"
   - "Backend Technologies"
   - "DevOps & Tools" 
   - etc.
   
2. Use ONLY these category names when they match the skills. Create new concise categories (2-3 words) if needed.

3. For skills section:
   - Each category MUST have minimum 3 skills
   - Include ONLY technical skills (soft skills go in summary)
   - Merge similar technologies (e.g., "ReactJS" → "React")

4. For experience descriptions:
   - Start with action verbs (Developed, Led, Optimized)
   - Include metrics where possible (e.g., "improved performance by 40%")
   - Keep bullets concise (max 2 lines)

5. For projects:
   - Include: title, 1-sentence description, technologies used, and live link

6. Summary section:
   - 2-3 sentences highlighting key qualifications
   - Include years of experience
   - Mention 1-2 major achievements

7. Omit sections with no data (e.g., certifications if none)

👉 Respond with the completed JSON resume ONLY.


👉 Respond with the completed JSON resume only.
`;
}
