import fastify, { FastifyRequest, FastifyReply } from 'fastify';
const server = fastify();

const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = 4000;

console.log(`worker pid=${process.pid}`);

interface RecipeParams {
  id: string;
}

server.get(
  '/recipes/:id',
  async (req: FastifyRequest<{ Params: RecipeParams }>, res: FastifyReply) => {
    console.log(`worker request pid=${process.pid}`);
    const id = Number(req.params?.id);
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
  }
);

server.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${HOST}:${PORT}`);
});
