import { IMemoryDetails } from '@/interfaces/memory'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MemoryDetails({
  id,
  createdAt,
  coverUrl,
  excerpt,
  content,
  showFullContent = true,
}: IMemoryDetails) {
  return (
    <div key={id} className="space-y-4">
      <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>
      {!!coverUrl && (
        <Image
          src={coverUrl}
          alt=""
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
      <p className="text-lg leading-relaxed text-gray-100 break-words">{excerpt || content}</p>
      {!showFullContent ? (
        <Link
          href={`/memories/${id}`}
          className="inline-flex items-center text-sm text-gray-200 hover:text-gray-100 transition-all group"
        >
          Ler mais
          <ArrowRight className="h-4 w-4 ml-2 group-hover:ml-3 transition-all" />
        </Link>
      ) : null}
    </div>
  )
}
