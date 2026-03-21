import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, ArrowRight, X, Globe, Clock } from 'lucide-react';
import { Logo } from './Logo';
import { SharedModals } from './SharedModals';
import { SettingsMenu } from './SettingsMenu';
import { LANGUAGES, Language, translations } from '../translations';
import { getOAuthProvider } from '../lib/authProvider';

interface LoginProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function Login({ language, setLanguage }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const t = (key: keyof typeof translations['vi']) => {
    return translations[language]?.[key] || translations['vi'][key];
  };

  useEffect(() => {
    // Clock
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat(language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(currentTime);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Vui lòng kiểm tra email của bạn để lấy liên kết đăng nhập!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'x') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: getOAuthProvider(provider),
        options: {
          redirectTo: window.location.origin,
          queryParams: provider === 'google' ? { prompt: 'select_account' } : undefined,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-stone-900">
      {/* Settings Menu */}
      <div className="absolute top-6 right-6 z-20">
        <SettingsMenu 
          language={language}
          setLanguage={setLanguage}
        />
      </div>

      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=3132&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-500/30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white mb-1">
              {isSignUp ? t('signUpTitle') : t('loginTitle')}
            </h1>
            <p className="text-brand-400 text-sm font-medium mb-3">by Mr.Hien</p>
            <p className="text-stone-400 text-sm">
              {isSignUp ? t('signUpSubtitle') : t('loginSubtitle')}
            </p>
          </div>

          {/* Real-time Clock */}
          <div className="mb-6 text-center text-stone-400 text-xs font-mono bg-stone-900/50 py-2 rounded-xl border border-stone-700/50">
            {formattedDate}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('emailLabel')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-500">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-stone-900/50 border border-stone-700/50 rounded-xl text-white placeholder-stone-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="ban@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('passwordLabel')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-500">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-stone-900/50 border border-stone-700/50 rounded-xl text-white placeholder-stone-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
            >
              {loading ? t('processing') : (isSignUp ? t('signUpBtn') : t('loginBtn'))}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px bg-stone-700/50 flex-1" />
            <span className="text-xs text-stone-500 uppercase font-bold tracking-wider">{t('orContinueWith')}</span>
            <div className="h-px bg-stone-700/50 flex-1" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleOAuthLogin('google')}
              type="button"
              className="py-3 bg-stone-800/50 hover:bg-stone-800 border border-stone-700/50 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button 
              onClick={() => handleOAuthLogin('x')}
              type="button"
              className="py-3 bg-stone-800/50 hover:bg-stone-800 border border-stone-700/50 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X
            </button>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-stone-400 hover:text-white text-sm transition-colors"
            >
              {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 text-sm text-stone-400 z-10">
        <button onClick={() => setShowAbout(true)} className="hover:text-white transition-colors">{t('aboutMe')}</button>
        <button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors">{t('terms')}</button>
        <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors">{t('privacy')}</button>
      </div>

      {/* Modals */}
      <SharedModals 
        language={language}
        isPrivacyOpen={showPrivacy}
        setIsPrivacyOpen={setShowPrivacy}
        isTermsOpen={showTerms}
        setIsTermsOpen={setShowTerms}
        isAboutOpen={showAbout}
        setIsAboutOpen={setShowAbout}
        isProfileOpen={false}
        setIsProfileOpen={() => {}}
        user={null}
        onUpdate={() => {}}
      />
    </div>
  );
}

