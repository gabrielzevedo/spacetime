import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request, reply) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const maxCharacters = 115

    const memoriesWithExcerpt = memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt:
          memory.content.length > maxCharacters
            ? memory.content.substring(0, maxCharacters).concat('...')
            : memory.content,
      }
    })

    reply.send(memoriesWithExcerpt)
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send({
        message: 'Unauthorized',
      })
    }

    reply.send(memory)
  })

  app.post('/memories/:id', async (request, reply) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      },
    })

    reply.send(memory)
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id_userId: {
          id,
          userId: request.user.sub,
        },
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    if (!memory) {
      return reply.status(401).send({
        message: 'Unauthorized',
      })
    }

    return reply.send(memory)
  })

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const deletedMemory = await prisma.memory.delete({
      where: {
        id_userId: {
          id,
          userId: request.user.sub,
        },
      },
    })

    if (!deletedMemory) {
      return reply.status(401).send({
        message: 'Unauthorized',
      })
    }
  })
}
