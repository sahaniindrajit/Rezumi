
"use server"

import { eq, inArray } from "drizzle-orm"
import { db } from "../db"
import { experience, userDetails, users } from "../db/schema"

export const fetchData = async (userId: string) => {
    try {

        const details = await db.select()
            .from(userDetails)
            .innerJoin(users, eq(users.id, userDetails.userID))
            .where(eq(userDetails.userID, userId));

        if (details[0].userDetails.experince != null) {
            const experienceData = await db.select()
                .from(experience)
                .where(inArray(experience.id, details[0].userDetails.experince))
        }



    } catch (error) {
        console.log("error in fetching user Data-->", error)
    }
}