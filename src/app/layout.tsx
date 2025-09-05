import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoVed",
  description: "Your modern web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://vk.com" />
        <link rel="dns-prefetch" href="https://vk.com" />
      </head>
      <body className="font-sans antialiased bg-white" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
