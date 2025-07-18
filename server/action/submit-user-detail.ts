'use server'
import { userProfile } from "@/types/userProfile.type";
import { db } from "../db";
import { achivement, additional, certificate, education, experience, project, users } from "../db/schema";
import { eq } from "drizzle-orm";

export async function submitUserDetails({ userDetails, userId }: { userDetails: userProfile, userId: string }) {

    console.log(userDetails);

    try {
        await db.transaction(async (tx) => {
            // Update user basic info
            await tx.update(users)
                .set({
                    currentPosition: userDetails.user.currentPosition,
                    description: userDetails.user.description,
                    email: userDetails.user.email,
                    location: userDetails.user.location,
                    phoneNumber: userDetails.user.phoneNumber,
                    name: userDetails.user.name
                })
                .where(
                    eq(users.id, userId)
                );

            // Insert skill (assuming only one skill object)
            const skillResult = await tx.insert(skill)
                .values({
                    technical: userDetails.skill.technical,
                    softSkill: userDetails.skill.softSkill,
                    description: userDetails.skill.description || "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                .returning({ id: skill.id });
            const skillIds = skillResult[0]?.id ? [skillResult[0].id] : [];

            // Insert projects
            const projectIds: string[] = [];
            for (const proj of userDetails.project) {
                const result = await tx.insert(project).values({
                    name: proj.name,
                    description: proj.description,
                    skills: proj.skills,
                    link: proj.link,
                    isCurrent: proj.isCurrent,
                    startingDate: proj.startingDate,
                    endingDate: proj.endingDate,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }).returning({ id: project.id });
                if (result[0]?.id) projectIds.push(result[0].id);
            }

            // Insert education
            const educationIds: string[] = [];
            for (const edu of userDetails.education) {
                const result = await tx.insert(education).values({
                    degree: edu.degree,
                    field: edu.field,
                    university: edu.university,
                    isCurrent: edu.isCurrent,
                    gpa: edu.gpa,
                    startingDate: edu.startingDate,
                    endingDate: edu.endingDate,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }).returning({ id: education.id });
                if (result[0]?.id) educationIds.push(result[0].id);
            }

            // Insert experience
            const experienceIds: string[] = [];
            for (const exp of userDetails.experience) {
                const result = await tx.insert(experience).values({
                    jobtitle: exp.jobtitle,
                    company: exp.company,
                    isCurrent: exp.isCurrent,
                    startingDate: exp.startingDate,
                    endingDate: exp.endingDate,
                    description: exp.description,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }).returning({ id: experience.id });
                if (result[0]?.id) experienceIds.push(result[0].id);
            }

            // Insert certificates
            const certificateIds: string[] = [];
            for (const cert of userDetails.certificate) {
                const result = await tx.insert(certificate).values({
                    name: cert.name,
                    description: cert.description,
                    link: cert.link,
                    skills: cert.skills,
                }).returning({ id: certificate.id });
                if (result[0]?.id) certificateIds.push(result[0].id);
            }

            // Insert achievements
            const achievementIds: string[] = [];
            for (const ach of userDetails.achievement) {
                const result = await tx.insert(achivement).values({
                    title: ach.title,
                    description: ach.description,
                    link: ach.link,
                }).returning({ id: achivement.id });
                if (result[0]?.id) achievementIds.push(result[0].id);
            }

            // Insert additional
            const additionalIds: string[] = [];
            for (const add of userDetails.additional) {
                const result = await tx.insert(additional).values({
                    title: add.title,
                    description: add.description,
                    link: add.link,
                }).returning({ id: additional.id });
                if (result[0]?.id) additionalIds.push(result[0].id);
            }

            //Insert into userDetails table
            await tx.insert(userDetailsTable).values({
                id: userId,
                experince: experienceIds,
                education: educationIds,
                skill: skillIds,
                project: projectIds,
                additional: additionalIds,
                certificate: certificateIds,
                achivement: achievementIds,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        });

        return { succes: true }
    } catch (error) {

        console.log("Error at submit user details", error);
        return { succes: false }

    }

}