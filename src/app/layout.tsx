import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'CaseWithAI — The smarter way to ace your consulting interview',
  description: 'AI-powered case interview prep. Mock interviews, targeted drills, and expert courses built by ex-McKinsey consultants.',
  keywords: 'case interview, consulting interview prep, McKinsey, BCG, Bain, AI mock interview',
  openGraph: {
    title: 'CaseWithAI',
    description: 'The smarter way to ace your consulting interview.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
