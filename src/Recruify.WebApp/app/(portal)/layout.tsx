import { ReactNode } from "react"

import AdminPanelLayout from "@/components/layout/admin-panel-layout"

export default function Layout({
  children,
  onboarding,
}: {
  children: ReactNode
  onboarding: ReactNode
}) {
  return (
    <>
      <AdminPanelLayout>{children}</AdminPanelLayout>
      {onboarding}
    </>
  )
}
