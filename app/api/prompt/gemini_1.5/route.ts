import answeringModel from "@/server/action/prompt";

export async function POST(req: Request) {
  try {
    // read the JSON body
    const { jobDetails , userId } = await req.json();

    // jobDetails now has your { companyName, jobDescription, jobLink }
    const answer = await answeringModel(jobDetails,userId);

    return new Response(
      JSON.stringify({ success: true, data: answer }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: (err as any).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
