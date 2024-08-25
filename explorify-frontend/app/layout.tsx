"use client";

import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { Ubuntu_Mono } from "next/font/google";
import Header from "./components/shared/Header";

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify the font weights you need
  variable: "--font-ubuntu-mono", // Optional: define a CSS variable for the font
});

// export const metadata: Metadata = {
//   title: "Explorify Music",
//   description: "Discover the world of Spotify",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={ubuntuMono.className}>
        <Provider store={store}>
          <Header />
          <main className='p-4'>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
