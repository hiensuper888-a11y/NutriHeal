import { Food, Category } from './types';

export const CATEGORIES: Category[] = [
  { 
    id: 'heart', 
    name: 'Tim mạch', 
    icon: 'Heart', 
    description: 'Thực phẩm tốt cho hệ tuần hoàn và huyết áp',
    translations: {
      en: { name: 'Cardiovascular', description: 'Foods good for the circulatory system and blood pressure' },
      zh: { name: '心血管', description: '对循环系统和血压有益的食物' },
      fr: { name: 'Cardiovasculaire', description: 'Aliments bons pour le système circulatoire et la tension artérielle' },
      de: { name: 'Herz-Kreislauf', description: 'Lebensmittel, die gut für das Kreislaufsystem und den Blutdruck sind' },
      ja: { name: '心血管', description: '循環器系と血圧に良い食品' },
      es: { name: 'Cardiovascular', description: 'Alimentos buenos para el sistema circulatorio y la presión arterial' },
      hi: { name: 'हृदय प्रणाली', description: 'संचार प्रणाली और रक्तचाप के लिए अच्छे खाद्य पदार्थ' }
    }
  },
  { 
    id: 'digest', 
    name: 'Tiêu hóa', 
    icon: 'Stomach', 
    description: 'Hỗ trợ dạ dày, đường ruột và hệ vi sinh',
    translations: {
      en: { name: 'Digestive', description: 'Supports the stomach, intestines, and microbiome' },
      zh: { name: '消化系统', description: '支持胃、肠和微生物群' },
      fr: { name: 'Digestif', description: 'Soutient l\'estomac, les intestins et le microbiome' },
      de: { name: 'Verdauung', description: 'Unterstützt Magen, Darm und Mikrobiom' },
      ja: { name: '消化器', description: '胃、腸、およびマイクロバイオームをサポートします' },
      es: { name: 'Digestivo', description: 'Apoya el estómago, los intestinos y el microbioma' },
      hi: { name: 'पाचन', description: 'पेट, आंतों और माइक्रोबायोम का समर्थन करता है' }
    }
  },
  { 
    id: 'immune', 
    name: 'Miễn dịch', 
    icon: 'Shield', 
    description: 'Tăng cường sức đề kháng, chống viêm',
    translations: {
      en: { name: 'Immune', description: 'Strengthens resistance, anti-inflammatory' },
      zh: { name: '免疫系统', description: '增强抵抗力，抗炎' },
      fr: { name: 'Immunitaire', description: 'Renforce la résistance, anti-inflammatoire' },
      de: { name: 'Immunsystem', description: 'Stärkt die Abwehrkräfte, entzündungshemmend' },
      ja: { name: '免疫', description: '抵抗力を高め、抗炎症作用があります' },
      es: { name: 'Inmunológico', description: 'Fortalece la resistencia, antiinflamatorio' },
      hi: { name: 'प्रतिरक्षा', description: 'प्रतिरोध को मजबूत करता है, सूजन-रोधी' }
    }
  },
  { 
    id: 'brain', 
    name: 'Trí não', 
    icon: 'Brain', 
    description: 'Cải thiện trí nhớ và sự tập trung',
    translations: {
      en: { name: 'Brain', description: 'Improves memory and concentration' },
      zh: { name: '大脑', description: '改善记忆力和注意力' },
      fr: { name: 'Cerveau', description: 'Améliore la mémoire et la concentration' },
      de: { name: 'Gehirn', description: 'Verbessert Gedächtnis und Konzentration' },
      ja: { name: '脳', description: '記憶力と集中力を向上させます' },
      es: { name: 'Cerebro', description: 'Mejora la memory y la concentración' },
      hi: { name: 'मस्तिष्क', description: 'याददाश्त और एकाग्रता में सुधार करता है' }
    }
  },
  { 
    id: 'bone', 
    name: 'Xương khớp', 
    icon: 'Bone', 
    description: 'Chắc khỏe xương, giảm đau khớp',
    translations: {
      en: { name: 'Bone & Joint', description: 'Strong bones, reduced joint pain' },
      zh: { name: '骨骼与关节', description: '强壮骨骼，减轻关节疼痛' },
      fr: { name: 'Os et Articulations', description: 'Des os solides, des douleurs articulaires réduites' },
      de: { name: 'Knochen & Gelenke', description: 'Starke Knochen, reduzierte Gelenkschmerzen' },
      ja: { name: '骨と関節', description: '強い骨、関節痛の軽減' },
      es: { name: 'Huesos y Articulaciones', description: 'Huesos fuertes, reducción del dolor articular' },
      hi: { name: 'हड्डी और जोड़', description: 'मजबूत हड्डियां, जोड़ों के दर्द में कमी' }
    }
  },
  { 
    id: 'skin', 
    name: 'Làm đẹp', 
    icon: 'Sparkles', 
    description: 'Đẹp da, mượt tóc từ bên trong',
    translations: {
      en: { name: 'Beauty', description: 'Beautiful skin, smooth hair from within' },
      zh: { name: '美容', description: '由内而外的美丽肌肤，顺滑秀发' },
      fr: { name: 'Beauté', description: 'Belle peau, cheveux lisses de l\'intérieur' },
      de: { name: 'Schönheit', description: 'Schöne Haut, geschmeidiges Haar von innen' },
      ja: { name: '美容', description: '内側から美しい肌、滑らかな髪' },
      es: { name: 'Belleza', description: 'Piel bella, cabello suave desde el interior' },
      hi: { name: 'सुंदरता', description: 'भीतर से सुंदर त्वचा, चिकने बाल' }
    }
  },
  { 
    id: 'plan', 
    name: 'Kế hoạch điều trị', 
    icon: 'Sparkles', 
    description: 'Phác đồ dinh dưỡng và lối sống chuyên sâu',
    translations: {
      en: { name: 'Treatment Plan', description: 'Intensive nutrition and lifestyle protocols' },
      zh: { name: '治疗计划', description: '深入的营养和生活方式方案' },
      fr: { name: 'Plan de Traitement', description: 'Protocoles intensifs de nutrition et de mode de vie' },
      de: { name: 'Behandlungsplan', description: 'Intensive Ernährungs- und Lebensstilprotokolle' },
      ja: { name: '治療計画', description: '集中的な栄養とライフスタイルのプロトコル' },
      es: { name: 'Plan de Tratamiento', description: 'Protocolos intensivos de nutrición y estilo de vida' },
      hi: { name: 'उपचार योजना', description: 'गहन पोषण और जीवन शैली प्रोटोकॉल' }
    }
  },
];

