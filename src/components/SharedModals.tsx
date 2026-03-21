import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, FileText, Phone, Facebook, CreditCard, Smartphone, User } from 'lucide-react';
import { Logo } from './Logo';
import { translations, Language } from '../translations';
import { Profile } from './Profile';

interface SharedModalsProps {
  language: Language;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (open: boolean) => void;
  isTermsOpen: boolean;
  setIsTermsOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  user: any;
  onUpdate: (profile: any) => void;
}

export function SharedModals({
  language,
  isPrivacyOpen,
  setIsPrivacyOpen,
  isTermsOpen,
  setIsTermsOpen,
  isAboutOpen,
  setIsAboutOpen,
  isProfileOpen,
  setIsProfileOpen,
  user,
  onUpdate
}: SharedModalsProps) {
  const t = (key: keyof typeof translations['vi']) => {
    return translations[language]?.[key] || translations['vi'][key];
  };

  return (
    <>
      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center">
                      <Lock size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">{t('privacyTitle')}</h3>
                      <p className="text-stone-500 text-sm">2026</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsPrivacyOpen(false)}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-stone-400" />
                  </button>
                </div>

                <div className="space-y-6 text-stone-600 leading-relaxed whitespace-pre-line">
                  {t('privacyContent')}
                </div>

                <div className="mt-10">
                  <button 
                    onClick={() => setIsPrivacyOpen(false)}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-colors"
                  >
                    {t('close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTermsOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">{t('termsTitle')}</h3>
                      <p className="text-stone-500 text-sm">2026</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsTermsOpen(false)}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-stone-400" />
                  </button>
                </div>

                <div className="space-y-6 text-stone-600 leading-relaxed whitespace-pre-line">
                  {t('termsContent')}
                </div>

                <div className="mt-10">
                  <button 
                    onClick={() => setIsTermsOpen(false)}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-colors"
                  >
                    {t('agree')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Us Modal */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center">
                      <Logo className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">{t('aboutTitle')}</h3>
                      <p className="text-stone-500 text-sm">{t('slogan')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAboutOpen(false)}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-stone-400" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0 w-full md:w-48 text-center">
                      <img 
                        src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/601974923_122114680323098866_7400803319906439911_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=1d2534&_nc_ohc=qLnETqGldjcQ7kNvwHTcUee&_nc_oc=AdpzwPaYzbGiU28IJgJQzCQPuygoudGWd4Z1Ns6XdXoUxKzmerM6-KL6gPOqHnbxINc&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=-axxDIBKdIWBLhRHTrvSIQ&_nc_ss=7a30f&oh=00_AfxM4Hxx6T4jufxizZxUvHY37-LeylCJF2Ws3YCQXOykcw&oe=69C2F2AD" 
                        alt="Founder" 
                        className="w-full aspect-square rounded-3xl object-cover shadow-xl border-4 border-brand-50 mb-3"
                        referrerPolicy="no-referrer"
                      />
                      <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">Founder</p>
                    </div>
                    <section className="text-stone-600 leading-relaxed whitespace-pre-line flex-grow">
                      {t('aboutContent')}
                    </section>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h4 className="text-stone-900 font-bold flex items-center gap-2">
                        <Phone size={18} className="text-brand-600" />
                        {t('contactDirect')}
                      </h4>
                      <div className="bg-stone-50 p-4 rounded-2xl space-y-3">
                        <div className="flex items-center gap-3">
                          <Phone size={16} className="text-stone-400" />
                          <div className="flex flex-col">
                            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('hotlineLabel')}</span>
                            <a href="tel:0973683410" className="text-stone-900 font-medium hover:text-brand-600">0973683410</a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Facebook size={16} className="text-stone-400" />
                          <div className="flex flex-col">
                            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('personalFBLabel')}</span>
                            <a href="https://www.facebook.com/profile.php?id=61582965982019" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium hover:text-brand-600">Mr. Hien</a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Facebook size={16} className="text-stone-400" />
                          <div className="flex flex-col">
                            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('fanpageLabel')}</span>
                            <a href="https://www.facebook.com/profile.php?id=61577440552034" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium hover:text-brand-600">Nutri-Heal by Mr.Hien</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-4">
                      <h4 className="text-stone-900 font-bold flex items-center gap-2">
                        <CreditCard size={18} className="text-brand-600" />
                        {t('supportProject')}
                      </h4>
                      <div className="bg-stone-50 p-4 rounded-2xl space-y-4">
                        <div className="flex items-start gap-3">
                          <Smartphone size={16} className="text-stone-400 mt-1" />
                          <div>
                            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('momoLabel')}</p>
                            <p className="text-stone-900 font-medium">CAO MINH HIỀN</p>
                            <p className="text-stone-600 text-sm">0973683410</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CreditCard size={16} className="text-stone-400 mt-1" />
                          <div>
                            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('bankLabel')}</p>
                            <p className="text-stone-900 font-medium">CAO MINH HIEN</p>
                            <p className="text-stone-600 text-sm">3142848355 (BIDV)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <button 
                    onClick={() => setIsAboutOpen(false)}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-colors"
                  >
                    {t('close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">Profile</h3>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsProfileOpen(false)}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-stone-400" />
                  </button>
                </div>
                <Profile user={user} onUpdate={onUpdate} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
