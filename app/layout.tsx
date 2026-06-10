import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { hospital } from "@/lib/site-data"

export const metadata = {
  title: `${hospital.name} | Rosario, Batangas`,
  description: `${hospital.legalName} is a private Level 1 general hospital on J. Magtibay St., Rosario, Batangas.`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans antialiased">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
