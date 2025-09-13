// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { OllamaClient } from './clients/ollamaClient';
import { Message } from './clients/client';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	console.log('boot')
	console.log(process.cwd());
	const client = new OllamaClient();
	client.selectModel("llama3.2:1b");

	console.log('Congratulations, your extension "qwq-vscode" is now active!');

	const disposable = vscode.commands.registerCommand('qwq-vscode.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from qwq!');
	});


	vscode.languages.registerInlineCompletionItemProvider(
		{ pattern: "**" },
		{
			provideInlineCompletionItems: async (document, position, context, token) => {
				const msg: Message = {
					filename: document.fileName,
					code: {
						before: document.getText(new vscode.Range(new vscode.Position(0, 0), position)),
						after: document.getText(
							new vscode.Range(
								position,
								document.lineAt(document.lineCount - 1).range.end
							)
						)
					}
				};
				if(token.isCancellationRequested){
					console.log("Took too long 1");
					return [new vscode.InlineCompletionItem("Too long")];
				}

				const v = await client.send(msg, position, token); 

				if(token.isCancellationRequested){
					console.log("Took too long2");
					return [new vscode.InlineCompletionItem("Too long")];
				}
				console.log(v);
				if(token.isCancellationRequested){
					console.log("Took too long3");
					return [new vscode.InlineCompletionItem("Too long")];
				}
				return v;
				// return [new vscode.InlineCompletionItem("hello world")];
			},
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
