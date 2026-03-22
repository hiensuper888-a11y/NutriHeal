import React from 'react';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';
import { translations, Language } from '../translations';
import { Phone, Facebook, CreditCard, Smartphone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AboutPageProps {
  language: Language;
}

export default function AboutPage({ language }: AboutPageProps) {
  const t = (key: keyof typeof translations['vi']) => {
    return translations[language]?.[key] || translations['vi'][key];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-brand-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
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
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center shadow-inner">
                <Logo className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">{t('aboutTitle')}</h1>
                <p className="text-brand-600 font-medium">{t('slogan')}</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="flex-shrink-0 w-full md:w-64 text-center">
                  <img 
                    src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/601974923_122114680323098866_7400803319906439911_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=1d2534&_nc_ohc=qLnETqGldjcQ7kNvwHTcUee&_nc_oc=AdpzwPaYzbGiU28IJgJQzCQPuygoudGWd4Z1Ns6XdXoUxKzmerM6-KL6gPOqHnbxINc&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=-axxDIBKdIWBLhRHTrvSIQ&_nc_ss=7a30f&oh=00_AfxM4Hxx6T4jufxizZxUvHY37-LeylCJF2Ws3YCQXOykcw&oe=69C2F2AD" 
                    alt="Founder" 
                    className="w-full aspect-square rounded-[2rem] object-cover shadow-2xl border-4 border-brand-50 mb-4"
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">Founder</p>
                  <p className="text-stone-900 font-serif font-bold text-xl mt-1">Mr. Hien</p>
                </div>
                <div className="text-stone-600 leading-relaxed whitespace-pre-line flex-grow text-lg">
                  {t('aboutContent')}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-stone-100">
                {/* Contact Info */}
                <div className="space-y-6">
                  <h4 className="text-stone-900 text-xl font-bold flex items-center gap-3">
                    <Phone size={24} className="text-brand-600" />
                    {t('contactDirect')}
                  </h4>
                  <div className="bg-stone-50 p-6 rounded-3xl space-y-4 border border-stone-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-stone-400 shadow-sm">
                        <Phone size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('hotlineLabel')}</span>
                        <a href="tel:0973683410" className="text-stone-900 font-bold hover:text-brand-600 text-lg">0973683410</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-stone-400 shadow-sm">
                        <Facebook size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('personalFBLabel')}</span>
                        <a href="https://www.facebook.com/profile.php?id=61582965982019" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-bold hover:text-brand-600 text-lg">Mr. Hien</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-stone-400 shadow-sm">
                        <Facebook size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('fanpageLabel')}</span>
                        <a href="https://www.facebook.com/profile.php?id=61577440552034" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-bold hover:text-brand-600 text-lg">Nutri-Heal by Mr.Hien</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-6">
                  <h4 className="text-stone-900 text-xl font-bold flex items-center gap-3">
                    <CreditCard size={24} className="text-brand-600" />
                    {t('supportProject')}
                  </h4>
                  <div className="bg-stone-50 p-6 rounded-3xl space-y-5 border border-stone-100">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-stone-400 shadow-sm mt-1">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('momoLabel')}</p>
                        <p className="text-stone-900 font-bold text-lg">CAO MINH HIỀN</p>
                        <p className="text-brand-600 font-mono font-bold">0973683410</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-stone-400 shadow-sm mt-1">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('bankLabel')}</p>
                        <p className="text-stone-900 font-bold text-lg">CAO MINH HIEN</p>
                        <p className="text-brand-600 font-mono font-bold">3142848355 (BIDV)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
