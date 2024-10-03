import fastify from 'fastify';
import fetch from 'node-fetch';

const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = 3000;
const TARGET = process.env.TARGET || 'localhost:4000';

const server = fastify();
server.get('/', async () => {
  const req = await fetch(`http://${TARGET}/recipes/42`);
  const producer_data = await req.json();

  return {
    consumer_pid: process.pid,
    producer_data,
  };
});

server.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Consumer running at ${HOST}:${PORT}`);
});
