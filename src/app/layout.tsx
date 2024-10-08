// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Text2Lip',
  description: 'Cooperative Education Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {/* Add Suspense boundary here */}
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
