import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "物料管理系统 - MMS",
  description: "电子零件物料管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`antialiased w-screen h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
