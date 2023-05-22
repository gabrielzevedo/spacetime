import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import MemoryDetails from '@/components/MemoryDetails'
import { IMemory } from '@/interfaces/memory'
import { getToken, isAuthenticated, LogIn } from '@/lib/auth'

dayjs.locale(ptBR)

export default async function Home() {
  // await LogIn()
  const isLogged = await isAuthenticated()

  if (!isLogged) {
    return <EmptyMemories />
  }

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    }
  })

  const memories: IMemory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <MemoryDetails key={memory.id} {...memory} showFullContent={false} />
        )
      })}
    </div>
  )
}
