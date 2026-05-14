import { applyCors, getClientIp } from './_lib/cors';
import { RegisterAIQueryRequest } from './_lib/db';

export default async function handler(req: any, res: any) {
    //================================
    // CORS headers
    if (applyCors(req, res)) return;
    //================================
    // Fetch data from Redis
    //const queryCount = await RegisterAIQueryRequest("test2", 30);
    //console.log(queryCount);

    console.log(req.headers)

    res.status(200).json({
        result: getClientIp(req)
    });
};