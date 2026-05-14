import { apiURL } from "./config";

interface AskResponse {
    answer: string;
}

export async function API_Ask(
    presentReading: string,
    futureReading: string,
    context: string
): Promise<string> {
    const res = await fetch(apiURL + '/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            presentReading: presentReading,
            futureReading: futureReading,
            context: context
        }),
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data: AskResponse = await res.json();
    return data.answer;
}