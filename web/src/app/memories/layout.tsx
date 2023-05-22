import BackToTimeline from "@/components/BackToTimeline";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <BackToTimeline />
      {children}
    </div>
  )
}