import { Redis } from '@upstash/redis';
import { applyCors } from './_lib/cors';

// Initialize Redis
const redis = new Redis({
    url: process.env.STORAGE_REDIS_KV_REST_API_URL!,
    token: process.env.STORAGE_REDIS_KV_REST_API_TOKEN!,
});


export async function registerAIQueryRequest(ip: string, updateExpiryTime : number = 60 * 60 * 24) : Promise<number> {
    const key = `rate:${ip}`;

    // increment request count
    const count = await redis.incr(key);

    // set expiration only on first request
    if (count === 1) {
        await redis.expire(key, updateExpiryTime); // 24h
    }

    // true = allowed
    // false = blocked
    return count;
}

export default async function handler(req: any, res: any) {
    //================================
    // CORS headers
    if (applyCors(req, res)) return;
    //================================
    // Fetch data from Redis
    const queryCount = await registerAIQueryRequest("test2", 30);
    console.log(queryCount);


    res.status(200).json({
        result: queryCount.toString()
    });
};