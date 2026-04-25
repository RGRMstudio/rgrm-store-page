import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RaGuiRoMo | Industrial Art Machine",
  description: "Structural Studies by RaGuiRoMo Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: 'black', color: 'white', fontFamily: 'monospace', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
