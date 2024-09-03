import { UserDropdown } from "./user-dropdown"

export function PortalNav() {
  return (
    <div className="flex h-16 items-center justify-between">
      <div>LEFT</div>
      <UserDropdown />
    </div>
  )
}
