import type { Metadata } from "next";
import Footer from "../components/Footer";
import "./globals.css";

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
      <body className="bg-black text-white font-mono">
        {children}
        <Footer />
      </body>
    </html>
  );
}
