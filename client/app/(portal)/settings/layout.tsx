import { ContentLayout } from "@/components/layout/content-layout"
import { SideNavigation } from "@/components/settings/side-navigation"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContentLayout title="Settings">
      <div className="flex items-start gap-8">
        <div className="top-[89px] hidden lg:sticky lg:block">
          <SideNavigation />
        </div>
        <div className="flex-1 rounded-md border border-gray-200 bg-white p-8">
          {children}
        </div>
      </div>
    </ContentLayout>
  )
}
