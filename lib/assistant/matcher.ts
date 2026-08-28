// Archivo: lib/assistant/matcher.ts
//
// Capa de coincidencia local para el asistente. Dado un mensaje del visitante,
// intenta resolverlo con una respuesta pregrabada de `knowledge.ts` SIN llamar
// al modelo. Si no hay una coincidencia suficientemente fiable devuelve `null`
// y el endpoint hace fallback al LLM.
//
// Estrategias (de mas a menos fiable):
//   1. exact   -> el mensaje normalizado coincide literalmente con una pregunta canonica
//   2. keyword -> una frase clave aparece como secuencia contigua de palabras en
//                 el mensaje, o una palabra clave suelta coincide como token exacto
//   3. fuzzy   -> similitud alta (coeficiente de Dice sobre bigramas) con una
//                 pregunta canonica; cubre typos y pequenas parafrasis

import { Language } from "@/lib/portfolio-data";
import { CANNED_INTENTS, SectionId } from "@/lib/assistant/knowledge";

export interface CannedMatch {
  intentId: string;
  reply: string;
  score: number;
  strategy: "exact" | "keyword" | "fuzzy";
  /** Sección de la web a la que apunta la respuesta, si la hay. */
  section?: SectionId;
}

/** Umbral minimo de similitud para aceptar una coincidencia difusa. */
const FUZZY_THRESHOLD = 0.8;

// Rango Unicode de marcas diacriticas combinantes (se eliminan tras NFD).
const COMBINING_MARKS = /[̀-ͯ]/g;
const NON_ALPHANUMERIC = /[^a-z0-9\s]/g;

/**
 * Normaliza texto para comparar: minusculas, sin acentos/diacriticos, sin
 * puntuacion y con espacios colapsados.
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(NON_ALPHANUMERIC, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** `true` si `phrase` aparece como secuencia contigua de palabras dentro de `haystack`. */
function containsPhrase(haystack: string[], phrase: string[]): boolean {
  if (phrase.length === 0 || phrase.length > haystack.length) return false;
  for (let i = 0; i + phrase.length <= haystack.length; i += 1) {
    let all = true;
    for (let j = 0; j < phrase.length; j += 1) {
      if (haystack[i + j] !== phrase[j]) {
        all = false;
        break;
      }
    }
    if (all) return true;
  }
  return false;
}

function bigrams(value: string): string[] {
  const grams: string[] = [];
  for (let i = 0; i < value.length - 1; i += 1) {
    grams.push(value.slice(i, i + 2));
  }
  return grams;
}

/** Coeficiente de Sorensen-Dice sobre bigramas de caracteres. Rango [0, 1]. */
function diceCoefficient(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;

  const aGrams = bigrams(a);
  const bGrams = bigrams(b);
  const counts = new Map<string, number>();

  for (const gram of bGrams) {
    counts.set(gram, (counts.get(gram) ?? 0) + 1);
  }

  let matches = 0;
  for (const gram of aGrams) {
    const remaining = counts.get(gram) ?? 0;
    if (remaining > 0) {
      counts.set(gram, remaining - 1);
      matches += 1;
    }
  }

  return (2 * matches) / (aGrams.length + bGrams.length);
}

/**
 * Intenta resolver `message` con una respuesta pregrabada en el idioma dado.
 * Devuelve la mejor coincidencia o `null` si ninguna supera el umbral.
 */
export function matchCannedResponse(message: string, language: Language): CannedMatch | null {
  const normalizedMessage = normalize(message);
  if (!normalizedMessage) return null;

  const messageTokens = normalizedMessage.split(" ");
  const tokenSet = new Set(messageTokens);
  let best: CannedMatch | null = null;

  const consider = (candidate: CannedMatch) => {
    if (!best || candidate.score > best.score) {
      best = candidate;
    }
  };

  for (const intent of CANNED_INTENTS) {
    const reply = intent.answer[language] ?? intent.answer.es;

    // 1. Coincidencia exacta con una pregunta canonica -> resultado inmediato.
    for (const question of intent.questions) {
      if (normalize(question) === normalizedMessage) {
        return { intentId: intent.id, reply, score: 1, strategy: "exact", section: intent.section };
      }
    }

    // 2. Palabra clave: frase como secuencia contigua de palabras, o palabra suelta como token.
    for (const keyword of intent.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (!normalizedKeyword) continue;

      const keywordTokens = normalizedKeyword.split(" ");
      const isPhrase = keywordTokens.length > 1;
      const hit = isPhrase
        ? containsPhrase(messageTokens, keywordTokens)
        : tokenSet.has(normalizedKeyword);

      if (hit) {
        consider({
          intentId: intent.id,
          reply,
          score: isPhrase ? 0.95 : 0.9,
          strategy: "keyword",
          section: intent.section,
        });
        break;
      }
    }

    // 3. Coincidencia difusa (typos / parafrasis) contra las preguntas canonicas.
    for (const question of intent.questions) {
      const score = diceCoefficient(normalizedMessage, normalize(question));
      if (score >= FUZZY_THRESHOLD) {
        consider({ intentId: intent.id, reply, score, strategy: "fuzzy", section: intent.section });
      }
    }
  }

  return best;
}
