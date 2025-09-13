"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaClient = void 0;
var openai_1 = require("openai");
var vscode = require("vscode");
var OllamaClient = /** @class */ (function () {
    function OllamaClient(baseUrl) {
        if (baseUrl === void 0) { baseUrl = "http://localhost:11434/v1"; }
        this.currentModel = null;
        this.baseUrl = baseUrl;
        this.openai = new openai_1.default({
            baseURL: baseUrl,
            apiKey: 'ollama',
        });
    }
    OllamaClient.prototype.selectModel = function (model) {
        this.currentModel = model;
    };
    OllamaClient.prototype.listModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var respond, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.baseUrl, "/api/tags"))];
                    case 1:
                        respond = _a.sent();
                        return [4 /*yield*/, respond.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.model];
                }
            });
        });
    };
    OllamaClient.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var completion, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.currentModel === null) {
                            throw new Error('No model is selected, please select a model before contuining');
                        }
                        return [4 /*yield*/, this.openai.chat.completions.create({
                                model: this.currentModel,
                                messages: [{ role: 'user', content: "".concat(message.code.before, "<Fill in the code>").concat(message.code.after) }]
                            })];
                    case 1:
                        completion = _a.sent();
                        if (completion === null || completion === void 0 ? void 0 : completion.choices) {
                            return [2 /*return*/, []];
                        }
                        content = completion === null || completion === void 0 ? void 0 : completion.choices.map(function (c) {
                            var _a;
                            return new vscode.InlineCompletionItem((_a = c.message.content) !== null && _a !== void 0 ? _a : "");
                        });
                        return [2 /*return*/, content];
                }
            });
        });
    };
    return OllamaClient;
}());
exports.OllamaClient = OllamaClient;
