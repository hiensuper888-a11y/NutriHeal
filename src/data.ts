import { Food, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'heart', name: 'Tim mạch', icon: 'Heart', description: 'Thực phẩm tốt cho hệ tuần hoàn và huyết áp' },
  { id: 'digest', name: 'Tiêu hóa', icon: 'Stomach', description: 'Hỗ trợ dạ dày, đường ruột và hệ vi sinh' },
  { id: 'immune', name: 'Miễn dịch', icon: 'Shield', description: 'Tăng cường sức đề kháng, chống viêm' },
  { id: 'brain', name: 'Trí não', icon: 'Brain', description: 'Cải thiện trí nhớ và sự tập trung' },
  { id: 'bone', name: 'Xương khớp', icon: 'Bone', description: 'Chắc khỏe xương, giảm đau khớp' },
  { id: 'skin', name: 'Làm đẹp', icon: 'Sparkles', description: 'Đẹp da, mượt tóc từ bên trong' },
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
    caution: 'Người đang dùng thuốc loãng máu nên tham khảo ý kiến bác sĩ.'
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
    image: 'https://picsum.photos/seed/garlic/600/400'
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
    image: 'https://picsum.photos/seed/walnut/600/400'
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
    image: 'https://picsum.photos/seed/spinach/600/400'
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
    image: 'https://picsum.photos/seed/ginger/600/400'
  }
];
