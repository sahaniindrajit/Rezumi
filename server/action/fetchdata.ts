"use server"

import { eq, inArray } from "drizzle-orm"
import { db } from "../db"
import { achievement, certificate, experience, project, skill, userDetails, users, education } from "../db/schema"

export const fetchData = async (userId: string) => {
    try {

        const details = await db.select()
            .from(userDetails)
            .innerJoin(users, eq(users.id, userDetails.userID))
            .where(eq(userDetails.userID, userId));


        console.log("details", details)



        let userExperience = null;
        let userSkill = null;
        let userEducation = null;
        let userAchievement = null;
        let userProject = null;
        let userCertificate = null;
        let userAdditional = null;

        const user = details[0]?.user;

        console.log(user)

        const userData = details[0]?.userDetails;

        if (userData?.experience) {
            const experienceData = await db.select()
                .from(experience)
                .where(inArray(experience.id, userData.experience));
            userExperience = experienceData;
        }

        if (userData?.skill) {
            const skillData = await db.select()
                .from(skill)
                .where(inArray(skill.id, userData.skill));
            userSkill = skillData;
        }

        if (userData?.education) {
            const educationData = await db.select()
                .from(education)
                .where(inArray(education.id, userData.education));
            userEducation = educationData;
        }

        if (userData?.achievement) {
            const achievementData = await db.select()
                .from(achievement)
                .where(inArray(achievement.id, userData.achievement));
            userAchievement = achievementData;
        }
        if (userData?.project) {
            const projectData = await db.select()
                .from(project)
                .where(inArray(project.id, userData.project));
            userProject = projectData;
        }
        if (userData?.certificate) {
            const certificateData = await db.select()
                .from(certificate)
                .where(inArray(certificate.id, userData.certificate));
            userCertificate = certificateData;
        }



        return {
            name: user.name,
            email: user.email,
            phone: user.phoneNumber,
            linkedin: user.linkedin,
            portfolio: user.portfolio,
            summary: user.description,
            experience: userExperience,
            skills: userSkill,
            education: userEducation,
            achievements: userAchievement,
            projects: userProject,
            certifications: userCertificate,
            location:user.location,

        };

    } catch (error) {
        console.log("error in fetching user Data -->", error);
        return null;
    }
}
