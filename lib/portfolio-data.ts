export type Language = "es" | "en" | "eu";

export const portfolioData = {
  name: "Felipe Pereira A.",
  title: {
    es: "Ingeniero Civil Informático",
    en: "Software Engineer",
    eu: "Informatikako Ingeniari Zibila",
  },
  contact: {
    email: "f.pereiraalarcn@gmail.com",
    linkedin: "https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/",
    github: "https://github.com/fpereira22",
    instagram: "https://www.instagram.com/_f.pereira14",
    instructions: "Puedes contactar a Felipe directamente por email (f.pereiraalarcn@gmail.com), a través de su LinkedIn, usando el formulario de contacto en la sección 'Contacto' de la web, o por [WhatsApp](https://wa.me/56989213006?text=Hola,%20me%20interesa%20contactarme%20contigo) para más información.",
  },
  about: {
    es: "Ingeniero Civil Informático con sólida formación académica y experiencia práctica en desarrollo de aplicaciones. Realicé un intercambio académico en la Pontíficia Universidad Javeriana Cali. Especializado en programación funcional y metodologías ágiles para el desarrollo de software. Mi enfoque se centra en la calidad del código y la implementación de soluciones escalables. Tengo la capacidad de adaptación rápida a nuevas tecnologías y entornos de trabajo. Además de mi trabajo en SSGL, me desempeño como desarrollador freelancer creando aplicaciones y sitios web a medida.",
    en: "Software Engineer with solid academic background and practical experience in application development. I did an academic exchange at Pontíficia Universidad Javeriana Cali. Specialized in functional programming and agile methodologies for software development. My focus is on code quality and implementation of scalable solutions. I have the ability for quick adaptation to new technologies and work environments. In addition to my work at SSGL, I work as a freelance developer creating custom applications and websites.",
    eu: "Informatikako Ingeniari Zibila heziketa akademiko sendoa eta aplikazio garapenean esperientzia praktikoa dituena. Truke akademiko bat egin nuen Pontíficia Universidad Javeriana Cali-n. Espezializatua programazio funtzionalean eta software garapenerako metodologia arinak. Nire fokua kode kalitatea eta soluzio eskalagarrien inplementazioan dago. Gaitasuna dut egokitzapen azkarreko teknologia berrietara eta lan inguruneetara. SSGL-en egiten dudan lanaz gain, garatzaile freelance gisa aritzen naiz aplikazioak eta webguneak neurrira sortuz.",
  },
  experience: {
    es: "Durante mi formación en la facultad de Ingeniería de la Universidad Andres Bello, he estado desarrollando tanto proyectos personales como profesionales. Esto me ha permitido consolidar mis habilidades técnicas en análisis de datos, ciberseguridad, algoritmos, investigación de operaciones y gestión de proyectos. A lo largo de este tiempo, he trabajado con diversos entornos y tecnologías, aplicándolos en múltiples proyectos. Esta diversidad de experiencias me ha proporcionado una visión más amplia del desarrollo de software, lo que me permite mejorar continuamente mi capacidad profesional y mantener una mentalidad de aprendizaje constante. Busco constantemente expandir mis conocimientos y continuar perfeccionando mis habilidades, siempre en busca de nuevas oportunidades para innovar y crear soluciones que no solo sean efectivas, sino también óptimas, eficientes y adaptables a las necesidades del proyecto.",
    en: "During my studies at the Faculty of Engineering at Universidad Andrés Bello, I have been developing both personal and professional projects. This has allowed me to consolidate my technical skills in data analysis, cybersecurity, algorithms, operations research and project management. Throughout this time, I have worked with various environments and technologies, applying them in multiple projects. This diversity of experiences has provided me with a broader vision of software development, which allows me to continuously improve my professional capacity and maintain a mindset of constant learning. I constantly seek to expand my knowledge and continue perfecting my skills, always looking for new opportunities to innovate and create solutions that are not only effective, but also optimal, efficient, and adaptable to project needs.",
    eu: "Nire ikasketetan Ingeniaritza Fakultatean Universidad Andrés Bello, proiektu pertsonalak eta profesionalak garatzen egon naiz. Honek nire trebetasun teknikoak sendotzea ahalbidetu dit datu-analisian, ziberseguritasunean, algoritmoetan, eragiketa ikerketan eta proiektu kudeaketan. Denbora honetan zehar, hainbat inguru eta teknologiekin lan egin dut, hauek proiektu anitzetan aplikatuz. Esperientzia aniztasun honek ikuspegi zabalagoa eman dit software garapenari buruz, eta honek nire gaitasun profesionala etengabe hobetzea eta ikasketa etengabeko pentsamoldea mantentzea ahalbidetzen dit. Etengabe bilatzen dut nire ezagutzak zabaltzea eta nire trebetasunak perfekzionatzen jarraitzea, beti aukera berriak bilatuz berrikuntza egiteko eta soluzioak sortzeko, ez bakarrik eraginkorrak direnak, baita optimalak, eraginkorrak eta egokigarriak ere proiektuaren beharretara.",
  },
  technologies: [
    "Python", "AWS", "AMPL", "Node.js", "Express", "C", "C++", "Java", "PHP", "HTML5", "CSS3", "TypeScript", "JavaScript", "PostgreSQL", "Angular", "React", "Vue.js", "Next.js", "PowerBI", "GitHub"
  ],
  projects: [
    {
      title: "Análisis de Tachas",
      description: "Sistema de análisis de datos para optimización de rutas y gestión de infraestructura vial.",
      technologies: ["Python", "Node.js", "Tailwind"],
      link: "https://github.com/GaztelakoFelipeI/tatxas/",
    },
    {
      title: "Proyecto Web",
      description: "Desarrollo de aplicación web completa con backend robusto y frontend moderno.",
      technologies: ["PHP", "Node.js", "HTML"],
      link: "https://github.com/fpereira22",
    },
    {
      title: "Detector de Neumonía",
      description: "Sistema de detección de neumonía usando Computer Vision e Inteligencia Artificial.",
      technologies: ["Python", "ComputerVision", "IA"],
      link: "https://github.com/fpereira22/PneumoniaDetectorCV",
    },
  ],
  certifications: {
    summary: "Felipe cuenta con más de 60 certificaciones profesionales que respaldan su experiencia y conocimientos técnicos. Para ver la lista completa y actualizada, se recomienda visitar el enlace a sus certificaciones en LinkedIn.",
    // MODIFICACIÓN AQUÍ: Convertimos la lista de strings a una lista de objetos
    keyCertifications: [
      {
        name: "AI Developer Specialization - Professional (IBM, 2025)",
        description: "Una especialización que cubre el desarrollo de aplicaciones de IA, incluyendo machine learning, deep learning, y el uso de APIs de IA de IBM para crear soluciones inteligentes."
      },
      {
        name: "Scrum Foundation Professional Certification - SFPC™ (Scrum, 2023)",
        description: "Valida el conocimiento fundamental del marco de trabajo Scrum, incluyendo sus roles (Product Owner, Scrum Master, Equipo de Desarrollo), eventos y artefactos para la gestión ágil de proyectos."
      },
      {
        name: "Python for Data Science, AI & Development (IBM, 2025)",
        description: "Curso enfocado en el uso de Python y sus librerías principales (como Pandas, NumPy, Matplotlib) para el análisis de datos, la construcción de modelos de IA y el desarrollo de software."
      },
      {
        name: "Python Essentials 1 & 2 (Cisco, 2025)",
        description: "Cubre los conceptos fundamentales y avanzados de la programación en Python, desde la sintaxis básica hasta temas como la programación orientada a objetos, el procesamiento de archivos y las APIs."
      },
      {
        name: "Full Stack Web Developer (HTML5, CSS3, JS AJAX PHP y MySQL) (Udemy, 2025)",
        description: "Formación completa en desarrollo web que abarca tanto el frontend (HTML, CSS, JavaScript) como el backend (PHP, MySQL), permitiendo crear aplicaciones web interactivas y robustas."
      },
      {
        name: "Búsqueda de Google Ads (Google, 2025)",
        description: "Certificación que demuestra la capacidad para crear y optimizar campañas de búsqueda en Google Ads, incluyendo estrategia de palabras clave, redacción de anuncios y medición de resultados."
      },
      {
        name: "IBM Data Science Practitioner Certificate (IBM, 2024)",
        description: "Certificado que acredita habilidades prácticas en el ciclo de vida de la ciencia de datos, desde la recolección y limpieza de datos hasta el modelado y la visualización de resultados."
      }
    ],
    link: "https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/details/certifications/",
  },
  services: [
    {
      service: "Landing Pages",
      details: "Desarrollo con tecnologías modernas (Next.js, React, Tailwind).",
      price: "250.000 CLP"
    },
    {
      service: "Sitios WordPress",
      details: "Sitios corporativos o blogs autoadministrables.",
      price: "150.000 CLP"
    },
    {
      service: "Aplicaciones Web",
      details: "Sistemas a medida, dashboards, gestión de datos.",
      price: "300.000 CLP - 1.000.000 CLP (dependiendo de la complejidad)"
    }
  ],
  site: {
    usage: "La web está dividida en secciones: Sobre Mí, Experiencia (incluyendo tecnologías), Educación, Becas, Proyectos, Sitios Web, Certificaciones y Contacto. Puedes navegar usando los enlaces en la barra de navegación superior. El sitio es multi-idioma (Español, Inglés, Euskera).",
    locations: "Felipe tiene base en Santiago (Chile), Bilbao (España) y Cali (Colombia)."
  },
  education: [
    {
      institution: "Universidad Andres Bello",
      degree: "Ingeniero Civil Informático",
      description: "Titulado con distinción. Tesis sobre optimización combinatoria. Formación en desarrollo full stack, cloud data engineering y ciberseguridad."
    },
    {
      institution: "Universidad Andres Bello",
      degree: "Licenciado en Ciencias de la Ingeniería",
      description: "Grado académico con distinción. Base científica y tecnológica sólida."
    },
    {
      institution: "Pontificia Universidad Javeriana Cali",
      degree: "Intercambio Académico",
      description: "Semestre internacional con foco en Ingeniería Industrial y de Sistemas. Cursos de maestría en logística y calidad."
    },
    {
      institution: "Universidad Andres Bello",
      degree: "Magíster en Ingeniería Informática (En curso)",
      description: "Especialización avanzada en Ingeniería de Software, Data Science e Inteligencia Artificial."
    }
  ],
  scholarships: [
    {
      title: "Beca Oracle Next Education (ONE) - G9",
      description: "Especialización en Data Science. Formación práctica en Python, Machine Learning y Análisis de Datos con Oracle y Alura Latam."
    },
    {
      title: "Beca Santander Skills | Skills for Work",
      description: "Programa de alto rendimiento con Banco Santander y Coursera. Foco en habilidades blandas (liderazgo, comunicación) y digitales (Agile, Data Analysis)."
    }
  ],
  websites: [
    {
      name: "ROADWISE.CL",
      description: "Plataforma corporativa con modelos 3D interactivos (Three.js) para monitoreo vial."
    },
    {
      name: "SSGL.CL",
      description: "Sitio corporativo para Sociedad de Servicios Generales Ltda. React y diseño moderno."
    },
    {
      name: "SPPA.CL",
      description: "Hub de servicios profesionales familia Pereira Alarcón."
    },
    {
      name: "Our Transfer SSGL",
      description: "App web segura para transferencia de archivos corporativos."
    },
    {
      name: "Centro Estética Fernando Gonzalez",
      description: "Plataforma de gestión de citas y blog."
    },
    {
      name: "MRComputer Enterprise",
      description: "Sistema de gestión de inventario y landing page."
    },
    {
      name: "SmartCare Medical Center",
      description: "Landing page médica con mapas interactivos."
    }
  ],
  faq: [
    {
      preguntas: [
        "¿Estás disponible para trabajar?",
        "¿Buscas trabajo?",
        "¿Cuál es tu disponibilidad laboral?",
        "Are you available for work?",
        "Are you looking for a job?"
      ],
      respuesta: "Actualmente, estoy abierto a explorar nuevas oportunidades laborales y proyectos tantos como de empresa y freelance que se alineen con mis habilidades en desarrollo full-stack, AI Development y análisis de datos. Si tienes una propuesta, no dudes en contactarme por email o LinkedIn. Igual, a tu izquierda, tienes un botón para contactarme por mis diferentes redes sociales"
    },
    {
      preguntas: [
        "¿Cuál es tu sueldo esperado?",
        "¿Cuáles son tus expectativas salariales?",
        "What are your salary expectations?"
      ],
      respuesta: "Prefiero discutir las expectativas salariales durante el proceso de entrevista, ya que depende mucho del rol, las responsabilidades y los beneficios. Estoy seguro de que podemos llegar a un acuerdo justo."
    },
    {
      preguntas: [
        "Gracias",
        "Muchas gracias",
        "Thank you",
        "Eskerrik asko"
      ],
      // Respuesta que ahora incluye texto y una imagen en formato Markdown
      respuesta: "¡De nada! Si tienes alguna otra pregunta, aquí estoy para ayudarte. ![You're welcome GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW5mdWJmZ3R4MnNpdHFxNGVsbWJyYmd0bDRzOHRzZ2k1ZzB6eGcyaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o85xwxr06YNoFdSbm/giphy.gif)"
    },
    {
      preguntas: [
        "¿Que edad tiene?",
        "¿Cuántos años tiene?",
        "How old are you?",
        "What is your age?"
      ],
      // Respuesta que ahora incluye texto y una imagen en formato Markdown
      respuesta: "Tengo 25 años. "
    },
    {
      preguntas: [
        "ola carlita",
        "Hola Carlita?",
      ],
      // Respuesta que ahora incluye texto y una imagen en formato Markdown
      respuesta: "![carlita PNG](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoGc6zztxFvwRKGEbyXIzRiGY-pzy10cuvqQ&s) No te acordai ná?"
    },
    {
      preguntas: [
        "¿Cómo puedo contactarte?",
        "¿Cuál es tu email?",
        "How can I contact you?",
        "What is your email?"
      ],
      respuesta: "Puedes contactarme por email a f.pereiraalarcn@gmail.com o enviarme un mensaje directo por [WhatsApp](https://wa.me/56984381285?text=Hola,%20me%20interesa%20contactarme%20contigo)."
    },
    {
      preguntas: [
        "¿Estás graduado?",
        "¿Ya te titulaste?",
        "¿Tienes tu título?",
        "Are you graduated?"
      ],
      respuesta: "Sí, estoy graduado con honores. Obtuve mi título de Ingeniero Civil Informático y mi Licenciatura en Ciencias de la Ingeniería, ambos con distinción máxima en la Universidad Andres Bello."
    },
    {
      preguntas: [
        "¿Dónde puedo ver tus proyectos?",
        "Where can I see your projects?",
        "nire proiektuak non ikus ditzaket?",
      ],
      respuesta: "Puedes ver mis proyectos en la sección 'Proyectos' de mi portafolio. Allí encontrarás una lista de los proyectos en los que he trabajado, junto con descripciones y enlaces a sus repositorios."
    },

  ]
};