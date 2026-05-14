

export async function AI_Ask(prompt : string) : Promise<string>{
    //only google right now
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

    //get data
    const data = await response.json();
    const aiAnswer : string = data.candidates?.[0]?.content?.parts?.[0].text as string;
    return aiAnswer;
}