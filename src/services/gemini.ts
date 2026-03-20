import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;
let currentApiKey: string | null = localStorage.getItem('user_gemini_api_key');

const getAI = () => {
  const apiKey = currentApiKey || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please add it in Settings -> Secrets or provide your own key.");
  }

  // Re-initialize if the key has changed
  if (!aiInstance || (aiInstance as any).apiKey !== apiKey) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  
  return aiInstance;
};

export const setUserApiKey = (key: string | null) => {
  if (key) {
    localStorage.setItem('user_gemini_api_key', key);
  } else {
    localStorage.removeItem('user_gemini_api_key');
  }
  currentApiKey = key;
  aiInstance = null; // Reset instance to trigger re-initialization
};

export const getUserApiKey = () => currentApiKey;

export const getRemainingQuota = () => {
  const limit = 1500;
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem('gemini_quota_date');
  const storedCount = parseInt(localStorage.getItem('gemini_quota_count') || '0');

  if (storedDate !== today) {
    localStorage.setItem('gemini_quota_date', today);
    localStorage.setItem('gemini_quota_count', '0');
    return limit;
  }

  return Math.max(0, limit - storedCount);
};

const incrementQuotaCount = () => {
  const currentCount = parseInt(localStorage.getItem('gemini_quota_count') || '0');
  localStorage.setItem('gemini_quota_count', (currentCount + 1).toString());
};

export const askGemini = async (prompt: string) => {
  try {
    const ai = getAI();
    incrementQuotaCount();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Bạn là một chuyên gia dinh dưỡng và y học cổ truyền Việt Nam. Hãy trả lời các câu hỏi về thực phẩm bổ dưỡng và cách chữa bệnh bằng thực phẩm một cách khoa học, dễ hiểu và an toàn. Luôn nhắc nhở người dùng tham khảo ý kiến bác sĩ cho các tình trạng nghiêm trọng. Trả lời bằng tiếng Việt, định dạng Markdown.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return "Lỗi: Chưa cấu hình API Key. Vui lòng thêm GEMINI_API_KEY vào phần Settings -> Secrets.";
    }
    return "Xin lỗi, tôi gặp trục trặc khi kết nối. Vui lòng thử lại sau.";
  }
};
