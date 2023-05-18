import fastify from 'fastify'

const app = fastify()

app.get('/', async () => {
  return { hello: 'world' }
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server listening on port 3333')
  })
