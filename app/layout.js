import './globals.css';

export const metadata = {
  title: 'SHOPBOX - Everything in a Box',
  description: 'Your one stop for all your sexy toys and pleasure imagination.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}