import React from 'react';
import { Search, Heart, Shield, Brain, Sparkles, Activity, Info, X, MessageSquare, Send, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FOODS, CATEGORIES } from './data';
import { Food } from './types';
import { askGemini } from './services/gemini';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedFood, setSelectedFood] = React.useState<Food | null>(null);
  const [isAiOpen, setIsAiOpen] = React.useState(false);
  const [aiQuery, setAiQuery] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState('');
  const [patientInfo, setPatientInfo] = React.useState({
    name: '',
    age: '',
    gender: 'Nam',
    symptoms: '',
    history: ''
  });
  const [treatmentPlan, setTreatmentPlan] = React.useState('');
  const [isConsulting, setIsConsulting] = React.useState(false);

  const handleConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientInfo.symptoms.trim()) return;

    const prompt = `
      Tôi là chuyên gia dinh dưỡng. Hãy tư vấn cho bệnh nhân:
      - Tên: ${patientInfo.name || 'N/A'}
      - Tuổi: ${patientInfo.age || 'N/A'}
      - Giới tính: ${patientInfo.gender}
      - Triệu chứng: ${patientInfo.symptoms}
      - Tiền sử bệnh: ${patientInfo.history || 'Không có'}

      Yêu cầu: Đề xuất thực phẩm nên ăn, nên tránh và bài thuốc dân gian an toàn.
    `;

    // Copy to clipboard for convenience
    navigator.clipboard.writeText(prompt).then(() => {
      alert('Đã sao chép thông tin tư vấn! Bạn sẽ được chuyển đến Gemini để nhận phản hồi miễn phí.');
      window.open('https://gemini.google.com/app', '_blank');
    }).catch(() => {
      window.open('https://gemini.google.com/app', '_blank');
    });
  };

  const [isAiLoading, setIsAiLoading] = React.useState(false);

  const filteredFoods = FOODS.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.conditions.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || food.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    window.open(`https://gemini.google.com/app`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20">
              <Heart size={24} fill="currentColor" />
            </div>
            <h1 className="text-xl font-serif font-bold tracking-tight text-stone-900 hidden sm:block">
              NutriHeal
            </h1>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                placeholder="Tìm thực phẩm hoặc bệnh lý..."
                className="w-full pl-10 pr-4 py-2 bg-stone-100 border-none rounded-full text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <button 
            onClick={() => setIsAiOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            <MessageSquare size={18} />
            <span className="hidden sm:inline">Tư vấn AI</span>
          </button>
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
                Dinh dưỡng là <br /> liều thuốc tốt nhất
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-brand-100 text-lg mb-8"
              >
                Khám phá sức mạnh của thực phẩm tự nhiên trong việc bồi bổ cơ thể và hỗ trợ điều trị bệnh lý.
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-brand-700 rounded-full font-bold hover:bg-brand-50 transition-colors">
                  Bắt đầu tra cứu
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
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-2xl flex items-center justify-center">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">Tư vấn điều trị</h3>
                  <p className="text-stone-500 text-sm">Nhập thông tin để nhận phác đồ dinh dưỡng AI</p>
                </div>
              </div>

              <form onSubmit={handleConsultation} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Họ tên</label>
                    <input 
                      type="text" 
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                      value={patientInfo.name}
                      onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Tuổi</label>
                    <input 
                      type="number" 
                      placeholder="30"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                      value={patientInfo.age}
                      onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Giới tính</label>
                  <div className="flex gap-2">
                    {['Nam', 'Nữ', 'Khác'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setPatientInfo({...patientInfo, gender: g})}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-sm font-medium border transition-all",
                          patientInfo.gender === g 
                            ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-600/20" 
                            : "bg-stone-50 border-stone-100 text-stone-600 hover:bg-stone-100"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Triệu chứng hiện tại</label>
                  <textarea 
                    rows={3}
                    placeholder="Ví dụ: Đau dạ dày âm ỉ sau khi ăn, đầy hơi, khó tiêu..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all resize-none"
                    value={patientInfo.symptoms}
                    onChange={(e) => setPatientInfo({...patientInfo, symptoms: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Tiền sử bệnh lý</label>
                  <input 
                    type="text" 
                    placeholder="Ví dụ: Cao huyết áp, dị ứng hải sản..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                    value={patientInfo.history}
                    onChange={(e) => setPatientInfo({...patientInfo, history: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20"
                >
                  <Sparkles size={20} />
                  Tư vấn miễn phí qua Gemini.google.com
                </button>
              </form>
            </div>

            <div id="treatment-result" className="relative min-h-[400px]">
              <div className="bg-stone-100/50 border-2 border-dashed border-stone-200 rounded-[2rem] h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-500 mb-4 shadow-sm">
                  <Sparkles size={32} />
                </div>
                <h4 className="font-bold text-stone-700 mb-2">Sử dụng Gemini Miễn Phí</h4>
                <p className="text-stone-500 text-sm max-w-xs mb-6">
                  Hệ thống sẽ tự động sao chép thông tin bệnh nhân và mở trang web Gemini chính thức để bạn nhận tư vấn mà không cần API Key.
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <div className="flex items-center gap-2 text-xs text-stone-400 bg-white p-3 rounded-xl border border-stone-100">
                    <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                    Bước 1: Điền thông tin bên trái
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 bg-white p-3 rounded-xl border border-stone-100">
                    <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                    Bước 2: Nhấn nút tư vấn
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 bg-white p-3 rounded-xl border border-stone-100">
                    <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                    Bước 3: Dán (Paste) vào Gemini
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-serif font-bold">Danh mục sức khỏe</h3>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-brand-600 font-medium hover:underline"
            >
              Tất cả
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
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
                </div>
                <span className="font-bold text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Food Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-serif font-bold">Thực phẩm gợi ý</h3>
            <span className="text-stone-500 text-sm">{filteredFoods.length} kết quả</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredFoods.map((food) => (
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
                      alt={food.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {food.category.map(catId => (
                        <span key={catId} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {CATEGORIES.find(c => c.id === catId)?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{food.name}</h4>
                    <p className="text-stone-500 text-sm line-clamp-2 mb-4">
                      {food.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {food.conditions.slice(0, 3).map(c => (
                        <span key={c} className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-1 rounded-md">
                          #{c}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
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
                  alt={selectedFood.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent md:hidden" />
                <div className="absolute bottom-6 left-6 text-white md:hidden">
                  <h2 className="text-3xl font-serif font-bold">{selectedFood.name}</h2>
                  <p className="italic opacity-80">{selectedFood.scientificName}</p>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                <div className="hidden md:block mb-6">
                  <h2 className="text-4xl font-serif font-bold text-stone-900">{selectedFood.name}</h2>
                  <p className="text-stone-500 italic">{selectedFood.scientificName}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Công dụng chính</h5>
                    <ul className="grid grid-cols-1 gap-2">
                      {selectedFood.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-stone-700">
                          <ChevronRight size={16} className="mt-1 text-brand-500 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Hỗ trợ điều trị</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFood.conditions.map(c => (
                        <span key={c} className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Dinh dưỡng</h5>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {selectedFood.nutrients.join(', ')}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Cách sử dụng</h5>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {selectedFood.howToUse}
                    </p>
                  </div>

                  {selectedFood.caution && (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
                        <Info size={14} />
                        Lưu ý
                      </div>
                      <p className="text-amber-800 text-sm italic">
                        {selectedFood.caution}
                      </p>
                    </div>
                  )}
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
                    <h3 className="font-bold">Trợ lý NutriHeal</h3>
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
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600 shadow-inner">
                    <Sparkles size={40} />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-stone-900 mb-3">Tư vấn trực tiếp qua Gemini</h4>
                  <p className="text-stone-500 text-sm leading-relaxed mb-8">
                    Để đảm bảo tính riêng tư và sử dụng hoàn toàn miễn phí không cần API Key, hệ thống sẽ chuyển bạn đến ứng dụng Gemini chính thức của Google.
                  </p>
                  
                  <div className="space-y-3 text-left bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Cách thức hoạt động:</p>
                    <div className="flex items-start gap-3 text-sm text-stone-600">
                      <div className="w-5 h-5 bg-brand-500 text-white rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</div>
                      <p>Nhập câu hỏi của bạn vào ô bên dưới.</p>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-stone-600">
                      <div className="w-5 h-5 bg-brand-500 text-white rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</div>
                      <p>Hệ thống sẽ mở trang <strong>gemini.google.com</strong>.</p>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-stone-600">
                      <div className="w-5 h-5 bg-brand-500 text-white rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</div>
                      <p>Bạn chỉ cần dán câu hỏi và nhận tư vấn miễn phí.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-stone-100 bg-stone-50">
                <form onSubmit={handleAiAsk} className="relative">
                  <input
                    type="text"
                    placeholder="Nhập câu hỏi của bạn..."
                    className="w-full pl-4 pr-12 py-4 bg-white border border-stone-200 rounded-2xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-sm"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                  />
                  <button 
                    type="submit"
                    disabled={!aiQuery.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 disabled:opacity-50 transition-all shadow-md shadow-brand-600/20"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <p className="text-[10px] text-stone-400 mt-3 text-center">
                  Thông tin chỉ mang tính chất tham khảo. Luôn hỏi ý kiến bác sĩ.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
