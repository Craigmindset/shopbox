import './globals.css';

export const metadata = {
  title: 'Velvet Box',
  description: 'Luxury intimate wellness shop for men and women.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}