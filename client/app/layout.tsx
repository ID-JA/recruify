import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
import Script from "next/script"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import { Providers } from "./providers"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="beforeInteractive"
          />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased text-black",
            fontSans.variable
          )}
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              <Providers>{children}</Providers>
            </div>
          </div>
        </body>
      </html>
    </>
  )
}