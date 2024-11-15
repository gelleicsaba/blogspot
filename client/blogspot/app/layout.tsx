import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { Link } from '@nextui-org/link'
import clsx from 'clsx'
import { Providers } from './providers'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import Header from '@/components/head'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>

          <Header />

          <div style={{ 'margin': 'auto', width: '1200px' }}>

            <div className="w-full">
              <Navbar />
            </div>
            <div className="w-full">
              <main className="container mx-auto max-w-7xl pt-10 px-6 flex-grow">
                {children}
              </main>
            </div>

          </div>
        </Providers>
      </body>
    </html>
  );
}
export default RootLayout