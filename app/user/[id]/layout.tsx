
import { Toaster } from "sonner"
import { SWRConfig } from "swr"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}
        >

                <main className="flex-1 p-8">{children}</main>
        </SWRConfig>
        <Toaster />
      </body>
    </html>
  )
}

