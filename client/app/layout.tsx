import "./globals.css"
import { Inter, Poppins, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const poppins = Poppins({ weight: ['400', '600'], subsets: ["latin"], variable: '--font-poppins' })
const roboto = Roboto({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-roboto' })

export const metadata = {
  title: "Fitness & Diet Tracker",
  description: "Track your fitness and diet progress",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${roboto.variable} font-sans bg-blue-900 text-white`}>
        {children}
      </body>
    </html>
  )
}

