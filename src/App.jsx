import React from 'react';
import { Lightning, CheckCircle } from '@phosphor-icons/react';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-3 shadow-lg">
        <Lightning size={24} weight="bold" className="text-zinc-100" />
        <span className="font-medium">TaskFlow operando em Zinc Técnico</span>
        <CheckCircle size={20} weight="fill" className="text-emerald-500" />
      </div>
    </div>
  );
}