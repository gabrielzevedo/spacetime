export interface IMemory {
  id: string
  createdAt: string
  coverUrl: string
  excerpt: string
  content: string
}

export interface IMemoryDetails extends IMemory {
  showFullContent?: boolean
}
