import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


/* When a user creates a new prompt, the request goes through an API route (/api/prompt/new), 
   which then talks to MongoDB 
*/

export const POST = async (req) =>{
    const {userId,prompt,tag} = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag,
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201})
    }catch(error){
        return new Response("Failed to creat new Prompt",{status:500})

    }
}

