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

    //check response status
    if (!res.ok) {
        let err : string = `API has failed to describe error.`;
        try{
            const obj = await res.json();
            if(typeof obj.error == 'string')
                err = obj.error;
        }
        catch(e){}
        throw new Error(err);
    }

    //check response format
    try{
        const data : AskResponse = await res.json();
        if(typeof data.answer != 'string')
            throw null;

        //return
        return data.answer;
    }
    catch(error){
        throw new Error("API has failed to answer in proper format");
    }
}