import './globals.css';

export const metadata = {
  title: 'RGRM Boutique',
  description: 'Bauhaus Minimalist Registry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* If this variable is missing, the screen is white */}
        {children}
      </body>
    </html>
  );
}
