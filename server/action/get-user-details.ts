// 'use server'

// import { db } from "@/server/db"
// import { achievement, additional, certificate, education, experience, project, skill, userDetails, users } from "@/server/db/schema"
// import { eq, inArray } from "drizzle-orm"

// export async function getUserDetails({ userId }: { userId: string }) {

//     try {

//         const userdata = await db.select().from(users).where(eq(users.id, userId))
//         const detailsId = await db.select().from(userDetails).where(eq(userDetails.userID, userId))

//         const experienceData = await db.select().from(experience).where(inArray(experience.id, detailsId.map(detail => detail.experience).filter(Boolean)))

        
//         const educationData = await db.select().from(education).where(inArray(education.id, detailsId.map(detail => detail.education).filter(Boolean)))
//         const skillData = await db.select().from(skill).where(inArray(skill.id, detailsId.map(detail => detail.skill).filter(Boolean)))
//         const certificateData = await db.select().from(certificate).where(inArray(certificate.id, detailsId.map(detail => detail.certificate).filter(Boolean)))
//         const projectData = await db.select().from(project).where(inArray(project.id, detailsId.map(detail => detail.project).filter(Boolean)))
//         const additionalData = await db.select().from(additional).where(inArray(additional.id, detailsId.map(detail => detail.additional).filter(Boolean)))
//         const achievementData = await db.select().from(achievement).where(inArray(achievement.id, detailsId.map(detail => detail.achievement).filter(Boolean)))

//         return {
//             user: userdata,
//             experience: experienceData,
//             education: educationData,
//             skill: skillData,
//             certificate: certificateData,
//             project: projectData,
//             additional: additionalData,
//             achievement: achievementData
//         }
//     } catch (error) {
//         console.log("Error getting user details", error)
//         return null
//     }
// }