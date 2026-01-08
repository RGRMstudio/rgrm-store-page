import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | RGRM Registry',
  description: 'Secure Identity Registration',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white min-h-screen">
      {children}
    </section>
  );
}
