import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Krishna Thirumalai | Software Engineer',
  description: 'Personal portfolio of Krishna Thirumalai, a software engineering student specializing in full-stack development, robotics, and innovative technologies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="text-white">
        {/* Fixed gradient background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 -z-10" />
        
        {/* Background overlay for additional depth */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[1px] -z-10" />
        
        {/* Main content wrapper */}
        <div className="min-h-screen flex flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}