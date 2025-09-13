import * as vscode from 'vscode';

export type Message = {
    filename: string
    code: Code
}

export type Code = {
    before: string
    after: string
}


export interface Client {
    send(message: Message, position: vscode.Position): Promise<vscode.InlineCompletionItem[]>
}