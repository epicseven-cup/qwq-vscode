"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ollamaClient_1 = require("./src/clients/ollamaClient");
const client = new ollamaClient_1.OllamaClient();
console.log("Hello world");
console.log(client.listModel());
//# sourceMappingURL=main.js.map