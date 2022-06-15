import fastify from 'fastify';
import { apiRoutes } from './http/routes/api';

const server = fastify({ logger: true });

export function runServer(): Promise<void> {
  return Promise.resolve(console.log('my server will start running there !'));
}

// Require the framework and instantiate it
// const fastify = require('fastify')({ logger: true });

// Declare a route in apiRoute !!

// Run the server!
const start = async () => {
  try {
    server.register(apiRoutes, { prefix: '/api' });
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
