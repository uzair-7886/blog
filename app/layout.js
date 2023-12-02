import { Lora } from 'next/font/google'
import './globals.css'
import Provider from './components/Provider'
import ThemeSwitcher from './components/ThemeSwitcher'
import { ModeContextProvider } from './context/mode.context'



const inter = Lora({ subsets: ['latin'] })



export const metadata = {
  title: "Uzair's Blog",
  description: 'Explore a variety of thought-provoking topics including technology, social affairs, and more on this captivating blog. Gain insights into the world around us as we embark on a journey of discovery together. Join us for engaging discussions and expand your understanding of the ever-changing landscape.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        
      <body className={`${inter.className} max-w-5xl mx-auto text-justify`}>
        <ThemeSwitcher />
        <ModeContextProvider>
        {children}
        </ModeContextProvider>
        </body>
        </Provider>
    </html>
  )
}
