"use client";
import { useState } from "react";
import InputField from "./ui/InputField";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import { useChainId, useConfig, useAccount } from "wagmi";
import { readContract } from "@wagmi/core";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();

  async function getApprovedAmount(
    tSenderAddress: string | null
  ): Promise<number> {
    if (!tSenderAddress) {
      alert("TSender address not found, please use a supported chain");
      return 0;
    }
    // read from the chain to see if we have approved enough tokens
    // allowance
    const allowanceAmount = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });
    // token.allowance(account,tsender)
    return allowanceAmount as number;
  }

  async function handleSubmit() {
    // 1. Approve our tsender contract to send our tokens
    // 1a. If already approve, moved to step 2
    // 2. Call the airdrop function on the tsender contract
    // 3. Wait for the transaction to be mined

    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approveAmount = await getApprovedAmount(tSenderAddress);
    console.log("approveAmount:", approveAmount);
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
        Token Airdrop
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="tokenAddress"
          label="Token Address"
          value={tokenAddress}
          onChange={setTokenAddress}
          placeholder="0x..."
          required
        />

        <InputField
          id="recipients"
          label="Recipients (one address per line or separated by commas)"
          type="textarea"
          value={recipients}
          onChange={setRecipients}
          placeholder={`0xa23...\n0x4f6...\n0x7g9...`}
          rows={6}
          required
        />

        <InputField
          id="amounts"
          label="Amounts (one amount per line or separated by comas, in wei)"
          type="textarea"
          value={amounts}
          onChange={setAmounts}
          placeholder={`1000000000000000000 \n2000000000000000000\n3000000000000000000`}
          rows={6}
          required
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 font-semibold tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-cyan-500/20 hover:border-cyan-400/40"
        >
          Execute Airdrop
        </button>
      </form>
    </div>
  );
}
