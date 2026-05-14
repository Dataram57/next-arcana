import { Redis } from '@upstash/redis';
import { aiAskLimitCount, aiAskLimitTime } from '../_config';

// Initialize Redis
const redis = new Redis({
    url: process.env.STORAGE_REDIS_KV_REST_API_URL!,
    token: process.env.STORAGE_REDIS_KV_REST_API_TOKEN!,
});


export async function RegisterAIQueryRequest(ip: string) : Promise<boolean> {
    //determine key
    const key = `next-arcana:api:ask:${ip}`;

    // increment request count
    const count = await redis.incr(key);

    //block if limit reached
    if(count >= aiAskLimitCount)
        return false;

    // set expiration only on first request
    if(count === 1)
        await redis.expire(key, aiAskLimitTime);

    //return result
    return true;
}