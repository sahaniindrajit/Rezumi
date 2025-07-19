import type { userProfile } from "@/types/userProfile.type"

export const stringToArray = (value: any): string[] => {
    if (typeof value === "string") {
        return value
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s)
    }
    return Array.isArray(value) ? value : []
}

export const formatDate = (dateValue: any): string => {
    if (!dateValue) return new Date().toISOString()
    if (typeof dateValue === "string" && dateValue.includes("-")) {
        if (dateValue.match(/^\d{4}-\d{2}$/)) {
            return new Date(dateValue + "-01").toISOString()
        }
        if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return new Date(dateValue).toISOString()
        }
    }
    return new Date().toISOString()
}

export const transformFormData = (data: userProfile): userProfile => {
    return {
        user: {
            ...data.user,
            phoneNumber: data.user?.phoneNumber ? Number.parseInt(String(data.user.phoneNumber)) : null,
        },
        skill: {
            technical: stringToArray(data.skill?.technical),
            softSkill: stringToArray(data.skill?.softSkill),
            description: data.skill?.description || "",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        project:
            data.project
                ?.filter((proj) => proj.name)
                .map((proj) => ({
                    name: proj.name || "",
                    description: proj.description || "",
                    skills: stringToArray(proj.skills),
                    link: proj.link || "",
                    isCurrent: Boolean(proj.isCurrent),
                    startingDate: formatDate(proj.startingDate),
                    endingDate: proj.endingDate ? formatDate(proj.endingDate) : null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })) || [],
        certificate:
            data.certificate
                ?.filter((cert) => cert.name)
                .map((cert) => ({
                    name: cert.name || "",
                    description: cert.description || "",
                    link: cert.link || "",
                    skills: stringToArray(cert.skills),
                })) || [],
        experience:
            data.experience
                ?.filter((exp) => exp.jobtitle)
                .map((exp) => ({
                    jobtitle: exp.jobtitle || "",
                    company: exp.company || "",
                    isCurrent: Boolean(exp.isCurrent),
                    startingDate: formatDate(exp.startingDate),
                    endingDate: exp.endingDate ? formatDate(exp.endingDate) : null,
                    description: exp.description || "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })) || [],
        education:
            data.education
                ?.filter((edu) => edu.degree)
                .map((edu) => ({
                    degree: edu.degree || "",
                    field: edu.field || "",
                    university: edu.university || "",
                    isCurrent: Boolean(edu.isCurrent),
                    gpa: edu.gpa || "",
                    startingDate: formatDate(edu.startingDate),
                    endingDate: edu.endingDate ? formatDate(edu.endingDate) : null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })) || [],
        achievement:
            data.achievement
                ?.filter((ach) => ach.title)
                .map((ach) => ({
                    title: ach.title || "",
                    description: ach.description || "",
                    link: ach.link || "",
                })) || [],
        additional:
            data.additional
                ?.filter((add) => add.title)
                .map((add) => ({
                    title: add.title || "",
                    description: add.description || "",
                    link: add.link || "",
                })) || [],
    } as userProfile
} 