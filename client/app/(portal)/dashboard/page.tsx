import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentLayout } from "@/components/layout/content-layout"

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <div>Members</div>
        </TabsContent>
        <TabsContent value="invitations">
          <div>Invitations</div>
        </TabsContent>
      </Tabs>
    </ContentLayout>
  )
}
