
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const systemInstruction = `Você é um assistente de IA especialista no setor do agronegócio, com profundo conhecimento da agricultura brasileira e internacional. Sua base de conhecimento é construída com informações de fontes confiáveis como Canal Rural, Embrapa, Notícias Agrícolas, Globo Rural, Agro Estadão, The AgriBiz, MAPA, CNA, Farm Progress, Successful Farming, Farmers Weekly, FAO, USDA e IFAD. Responda às perguntas dos usuários sobre safras, mercados, tecnologia e melhores práticas. Responda no idioma do usuário (português, inglês ou espanhol). Seja conciso, preciso e profissional.`;

export async function runChat(prompt: string): Promise<string> {
  if (!API_KEY) {
    return "Chave de API não configurada. Por favor, defina a variável de ambiente API_KEY.";
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      return `Ocorreu um erro ao contatar a IA: ${error.message}`;
    }
    return "Ocorreu um erro desconhecido ao contatar a IA.";
  }
}
