import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 shadow-lg bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 border-b border-cyan-500/20">
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/AlesxanDer1102/t-sender"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-300 transition-colors text-cyan-400"
        >
          <FaGithub size={24} />
        </a>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          TSender
        </h1>
      </div>
      <ConnectButton />
    </header>
  );
}
