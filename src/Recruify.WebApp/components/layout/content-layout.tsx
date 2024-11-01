import { ScrollArea } from "../ui/scroll-area"
import { Navbar } from "./navbar"

interface ContentLayoutProps {
  title: string
  children: React.ReactNode
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="container px-2 pb-8 pt-8 sm:px-4">{children}</div>
    </div>
  )
}
