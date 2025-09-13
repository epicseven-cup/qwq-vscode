import Anthropic from "@anthropic-ai/sdk";
import { Client, Message } from "./client";

export class AnthropicClient{
    client: Anthropic;

    constructor(api_key: string) {
        this.client = new Anthropic();
    }


    async send(message: Message): Promise<string> {

        // Streaming but need to pass by reference
        let suggestion: string = "";
        const response = await this.client.messages.stream({
            model: "claude-opus-4-1-20250805",
            max_tokens: 1024,
            system: [
                {
                    type: "text",
                    text: "As a helpful and experienced developer, please finish the code. You should only give the code and no other converstaion\n",
                },
            ],
            messages: [
                {
                    role: "user",
                    content: `filename: ${message.filename}\ncode: ${message.code}\n`
                }
            ]
        }).on('text', (text) => {
            suggestion += text;
        });

        return suggestion;
    }

}