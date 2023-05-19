import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import axios from 'axios'
import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
      device: z.string(),
    })

    const deviceTokens: Record<string, Record<string, string | undefined>> = {
      mobile: {
        client_id: process.env.GITHUB_MOBILE_CLIENT_ID,
        client_secret: process.env.GITHUB_MOBILE_CLIENT_SECRET,
      },
      web: {
        client_id: process.env.GITHUB_WEB_CLIENT_ID,
        client_secret: process.env.GITHUB_WEB_CLIENT_SECRET,
      },
    }

    const { code, device } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: deviceTokens[device]?.client_id,
          client_secret: deviceTokens[device]?.client_secret,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token: accessToken } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const userSchema = z.object({
      login: z.string(),
      id: z.number(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '7 days',
      },
    )

    return { token }
  })
}
