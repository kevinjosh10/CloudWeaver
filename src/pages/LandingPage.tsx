import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Cloud, Database, Lock, Users, HardDrive, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { analyzeArchitecture, ScaleLevel } from '../lib/engine/architectureEngine';

export function LandingPage({ onGenerate }: { onGenerate: () => void }) {
  const { userInput, setUserInput, setAnalysisResult } = useStore();
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Wizard state
  const [traffic, setTraffic] = useState<ScaleLevel>('Medium');
  const [storage, setStorage] = useState<ScaleLevel>('Medium');

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerate = () => {
    setIsAnimating(true);
    
    // Create a synthesized scale string for the UI based on traffic
    let scaleString = '10K Users';
    if (traffic === 'Low') scaleString = '1K Users';
    if (traffic === 'Medium') scaleString = '10K Users';
    if (traffic === 'High') scaleString = '100K Users';
    if (traffic === 'Very High') scaleString = '1M Users';
    if (traffic === 'Critical') scaleString = '10M+ Users';

    setTimeout(() => {
      const result = analyzeArchitecture(userInput, {
        traffic,
        storage,
        scaleString
      });
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
          <span>CloudWeaver Architecture Engine v2.0</span>
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
          Describe your application, dial in your requirements, and get a production-ready AWS architecture with realistic cost estimates.
        </motion.p>

        {/* Wizard Container */}
        <div className="w-full max-w-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
          
          <div className="relative w-full bg-[#0a0a0c] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden min-h-[220px] flex flex-col">
            
            {/* Step Indicators */}
            <div className="flex justify-between mb-8 relative z-20">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${step > s ? 'bg-blue-500' : 'bg-gray-800'}`}></div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white text-left mb-4">Step 1: Describe your application</h3>
                    <form onSubmit={handleNext} className="flex flex-col h-full">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="e.g. A scalable social network for developers..."
                        className="w-full bg-[#151518] border border-white/10 rounded-xl p-4 text-white text-lg placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 mb-4"
                        autoFocus
                      />
                      <div className="mt-auto flex justify-end">
                        <button type="submit" disabled={!userInput.trim()} className="bg-white text-black px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                          Next <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white text-left mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-blue-400" /> Expected User Traffic</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {(['Low', 'Medium', 'High', 'Very High', 'Critical'] as ScaleLevel[]).map(level => (
                        <button
                          key={level}
                          onClick={() => setTraffic(level)}
                          className={`p-3 rounded-xl border text-sm font-medium transition-all ${traffic === level ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-[#151518] border-white/5 text-gray-400 hover:border-white/20'}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-between">
                      <button onClick={handleBack} className="text-gray-400 hover:text-white px-4 py-2 font-medium flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button onClick={() => handleNext()} className="bg-white text-black px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white text-left mb-4 flex items-center gap-2"><HardDrive className="w-5 h-5 text-purple-400" /> Expected Data Storage</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {(['Low', 'Medium', 'High', 'Very High', 'Critical'] as ScaleLevel[]).map(level => (
                        <button
                          key={level}
                          onClick={() => setStorage(level)}
                          className={`p-3 rounded-xl border text-sm font-medium transition-all ${storage === level ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-[#151518] border-white/5 text-gray-400 hover:border-white/20'}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-between">
                      <button onClick={handleBack} disabled={isAnimating} className="text-gray-400 hover:text-white px-4 py-2 font-medium flex items-center gap-2 transition-colors disabled:opacity-50">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button onClick={handleGenerate} disabled={isAnimating} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-80">
                        {isAnimating ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                        ) : 'Generate Architecture'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Example Prompts - Only show on Step 1 */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 flex flex-wrap justify-center gap-3">
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full"
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
