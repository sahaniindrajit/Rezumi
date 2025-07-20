'use server'
import { userProfile } from "@/types/userProfile.type";
import { db } from "../db";
import { achievement, additional, certificate, education, experience, project, skill, userDetails, users } from "../db/schema";
import { eq, and } from "drizzle-orm";

export async function submituserDetailsData({ userDetailsData, userId }: { userDetailsData: userProfile, userId: string }) {

    console.log("Received user details data:", userDetailsData);

    try {
        await db.transaction(async (tx) => {
            // Update user basic info
            await tx.update(users)
                .set({
                    currentPosition: userDetailsData.user.currentPosition,
                    description: userDetailsData.user.description,
                    email: userDetailsData.user.email,
                    location: userDetailsData.user.location,
                    phoneNumber: userDetailsData.user.phoneNumber,
                    name: userDetailsData.user.name
                })
                .where(
                    eq(users.id, userId)
                );

            console.log("1 - User info updated")

            // Check if user details already exist
            const existingUserDetails = await tx.select()
                .from(userDetails)
                .where(eq(userDetails.userID, userId));

            // Delete existing related records if they exist
            if (existingUserDetails.length > 0) {
                const existingDetails = existingUserDetails[0];

                // Delete existing records
                if (existingDetails.experience && existingDetails.experience.length > 0) {
                    await tx.delete(experience)
                        .where(eq(experience.id, existingDetails.experience[0])); // This is simplified - in production you'd want to handle multiple records properly
                }

                if (existingDetails.education && existingDetails.education.length > 0) {
                    await tx.delete(education)
                        .where(eq(education.id, existingDetails.education[0]));
                }

                if (existingDetails.project && existingDetails.project.length > 0) {
                    await tx.delete(project)
                        .where(eq(project.id, existingDetails.project[0]));
                }

                if (existingDetails.certificate && existingDetails.certificate.length > 0) {
                    await tx.delete(certificate)
                        .where(eq(certificate.id, existingDetails.certificate[0]));
                }

                if (existingDetails.achievement && existingDetails.achievement.length > 0) {
                    await tx.delete(achievement)
                        .where(eq(achievement.id, existingDetails.achievement[0]));
                }

                if (existingDetails.additional && existingDetails.additional.length > 0) {
                    await tx.delete(additional)
                        .where(eq(additional.id, existingDetails.additional[0]));
                }

                // Delete the user details record
                await tx.delete(userDetails)
                    .where(eq(userDetails.userID, userId));
            }

            console.log("2 - Existing records cleaned up")

            // Insert skill
            const skillResult = await tx.insert(skill)
                .values({
                    technical: userDetailsData.skill.technical,
                    softSkill: userDetailsData.skill.softSkill,
                    description: userDetailsData.skill.description || "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                .returning({ id: skill.id });
            const skillIds = skillResult[0]?.id ? [skillResult[0].id] : [];

            console.log("3 - Skills inserted")

            // Insert projects
            const projectIds: string[] = [];
            for (const proj of userDetailsData.project) {
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

            console.log("4 - Projects inserted")

            // Insert education
            const educationIds: string[] = [];
            for (const edu of userDetailsData.education) {
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

            console.log("5 - Education inserted")

            // Insert experience
            const experienceIds: string[] = [];
            for (const exp of userDetailsData.experience) {
                const result = await tx.insert(experience).values({
                    jobtitle: exp.jobtitle, // This maps to 'jobTitle' column in DB
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

            console.log("6 - Experience inserted")

            // Insert certificates
            const certificateIds: string[] = [];
            for (const cert of userDetailsData.certificate) {
                const result = await tx.insert(certificate).values({
                    name: cert.name,
                    description: cert.description,
                    link: cert.link,
                    skills: cert.skills,
                }).returning({ id: certificate.id });
                if (result[0]?.id) certificateIds.push(result[0].id);
            }

            console.log("7 - Certificates inserted")

            // Insert achievements
            const achievementIds: string[] = [];
            for (const ach of userDetailsData.achievement) {
                const result = await tx.insert(achievement).values({
                    title: ach.title,
                    description: ach.description,
                    link: ach.link,
                }).returning({ id: achievement.id });
                if (result[0]?.id) achievementIds.push(result[0].id);
            }

            console.log("8 - Achievements inserted")

            // Insert additional
            const additionalIds: string[] = [];
            for (const add of userDetailsData.additional) {
                const result = await tx.insert(additional).values({
                    title: add.title,
                    description: add.description,
                    link: add.link,
                }).returning({ id: additional.id });
                if (result[0]?.id) additionalIds.push(result[0].id);
            }

            console.log("9 - Additional info inserted")

            console.log({
                experienceIds,
                educationIds,
                skillIds,
                projectIds,
                additionalIds,
                certificateIds,
                achievementIds,
            });

            // Insert into userDetailsData table
            await tx.insert(userDetails).values({
                userID: userId,
                experience: experienceIds, // Note: this is the correct field name from schema
                education: educationIds,
                skill: skillIds,
                project: projectIds,
                additional: additionalIds,
                certificate: certificateIds,
                achievement: achievementIds, // Note: this is the correct field name from schema
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            console.log("10 - User details record created")
        });

        return { success: true }
    } catch (error) {

        console.log("Error at submit user details", error);
        return { success: false }

    }

}