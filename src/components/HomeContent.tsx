"use client";
import AirdropForm from "./AirdropForm";

import { useAccount } from "wagmi";

export default function HomeContent(){
    const {isConnected} = useAccount();

    return (
        <div>
            {isConnected ? (
                <div>
                        <AirdropForm />
                        </div>
                        ):
            (
                <div className="text-center text-gray-300">
                    <p className="text-lg mb-4">Please connect your wallet to use the airdrop feature....</p>
                </div>
            )
            }
            
        </div>
    );
}