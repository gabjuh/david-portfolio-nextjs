import './globals.css';

import { Roboto } from 'next/font/google';

import Footer from './components/Footer';
import Nav from './components/Nav';
import { Providers } from './providers';

import type { Metadata } from 'next';
const inter = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Dávid Budai - Portfolio',
  description: 'NextJS Typescript Project by Gábor Juhász',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  async function getData() {
    const startTime = Date.now();
    console.log('Starting API fetch...');

    try {
      const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_API}/data.json`,
        {
          cache: 'no-store',
          next: { revalidate: 0 },
          signal: AbortSignal.timeout(30000) // 30 second timeout
        }
      )

      const duration = Date.now() - startTime;
      console.log(`API fetch completed in ${duration}ms`);

      if (!res.ok) {
        console.error(`API responded with status: ${res.status}`);
        throw new Error(`Failed to fetch data: ${res.status}`)
      }
      return res.json()
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Return fallback data if API fails
      return {
        menuItems: [],
        settings: [{
          siteName: 'Dávid Budai Portfolio',
          homepageTitle: 'Dávid Budai',
          email: 'info@davidbudai.com',
          emailTooltipTextDe: 'E-Mail senden',
          copyright: '© 2024 Dávid Budai'
        }],
        timeStamp: new Date().toISOString()
      };
    }
  }

  const data = await getData();

  return (
    // <html lang="en" data-theme="dark">
    // <ParallaxProvider>
    <Providers>
      <html lang="de" data-theme="corporate" className="hyphens-auto">
        <body className={`${inter.className} min-h-[100vh] relative pb-[112px]`}>
          <Nav data={[
            data.menuItems,
            data.settings
          ]} />
          {children}
          <Footer data={data.settings} timeStamp={data.timeStamp} />
        </body>
      </html>
    </Providers>
    // </ParallaxProvider>
  )
}
