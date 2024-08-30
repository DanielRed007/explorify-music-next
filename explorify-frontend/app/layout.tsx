"use client";

import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { Ubuntu_Mono } from "next/font/google";
import Header from "./components/shared/Header";

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={ubuntuMono.className}>
        <Provider store={store}>
          <main className=''>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
