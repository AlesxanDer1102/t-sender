import AirdropForm from "@/components/AirdropForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Token Airdrop Distribution
            </h2>
            <p className="text-gray-300 text-lg">
              Envía tokens a múltiples direcciones de manera eficiente y segura
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-cyan-500/20">
            <AirdropForm />
          </div>
        </div>
      </div>
    </div>
  );
}
