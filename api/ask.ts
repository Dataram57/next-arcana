import { applyCors } from "./_lib/cors.js";


export default async function handler(req: any, res: any) {
    //================================
    // CORS headers
    if (applyCors(req, res)) return;
    //================================
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': `${process.env.GOOGLE_AI_STUDIO_API_KEY}`,
        },
        body: JSON.stringify({
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        })
    });

    const data = await response.json();

    res.status(200).json({
        answer: data.candidates?.[0]?.content?.parts?.[0].text ?? null
    });
}