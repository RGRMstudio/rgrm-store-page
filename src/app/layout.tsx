import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: 'white' }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
