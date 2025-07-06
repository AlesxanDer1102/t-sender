"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import config from "@/rainbowKitConfig";
export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>{props.children}</RainbowKitProvider>
    </WagmiProvider>
  );
}
