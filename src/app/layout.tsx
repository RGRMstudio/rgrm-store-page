import type { Metadata } from "next";
import NavbarWrapper from "@/components/client/NavbarWrapper";
import FooterWrapper from "@/components/client/FooterWrapper";
import "./globals.css";

export const meta Metadata = {
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
        <NavbarWrapper />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
