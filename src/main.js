"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ollamaClient_1 = require("./clients/ollamaClient");
var client = new ollamaClient_1.OllamaClient();
console.log("Hello world");
console.log(client.listModel());
