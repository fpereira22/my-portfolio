// Archivo: app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

import { portfolioData, Language } from "@/lib/portfolio-data";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message, language } = (await req.json()) as { message: string; language: Language };

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const safeLanguage = ["es", "en", "eu"].includes(language) ? language : "es";
    const langInstruction =
      safeLanguage === 'es' ? 'Responde en español.'
        : safeLanguage === 'en' ? 'Respond in English.'
          : 'Erantzun euskaraz.';

    const localizedContext = {
      name: portfolioData.name,
      title: portfolioData.title[safeLanguage],
      contact: portfolioData.contact,
      about: portfolioData.about[safeLanguage],
      experience: portfolioData.experience[safeLanguage],
      technologies: portfolioData.technologies,
      projects: portfolioData.projects,
      certifications: portfolioData.certifications,
      site: portfolioData.site,
      services: portfolioData.services,
      education: portfolioData.education,
      scholarships: portfolioData.scholarships,
      websites: portfolioData.websites,
      faq: portfolioData.faq, // Asegúrate de pasar el FAQ al contexto
    };

    const portfolioContext = JSON.stringify(localizedContext, null, 2);

    const prompt = `
      Eres el asistente virtual del portafolio de Felipe Pereira.
      Tu tono debe ser amigable y profesional.

      **INSTRUCCIONES DE COMPORTAMIENTO (CRÍTICO):**
      1. **ANÁLISIS INTERNO:** Determina internamente si la pregunta está en el FAQ o requiere uso del contexto. NO muestres este análisis en la respuesta.
      2. **RESPUESTA FAQ:** Si coincide con el FAQ, responde EXACTAMENTE con el texto de la 'respuesta' predefinida.
      3. **RESPUESTA CONTEXTUAL:** Si no es FAQ, responde usando SOLO la información del contexto entregado.
      4. **FORMATO DE SALIDA:** Entrega ÚNICAMENTE la respuesta final al usuario. **ESTÁ PROHIBIDO** incluir textos como "TAREA 1", "Análisis", o explicar tu proceso.

      **REGLAS:**
      - Usa Markdown para enlaces y estilos.
      - **IMPORTANTE:** Usa **negrita** para resaltar los nombres de los servicios (ej: **Landing Pages**, **WordPress**, **Aplicaciones Web**) y conceptos clave.
      - Idioma de respuesta: ${langInstruction}

      ---
      **CONTEXTO (JSON):**
      ${portfolioContext}
      ---

      **MENSAJE DEL USUARIO:**
      "${message}"
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Error en la API de chat:", error);

    // Detectar Rate Limit (429) o cuota excedida
    const isRateLimit = error?.status === 429 ||
      error?.response?.status === 429 ||
      error?.message?.includes('429') ||
      error?.message?.toLowerCase().includes('quota') ||
      error?.message?.toLowerCase().includes('limit');

    if (isRateLimit) {
      return NextResponse.json(
        { error: "Demasiadas peticiones (Rate Limit). Intenta más tarde." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Hubo un problema al comunicarse con la IA." },
      { status: 500 }
    );
  }
}
