import './globals.css';

export const metadata = {
  title: 'Wide-Eleven Co., Ltd. | Premium Renovation & Interior Design Bangkok',
  description: 'Premium interior design, construction and renovation services across Bangkok since 2014. Trusted by Park Hyatt, Rosewood and 400+ projects.',
  keywords: 'interior design, renovation, construction, Bangkok, Wide-Eleven, hotel renovation, commercial fit-out',
  openGraph: {
    title: 'Wide-Eleven Co., Ltd.',
    description: 'Premium interior design & construction since 2014',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
