import React from 'react';
import { Search, Heart, Shield, Brain, Sparkles, Activity, Info, X, MessageSquare, Send, ChevronRight, ExternalLink, Share2, Lock, Settings, Key, Phone, Facebook, CreditCard, Smartphone, FileText, CheckCircle2, AlertCircle, ShieldCheck, Copy, Printer, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FOODS, CATEGORIES } from './data';
import { Food } from './types';
import { askGemini, getRemainingQuota, setUserApiKey, getUserApiKey } from './services/gemini';
import { translations, LANGUAGES, Language } from './translations';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Logo = ({ className }: { className?: string }) => {
  const id = React.useId().replace(/:/g, '');
  const pillGradId = `pill-grad-${id}`;
  const zenGlowId = `zen-glow-${id}`;
  
  return (
    <svg viewBox="0 0 100 100" className={cn("w-10 h-10", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={pillGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id={zenGlowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Artistic Capsule - Horizontal with soft edges */}
      <rect x="10" y="42" width="80" height="36" rx="18" fill="white" stroke={`url(#${pillGradId})`} strokeWidth="3" />
      <path d="M50 42V78" stroke={`url(#${pillGradId})`} strokeWidth="3" strokeLinecap="round" />
      <rect x="10" y="42" width="40" height="36" rx="18" fill={`url(#${pillGradId})`} opacity="0.08" />
      
      {/* Meditating Person - Fluid Zen Silhouette */}
      <g filter={`url(#${zenGlowId})`}>
        {/* Head - Floating like a seed of wisdom */}
        <circle cx="50" cy="28" r="7" fill={`url(#${pillGradId})`} />
        {/* Body - Flowing posture */}
        <path d="M50 35 Q50 48 50 58" stroke={`url(#${pillGradId})`} strokeWidth="5" strokeLinecap="round" />
        {/* Arms - Circular mudra for harmony */}
        <path d="M42 45 Q32 48 42 58" stroke={`url(#${pillGradId})`} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M58 45 Q68 48 58 58" stroke={`url(#${pillGradId})`} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Legs - Lotus position sitting gracefully */}
        <path d="M32 58 Q50 68 68 58" stroke={`url(#${pillGradId})`} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
      
      {/* Zen Energy Ripples */}
      <circle cx="50" cy="28" r="16" stroke={`url(#${pillGradId})`} strokeWidth="0.5" strokeDasharray="3 5" opacity="0.25" />
      <circle cx="50" cy="28" r="22" stroke={`url(#${pillGradId})`} strokeWidth="0.5" strokeDasharray="1 7" opacity="0.1" />
    </svg>
  );
};

export default function App() {
  const [language, setLanguage] = React.useState<Language>('vi');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedFood, setSelectedFood] = React.useState<Food | null>(null);
  const [isAiOpen, setIsAiOpen] = React.useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);
  const [isTermsOpen, setIsTermsOpen] = React.useState(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [userApiKey, setUserApiKeyInput] = React.useState(getUserApiKey() || '');
  const [aiQuery, setAiQuery] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState('');
  const [patientInfo, setPatientInfo] = React.useState({
    name: '',
    age: '',
    gender: 'Nam',
    symptoms: '',
    history: '',
    dailySchedule: '',
    currentDiet: '',
    currentMedication: ''
  });

  const [localTime, setLocalTime] = React.useState('');

  const handleFoodShare = async (food: Food) => {
    const localizedName = food.translations?.[language]?.name || food.name;
    const shareData = {
      title: localizedName,
      text: `${t('shareText')} ${localizedName}: ${food.translations?.[language]?.description || food.description}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        showToast(t('copySuccess'));
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
          showToast(t('copySuccess'));
        } catch (copyErr) {
          console.error('Failed to share or copy:', copyErr);
        }
      }
    }
  };
  const [treatmentPlan, setTreatmentPlan] = React.useState('');
  const [isConsulting, setIsConsulting] = React.useState(false);
  const [remainingQuota, setRemainingQuota] = React.useState(getRemainingQuota());
  const [consultationMode, setConsultationMode] = React.useState<'ai' | 'article'>('ai');
  const [timeToReset, setTimeToReset] = React.useState('');
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleTextShare = async (text: string) => {
    const shareData = {
      title: t('appName'),
      text: text,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(text);
        showToast(t('copySuccess'));
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(text);
          showToast(t('copySuccess'));
        } catch (copyErr) {
          console.error('Failed to share or copy:', copyErr);
        }
      }
    }
  };

  const t = (key: keyof typeof translations['vi']) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  React.useEffect(() => {
    // Set document title
    document.title = t('appName');

    // Auto-detect language
    const savedLang = localStorage.getItem('nutriheal_lang') as Language;
    if (savedLang && LANGUAGES.find(l => l.code === savedLang)) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0] as Language;
      const supportedLang = LANGUAGES.find(l => l.code === browserLang);
      if (supportedLang) {
        setLanguage(supportedLang.code as Language);
      } else {
        setLanguage('en');
      }
    }

    // Update favicon with a data URL of the logo
    const updateFavicon = () => {
      const svg = document.querySelector('header svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          ctx?.drawImage(img, 0, 0, 64, 64);
          const link = (document.querySelector("link[rel*='icon']") || document.createElement('link')) as HTMLLinkElement;
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = canvas.toDataURL('image/x-icon');
          document.getElementsByTagName('head')[0].appendChild(link);
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      }
    };
    // Small delay to ensure SVG is rendered
    setTimeout(updateFavicon, 1000);
  }, [language]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('nutriheal_lang', lang);
  };

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const nextDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
      const diff = nextDay.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeToReset(`${hours}h ${minutes}m`);

      // Update local time with timezone awareness
      const timeStr = now.toLocaleTimeString(language, { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      });
      
      // Get timezone abbreviation
      const tz = Intl.DateTimeFormat(language, { timeZoneName: 'short' })
        .formatToParts(now)
        .find(p => p.type === 'timeZoneName')?.value || '';
        
      setLocalTime(`${timeStr} ${tz}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [language]);

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientInfo.symptoms.trim()) return;

    setIsConsulting(true);
    setTreatmentPlan('');
    
    const relevantArticle = FOODS.find(f => 
      patientInfo.symptoms.toLowerCase().includes(f.name.toLowerCase()) ||
      f.conditions.some(c => patientInfo.symptoms.toLowerCase().includes(c.toLowerCase()))
    );

    if (consultationMode === 'article') {
      if (relevantArticle) {
        const localizedName = relevantArticle.translations?.[language]?.name || relevantArticle.name;
        const sourcesList = relevantArticle.sources 
          ? `\n**9. ${t('reputableSources')}:**\n${relevantArticle.sources.map(s => `- [${s.title}](${s.url})`).join('\n')}\n`
          : '';
        setTreatmentPlan(`
### ${t('articleAnalysis')}: ${localizedName}

**1. ${t('preliminaryAssessment')}:**
${t('consultationSymptomPrefix')} **${localizedName}**.

**2. ${t('dietaryAdvice')}:**
- ${t('genericDietAdvice')}

**3. ${t('medicationsSupplements')}:**
- ${t('genericMedicationAdvice')}

**4. ${t('suggestedNutrients')}:**
- ${(relevantArticle.translations?.[language]?.nutrients || relevantArticle.nutrients).join(', ')}

**5. ${t('mainBenefits')}:**
- ${(relevantArticle.translations?.[language]?.benefits || relevantArticle.benefits).join('\n- ')}

**6. ${t('howToUseFromArticle')}:**
${relevantArticle.translations?.[language]?.howToUse || relevantArticle.howToUse}

**7. ${t('dailySchedule')}:**
- ${t('genericScheduleAdvice')}

**8. ${t('importantNote')}:**
${relevantArticle.translations?.[language]?.caution || relevantArticle.caution || 'N/A'}
${sourcesList}
*${t('medicalDisclaimer')}*
        `);
      } else {
        setTreatmentPlan(t('noArticleFound'));
      }
      setIsConsulting(false);
      setTimeout(() => {
        document.getElementById('treatment-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const articleContext = relevantArticle ? `
      Dưới đây là thông tin từ cơ sở dữ liệu của ứng dụng về tình trạng này:
      - Tên phác đồ: ${relevantArticle.name}
      - Lợi ích: ${relevantArticle.benefits.join(', ')}
      - Thành phần/Dinh dưỡng: ${relevantArticle.nutrients.join(', ')}
      - Cách dùng: ${relevantArticle.howToUse}
      - Lưu ý: ${relevantArticle.caution}
      Hãy tích hợp thông tin này vào câu trả lời của bạn nếu thấy phù hợp.
    ` : '';

    const prompt = `
      Dựa trên thông tin bệnh nhân sau (Trả lời bằng ngôn ngữ: ${LANGUAGES.find(l => l.code === language)?.name}):
      - Tên: ${patientInfo.name || 'N/A'}
      - Tuổi: ${patientInfo.age || 'N/A'}
      - Giới tính: ${patientInfo.gender}
      - Triệu chứng: ${patientInfo.symptoms}
      - Tiền sử bệnh: ${patientInfo.history || 'Không có'}
      - Lịch trình sinh hoạt: ${patientInfo.dailySchedule || 'Không có'}
      - Chế độ ăn uống hiện tại: ${patientInfo.currentDiet || 'Không có'}
      - Thuốc/Thực phẩm bổ sung đang dùng: ${patientInfo.currentMedication || 'Không có'}

      ${articleContext}

      Hãy phân tích tình trạng và đề xuất phương pháp điều trị tập trung vào dinh dưỡng, lối sống và các bài thuốc dân gian/thực phẩm bổ dưỡng an toàn. 
      Cấu trúc câu trả lời:
      1. Nhận định sơ bộ (mang tính tham khảo)
      2. Chế độ ăn uống chi tiết (Ăn gì, uống gì, kiêng gì kèm lý do)
      3. Thuốc và Thực phẩm bổ sung (Gợi ý các loại thuốc không kê đơn hoặc thực phẩm bổ sung an toàn, phù hợp)
      4. Bài thuốc/Món ăn bài thuốc gợi ý
      5. Lịch trình sinh hoạt (Thời gian ngủ, nghỉ ngơi, làm việc trong ngày)
      6. Lời khuyên lối sống và nhắc nhở y tế.
      7. Nguồn tham khảo và Nghiên cứu uy tín (Bắt buộc cung cấp các đường link URL cụ thể dẫn đến các trang web y tế, bài báo nghiên cứu khoa học thực tiễn và uy tín nhất thế giới từ Mỹ, Châu Âu như PubMed, Mayo Clinic, WHO, NIH, NHS... để chứng minh cho các đề xuất trên).
      
      Lưu ý: Phải trả lời bằng ngôn ngữ ${language} (Mã ngôn ngữ ISO).
    `;

    try {
      const response = await askGemini(prompt);
      setTreatmentPlan(response || 'Error');
      setRemainingQuota(getRemainingQuota());
    } catch (error) {
      console.error(error);
      setTreatmentPlan(t('aiError'));
    } finally {
      setIsConsulting(false);
      // Scroll to result
      setTimeout(() => {
        document.getElementById('treatment-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const [isAiLoading, setIsAiLoading] = React.useState(false);

  const filteredFoods = FOODS.filter(food => {
    const localizedName = food.translations?.[language]?.name || food.name;
    const localizedConditions = food.translations?.[language]?.conditions || food.conditions;
    
    const matchesSearch = localizedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         localizedConditions.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || food.category.includes(selectedCategory);
    return matchesCategory && matchesSearch;
  });

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    setIsAiLoading(true);
    setAiResponse('');
    try {
      const languageName = LANGUAGES.find(l => l.code === language)?.name || 'English';
      const promptWithLanguage = `${aiQuery}\n\n(Please answer in ${languageName})`;
      const response = await askGemini(promptWithLanguage);
      setAiResponse(response || 'No response.');
      setRemainingQuota(getRemainingQuota());
    } catch (error) {
      setAiResponse(t('aiError'));
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-brand-50/50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="shadow-lg shadow-brand-600/10" />
            <h1 className="text-xl font-serif font-bold tracking-tight text-stone-900 hidden sm:block">
              {t('appName')}
            </h1>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-1 px-4 py-2 bg-brand-50 border border-brand-100 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider">
                {remainingQuota} {t('freeQuestions')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] text-brand-400 font-medium">
                {t('resetAfter')}: {timeToReset}
              </span>
              <div className="w-px h-2 bg-brand-200" />
              <span className="text-[9px] text-brand-500 font-bold">
                {t('currentTime')}: {localTime}
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-stone-100 border-none rounded-full text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="p-2 text-stone-600 hover:bg-stone-100 rounded-xl transition-all flex items-center gap-1">
                <span className="text-lg">{LANGUAGES.find(l => l.code === language)?.flag}</span>
                <span className="text-xs font-medium uppercase hidden sm:inline">{language}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-xl border border-stone-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-stone-50 transition-colors",
                      language === lang.code ? "text-brand-600 font-bold bg-brand-50/50" : "text-stone-600"
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all"
              title={t('settingsTitle')}
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={() => setIsAiOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
            >
              <MessageSquare size={18} />
              <span className="hidden sm:inline">{t('aiConsultation')}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative rounded-3xl overflow-hidden bg-brand-700 text-white p-8 sm:p-12">
            <div className="relative z-10 max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-serif font-bold mb-4 leading-tight"
              >
                {t('heroTitle')}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-brand-100 text-lg mb-8"
              >
                {t('heroSubtitle')}
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('treatment-consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-white text-brand-700 rounded-full font-bold hover:bg-brand-50 transition-colors"
                >
                  {t('startLookup')}
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-brand-700 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000" 
                alt="Healthy food"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Patient Consultation Section */}
        <section id="treatment-consultation-form" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-2xl flex items-center justify-center shadow-inner">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">{t('consultationTitle')}</h3>
                  <p className="text-stone-500 text-sm">{t('consultationSubtitle')}</p>
                </div>
              </div>

              <div className="flex p-1 bg-stone-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setConsultationMode('ai')}
                  className={cn(
                    "flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                    consultationMode === 'ai' ? "bg-white text-brand-600 shadow-sm" : "text-stone-500"
                  )}
                >
                  {t('aiCombined')}
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationMode('article')}
                  className={cn(
                    "flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                    consultationMode === 'article' ? "bg-white text-brand-600 shadow-sm" : "text-stone-500"
                  )}
                >
                  {t('articleOnly')}
                </button>
              </div>

              <form onSubmit={handleConsultation} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('fullName')}</label>
                    <input 
                      type="text" 
                      placeholder={t('namePlaceholder')}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-all"
                      value={patientInfo.name}
                      onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('age')}</label>
                    <input 
                      type="number" 
                      placeholder="30"
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-all"
                      value={patientInfo.age}
                      onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('gender')}</label>
                  <div className="flex gap-2">
                    {['male', 'female', 'other'].map(key => {
                      const label = t(key as any);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setPatientInfo({...patientInfo, gender: label})}
                          className={cn(
                            "flex-1 py-2 rounded-xl text-sm font-medium border transition-all",
                            patientInfo.gender === label 
                              ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-600/20" 
                              : "bg-stone-50 border-stone-100 text-stone-600 hover:bg-stone-100"
                          )}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('symptomsLabel')}</label>
                  <textarea 
                    rows={3}
                    placeholder={t('symptomsPlaceholder')}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-all resize-none"
                    value={patientInfo.symptoms}
                    onChange={(e) => setPatientInfo({...patientInfo, symptoms: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('historyLabel')}</label>
                  <input 
                    type="text" 
                    placeholder={t('historyPlaceholder')}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-all"
                    value={patientInfo.history}
                    onChange={(e) => setPatientInfo({...patientInfo, history: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('dailyScheduleLabel')}</label>
                  <input 
                    type="text" 
                    placeholder={t('dailySchedulePlaceholder')}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-all"
                    value={patientInfo.dailySchedule}
                    onChange={(e) => setPatientInfo({...patientInfo, dailySchedule: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('currentDietLabel')}</label>
                  <input 
                    type="text" 
                    placeholder={t('currentDietPlaceholder')}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-all"
                    value={patientInfo.currentDiet}
                    onChange={(e) => setPatientInfo({...patientInfo, currentDiet: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('currentMedicationLabel')}</label>
                  <input 
                    type="text" 
                    placeholder={t('currentMedicationPlaceholder')}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-all"
                    value={patientInfo.currentMedication}
                    onChange={(e) => setPatientInfo({...patientInfo, currentMedication: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isConsulting}
                  className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20"
                >
                  {isConsulting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('analyzing')}
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      {t('generatePlan')}
                    </>
                  )}
                </button>
              </form>
            </div>

            <div id="treatment-result" className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {treatmentPlan ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white/95 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl shadow-brand-500/10 border border-brand-100 h-full overflow-y-auto relative"
                  >
                    {/* Professional Header Badge */}
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
                          <Activity size={24} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-serif font-bold text-stone-900 leading-tight">{t('proposedPlan')}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
                              <ShieldCheck size={10} />
                              {t('verifiedProtocol')}
                            </span>
                            <span className="text-[10px] text-stone-400 font-medium uppercase tracking-widest">
                              ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(treatmentPlan);
                            showToast(t('copySuccess'));
                          }}
                          className="p-2.5 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all"
                          title={t('copy')}
                        >
                          <Copy size={20} />
                        </button>
                        <button 
                          onClick={() => handleTextShare(treatmentPlan)}
                          className="p-2.5 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all"
                          title={t('share')}
                        >
                          <Share2 size={20} />
                        </button>
                        <button 
                          onClick={() => window.print()}
                          className="p-2.5 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all"
                          title={t('print')}
                        >
                          <Printer size={20} />
                        </button>
                        <button 
                          onClick={() => setTreatmentPlan('')}
                          className="p-2.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Report Content */}
                    <div className="markdown-body prose prose-stone max-w-none">
                      <div className="bg-stone-50 rounded-3xl p-6 mb-8 border border-stone-100">
                        <div className="flex items-center gap-3 mb-4 text-stone-500">
                          <User size={18} />
                          <span className="text-sm font-medium">{t('patientProfile')}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">{t('fullName')}</p>
                            <p className="text-sm font-bold text-stone-700">{patientInfo.name || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">{t('age')}</p>
                            <p className="text-sm font-bold text-stone-700">{patientInfo.age || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">{t('gender')}</p>
                            <p className="text-sm font-bold text-stone-700 capitalize">{patientInfo.gender}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">Date</p>
                            <p className="text-sm font-bold text-stone-700">{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-stone-200/60">
                          {patientInfo.symptoms && (
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">{t('symptomsLabel')}</p>
                              <p className="text-sm font-medium text-stone-700">{patientInfo.symptoms}</p>
                            </div>
                          )}
                          {patientInfo.history && (
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">{t('historyLabel')}</p>
                              <p className="text-sm font-medium text-stone-700">{patientInfo.history}</p>
                            </div>
                          )}
                          {patientInfo.dailySchedule && (
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">{t('dailyScheduleLabel')}</p>
                              <p className="text-sm font-medium text-stone-700">{patientInfo.dailySchedule}</p>
                            </div>
                          )}
                          {patientInfo.currentDiet && (
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">{t('currentDietLabel')}</p>
                              <p className="text-sm font-medium text-stone-700">{patientInfo.currentDiet}</p>
                            </div>
                          )}
                          {patientInfo.currentMedication && (
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">{t('currentMedicationLabel')}</p>
                              <p className="text-sm font-medium text-stone-700">{patientInfo.currentMedication}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <ReactMarkdown>{treatmentPlan}</ReactMarkdown>
                    </div>

                    {/* Footer Disclaimer */}
                    <div className="mt-12 pt-8 border-t border-stone-100 text-center">
                      <p className="text-[11px] text-stone-400 italic max-w-lg mx-auto leading-relaxed">
                        {t('medicalDisclaimer')}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-stone-200 rounded-[2.5rem] h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-500 mb-4 shadow-sm">
                      <Activity size={32} />
                    </div>
                    <h4 className="font-bold text-stone-700 mb-2">{t('autoResult')}</h4>
                    <p className="text-stone-500 text-sm max-w-xs">
                      {t('autoResultDesc')}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-serif font-bold">{t('healthCategories')}</h3>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-brand-600 font-medium hover:underline"
            >
              {t('all')}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => {
              const localizedName = cat.translations?.[language]?.name || cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  className={cn(
                    "flex flex-col items-center p-6 rounded-2xl transition-all border-2",
                    selectedCategory === cat.id 
                      ? "bg-brand-50 border-brand-500 text-brand-700 shadow-lg shadow-brand-500/10" 
                      : "bg-white border-transparent hover:border-stone-200 text-stone-600"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                    selectedCategory === cat.id ? "bg-brand-500 text-white" : "bg-stone-100 text-stone-500"
                  )}>
                    {cat.id === 'heart' && <Heart size={24} />}
                    {cat.id === 'digest' && <Activity size={24} />}
                    {cat.id === 'immune' && <Shield size={24} />}
                    {cat.id === 'brain' && <Brain size={24} />}
                    {cat.id === 'bone' && <Info size={24} />}
                    {cat.id === 'skin' && <Sparkles size={24} />}
                    {cat.id === 'plan' && <Sparkles size={24} />}
                  </div>
                  <span className="font-bold text-sm">{localizedName}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Food Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-serif font-bold">{t('suggestedFoods')}</h3>
            <span className="text-stone-500 text-sm">{filteredFoods.length} {t('results')}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredFoods.map((food) => {
                const localizedName = food.translations?.[language]?.name || food.name;
                const localizedDescription = food.translations?.[language]?.description || food.description;
                const localizedConditions = food.translations?.[language]?.conditions || food.conditions;

                return (
                  <motion.div
                    layout
                    key={food.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-stone-100"
                    onClick={() => setSelectedFood(food)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={food.image} 
                        alt={localizedName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {food.category.map(catId => {
                          const cat = CATEGORIES.find(c => c.id === catId);
                          const catName = cat?.translations?.[language]?.name || cat?.name;
                          return (
                            <span key={catId} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                              {catName}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">{localizedName}</h4>
                      <p className="text-stone-500 text-sm line-clamp-2 mb-4">
                        {localizedDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {localizedConditions.slice(0, 3).map(c => (
                          <span key={c} className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-1 rounded-md">
                            #{c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Food Detail Modal */}
      <AnimatePresence>
        {selectedFood && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFood(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedFood(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedFood.image} 
                  alt={selectedFood.translations?.[language]?.name || selectedFood.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent md:hidden" />
                <div className="absolute bottom-6 left-6 text-white md:hidden">
                  <h2 className="text-3xl font-serif font-bold">{selectedFood.translations?.[language]?.name || selectedFood.name}</h2>
                  <p className="italic opacity-80">{selectedFood.scientificName}</p>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                <div className="hidden md:block mb-6">
                  <h2 className="text-4xl font-serif font-bold text-stone-900">{selectedFood.translations?.[language]?.name || selectedFood.name}</h2>
                  <p className="text-stone-500 italic">{selectedFood.scientificName}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">{t('mainBenefits')}</h5>
                    <ul className="grid grid-cols-1 gap-2">
                      {(selectedFood.translations?.[language]?.benefits || selectedFood.benefits).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-stone-700">
                          <ChevronRight size={16} className="mt-1 text-brand-500 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">{t('supportTreatment')}</h5>
                    <div className="flex flex-wrap gap-2">
                      {(selectedFood.translations?.[language]?.conditions || selectedFood.conditions).map(c => (
                        <span key={c} className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">{t('nutrients')}</h5>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {(selectedFood.translations?.[language]?.nutrients || selectedFood.nutrients).join(', ')}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">{t('howToUse')}</h5>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {selectedFood.translations?.[language]?.howToUse || selectedFood.howToUse}
                    </p>
                  </div>

                  {(selectedFood.translations?.[language]?.caution || selectedFood.caution) && (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
                        <Info size={14} />
                        {t('caution')}
                      </div>
                      <p className="text-amber-800 text-sm italic">
                        {selectedFood.translations?.[language]?.caution || selectedFood.caution}
                      </p>
                    </div>
                  )}

                  {selectedFood.sources && (
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-brand-600">{t('reputableSources')}</h5>
                      <div className="space-y-1">
                        {selectedFood.sources.map((source, idx) => (
                          <a 
                            key={idx} 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-brand-700 hover:underline"
                          >
                            <ExternalLink size={14} />
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => {
                        const localizedName = selectedFood.translations?.[language]?.name || selectedFood.name;
                        setPatientInfo({
                          ...patientInfo,
                          symptoms: `${t('consultationSymptomPrefix')} ${localizedName}. ${t('consultationSymptomSuffix')} `
                        });
                        setSelectedFood(null);
                        setTimeout(() => {
                          document.getElementById('treatment-consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Activity size={20} />
                      {t('consultThisPlan')}
                    </button>
                    <button 
                      onClick={() => handleFoodShare(selectedFood)}
                      className="p-4 bg-stone-100 text-stone-600 rounded-2xl hover:bg-stone-200 transition-colors"
                      title={t('share')}
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Assistant Drawer */}
      <AnimatePresence>
        {isAiOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAiOpen(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">{t('aiAssistantTitle')}</h3>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">Powered by Gemini AI</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAiOpen(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!aiResponse && !isAiLoading && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                      <MessageSquare size={32} />
                    </div>
                    <h4 className="font-bold text-stone-900 mb-2">{t('askAnything')}</h4>
                    <p className="text-stone-500 text-sm">
                      {t('askAnythingDesc')}
                    </p>
                  </div>
                )}

                {isAiLoading && (
                  <div className="flex flex-col gap-4">
                    <div className="w-full h-4 bg-stone-100 rounded-full animate-pulse" />
                    <div className="w-[90%] h-4 bg-stone-100 rounded-full animate-pulse" />
                    <div className="w-[80%] h-4 bg-stone-100 rounded-full animate-pulse" />
                  </div>
                )}

                {aiResponse && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="markdown-body"
                  >
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  </motion.div>
                )}
              </div>

              <div className="p-6 border-t border-stone-100 bg-stone-50">
                <form onSubmit={handleAiAsk} className="relative">
                  <input
                    type="text"
                    placeholder={t('askPlaceholder')}
                    className="w-full pl-4 pr-12 py-3 bg-white border border-stone-200 rounded-2xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-sm"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                  />
                  <button 
                    type="submit"
                    disabled={isAiLoading || !aiQuery.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 disabled:opacity-50 transition-all shadow-md shadow-brand-600/20"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <p className="text-[10px] text-stone-400 mt-3 text-center">
                  {t('medicalDisclaimer')}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Footer */}
      <footer className="bg-white mt-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8" />
              <span className="text-stone-900 font-serif font-bold text-xl">{t('appName')}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-stone-500 text-sm font-medium">
              <button 
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-brand-600 transition-colors flex items-center gap-1"
              >
                {t('aboutUs')}
              </button>
              <button 
                onClick={() => setIsTermsOpen(true)}
                className="hover:text-brand-600 transition-colors flex items-center gap-1"
              >
                <FileText size={14} />
                {t('terms')}
              </button>
              <button 
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-brand-600 transition-colors flex items-center gap-1"
              >
                <Lock size={14} />
                {t('privacy')}
              </button>
            </div>
            <p className="text-stone-400 text-[10px]">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>

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
      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center">
                      <Key size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">{t('settingsTitle')}</h3>
                      <p className="text-stone-500 text-sm">{t('settingsSubtitle')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-stone-400" />
                  </button>
                </div>
 
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t('apiKeyLabel')}</label>
                    <input 
                      type="password"
                      placeholder={t('apiKeyPlaceholder')}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                      value={userApiKey}
                      onChange={(e) => setUserApiKeyInput(e.target.value)}
                    />
                    <p className="text-[10px] text-stone-400 mt-1 ml-1 leading-relaxed">
                      {t('apiKeyNote')}
                    </p>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                    <h4 className="text-xs font-bold text-stone-700 mb-3 flex items-center gap-2">
                      <Info size={14} className="text-brand-600" />
                      {t('apiKeyGuideTitle')}
                    </h4>
                    <ul className="space-y-2">
                      {(t('apiKeyGuideSteps') as unknown as string[]).map((step, index) => (
                        <li key={index} className="text-[11px] text-stone-500 flex gap-2 leading-relaxed">
                          <span className="flex-shrink-0 w-4 h-4 bg-white border border-stone-200 rounded-full flex items-center justify-center text-[9px] font-bold text-stone-400">
                            {index + 1}
                          </span>
                          <div className="markdown-body prose-sm prose-stone">
                            <ReactMarkdown>{step}</ReactMarkdown>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
 
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setUserApiKey(userApiKey.trim() || null);
                        setIsSettingsOpen(false);
                      }}
                      className="flex-1 py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-colors"
                    >
                      {t('saveSettings')}
                    </button>
                    <button 
                      onClick={() => {
                        setUserApiKeyInput('');
                        setUserApiKey(null);
                        setIsSettingsOpen(false);
                      }}
                      className="px-6 py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-colors"
                    >
                      {t('deleteSettings')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
    </div>
  );
}
