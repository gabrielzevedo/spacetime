import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
const app = fastify()

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server listening on port 3333')
  })
