import { CertificateType, EducationType, SkillType, ProjectType, AdditionType, achivementType, UserType, ExperienceType, } from "@/server/db/schema"

export type userProfile = {
    education: EducationType[],
    skill: SkillType,
    experience: ExperienceType[],
    certificate: CertificateType[],
    project: ProjectType[],
    additional: AdditionType[],
    achievement: achivementType[]
    user: UserType

}