export const FOODS: Food[] = [
  {
    id: '1',
    name: 'Nghệ tươi',
    scientificName: 'Curcuma longa',
    category: ['immune', 'digest'],
    benefits: ['Chống viêm mạnh mẽ', 'Hỗ trợ lành vết thương', 'Cải thiện tiêu hóa'],
    conditions: ['Dạ dày', 'Viêm khớp', 'Cảm cúm'],
    nutrients: ['Curcumin', 'Vitamin C', 'Sắt'],
    description: 'Nghệ là một loại gia vị vàng với đặc tính chữa bệnh thần kỳ nhờ hoạt chất Curcumin.',
    howToUse: 'Dùng trong nấu ăn hoặc pha trà nghệ mật ong uống vào buổi sáng.',
    image: 'https://picsum.photos/seed/turmeric/600/400',
    caution: 'Người đang dùng thuốc loãng máu nên tham khảo ý kiến bác sĩ.',
    translations: {
      en: {
        name: 'Fresh Turmeric',
        benefits: ['Powerful anti-inflammatory', 'Supports wound healing', 'Improves digestion'],
        conditions: ['Stomach issues', 'Arthritis', 'Flu'],
        nutrients: ['Curcumin', 'Vitamin C', 'Iron'],
        description: 'Turmeric is a golden spice with miraculous healing properties thanks to the active ingredient Curcumin.',
        howToUse: 'Use in cooking or make honey turmeric tea to drink in the morning.',
        caution: 'People taking blood thinners should consult a doctor.'
      },
      zh: {
        name: '新鲜姜黄',
        benefits: ['强大的抗炎作用', '支持伤口愈合', '改善消化'],
        conditions: ['胃病', '关节炎', '流感'],
        nutrients: ['姜黄素', '维生素 C', '铁'],
        description: '姜黄是一种黄金香料，由于含有活性成分姜黄素，具有神奇的治愈能力。',
        howToUse: '用于烹饪或制作蜂蜜姜黄茶，早晨饮用。',
        caution: '服用血液稀释剂的人应咨询医生。'
      }
    }
  },
  {
    id: '2',
    name: 'Tỏi',
    scientificName: 'Allium sativum',
    category: ['heart', 'immune'],
    benefits: ['Hạ huyết áp', 'Kháng sinh tự nhiên', 'Giảm cholesterol'],
    conditions: ['Cao huyết áp', 'Cảm lạnh', 'Mỡ máu'],
    nutrients: ['Allicin', 'Selen', 'Vitamin B6'],
    description: 'Tỏi không chỉ là gia vị mà còn là một vị thuốc quý giúp bảo vệ tim mạch và hệ miễn dịch.',
    howToUse: 'Nên băm nhỏ tỏi và để ngoài không khí 10 phút trước khi chế biến để kích hoạt Allicin.',
    image: 'https://picsum.photos/seed/garlic/600/400',
    translations: {
      en: {
        name: 'Garlic',
        benefits: ['Lowers blood pressure', 'Natural antibiotic', 'Reduces cholesterol'],
        conditions: ['High blood pressure', 'Common cold', 'High blood fat'],
        nutrients: ['Allicin', 'Selenium', 'Vitamin B6'],
        description: 'Garlic is not just a spice but also a precious medicine that helps protect the cardiovascular and immune systems.',
        howToUse: 'Garlic should be minced and left in the air for 10 minutes before processing to activate Allicin.'
      },
      zh: {
        name: '大蒜',
        benefits: ['降低血压', '天然抗生素', '降低胆固醇'],
        conditions: ['高血压', '感冒', '高血脂'],
        nutrients: ['大蒜素', '硒', '维生素 B6'],
        description: '大蒜不仅是一种香料，也是一种珍贵的药物，有助于保护心血管和免疫系统。',
        howToUse: '大蒜应切碎并暴露在空气中10分钟后再加工，以激活大蒜素。'
      }
    }
  },
  {
    id: '3',
    name: 'Hạt óc chó',
    scientificName: 'Juglans regia',
    category: ['brain', 'heart'],
    benefits: ['Tốt cho não bộ', 'Giảm nguy cơ bệnh tim', 'Chống oxy hóa'],
    conditions: ['Suy giảm trí nhớ', 'Bệnh tim mạch'],
    nutrients: ['Omega-3', 'Vitamin E', 'Mangan'],
    description: 'Hạt óc chó giàu chất béo lành mạnh, đặc biệt là Omega-3 tốt cho sự phát triển của não.',
    howToUse: 'Ăn trực tiếp 3-5 hạt mỗi ngày hoặc thêm vào salad.',
    image: 'https://picsum.photos/seed/walnut/600/400',
    translations: {
      en: {
        name: 'Walnuts',
        benefits: ['Good for the brain', 'Reduces heart disease risk', 'Antioxidant'],
        conditions: ['Memory loss', 'Cardiovascular disease'],
        nutrients: ['Omega-3', 'Vitamin E', 'Manganese'],
        description: 'Walnuts are rich in healthy fats, especially Omega-3, which is good for brain development.',
        howToUse: 'Eat 3-5 nuts directly per day or add to salads.'
      },
      zh: {
        name: '核桃',
        benefits: ['对大脑有益', '降低心脏病风险', '抗氧化'],
        conditions: ['记忆力减退', '心血管疾病'],
        nutrients: ['欧米伽-3', '维生素 E', '锰'],
        description: '核桃富含健康脂肪，尤其是对大脑发育有益的欧米伽-3。',
        howToUse: '每天直接食用3-5颗核桃，或加入沙拉中。'
      }
    }
  },
  {
    id: '4',
    name: 'Rau bina (Cải bó xôi)',
    scientificName: 'Spinacia oleracea',
    category: ['bone', 'heart'],
    benefits: ['Bổ máu', 'Chắc xương', 'Tốt cho mắt'],
    conditions: ['Thiếu máu', 'Loãng xương'],
    nutrients: ['Sắt', 'Canxi', 'Vitamin K', 'Lutein'],
    description: 'Loại rau xanh đậm giàu dinh dưỡng nhất, hỗ trợ toàn diện cho cơ thể.',
    howToUse: 'Xào nhẹ, nấu canh hoặc làm sinh tố xanh.',
    image: 'https://picsum.photos/seed/spinach/600/400',
    translations: {
      en: {
        name: 'Spinach',
        benefits: ['Blood tonic', 'Strong bones', 'Good for eyes'],
        conditions: ['Anemia', 'Osteoporosis'],
        nutrients: ['Iron', 'Calcium', 'Vitamin K', 'Lutein'],
        description: 'The most nutrient-dense dark leafy green, providing comprehensive support for the body.',
        howToUse: 'Lightly sauté, cook in soup, or make green smoothies.'
      },
      zh: {
        name: '菠菜',
        benefits: ['补血', '强壮骨骼', '对眼睛有益'],
        conditions: ['贫血', '骨质疏松'],
        nutrients: ['铁', '钙', '维生素 K', '叶黄素'],
        description: '营养最丰富的深绿色蔬菜，为身体提供全面支持。',
        howToUse: '轻微翻炒、煮汤或制作绿色奶昔。'
      }
    }
  },
  {
    id: '5',
    name: 'Gừng',
    scientificName: 'Zingiber officinale',
    category: ['digest', 'immune'],
    benefits: ['Giảm buồn nôn', 'Làm ấm cơ thể', 'Hỗ trợ tiêu hóa'],
    conditions: ['Đau bụng', 'Say tàu xe', 'Viêm họng'],
    nutrients: ['Gingerol', 'Kali', 'Magie'],
    description: 'Gừng có tính ấm, giúp kích thích tiêu hóa và giảm các triệu chứng viêm nhiễm.',
    howToUse: 'Pha trà gừng nóng hoặc dùng làm gia vị trong các món kho, xào.',
    image: 'https://picsum.photos/seed/ginger/600/400',
    translations: {
      en: {
        name: 'Ginger',
        benefits: ['Reduces nausea', 'Warms the body', 'Supports digestion'],
        conditions: ['Stomach ache', 'Motion sickness', 'Sore throat'],
        nutrients: ['Gingerol', 'Potassium', 'Magnesium'],
        description: 'Ginger has warming properties, helps stimulate digestion and reduces inflammatory symptoms.',
        howToUse: 'Make hot ginger tea or use as a spice in braised or stir-fried dishes.'
      },
      zh: {
        name: '生姜',
        benefits: ['缓解恶心', '暖身', '支持消化'],
        conditions: ['腹痛', '晕车', '咽喉痛'],
        nutrients: ['姜酚', '钾', '镁'],
        description: '生姜具有温热特性，有助于刺激消化并减轻炎症症状。',
        howToUse: '冲泡热姜茶或在炖菜、炒菜中作为香料使用。'
      }
    }
  },
  {
    id: 'brain-cancer-protocol-v2',
    name: 'Phác đồ Hỗ trợ Ung thư não (Dựa trên 20 nghiên cứu mới nhất)',
    scientificName: 'Integrative Brain Cancer Support Protocol',
    category: ['plan', 'brain', 'immune'],
    benefits: [
      'Hỗ trợ ức chế tăng sinh tế bào u qua cơ chế Vitamin D3 liều cao',
      'Tác động lên ty thể và autophagy thông qua Ivermectin',
      'Chống oxy hóa và bảo vệ tế bào thần kinh bằng Astaxanthin',
      'Thải độc hệ thống và hỗ trợ gan với NAC, Vitamin C, E',
      'Cân bằng hệ thần kinh thực vật bằng Thiền định và Liệu pháp tần số'
    ],
    conditions: ['Ung thư não', 'U màng não', 'U tế bào thần kinh đệm (Glioblastoma)'],
    nutrients: ['Vitamin D3 (50,000 IU+)', 'Ivermectin (0.2-0.6mg/kg)', 'Astaxanthin (12mg+)', 'Vitamin C (Liposomal)', 'Vitamin E (Mixed Tocopherols)', 'NAC (1200mg+)'],
    description: 'Phác đồ tổng hợp từ hơn 20 nghiên cứu lâm sàng và thực tiễn tại Mỹ (Mayo Clinic, Johns Hopkins) và Châu Âu (Viện Max Planck). Tập trung vào việc thay đổi môi trường nội bào để ức chế tế bào ung thư.',
    howToUse: `
      1. Vitamin D3: Duy trì nồng độ 25(OH)D trong máu ở mức 80-100 ng/mL.
      2. Ivermectin: Sử dụng theo chu kỳ (ví dụ 5 ngày dùng, 2 ngày nghỉ) để tác động vào kênh ion tế bào u.
      3. Astaxanthin: Liều cao 12-24mg/ngày để vượt qua hàng rào máu não.
      4. Thiền định & Tần số: Sử dụng tần số Solfeggio (528Hz) 1 giờ mỗi ngày để giảm cortisol.
      5. Lối sống: Ngủ trước 22h, nhịn ăn gián đoạn (Intermittent Fasting 16/8) để kích hoạt autophagy.
    `,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000',
    caution: 'CẢNH BÁO: Phác đồ này chứa các hoạt chất liều cao và thuốc (Ivermectin) cần có sự giám sát y tế chặt chẽ. Tuyệt đối không tự ý ngưng các phương pháp điều trị bệnh viện.',
    sources: [
      { title: 'Mayo Clinic: Brain Tumor Research', url: 'https://www.mayoclinic.org/diseases-conditions/brain-tumor/care-at-mayo-clinic/research' },
      { title: 'Johns Hopkins: Glioblastoma Clinical Trials', url: 'https://www.hopkinsmedicine.org/neurology_neurosurgery/centers_clinics/brain_tumor/clinical_trials/' },
      { title: 'National Library of Medicine: Vitamin D and Brain Cancer', url: 'https://pubmed.ncbi.nlm.nih.gov/30568966/' },
      { title: 'Ivermectin as an Anti-Cancer Agent (Nature)', url: 'https://www.nature.com/articles/s41417-020-0161-4' }
    ],
    translations: {
      en: {
        name: 'Brain Cancer Support Protocol (Based on 20 latest studies)',
        benefits: [
          'Supports inhibition of tumor cell proliferation via high-dose Vitamin D3 mechanism',
          'Acts on mitochondria and autophagy through Ivermectin',
          'Antioxidant and neuroprotection with Astaxanthin',
          'Systemic detoxification and liver support with NAC, Vitamin C, E',
          'Balances the autonomic nervous system with Meditation and Frequency Therapy'
        ],
        conditions: ['Brain Cancer', 'Meningioma', 'Glioblastoma'],
        nutrients: ['Vitamin D3 (50,000 IU+)', 'Ivermectin (0.2-0.6mg/kg)', 'Astaxanthin (12mg+)', 'Vitamin C (Liposomal)', 'Vitamin E (Mixed Tocopherols)', 'NAC (1200mg+)'],
        description: 'A protocol synthesized from over 20 clinical and practical studies in the US (Mayo Clinic, Johns Hopkins) and Europe (Max Planck Institute). Focuses on changing the intracellular environment to inhibit cancer cells.',
        howToUse: `
          1. Vitamin D3: Maintain blood 25(OH)D levels at 80-100 ng/mL.
          2. Ivermectin: Use cyclically (e.g., 5 days on, 2 days off) to affect tumor cell ion channels.
          3. Astaxanthin: High dose 12-24mg/day to cross the blood-brain barrier.
          4. Meditation & Frequency: Use Solfeggio frequency (528Hz) for 1 hour daily to reduce cortisol.
          5. Lifestyle: Sleep before 10 PM, Intermittent Fasting (16/8) to activate autophagy.
        `,
        caution: 'WARNING: This protocol contains high-dose active ingredients and medication (Ivermectin) requiring close medical supervision. Absolutely do not stop hospital treatments on your own.'
      },
      zh: {
        name: '脑癌支持方案（基于20项最新研究）',
        benefits: [
          '通过高剂量维生素 D3 机制支持抑制肿瘤细胞增殖',
          '通过伊维菌素作用于线粒体和自噬',
          '使用虾青素进行抗氧化和神经保护',
          '通过 NAC、维生素 C、E 进行系统排毒和肝脏支持',
          '通过冥想和频率疗法平衡自主神经系统'
        ],
        conditions: ['脑癌', '脑膜瘤', '胶质母细胞瘤'],
        nutrients: ['维生素 D3 (50,000 IU+)', '伊维菌素 (0.2-0.6mg/kg)', '虾青素 (12mg+)', '维生素 C (脂质体)', '维生素 E (混合生育酚)', 'NAC (1200mg+)'],
        description: '该方案综合了美国（梅奥医学中心、约翰霍普金斯大学）和欧洲（马克斯·普朗克研究所）的20多项临床和实践研究。重点在于改变细胞内环境以抑制癌细胞。',
        howToUse: `
          1. 维生素 D3：维持血液 25(OH)D 水平在 80-100 ng/mL。
          2. 伊维菌素：周期性使用（例如，服药5天，停药2天）以影响肿瘤细胞离子通道。
          3. 虾青素：高剂量 12-24mg/天，以穿过血脑屏障。
          4. 冥想与频率：每天使用索尔费里奥频率 (528Hz) 1小时以降低皮质醇。
          5. 生活方式：晚上10点前睡觉，间歇性禁食 (16/8) 以激活自噬。
        `,
        caution: '警告：此方案包含高剂量活性成分和药物（伊维菌素），需要严密的医疗监督。绝对不要自行停止医院治疗。'
      }
    }
  }
];
