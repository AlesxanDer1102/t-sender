"use client";
import { useEffect, useMemo, useState } from "react";
import InputField from "./ui/InputField";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { readContract,waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils/calculatetTotal/calculateTotal";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('airdrop_tokenAddress') || "";
    }
    return "";
  });
  const [recipients, setRecipients] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('airdrop_recipients') || "";
    }
    return "";
  });
  const [amounts, setAmounts] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('airdrop_amounts') || "";
    }
    return "";
  });
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(0); // Default to 18 decimals
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();

  const total=useMemo(()=> calculateTotal(amounts), [amounts])
  const {data:hash, isPending,writeContractAsync}= useWriteContract()

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('airdrop_tokenAddress', tokenAddress);
    }
  }, [tokenAddress]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('airdrop_recipients', recipients);
    }
  }, [recipients]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('airdrop_amounts', amounts);
    }
  }, [amounts]);

useEffect(() => {
  if (!tokenAddress || tokenAddress.length !== 42 || !tokenAddress.startsWith('0x') || !/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)) {
    setTokenName("");
    setTokenSymbol("");
    setTokenDecimals(0);
    return;
  }

  async function fetchTokenData() {
    try {
      const [name, symbol, decimals] = await Promise.all([
        readContract(config, {
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: "name",
        }),
        readContract(config, {
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: "symbol",
        }),
        readContract(config, {
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: "decimals",
        })
      ]);

      setTokenName(name as string);
      setTokenSymbol(symbol as string);
      setTokenDecimals(decimals as number);
      
      console.log("Token Data:", { name, symbol, decimals });
    } catch (error) {
      console.error("Error fetching token data:", error);
      setTokenName("");
      setTokenSymbol("");
      setTokenDecimals(0);
    }
  }

  fetchTokenData();
}, [tokenAddress, config]);

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

  function clearFormData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('airdrop_tokenAddress');
      localStorage.removeItem('airdrop_recipients');
      localStorage.removeItem('airdrop_amounts');
    }
    setTokenAddress("");
    setRecipients("");
    setAmounts("");
  }

  async function handleSubmit() {
    // 1. Approve our tsender contract to send our tokens
    // 1a. If already approve, moved to step 2
    // 2. Call the airdrop function on the tsender contract
    // 3. Wait for the transaction to be mined
    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approveAmount = await getApprovedAmount(tSenderAddress);
    console.log("approveAmount:", approveAmount);

    if(approveAmount<total){
      const approvalHash=await writeContractAsync({
        abi:erc20Abi,
        address:tokenAddress as `0x${string}`,
        functionName:"approve",
        args:[tSenderAddress as `0x${string}`, BigInt(total)]
      })

      const approvalReceipt = await waitForTransactionReceipt(config,{hash:approvalHash})
      
      console.log("Approval confirmed:",approvalReceipt)
      const airdropHash= await writeContractAsync({
        abi:tsenderAbi,
        address:tSenderAddress as `0x${string}`,
        functionName:"airdropERC20",
        args:[tokenAddress,
          recipients.split(/[,\n]+/).map(addr=>addr.trim()).filter(addr=>addr !== ''),
          amounts.split(/[,\n]+/).map(amount=>amount.trim()).filter(amt => amt!==''),
          BigInt(total)
        ]
      })

      const airdropReceipt = await waitForTransactionReceipt(config,{hash:airdropHash})
      console.log("Airdrop confirmed:",airdropReceipt)
      
      // Limpiar los datos del formulario después del éxito
      clearFormData();

    }else {
      const airdropHash= await writeContractAsync({
        abi:tsenderAbi,
        address:tSenderAddress as `0x${string}`,
        functionName:"airdropERC20",
        args:[tokenAddress,
          recipients.split(/[,\n]+/).map(addr=>addr.trim()).filter(addr=>addr !== ''),
          amounts.split(/[,\n]+/).map(amount=>amount.trim()).filter(amt => amt!==''),
          BigInt(total)
        ]
      })

      const airdropReceipt = await waitForTransactionReceipt(config,{hash:airdropHash})
      console.log("Airdrop confirmed:",airdropReceipt)
      
      // Limpiar los datos del formulario después del éxito
      clearFormData();
    }    


  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
        Token Airdrop
      </h2>

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
      <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Token Information</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Token Name:</span>
            <span className="text-cyan-400 font-semibold">{tokenName || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Token Symbol:</span>
            <span className="text-cyan-400 font-semibold">{tokenSymbol || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Token Decimals:</span>
            <span className="text-cyan-400 font-semibold">{tokenDecimals || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-600 pt-2 mt-3">
            <span className="text-gray-300 font-medium">Total Amount ( wei ):</span>
            <span className="text-green-400 font-bold">{total || "0"} </span>
          </div>
            <div className="flex justify-between items-center ">
            <span className="text-gray-300 font-medium">Total Amount (tokens):</span>
            <span className="text-green-400 font-bold">{tokenDecimals > 0 ? (total / Math.pow(10, tokenDecimals)).toFixed(6) : '0'} </span>
            </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={clearFormData}
          className="flex-1 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 font-semibold tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-red-500/20 hover:border-red-400/40"
        >
          Clear Form
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 font-semibold tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-cyan-500/20 hover:border-cyan-400/40"
      >
        Send Tokens
      </button>
    </div>
  );
}
