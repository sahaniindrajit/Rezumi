import answeringModel from "@/server/action/prompt"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const POST = async (res: Response) => {

    try {
        const answer = await answeringModel();


        return new Response(JSON.stringify({ answer }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}