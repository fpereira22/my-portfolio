// Archivo: app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import { NextRequest, NextResponse } from "next/server";

import { portfolioData, Language } from "@/lib/portfolio-data";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message, language } = (await req.json()) as { message: string; language: Language };
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
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
      faq: portfolioData.faq, // Asegúrate de pasar el FAQ al contexto
    };

    const portfolioContext = JSON.stringify(localizedContext, null, 2);

    // =============================================================
    // >> INICIO DEL PROMPT FINAL CORREGIDO <<
    // =============================================================
    const prompt = `
      Eres el asistente virtual del portafolio de Felipe Pereira. Tu objetivo es seguir un proceso lógico para responder.
      Tu tono debe ser amigable y profesional.
      
      **PROCESO Y REGLAS A SEGUIR:**

      **TAREA 1: VERIFICAR COINCIDENCIA EN FAQ.**
      - Tu primera y más importante tarea es analizar la **intención** de la pregunta del usuario.
      - Compara el significado de la pregunta del usuario con la lista de \`preguntas\` dentro de la sección \`faq\` del contexto.
      - Para esta tarea, sé flexible. Considera que hay una coincidencia si el significado es el mismo, incluso si las palabras son diferentes, son coloquiales o tienen pequeños errores tipográficos (ej: "gracais" debe coincidir con "Gracias").
      - Una vez que termines esta tarea, pasa a la Tarea 2.

      **TAREA 2: DECIDIR LA RESPUESTA.**
      - **SI** en la Tarea 1 encontraste una coincidencia con una pregunta del FAQ: Tu respuesta **DEBE SER** el contenido exacto y literal del campo \`respuesta\` correspondiente a esa pregunta. No añadas, quites ni modifiques nada. Simplemente devuelve ese texto, incluyendo cualquier formato Markdown.
      - **SI NO** encontraste una coincidencia en la Tarea 1: Procede a formular una respuesta basándote **únicamente en el resto del contexto general** (\`about\`, \`projects\`, etc.). Si la información no está ahí, responde amablemente que no tienes ese detalle específico.

      **REGLAS ADICIONALES DE FORMATO:**
      - Utiliza siempre formato Markdown para los enlaces: \`[texto](URL)\`.
      - Responde siempre en el idioma especificado en las instrucciones.

      **INSTRUCCIONES DE IDIOMA:**
      - ${langInstruction}

      ---
      **CONTEXTO DEL PORTAFOLIO (en formato JSON):**
      ${portfolioContext}
      ---

      **PREGUNTA DEL USUARIO:**
      "${message}"
    `;
    // =============================================================
    // >> FIN DEL PROMPT FINAL CORREGIDO <<
    // =============================================================

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Error en la API de chat:", error);
    return NextResponse.json(
      { error: "Hubo un problema al comunicarse con la IA." },
      { status: 500 }
    );
  }
}