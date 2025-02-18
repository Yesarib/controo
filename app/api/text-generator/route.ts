import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { user_input } = await req.json();

        const response = await fetch(
            "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: `You are a content creator known for crafting engaging, authentic, and high-quality promotional content. Your task is to generate a compelling and natural-sounding social media post that highlights the product’s features while making it feel like a genuine recommendation rather than an advertisement. 

                    - Use a conversational and relatable tone.  
                    - Incorporate storytelling elements, personal experiences, or playful engagement to capture the audience’s attention.  
                    - If applicable, include a call to action that encourages interaction without sounding forced.  

                    Now, based on the following user request, generate a **fully written** social media post rather than just giving tips:  

                    User request: "${user_input}"`
                }),
            }
        );

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let result = '';

        // Read the response stream
        while (!done) {
            if (!reader) break;
            const { value, done: doneReading } = await reader.read();
            result += decoder.decode(value, { stream: !doneReading });
            done = doneReading;
        }

        // After reading the stream, you can parse the result
        const data = JSON.parse(result);
        console.log(data);


        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'AI servisine bağlanırken hata oluştu.' }, { status: 500 });
    }
}