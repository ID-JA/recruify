import { ReactNode } from "react"

export default function Layout({
  children,
  onboarding,
}: {
  children: ReactNode
  onboarding: ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-gray-50/80 text-black">
      <div className="sticky -top-16 z-20 border-b border-gray-200 bg-white">
        Portal Layout
      </div>
      {children}
      {onboarding}
    </div>
  )
}
