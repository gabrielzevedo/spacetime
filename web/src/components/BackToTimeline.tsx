import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BackToTimeline () {
  return (
    <Link
        href="/"
        className="inline-flex self-start items-center gap-1 text-sm text-gray-200 hover:text-gray-100 transition-colors mb-8"
      >
        <ChevronLeft className="h-5 w-5 -ml-2 block" />
        Voltar à timeline
      </Link>
  )
}