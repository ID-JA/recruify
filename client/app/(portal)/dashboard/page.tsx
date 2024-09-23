"use client"

import { useStore } from "@/hooks/use-store"
import { useUserInfoStore } from "@/hooks/use-user-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentLayout } from "@/components/layout/content-layout"

export default function DashboardPage() {
  const data = useStore(useUserInfoStore, (state) => state.data)
  return (
    <ContentLayout title="Dashboard">
      <code lang="json">{JSON.stringify(data)}</code>
    </ContentLayout>
  )
}
