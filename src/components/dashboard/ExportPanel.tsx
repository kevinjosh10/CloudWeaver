import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileImage, FileText, FileJson, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useStore } from '../../store/useStore';

export function ExportPanel() {
  const { analysisResult, costEstimate, infrastructureScores, securityReport } = useStore();
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const exportAsImage = async () => {
    setIsExportingImage(true);
    try {
      const element = document.querySelector('.react-flow') as HTMLElement;
      if (!element) throw new Error("Architecture canvas not found");
      
      const dataUrl = await toPng(element, { backgroundColor: '#050505', width: 1200, height: 800 });
      
      const link = document.createElement('a');
      link.download = `CloudWeaver_${analysisResult?.appType}_Architecture.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
      alert("Failed to export image.");
    } finally {
      setIsExportingImage(false);
    }
  };

  const exportAsPDF = async () => {
    setIsExportingPDF(true);
    try {
      const element = document.querySelector('.react-flow') as HTMLElement;
      if (!element) throw new Error("Architecture canvas not found");
      
      const imgData = await toPng(element, { backgroundColor: '#050505', width: 1200, height: 800 });
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1200, 800]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 1200, 800);
      pdf.save(`CloudWeaver_${analysisResult?.appType}_Report.pdf`);
    } catch (e) {
      console.error(e);
      alert("Failed to export PDF.");
    } finally {
      setIsExportingPDF(false);
    }
  };

  const exportJSON = () => {
    const data = {
      appType: analysisResult?.appType,
      targetScale: analysisResult?.scale,
      estimatedMonthlyCost: costEstimate?.total,
      scores: infrastructureScores,
      securityWarnings: securityReport?.items.filter(i => i.type === 'warning').length,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CloudWeaver_Summary.json`;
    link.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-4">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Export Center</h2>
        <p className="text-gray-400">Download your architecture diagram and analysis reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export Image */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportAsImage}
          disabled={isExportingImage}
          className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 border border-white/5 hover:border-blue-500/50 transition-colors group text-left disabled:opacity-50"
        >
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            {isExportingImage ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileImage className="w-6 h-6" />}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Export as PNG</h3>
            <p className="text-sm text-gray-400 mt-1">High-resolution image of the architecture diagram.</p>
          </div>
        </motion.button>

        {/* Export PDF */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportAsPDF}
          disabled={isExportingPDF}
          className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 border border-white/5 hover:border-red-500/50 transition-colors group text-left disabled:opacity-50"
        >
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
            {isExportingPDF ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileText className="w-6 h-6" />}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Export as PDF</h3>
            <p className="text-sm text-gray-400 mt-1">Vector-quality PDF format for presentations.</p>
          </div>
        </motion.button>

        {/* Export JSON Summary */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportJSON}
          className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 border border-white/5 hover:border-green-500/50 transition-colors group text-left md:col-span-2"
        >
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
            <FileJson className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Export Executive Summary</h3>
            <p className="text-sm text-gray-400 mt-1">JSON data payload containing costs, scores, and security metrics.</p>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
