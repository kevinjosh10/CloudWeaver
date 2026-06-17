import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Cloud, Database, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { analyzeArchitecture } from '../lib/engine/architectureEngine';

export function LandingPage({ onGenerate }: { onGenerate: () => void }) {
  const { userInput, setUserInput, setAnalysisResult } = useStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    setIsAnimating(true);
    
    // Simulate thinking/animation time
    setTimeout(() => {
      const result = analyzeArchitecture(userInput);
      setAnalysisResult(result);
      onGenerate();
    }, 1200);
  };

  const examples = [
    "Netflix clone with 100K users",
    "E-commerce store with 1M products",
    "AI chatbot processing 10k messages/min",
    "Social network for developers"
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-aurora pointer-events-none opacity-40"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-blue-500/30 text-blue-400 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>CloudWeaver Architecture Engine v1.0</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Design cloud architectures <br className="hidden md:block" />
          <span className="text-gradient">in seconds.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
        >
          Describe your application and get a production-ready AWS architecture, complete with cost estimates and security best practices.
        </motion.p>

        {/* Input Form */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleGenerate}
          className="w-full max-w-2xl relative"
        >
          <div className="relative flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
            <div className="relative flex w-full bg-[#0a0a0c] border border-white/10 rounded-2xl p-2 shadow-2xl transition-all focus-within:border-blue-500/50">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Describe your application..."
                className="flex-1 bg-transparent border-none outline-none text-white px-4 text-lg placeholder:text-gray-600"
                disabled={isAnimating}
              />
              <button
                type="submit"
                disabled={isAnimating || !userInput.trim()}
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {isAnimating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                  />
                ) : (
                  <>
                    Generate <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Example Prompts */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {examples.map((example, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setUserInput(example)}
                className="text-sm px-4 py-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors glass-panel"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.form>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full"
        >
          <FeatureCard icon={<Cloud />} title="AWS Best Practices" desc="Architectures strictly follow the AWS Well-Architected Framework." />
          <FeatureCard icon={<Database />} title="Cost Estimation" desc="Accurate local pricing models to prevent billing surprises." />
          <FeatureCard icon={<Lock />} title="Security First" desc="Automatic security scanning and IAM recommendations." />
        </motion.div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center group hover:border-blue-500/30 transition-all cursor-default">
      <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
