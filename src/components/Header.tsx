import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/AlesxanDer1102/t-sender"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          <FaGithub size={24} />
        </a>
      </div>
      <ConnectButton />
    </header>
  );
}
