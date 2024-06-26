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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.generateGemini = exports.historyManager = void 0;
exports.toString = toString;
var util = require("util");
//function for converting any object or number to string
function toString(value) {
    return value.toString();
}
exports.historyManager = {
    history: [],
    add: function (role, texti) {
        try {
            this.history.push({
                role: role,
                parts: [
                    {
                        text: (typeof texti === "string") ? texti : JSON.stringify(texti)
                    }
                ]
            });
            console.log("[historyManager] Added to history: " + role);
            console.log(util.inspect(this.history[this.history.length - 1], { showHidden: false, depth: null }));
        }
        catch (e) {
            console.log("[historyManager] Error adding to history: (text must be json serializable) ", e);
            this.history.push({
                role: role,
                parts: [
                    {
                        text: "ERROR IN JSON"
                    }
                ]
            });
        }
    },
    clear: function () {
        this.history = [];
    }
};
var generateGemini = function (history) { return __awaiter(void 0, void 0, void 0, function () {
    var apires, apikey, response, reader, decoder, buffer, _a, done, value, valueStr, data, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                return [4 /*yield*/, fetch("https://x.mobin.workers.dev/api/key", {
                        mode: 'no-cors' // Add this line to disable CORS enforcement
                    })];
            case 1:
                apires = _c.sent();
                return [4 /*yield*/, apires.json()];
            case 2:
                apikey = (_c.sent()).apikey;
                return [4 /*yield*/, fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=".concat(apikey), {
                        method: 'POST',
                        mode: "no-cors",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            // "contents": history.map((item) => {
                            //     return {
                            //         "role": item.role,
                            //         "parts": item.parts.map((part) => {
                            //             return {
                            //                 "text": part.text
                            //             }
                            //         })
                            //     }
                            // }),
                            "contents": history,
                            "safetySettings": [
                                {
                                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                                    "threshold": "BLOCK_ONLY_HIGH"
                                }
                            ],
                            "generationConfig": {
                                "temperature": 1,
                                "top_p": 0.95,
                                "top_k": 64,
                                "max_output_tokens": 8192,
                                "response_mime_type": "application/json",
                            }
                        })
                    })];
            case 3:
                response = _c.sent();
                reader = (_b = response === null || response === void 0 ? void 0 : response.body) === null || _b === void 0 ? void 0 : _b.getReader();
                decoder = new TextDecoder('utf-8');
                buffer = '';
                _c.label = 4;
            case 4:
                if (!true) return [3 /*break*/, 6];
                return [4 /*yield*/, reader.read()];
            case 5:
                _a = _c.sent(), done = _a.done, value = _a.value;
                if (done)
                    return [3 /*break*/, 6];
                valueStr = decoder.decode(value, { stream: true });
                buffer += valueStr;
                console.log(valueStr);
                return [3 /*break*/, 4];
            case 6:
                data = null;
                try {
                    data = JSON.parse(buffer);
                    // Now you can work with 'data' as a JavaScript object
                }
                catch (error) {
                    console.error("Error parsing JSON from buffer:", error);
                }
                // console.log("[callGemini] Data: ");
                // console.lPriyanshu Kistalekar. og(util.inspect(data, { showHidden: false, depth: null }));
                if (data === null || data === void 0 ? void 0 : data.candidates) {
                    return [2 /*return*/, (JSON.parse(data.candidates[0].content.parts[0].text))];
                }
                return [2 /*return*/, "ERROR"];
            case 7:
                error_1 = _c.sent();
                console.error(error_1);
                return [2 /*return*/, "ERROR"];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.generateGemini = generateGemini;
