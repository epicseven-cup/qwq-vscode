import * as vscode from 'vscode';
import { Client, Message } from './client'
import winston from 'winston';
import ollama, { Ollama } from 'ollama';


type Model = {
    "name": string,
    "modified_at": string,
    "size": number,
    "digest": string,
    "details": {
        "format": string,
        "family": string,
        "families": null,
        "parameter_size": string,
        "quantization_level": string
    }
}


type ModelListResponse = {
    models: Model[]
}


class OllamaClient {
    private client;
    private currentModel: string | null = null;
    private baseUrl;
    private logger;
    constructor(baseUrl: string = "http://localhost:11434") {
        this.baseUrl = baseUrl;
        this.client = new Ollama({ host: baseUrl });
        const logpath = `${process.env['HOME']}/qwq-vscode/log`
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.File({ filename: `${logpath}/error.log`, level: 'error' }),
                new winston.transports.File({ filename: `${logpath}/combined.log` }),
            ],
        });
    }

    selectModel(model: string) {
        this.currentModel = model;
    }

    async listModel(): Promise<Model[]> {

        // This needs to throw some error
        const respond: Response = await fetch(`${this.baseUrl}/api/tags`);
        const data: ModelListResponse = await respond.json() as ModelListResponse;
        return data.models;
    }


    async send(message: Message, position: vscode.Position, token: { isCancellationRequested: any; } ): Promise<vscode.InlineCompletionItem[]> {
        if (this.currentModel === null) {
            this.logger.error('No model is selected, please select a model before contuining');
            throw new Error('No model is selected, please select a model before contuining');
        }
        this.logger.info(this.currentModel);
        const respond = await this.client.generate({
            model: this.currentModel,
            prompt: `Fill out the code missing\n${message.code.before}<fill out the code>${message.code.after}`
        });

        const complete: vscode.InlineCompletionItem = {
            insertText: respond.response,
            range: new vscode.Range(position, position)
        };


        return [complete];
    }
}


export { OllamaClient, Model };