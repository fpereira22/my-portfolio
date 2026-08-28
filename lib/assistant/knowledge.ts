// Archivo: lib/assistant/knowledge.ts
//
// Respuestas pregrabadas ("canned") del asistente del portafolio.
// Sustituyen al antiguo `portfolioData.faq` y son la única fuente de verdad para
// las preguntas frecuentes. El matcher (`lib/assistant/matcher.ts`) las sirve
// SIN llamar al modelo, ahorrando tokens y garantizando respuestas consistentes
// y acotadas ("responde solo eso en específico").
//
// Cómo se decide una coincidencia (ver matcher.ts):
//   1. `questions`  -> coincidencia exacta (mensaje normalizado === pregunta normalizada)
//   2. `keywords`   -> frase multi-palabra como subcadena, o palabra suelta como token exacto
//   3. `questions`  -> coincidencia difusa (typos / paráfrasis) por coeficiente de Dice
//
// Los idiomas de `keywords`/`questions` se mezclan a propósito: da igual en qué
// idioma escriba el visitante, la respuesta se entrega en el idioma de la UI.

import { portfolioData, Language } from "@/lib/portfolio-data";

export type LocalizedText = Record<Language, string>;

/** IDs de las <section> de la web (app/page.tsx), para el botón "te llevo allá". */
export type SectionId =
  | "about"
  | "experience"
  | "education"
  | "scholarships"
  | "projects"
  | "websites"
  | "certifications"
  | "contact";

export interface CannedIntent {
  /** Identificador estable del intent (para logs / analítica). */
  id: string;
  /** Sección de la web a la que apunta esta respuesta (opcional). */
  section?: SectionId;
  /**
   * Frases o palabras clave en cualquier idioma.
   * - Multi-palabra ("de donde eres"): coincide si aparece como subcadena del mensaje.
   * - Palabra suelta ("linkedin"): coincide solo como token exacto (evita falsos positivos).
   */
  keywords: string[];
  /** Preguntas canónicas de ejemplo. Se usan para match exacto y difuso. */
  questions: string[];
  /** Respuesta curada por idioma. */
  answer: LocalizedText;
}

const { contact, title, services, certifications } = portfolioData;

const WELCOME_GIF =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW5mdWJmZ3R4MnNpdHFxNGVsbWJyYmd0bDRzOHRzZ2k1ZzB6eGcyaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o85xwxr06YNoFdSbm/giphy.gif";

const CARLITA_IMG =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoGc6zztxFvwRKGEbyXIzRiGY-pzy10cuvqQ&s";

