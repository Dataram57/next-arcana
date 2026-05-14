import { Redis } from '@upstash/redis';

// Initialize Redis
const redis = new Redis({
    url: process.env.STORAGE_REDIS_KV_REST_API_URL!,
    token: process.env.STORAGE_REDIS_KV_REST_API_TOKEN!,
});


export async function RegisterAIQueryRequest(ip: string, updateExpiryTime : number = 60 * 60 * 24) : Promise<number> {
    //determine key
    const key = `rate:${ip}`;

    // increment request count
    const count = await redis.incr(key);

    // set expiration only on first request
    if(count === 1)
        await redis.expire(key, updateExpiryTime);

    //return result
    return count;
}