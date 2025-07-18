"use server"
import fetch from "node-fetch";
import { buildPrompt } from "./build-propt";
import { fetchData } from "./fetchdata";
// import { userDetails } from "@/lib/user-data";

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI;



export default async function answeringModel(jobDetails:any,userId:string) {

    try {
        console.log("key-->", GEMINI_API_KEY)

        //eslint-disable-next-line @typescript-eslint/no-unused-vars

        // get user details from DB using api

        // get job description from frontend
        console.log("userID-->",userId)
        const userDetails=await fetchData(userId );
        console.log("USer Details -->",userDetails)
        const userDataPrompt = buildPrompt(userDetails,jobDetails)

        console.log("Prompt--->",userDataPrompt);
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: userDataPrompt
                                }
                            ]
                        }
                    ]
                })
            }
        );


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await response.json();

        const tailoredResumeText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log("Tailored Resume--->", tailoredResumeText);

        // Clean and parse the JSON
        if (tailoredResumeText) {
            // Remove JSON code block markers
            const cleanJson = tailoredResumeText
                .replace(/^```json\s*/, '')
                .replace(/\s*```$/, '');
            
            const parsedResume = JSON.parse(cleanJson);
            return parsedResume;
        }

        return null;
    } catch (err) {
        console.log(err)
        return null;
    }


}

