import BackToTimeline from '@/components/BackToTimeline'
import MemoryDetails from '@/components/MemoryDetails'
import { IMemory } from '@/interfaces/memory'
import { api } from '@/lib/api'
import { getToken } from '@/lib/auth'

export default async function Memory({ params: { uuid } }: { params: { uuid: string } }) {
  try {
    const response = await api.get(`/memories/${uuid}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      }
    })
    const memory: IMemory = response.data
    return <MemoryDetails {...memory} />
  } catch (error) {
    return (
      <p>Não foi possível obter essa memória.</p>
    )
  }
}
