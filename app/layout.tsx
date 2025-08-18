import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Loading from './loading';
import CustomCursor from './components/CustomCursor';
import { Providers } from './providers';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Fluffy Bears',
  description: 'A sweet honey-drenched NFT collection',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/Images/icone.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="min-h-screen bg-background text-foreground">
        <Loading />
        <CustomCursor />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 