export const getOAuthProvider = (provider: 'google' | 'x'): 'google' | 'twitter' => {
  // Định danh kỹ thuật bắt buộc của Supabase cho nền tảng X
  return provider === 'x' ? 'twitter' : provider;
};
