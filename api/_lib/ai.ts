
export async function AI_Ask(prompt: string): Promise<string> {
    const API_KEY = process.env.GOOGLE_AI_STUDIO_API_KEY;
    const MODEL_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

    if (!prompt) throw new Error("Prompt is required");

    // We don't use a try/catch here if we want the caller to handle the error
    const response = await fetch(`${MODEL_ENDPOINT}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`AI_API_NETWORK_ERROR: ${response.status} - ${errorData.error?.message}`);
    }

    const data = await response.json();
    const aiAnswer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Throwing if the AI filters the content or returns an empty part
    if (!aiAnswer) {
        const reason = data.promptFeedback?.blockReason || "Unknown blocking reason";
        throw new Error(`AI_RESPONSE_EMPTY: The model did not return text. Reason: ${reason}`);
    }

    return aiAnswer;
}

export function AI_escapeInput(input: string): string {
    return input
        .replace(/```/g, "\\`\\`\\`")
        .replace(/<\|/g, "")
        .replace(/\|>/g, "");
}