export const CANNED_INTENTS: CannedIntent[] = [
  {
    id: "saludo",
    keywords: [
      "hola", "holaa", "buenas", "buenos dias", "buenas tardes", "buenas noches",
      "hey", "hi", "hello", "kaixo", "egun on",
    ],
    questions: ["hola", "buenas", "hola que tal", "hi", "hello there", "kaixo"],
    answer: {
      es: "¡Hola! 👋 Soy el asistente virtual de Felipe. Puedes preguntarme por su experiencia, formación, proyectos, tecnologías o cómo contactarlo.",
      en: "Hi! 👋 I'm Felipe's virtual assistant. Ask me about his experience, education, projects, tech stack or how to get in touch.",
      eu: "Kaixo! 👋 Feliperen laguntzaile birtuala naiz. Galdetu bere esperientziaz, formakuntzaz, proiektuez, teknologiez edo harekin nola harremanetan jarri.",
    },
  },
  {
    id: "agradecimiento",
    keywords: [
      "gracias", "muchas gracias", "mil gracias", "thank you", "thanks", "thx",
      "eskerrik asko", "mila esker",
    ],
    questions: ["gracias", "muchas gracias", "thank you", "thanks a lot", "eskerrik asko"],
    answer: {
      es: `¡De nada! Si tienes cualquier otra pregunta, aquí estoy. ![You're welcome GIF](${WELCOME_GIF})`,
      en: `You're welcome! If you have any other questions, I'm here. ![You're welcome GIF](${WELCOME_GIF})`,
      eu: `Ez horregatik! Beste galderarik baduzu, hemen nago. ![You're welcome GIF](${WELCOME_GIF})`,
    },
  },
  {
    id: "nombre",
    keywords: [
      "como se llama", "como te llamas", "cual es tu nombre", "cual es su nombre",
      "what is your name", "whats your name", "your name",
      "zein da zure izena", "nola duzu izena",
    ],
    questions: ["como se llama", "cual es su nombre", "what is your name", "whats his name", "zein da bere izena"],
    answer: {
      es: `Se llama **${portfolioData.name}**, ${title.es}.`,
      en: `His name is **${portfolioData.name}**, a ${title.en}.`,
      eu: `Bere izena **${portfolioData.name}** da, ${title.eu}.`,
    },
  },
  {
    id: "profesion",
    section: "about",
    keywords: [
      "a que te dedicas", "a que se dedica", "que eres", "cual es tu profesion",
      "cual es su profesion", "que hace felipe", "quien es felipe",
      "what do you do", "what does he do", "your profession", "who is felipe",
      "zertan aritzen zara", "zer da zure lanbidea",
    ],
    questions: ["a que te dedicas", "cual es tu profesion", "que hace felipe", "what do you do", "what is your profession"],
    answer: {
      es: `Felipe es **${title.es}**, especializado en desarrollo Full Stack e Inteligencia Artificial, con experiencia en Ciencia de Datos, Visión por Computadora e Investigación de Operaciones.`,
      en: `Felipe is a **${title.en}** specialized in Full Stack development and Artificial Intelligence, with experience in Data Science, Computer Vision and Operations Research.`,
      eu: `Felipe **${title.eu}** da, Full Stack garapenean eta Adimen Artifizialean espezializatua, Datu Zientzian, Ikusmen Artifizialean eta Eragiketen Ikerketan esperientziarekin.`,
    },
  },
  {
    id: "cargo_actual",
    section: "experience",
    keywords: [
      "en que cargo", "que cargo tienes", "que cargo ocupas", "cual es tu cargo",
      "cual es su cargo", "puesto actual", "en que trabajas", "en que trabajas ahora",
      "de que trabajas", "cual es tu trabajo", "que trabajo tienes", "en que trabaja felipe",
      "donde trabajas", "donde trabaja", "trabajo actual", "en que estas trabajando",
      "a que se dedica ahora", "bancoestado", "banco estado", "current job", "current role",
      "current position", "where do you work now", "what is your job", "whats your job",
      "what do you work on", "zein kargu", "non lan egiten duzu orain",
    ],
    questions: [
      "en que cargo estas", "en que trabajas", "que cargo tienes", "cual es tu puesto actual",
      "donde trabajas ahora", "what is your current job", "what is your current role",
      "where do you work now",
    ],
    answer: {
      es: "Actualmente es **Ingeniero de Procesos – Sistemas en BancoEstado** (desde agosto de 2026), donde trabaja en reportería y dashboards avanzados sobre Salesforce Financial Services Cloud. En paralelo trabaja como desarrollador freelance.",
      en: "He currently works as a **Process Engineer – Systems at BancoEstado** (since August 2026), building advanced reporting and dashboards on Salesforce Financial Services Cloud. He also works as a freelance developer.",
      eu: "Gaur egun **Prozesu Ingeniaria – Sistemak da BancoEstado-n** (2026ko abuztutik), Salesforce Financial Services Cloud gainean txosten eta dashboard aurreratuak eginez. Horrez gain, garatzaile freelance gisa aritzen da.",
    },
  },
  {
    id: "origen",
    keywords: [
      "de donde eres", "de donde es", "de donde vienes", "cual es tu nacionalidad",
      "que nacionalidad", "donde vives", "donde vive", "donde estas basado",
      "donde reside", "de que pais", "where are you from", "where is he from",
      "your nationality", "where do you live", "nongoa zara", "non bizi zara",
    ],
    questions: [
      "de donde eres", "de donde es felipe", "cual es tu nacionalidad", "donde vives",
      "where are you from", "where does he live",
    ],
    answer: {
      es: "Felipe es chileno y está radicado entre **Santiago (Chile)**, **Bilbao (España)** y **Cali (Colombia)**.",
      en: "Felipe is Chilean and is based between **Santiago (Chile)**, **Bilbao (Spain)** and **Cali (Colombia)**.",
      eu: "Felipe txiletarra da eta **Santiago (Txile)**, **Bilbo (Espainia)** eta **Cali (Kolonbia)** hirien artean bizi da.",
    },
  },
  {
    id: "edad",
    keywords: [
      "que edad", "cuantos anos tiene", "cuantos anos tienes", "how old are you",
      "how old is he", "what is your age", "zenbat urte",
    ],
    questions: ["que edad tiene", "cuantos anos tienes", "how old are you", "what is your age"],
    answer: {
      es: `Felipe tiene ${portfolioData.age} años.`,
      en: `Felipe is ${portfolioData.age} years old.`,
      eu: `Felipek ${portfolioData.age} urte ditu.`,
    },
  },
  {
    id: "contacto",
    section: "contact",
    keywords: [
      "como puedo contactarte", "como te contacto", "como contactar", "como contactarte",
      "como contacto con felipe", "cual es tu email", "cual es tu correo", "tu correo",
      "your email", "how can i contact you", "how to contact", "how do i reach",
      "your whatsapp", "tu whatsapp", "nola jarri harremanetan",
    ],
    questions: [
      "como puedo contactarte", "cual es tu email", "how can i contact you",
      "what is your email", "how do i reach felipe",
    ],
    answer: {
      es: `Puedes contactar a Felipe por email a **${contact.email}**, por [WhatsApp](https://wa.me/${contact.whatsapp}?text=Hola,%20me%20interesa%20contactarme%20contigo), a través de su [LinkedIn](${contact.linkedin}) o con el formulario de la sección **Contacto** de la web.`,
      en: `You can reach Felipe by email at **${contact.email}**, on [WhatsApp](https://wa.me/${contact.whatsapp}?text=Hola,%20me%20interesa%20contactarme%20contigo), through his [LinkedIn](${contact.linkedin}), or via the form in the **Contact** section of the site.`,
      eu: `Felipe posta elektronikoz kontakta dezakezu **${contact.email}** helbidean, [WhatsApp](https://wa.me/${contact.whatsapp}?text=Hola,%20me%20interesa%20contactarme%20contigo) bidez, bere [LinkedIn](${contact.linkedin}) bidez edo webeko **Kontaktua** ataleko inprimakiaren bidez.`,
    },
  },
  {
    id: "linkedin",
    keywords: ["linkedin"],
    questions: ["cual es tu linkedin", "tu linkedin", "your linkedin", "linkedin profile"],
    answer: {
      es: `El LinkedIn de Felipe: [Ver perfil](${contact.linkedin}).`,
      en: `Felipe's LinkedIn: [View profile](${contact.linkedin}).`,
      eu: `Feliperen LinkedIn: [Ikusi profila](${contact.linkedin}).`,
    },
  },
  {
    id: "github",
    keywords: ["github", "repositorios", "repos"],
    questions: ["cual es tu github", "tu github", "your github", "github profile", "donde estan tus repositorios"],
    answer: {
      es: `El GitHub de Felipe: [${contact.github}](${contact.github}).`,
      en: `Felipe's GitHub: [${contact.github}](${contact.github}).`,
      eu: `Feliperen GitHub: [${contact.github}](${contact.github}).`,
    },
  },
  {
    id: "disponibilidad",
    section: "contact",
    keywords: [
      "estas disponible para trabajar", "estas disponible", "buscas trabajo",
      "esta buscando trabajo", "disponibilidad laboral", "estas abierto a oportunidades",
      "estas en busqueda", "are you available for work", "are you available",
      "are you looking for a job", "open to opportunities", "lan bila zabiltza",
      "eskuragarri zaude",
    ],
    questions: [
      "estas disponible para trabajar", "buscas trabajo", "cual es tu disponibilidad laboral",
      "are you available for work", "are you looking for a job",
    ],
    answer: {
      es: "Sí. Felipe está abierto a nuevas oportunidades laborales y proyectos, tanto en empresa como freelance, alineados con desarrollo full-stack, AI Development y análisis de datos. Puedes escribirle por email o LinkedIn; a la izquierda también tienes un botón con sus redes sociales.",
      en: "Yes. Felipe is open to new job opportunities and projects, both in-house and freelance, around full-stack development, AI Development and data analysis. You can reach him by email or LinkedIn — there's also a button with his social links on the left.",
      eu: "Bai. Felipe lan-aukera eta proiektu berrietara irekita dago, bai enpresan bai freelance, full-stack garapena, AI Development eta datu-analisiaren inguruan. Idatzi iezaiozu emailez edo LinkedIn bidez; ezkerrean bere sare sozialen botoia ere baduzu.",
    },
  },
  {
    id: "sueldo",
    keywords: [
      "sueldo esperado", "expectativas salariales", "expectativa salarial",
      "cuanto quieres ganar", "pretension de renta", "cuanto cobras al mes",
      "salary expectations", "expected salary", "soldata itxaropenak",
    ],
    questions: [
      "cual es tu sueldo esperado", "cuales son tus expectativas salariales",
      "what are your salary expectations",
    ],
    answer: {
      es: "Felipe prefiere conversar las expectativas salariales durante el proceso de entrevista, ya que dependen del rol, las responsabilidades y los beneficios.",
      en: "Felipe prefers to discuss salary expectations during the interview process, since they depend on the role, responsibilities and benefits.",
      eu: "Felipek elkarrizketa-prozesuan hitz egin nahiago ditu soldata-itxaropenak, rolaren, erantzukizunen eta onuren araberakoak baitira.",
    },
  },
  {
    id: "titulo",
    section: "education",
    keywords: [
      "estas graduado", "estas titulado", "ya te titulaste", "tienes tu titulo",
      "eres ingeniero titulado", "terminaste la carrera", "are you graduated",
      "did you graduate", "tituluduna zara",
    ],
    questions: ["estas graduado", "ya te titulaste", "tienes tu titulo", "are you graduated"],
    answer: {
      es: "Sí. Felipe está titulado con honores: **Ingeniero Civil Informático** y **Licenciado en Ciencias de la Ingeniería**, ambos con distinción máxima en la Universidad Andrés Bello. Actualmente cursa el Magíster en Ingeniería Informática.",
      en: "Yes. Felipe graduated with honors: a **Computer Science & Civil Engineering** degree and a **Bachelor of Engineering Science**, both with top distinction at Universidad Andrés Bello. He is currently pursuing a Master's in Software Engineering.",
      eu: "Bai. Felipe ohorezko aipamenarekin lizentziatu zen: **Informatikako Ingeniari Zibila** eta **Ingeniaritza Zientzietan Lizentziatua**, biak gehieneko bereizketarekin Universidad Andrés Bello-n. Gaur egun Informatika Ingeniaritzako Masterra egiten ari da.",
    },
  },
  {
    id: "estudios_actuales",
    section: "education",
    keywords: [
      "que estudias", "que estas estudiando", "estas estudiando", "que cursas",
      "que estudias ahora", "estudias actualmente", "haciendo un magister",
      "estas haciendo un master", "what are you studying", "are you studying",
      "your masters", "zer ikasten ari zara",
    ],
    questions: [
      "que estudias", "que estas estudiando ahora", "que estas cursando",
      "what are you studying", "are you studying something",
    ],
    answer: {
      es: "Felipe cursa un **Magíster en Ingeniería Informática** en la Universidad Andrés Bello (UNAB), con especialización en Ingeniería de Software, Data Science e Inteligencia Artificial.",
      en: "Felipe is doing a **Master's in Software Engineering** at Universidad Andrés Bello (UNAB), specializing in Software Engineering, Data Science and Artificial Intelligence.",
      eu: "Felipe **Informatika Ingeniaritzako Masterra** egiten ari da Universidad Andrés Bello-n (UNAB), Software Ingeniaritzan, Datu Zientzian eta Adimen Artifizialean espezializatuta.",
    },
  },
  {
    id: "educacion",
    section: "education",
    keywords: [
      "donde estudiaste", "donde estudio", "que estudiaste", "que estudio",
      "cual es tu formacion academica", "tu formacion", "donde te formaste",
      "where did you study", "what did you study", "your education", "non ikasi zenuen",
    ],
    questions: [
      "donde estudiaste", "que estudiaste", "cual es tu formacion academica",
      "where did you study", "what did you study",
    ],
    answer: {
      es: "Felipe estudió en la **Universidad Andrés Bello** (Ingeniero Civil Informático y Licenciatura en Ciencias de la Ingeniería, ambos con distinción máxima), hizo un intercambio en la **Pontificia Universidad Javeriana Cali** y actualmente cursa el **Magíster en Ingeniería Informática**.",
      en: "Felipe studied at **Universidad Andrés Bello** (Computer Science & Civil Engineering plus a Bachelor of Engineering Science, both with top distinction), did an exchange at **Pontificia Universidad Javeriana Cali**, and is currently doing a **Master's in Software Engineering**.",
      eu: "Felipek **Universidad Andrés Bello**-n ikasi zuen (Informatikako Ingeniari Zibila eta Ingeniaritza Zientzietako Lizentzia, biak gehieneko bereizketarekin), truke bat egin zuen **Pontificia Universidad Javeriana Cali**-n, eta gaur egun **Informatika Ingeniaritzako Masterra** egiten ari da.",
    },
  },
  {
    id: "proyectos",
    section: "projects",
    keywords: [
      "donde puedo ver tus proyectos", "donde veo tus proyectos", "muestrame tus proyectos",
      "que proyectos tienes", "que proyectos has hecho", "ver tus proyectos",
      "tu portafolio de proyectos", "where can i see your projects", "show me your projects",
      "your projects", "nire proiektuak non", "zure proiektuak",
    ],
    questions: [
      "donde puedo ver tus proyectos", "muestrame tus proyectos",
      "where can i see your projects", "nire proiektuak non ikus ditzaket",
    ],
    answer: {
      es: "Puedes ver todos sus proyectos en la sección **Proyectos** del portafolio. Algunos destacados: **FinSightAI** (salud financiera con IA), **Predictor Mundial 2026** (Machine Learning + Monte Carlo) y **Road Infrastructure AI** (visión por computadora para infraestructura vial).",
      en: "You can see all his projects in the **Projects** section of the portfolio. Some highlights: **FinSightAI** (AI financial health), **World Cup 2026 Predictor** (Machine Learning + Monte Carlo) and **Road Infrastructure AI** (computer vision for road infrastructure).",
      eu: "Bere proiektu guztiak portfolioko **Proiektuak** atalean ikus ditzakezu. Nabarmentzekoak: **FinSightAI** (finantza-osasuna IArekin), **2026ko Munduko Kopa Iragarlea** (Machine Learning + Monte Carlo) eta **Road Infrastructure AI** (ikusmen artifiziala errepideetarako).",
    },
  },
  {
    id: "tecnologias",
    section: "experience",
    keywords: [
      "que tecnologias usas", "que tecnologias manejas", "que stack usas", "cual es tu stack",
      "que lenguajes de programacion", "que lenguajes manejas", "con que trabajas",
      "what technologies do you use", "your tech stack", "what languages do you use",
      "zein teknologia erabiltzen dituzu",
    ],
    questions: [
      "que tecnologias usas", "cual es tu stack", "que lenguajes manejas",
      "what technologies do you use", "what is your tech stack",
    ],
    answer: {
      es: "Trabaja principalmente con **Python**, **TypeScript/JavaScript**, **Java**, **React**, **Next.js**, **Angular**, **Vue.js**, **Node.js**, **PostgreSQL**, **AWS** y **Power BI**, entre otras. Tienes la lista completa en la sección **Experiencia**.",
      en: "He mainly works with **Python**, **TypeScript/JavaScript**, **Java**, **React**, **Next.js**, **Angular**, **Vue.js**, **Node.js**, **PostgreSQL**, **AWS** and **Power BI**, among others. The full list is in the **Experience** section.",
      eu: "Nagusiki **Python**, **TypeScript/JavaScript**, **Java**, **React**, **Next.js**, **Angular**, **Vue.js**, **Node.js**, **PostgreSQL**, **AWS** eta **Power BI**-rekin lan egiten du, besteak beste. Zerrenda osoa **Esperientzia** atalean duzu.",
    },
  },
  {
    id: "servicios",
    keywords: [
      "que servicios ofreces", "que servicios freelance", "cuanto cobras", "cuanto cuesta una web",
      "precio de una landing", "tus tarifas", "cuanto vale una pagina web",
      "what services do you offer", "your freelance services", "how much do you charge",
      "zein zerbitzu eskaintzen dituzu",
    ],
    questions: [
      "que servicios ofreces", "cuanto cobras por una web", "cuales son tus tarifas",
      "what services do you offer", "how much do you charge",
    ],
    answer: {
      es: `Felipe ofrece como freelance: **${services[0].service}** (desde ${services[0].price}), **${services[1].service}** (desde ${services[1].price}) y **${services[2].service}** a medida — ${services[2].price}.`,
      en: `As a freelancer, Felipe offers: **${services[0].service}** (from ${services[0].price}), **${services[1].service}** (from ${services[1].price}) and custom **${services[2].service}** — ${services[2].price}.`,
      eu: `Freelance gisa, Felipek eskaintzen ditu: **${services[0].service}** (${services[0].price}-tik), **${services[1].service}** (${services[1].price}-tik) eta neurrira egindako **${services[2].service}** — ${services[2].price}.`,
    },
  },
  {
    id: "certificaciones",
    section: "certifications",
    keywords: [
      "cuantas certificaciones", "que certificaciones tienes", "tus certificaciones",
      "estas certificado", "how many certifications", "your certifications",
      "zein ziurtagiri dituzu",
    ],
    questions: [
      "cuantas certificaciones tienes", "que certificaciones tienes",
      "how many certifications do you have", "what certifications do you have",
    ],
    answer: {
      es: `Felipe cuenta con más de 60 certificaciones profesionales. Puedes ver la lista completa y actualizada en su [LinkedIn](${certifications.link}).`,
      en: `Felipe holds more than 60 professional certifications. You can see the full, up-to-date list on his [LinkedIn](${certifications.link}).`,
      eu: `Felipek 60 ziurtagiri profesional baino gehiago ditu. Zerrenda osoa eta eguneratua bere [LinkedIn](${certifications.link})-en ikus dezakezu.`,
    },
  },
  {
    id: "carlita",
    keywords: ["ola carlita", "hola carlita", "carlita"],
    questions: ["ola carlita", "hola carlita"],
    answer: {
      es: `![carlita PNG](${CARLITA_IMG}) No te acordai ná?`,
      en: `![carlita PNG](${CARLITA_IMG}) No te acordai ná?`,
      eu: `![carlita PNG](${CARLITA_IMG}) No te acordai ná?`,
    },
  },
];
