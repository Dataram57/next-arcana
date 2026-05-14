interface AskResponse {
    answer: string;
}

export async function API_Ask(tarotReading: string, context: string): Promise<string> {
    const res = await fetch('https://next-arcana.vercel.app/api/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            prompt: context
        }),
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data: AskResponse = await res.json();
    return data.answer;
}