import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Language, LANGUAGES, translations } from './translations';
import Login from './components/Login';
import Home from './pages/Home';
import AboutPage from './pages/About';
import TermsPage from './pages/Terms';
import PrivacyPage from './pages/Privacy';
import { SharedModals } from './components/SharedModals';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [session, setSession] = React.useState<any>(null);
  const [language, setLanguage] = React.useState<Language>('vi');
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const t = (key: keyof typeof translations['vi']) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  React.useEffect(() => {
    // Set document title
    document.title = t('appName');

    // Load saved language from localStorage
    const savedLang = localStorage.getItem('nutriheal_lang') as Language;
    if (savedLang && LANGUAGES.find(l => l.code === savedLang)) {
      setLanguage(savedLang);
    }
  }, [language]);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleProfileUpdate = async (profile: any) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.name,
          dob: profile.dob,
          hotline: profile.hotline,
          address: profile.address,
          company: profile.company,
          department: profile.department,
          position: profile.position,
          avatar_url: profile.avatar,
        },
      });
      if (error) throw error;
      showToast(t('updateSuccess'));
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast(t('updateError'), 'error');
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('nutriheal_lang', lang);
  };

  if (!session) {
    return <Login 
      language={language} 
      setLanguage={handleLanguageChange} 
    />;
  }

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              session={session} 
              language={language} 
              setLanguage={handleLanguageChange}
              handleSignOut={handleSignOut}
              setIsProfileOpen={setIsProfileOpen}
            />
          } 
        />
        <Route path="/about" element={<AboutPage language={language} />} />
        <Route path="/terms" element={<TermsPage language={language} />} />
        <Route path="/privacy" element={<PrivacyPage language={language} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <SharedModals 
        language={language}
        isPrivacyOpen={false}
        setIsPrivacyOpen={() => {}}
        isTermsOpen={false}
        setIsTermsOpen={() => {}}
        isAboutOpen={false}
        setIsAboutOpen={() => {}}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        user={session?.user}
        onUpdate={handleProfileUpdate}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg text-white font-medium z-[100] flex items-center gap-2 ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
