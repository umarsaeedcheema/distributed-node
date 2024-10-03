var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import fastify from 'fastify';
import fetch from 'node-fetch';
const HOST = (_a = process.env.HOST) !== null && _a !== void 0 ? _a : '127.0.0.1';
const PORT = 3000;
const TARGET = process.env.TARGET || 'localhost:4000';
const server = fastify();
server.get('/', () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield fetch(`http://${TARGET}/recipes/42`);
    const producer_data = yield req.json();
    return {
        consumer_pid: process.pid,
        producer_data,
    };
}));
server.listen({ port: PORT }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Consumer running at ${HOST}:${PORT}`);
});
