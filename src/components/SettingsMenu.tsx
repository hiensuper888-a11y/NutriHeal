import React, { useState } from 'react';
import { Globe, Clock, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LANGUAGES, Language } from '../translations';

interface SettingsMenuProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function SettingsMenu({ language, setLanguage }: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-stone-800/50 hover:bg-stone-800 border border-stone-700/50 rounded-full text-white text-sm transition-all"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{LANGUAGES.find(l => l.code === language)?.name}</span>
        <ChevronDown size={14} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-72 bg-stone-900 border border-stone-700 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif font-bold text-white">Cài đặt</h3>
              <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white"><X size={16} /></button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1 flex items-center gap-1">
                  <Globe size={12} /> Ngôn ngữ
                </label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full px-3 py-2 bg-stone-900/50 border border-stone-700/50 rounded-xl text-white text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                >
                  {LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
