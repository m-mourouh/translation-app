import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "@/redux/provider";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Translation',
  description: 'Translation APP created with nextJS 13 By Mohamed Mourouh',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + "w-full overflow-x-hidden bg-dotted "}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
