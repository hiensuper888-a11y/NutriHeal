import React from 'react';
import { motion } from 'motion/react';
import { translations, Language } from '../translations';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TermsPageProps {
  language: Language;
}

export default function TermsPage({ language }: TermsPageProps) {
  const t = (key: keyof typeof translations['vi']) => {
    return translations[language]?.[key] || translations['vi'][key];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-brand-50/50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          {t('backToHome' as any) || 'Quay lại trang chủ'}
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-white overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center shadow-inner">
                <FileText size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-stone-900">{t('termsTitle')}</h1>
                <p className="text-stone-400 font-medium">Last updated: 2026</p>
              </div>
            </div>

            <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed whitespace-pre-line text-lg">
              {t('termsContent')}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
