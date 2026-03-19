import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const askGemini = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        systemInstruction: "Bạn là một chuyên gia dinh dưỡng và y học cổ truyền Việt Nam. Hãy trả lời các câu hỏi về thực phẩm bổ dưỡng và cách chữa bệnh bằng thực phẩm một cách khoa học, dễ hiểu và an toàn. Luôn nhắc nhở người dùng tham khảo ý kiến bác sĩ cho các tình trạng nghiêm trọng. Trả lời bằng tiếng Việt, định dạng Markdown.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Xin lỗi, tôi gặp trục trặc khi kết nối. Vui lòng thử lại sau.";
  }
};
