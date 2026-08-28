// Archivo: app/api/chat/route.ts
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

import { portfolioData, Language } from "@/lib/portfolio-data";
import { matchCannedResponse } from "@/lib/assistant/matcher";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const SUPPORTED_LANGUAGES: Language[] = ["es", "en", "eu"];

export async function POST(req: NextRequest) {
  try {
    const { message, language } = (await req.json()) as { message: string; language: Language };

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "El mensaje no puede estar vacío." }, { status: 400 });
    }

    const safeLanguage: Language = SUPPORTED_LANGUAGES.includes(language) ? language : "es";

    // 1. CAPA LOCAL: respuestas pregrabadas (FAQ) servidas sin llamar al modelo.
    //    Cubre preguntas frecuentes y acotadas (cargo, origen, contacto, edad, etc.)
    //    de forma instantánea, determinista y con coste cero de tokens.
    try {
      const canned = matchCannedResponse(message, safeLanguage);
      if (canned) {
        return NextResponse.json({
          reply: canned.reply,
          source: "local",
          intent: canned.intentId,
          section: canned.section ?? null,
        });
      }
    } catch (matchError) {
      // Un fallo en el matcher nunca debe romper el chat: se continúa con la IA.
      console.error("Fallo en el matcher local, se continúa con la IA:", matchError);
    }

    // 2. FALLBACK IA: contexto compacto (sin FAQ, sin pretty-print) y respuesta acotada.
    const langInstruction =
      safeLanguage === "es" ? "Responde en español."
        : safeLanguage === "en" ? "Respond in English."
          : "Erantzun euskaraz.";

    const localizedContext = {
      name: portfolioData.name,
      age: portfolioData.age,
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
    };

    const systemPrompt = `
      Eres el asistente virtual del portafolio de Felipe Pereira.
      Tu tono debe ser amigable y profesional.

      **REGLAS:**
      - Entrega ÚNICAMENTE la respuesta final para el usuario. Está PROHIBIDO explicar tu razonamiento o incluir encabezados como "Análisis" o "Tarea".
      - Usa SOLO la información del contexto entregado. Si algo no aparece en el contexto, dilo con honestidad y sugiere contactar a Felipe.
      - Sé conciso: 1-4 frases, salvo que pidan explícitamente más detalle.
      - Usa Markdown para enlaces y **negrita** para resaltar nombres de servicios (**Landing Pages**, **WordPress**, **Aplicaciones Web**) y conceptos clave.
      - Idioma de respuesta: ${langInstruction}

      ---
      **CONTEXTO (JSON):**
      ${JSON.stringify(localizedContext)}
      ---
    `;

    const completion = await groq.chat.completions.create({
      model: MODEL,
      temperature: 0.5,
      max_tokens: 700,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ reply: text, source: "ai" });

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
