import './globals.css';

import { Roboto } from 'next/font/google';
import { ParallaxProvider } from 'react-scroll-parallax';

import Footer from './components/Footer';
import Nav from './components/Nav';

import type { Metadata } from 'next'
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
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_API}/data.json`,
      { cache: 'no-store' }
    )
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }

  const data = await getData();

  return (
    // <html lang="en" data-theme="dark">
    // <ParallaxProvider>
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
    // </ParallaxProvider>
  )
}
