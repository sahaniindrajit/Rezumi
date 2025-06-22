import { CertificateType, EducationType, SkillType, ProjectType, AdditionType, achivementType, UserType, } from "@/server/db/schema"

export type userProfile = {
    education: EducationType[],
    skill: SkillType,
    experience: EducationType[],
    certificate: CertificateType[],
    project: ProjectType[],
    additional: AdditionType[],
    achivement: achivementType[]
    user: UserType

}
