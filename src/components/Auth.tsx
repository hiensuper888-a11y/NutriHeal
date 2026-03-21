import React from 'react';
import { supabase } from '../services/supabase';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export const Auth = () => {
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (provider: 'google' | 'x') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-brand-50/50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-white max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-2xl flex items-center justify-center shadow-inner mx-auto mb-6">
          <Activity size={32} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Welcome to Nutri-Heal</h2>
        <p className="text-stone-500 text-sm mb-8">Please sign in to continue your health journey.</p>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('google')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-stone-200 rounded-xl text-stone-700 font-medium hover:bg-stone-50 transition-colors shadow-sm disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => handleLogin('x')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-stone-800 transition-colors shadow-sm disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.96z" />
            </svg>
            Continue with X
          </button>
        </div>
      </motion.div>
    </div>
  );
};
