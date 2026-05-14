import { AI_Ask } from "./_lib/ai.js";
import { applyCors, getClientIp } from "./_lib/cors.js";
import { RegisterAIQueryRequest } from "./_lib/db.js";


export default async function handler(req: any, res: any) {
    //================================
    // CORS headers
    if (applyCors(req, res)) return;
    //================================
    
    //only post
    if(req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    //check if client can ask
    if(!(await RegisterAIQueryRequest(getClientIp(req))))
        return res.status(405).json({ error: 'Client reached limit of queries' });

    //query
    try{
        //query
        const answer : string = await AI_Ask(req.body);
        //return answer
        return res.status(200).json({
            answer: answer
        });
    }
    catch(e : any){
        //log error
        console.error(e);
        //return error
        return res.status(500).json({ error: 'AI error' });
    }
}