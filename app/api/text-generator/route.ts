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
                    inputs: `A content creator is sharing a fun and engaging sponsored post about sunglasses with their followers. The post should feel natural, personal, and conversational—like a genuine recommendation rather than a direct advertisement. It should reflect the creator’s excitement about the partnership and their own experience with the product. Encourage engagement by asking followers a question, sharing a personal anecdote, or inviting them to interact (e.g., tagging a friend or commenting). If a discount code is included, mention it in a casual and inviting way. Use an upbeat and engaging tone, making the post feel authentic and not overly sales-focused. Now, generate a compelling social media post based on the following user input: ${user_input}.`
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
        // console.log(data);


        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'AI servisine bağlanırken hata oluştu.' }, { status: 500 });
    }
}
