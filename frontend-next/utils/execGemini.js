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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execGemini = void 0;
var generative_ai_1 = require("@google/generative-ai");
var callGemini_1 = require("./callGemini");
var history = callGemini_1.historyManager;
var execGemini = /** @class */ (function () {
    function execGemini(history) {
        this.history = history;
    }
    execGemini.prototype.exec = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var apikey, genAI, model, chat, msg, result, text, _c, _d, _e, chunk, chunkText, e_1_1;
            var _f, e_1, _g, _h;
            var msgx = _b.msgx;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        apikey = "AIzaSyDuLm-355pBvS3wgtHGG2Rv0zYICHjRgsM";
                        genAI = new generative_ai_1.GoogleGenerativeAI(apikey);
                        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                        chat = model.startChat({
                            history: this.history.history,
                            generationConfig: {},
                        });
                        msg = "How many paws are in my house?";
                        return [4 /*yield*/, chat.sendMessageStream(msgx)];
                    case 1:
                        result = _j.sent();
                        text = '';
                        _j.label = 2;
                    case 2:
                        _j.trys.push([2, 7, 8, 13]);
                        _c = true, _d = __asyncValues(result.stream);
                        _j.label = 3;
                    case 3: return [4 /*yield*/, _d.next()];
                    case 4:
                        if (!(_e = _j.sent(), _f = _e.done, !_f)) return [3 /*break*/, 6];
                        _h = _e.value;
                        _c = false;
                        chunk = _h;
                        chunkText = chunk.text();
                        console.log(chunkText);
                        text += chunkText;
                        _j.label = 5;
                    case 5:
                        _c = true;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _j.trys.push([8, , 11, 12]);
                        if (!(!_c && !_f && (_g = _d.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _g.call(_d)];
                    case 9:
                        _j.sent();
                        _j.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    return execGemini;
}());
exports.execGemini = execGemini;
//dummy data
history.add("user", "hi, what is your name?");
history.add("model", "I am doreamon");
history.add("user", "what is your favorite color?");
history.add("model", "I like blue");
history.add("user", "what is your favorite food?");
history.add("model", "I like doracakes");
var gemini = new execGemini(history);
gemini.exec({ msgx: "what is your favorite friend?" });
