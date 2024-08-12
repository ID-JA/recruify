import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gray-50/80">
      <div className="sticky -top-16 z-20 border-b border-gray-200 bg-white">
        HI HELLO
      </div>
      {children}
    </div>
  )
}
