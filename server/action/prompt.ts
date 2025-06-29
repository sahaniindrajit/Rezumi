"use server"
import fetch from "node-fetch";
import { buildPrompt } from "./build-propt";
import { userDetails } from "@/lib/user-data";

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI;



export default async function answeringModel() {

    try {
        console.log("key", GEMINI_API_KEY)

        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userDataPrompt = buildPrompt(userDetails)


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
        console.log(result);

        return { success: true, answer: result }
    } catch (err) {
        console.log(err)
        return { success: false, answer: null }
    }


}

