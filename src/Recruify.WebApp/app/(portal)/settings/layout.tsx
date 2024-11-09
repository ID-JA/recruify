import {
  SettingsNavMobile,
  SideNavigation,
} from "@/components/settings/side-navigation"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-8 lg:flex-row">
      <div className="top-[89px] hidden lg:sticky lg:block">
        <SideNavigation />
      </div>
      <div className="w-full lg:hidden">
        <SettingsNavMobile />
      </div>
      <div className="w-full flex-1 rounded-md border border-gray-200 bg-white p-8">
        {children}
      </div>
    </div>
  )
}
