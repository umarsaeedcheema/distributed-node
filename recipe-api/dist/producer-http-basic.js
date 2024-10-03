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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
const HOST = (_a = process.env.HOST) !== null && _a !== void 0 ? _a : '127.0.0.1';
const PORT = 4000;
console.log(`worker pid=${process.pid}`);
server.get('/recipes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`worker request pid=${process.pid}`);
    const id = Number((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (id !== 42) {
        res.statusCode = 404;
        return { error: 'not_found' };
    }
    return {
        producer_pid: process.pid,
        recipe: {
            id,
            name: 'Chicken Tikka Masala',
            steps: 'Throw it in a pot...',
            ingredients: [
                { id: 1, name: 'Chicken', quantity: '1 lb' },
                { id: 2, name: 'Sauce', quantity: '2 cups' },
            ],
        },
    };
}));
server.listen({ port: PORT }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${HOST}:${PORT}`);
});
