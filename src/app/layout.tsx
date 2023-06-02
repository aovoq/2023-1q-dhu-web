import './globals.css'
import { Satoshi, TTCommons } from '../util/font'

export const metadata = {
  title: 'DHU - WebDesign / WebDevelopment',
  description: 'Learning at DHU',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${Satoshi.variable} ${TTCommons.variable}`} lang="ja">
      <body>{children}</body>
    </html>
  )
}

