import type { Metadata } from "next";

import "./globals.css";
import { type ReactNode } from "react";
import { Providers } from "./providers";
import Header from "@/components/Header";
export const metadata: Metadata = {
  title: "TSender",
  description: "Airdrop-like app for sending ERC20 tokens",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
