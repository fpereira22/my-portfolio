"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/hooks/useLanguage"

interface TerminalLine {
    type: "command" | "output" | "comment" | "success" | "error" | "info" | "link"
    content: string
    delay?: number
    href?: string
}

export function LinuxTerminal() {
    const { t, language } = useLanguage()
    const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([])
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const [showCursor, setShowCursor] = useState(true)
    const terminalRef = useRef<HTMLDivElement>(null)

    // Líneas del terminal según el idioma - Contenido enriquecido
    const getTerminalLines = (): TerminalLine[] => {
        if (language === "en") {
            return [
                { type: "command", content: "neofetch --felipe", delay: 40 },
                { type: "comment", content: "       _____ ____  " },
                { type: "comment", content: "      |  ___|  _ \\ " },
                { type: "comment", content: "      | |_  | |_) |" },
                { type: "comment", content: "      |  _| |  __/ " },
                { type: "comment", content: "      |_|   |_|    " },
                { type: "output", content: "" },
                { type: "info", content: "  felipe-pereira@portfolio" },
                { type: "info", content: "  ─────────────────────────" },
                { type: "output", content: "  🎯 Role: AI Software Developer & Full Stack" },
                { type: "output", content: "  📍 Location: Santiago, Chile" },
                { type: "output", content: "  🎓 Education: Computer Science Engineer - UNAB" },
                { type: "output", content: "" },
                { type: "command", content: "cat ~/tech_stack.yml", delay: 35 },
                { type: "info", content: "languages:" },
                { type: "success", content: "  - Python  - TypeScript  - Julia" },
                { type: "info", content: "frameworks:" },
                { type: "success", content: "  - React/Next.js  - PyTorch  - FastAPI" },
                { type: "info", content: "cloud:" },
                { type: "success", content: "  - Azure  - AWS  - Docker" },
                { type: "output", content: "" },
                { type: "command", content: "ls ~/scholarships/", delay: 30 },
                { type: "success", content: "📜 oracle_one_g9    📜 santander_skills    📜 puj_exchange" },
                { type: "output", content: "" },
                { type: "command", content: "curl https://felipe.dev/current", delay: 25 },
                { type: "output", content: "{" },
                { type: "success", content: '  "company": "SSGL - Road Infrastructure AI",' },
                { type: "success", content: '  "focus": "Computer Vision & Automation",' },
                { type: "success", content: '  "status": "🟢 Open to opportunities"' },
                { type: "output", content: "}" },
                { type: "output", content: "" },
                { type: "command", content: "echo $CONTACT", delay: 30 },
                { type: "link", content: "📧 f.pereiraalarcn@gmail.com", href: "mailto:f.pereiraalarcn@gmail.com" },
                { type: "link", content: "💼 linkedin.com/in/felipe-pereira-alarcon", href: "https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/" },
                { type: "output", content: "" },
                { type: "command", content: "exit", delay: 50 },
                { type: "comment", content: "# 🔓 Easter egg unlocked! Thanks for exploring 🎉" },
            ]
        } else if (language === "eu") {
            return [
                { type: "command", content: "neofetch --felipe", delay: 40 },
                { type: "comment", content: "       _____ ____  " },
                { type: "comment", content: "      |  ___|  _ \\ " },
                { type: "comment", content: "      | |_  | |_) |" },
                { type: "comment", content: "      |  _| |  __/ " },
                { type: "comment", content: "      |_|   |_|    " },
                { type: "output", content: "" },
                { type: "info", content: "  felipe-pereira@portfolio" },
                { type: "info", content: "  ─────────────────────────" },
                { type: "output", content: "  🎯 Rola: AI Software Garatzailea & Full Stack" },
                { type: "output", content: "  📍 Kokapena: Santiago, Txile" },
                { type: "output", content: "  🎓 Hezkuntza: Informatika Ingeniari Zibila - UNAB" },
                { type: "output", content: "" },
                { type: "command", content: "cat ~/tech_stack.yml", delay: 35 },
                { type: "info", content: "hizkuntzak:" },
                { type: "success", content: "  - Python  - TypeScript  - Julia" },
                { type: "info", content: "frameworkak:" },
                { type: "success", content: "  - React/Next.js  - PyTorch  - FastAPI" },
                { type: "info", content: "hodeia:" },
                { type: "success", content: "  - Azure  - AWS  - Docker" },
                { type: "output", content: "" },
                { type: "command", content: "ls ~/bekak/", delay: 30 },
                { type: "success", content: "📜 oracle_one_g9    📜 santander_skills    📜 puj_trukea" },
                { type: "output", content: "" },
                { type: "command", content: "curl https://felipe.dev/orain", delay: 25 },
                { type: "output", content: "{" },
                { type: "success", content: '  "enpresa": "SSGL - Bide Azpiegitura AI",' },
                { type: "success", content: '  "fokua": "Computer Vision & Automatizazioa",' },
                { type: "success", content: '  "egoera": "🟢 Aukera berrietarako zabalik"' },
                { type: "output", content: "}" },
                { type: "output", content: "" },
                { type: "command", content: "echo $KONTAKTUA", delay: 30 },
                { type: "link", content: "📧 f.pereiraalarcn@gmail.com", href: "mailto:f.pereiraalarcn@gmail.com" },
                { type: "link", content: "💼 linkedin.com/in/felipe-pereira-alarcon", href: "https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/" },
                { type: "output", content: "" },
                { type: "command", content: "exit", delay: 50 },
                { type: "comment", content: "# 🔓 Easter egg-a desblokeatu duzu! Eskerrik asko 🎉" },
            ]
        } else {
            // Español por defecto
            return [
                { type: "command", content: "neofetch --felipe", delay: 40 },
                { type: "comment", content: "       _____ ____  " },
                { type: "comment", content: "      |  ___|  _ \\ " },
                { type: "comment", content: "      | |_  | |_) |" },
                { type: "comment", content: "      |  _| |  __/ " },
                { type: "comment", content: "      |_|   |_|    " },
                { type: "output", content: "" },
                { type: "info", content: "  felipe-pereira@portfolio" },
                { type: "info", content: "  ─────────────────────────" },
                { type: "output", content: "  🎯 Rol: AI Software Developer & Full Stack" },
                { type: "output", content: "  📍 Ubicación: Santiago, Chile" },
                { type: "output", content: "  🎓 Educación: Ingeniero Civil Informático - UNAB" },
                { type: "output", content: "" },
                { type: "command", content: "cat ~/tech_stack.yml", delay: 35 },
                { type: "info", content: "lenguajes:" },
                { type: "success", content: "  - Python  - TypeScript  - Julia" },
                { type: "info", content: "frameworks:" },
                { type: "success", content: "  - React/Next.js  - PyTorch  - FastAPI" },
                { type: "info", content: "cloud:" },
                { type: "success", content: "  - Azure  - AWS  - Docker" },
                { type: "output", content: "" },
                { type: "command", content: "ls ~/becas/", delay: 30 },
                { type: "success", content: "📜 oracle_one_g9    📜 santander_skills    📜 puj_intercambio" },
                { type: "output", content: "" },
                { type: "command", content: "curl https://felipe.dev/actual", delay: 25 },
                { type: "output", content: "{" },
                { type: "success", content: '  "empresa": "SSGL - Infraestructura Vial IA",' },
                { type: "success", content: '  "enfoque": "Computer Vision & Automatización",' },
                { type: "success", content: '  "estado": "🟢 Abierto a nuevas oportunidades"' },
                { type: "output", content: "}" },
                { type: "output", content: "" },
                { type: "command", content: "echo $CONTACTO", delay: 30 },
                { type: "link", content: "📧 f.pereiraalarcn@gmail.com", href: "mailto:f.pereiraalarcn@gmail.com" },
                { type: "link", content: "💼 linkedin.com/in/felipe-pereira-alarcon", href: "https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/" },
                { type: "output", content: "" },
                { type: "command", content: "exit", delay: 50 },
                { type: "comment", content: "# 🔓 ¡Easter egg desbloqueado! Gracias por explorar 🎉" },
            ]
        }
    }

    const terminalLines = getTerminalLines()

    // Efecto de parpadeo del cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 530)
        return () => clearInterval(cursorInterval)
    }, [])

    // Reset cuando cambia el idioma
    useEffect(() => {
        setDisplayedLines([])
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
        setIsTyping(true)
    }, [language])

    // Efecto de escritura
    useEffect(() => {
        if (currentLineIndex >= terminalLines.length) {
            setIsTyping(false)
            return
        }

        const currentLine = terminalLines[currentLineIndex]
        const typingSpeed = currentLine.delay || 50

        // Si es un comando, hacer efecto de typing
        if (currentLine.type === "command") {
            if (currentCharIndex < currentLine.content.length) {
                const timeout = setTimeout(() => {
                    setCurrentCharIndex((prev) => prev + 1)
                }, typingSpeed)
                return () => clearTimeout(timeout)
            } else {
                // Comando completo, pasar a la siguiente línea
                const timeout = setTimeout(() => {
                    setDisplayedLines((prev) => [...prev, currentLine])
                    setCurrentLineIndex((prev) => prev + 1)
                    setCurrentCharIndex(0)
                }, 300)
                return () => clearTimeout(timeout)
            }
        } else {
            // Para outputs, mostrar instantáneamente
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, currentLine])
                setCurrentLineIndex((prev) => prev + 1)
                setCurrentCharIndex(0)
            }, 150)
            return () => clearTimeout(timeout)
        }
    }, [currentLineIndex, currentCharIndex, terminalLines])

    // Auto-scroll al final
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [displayedLines])

    const getLineColor = (type: TerminalLine["type"]) => {
        switch (type) {
            case "command":
                return "text-green-400"
            case "output":
                return "text-gray-300"
            case "comment":
                return "text-purple-400"
            case "success":
                return "text-emerald-400"
            case "error":
                return "text-red-400"
            case "info":
                return "text-cyan-400"
            case "link":
                return "text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
            default:
                return "text-gray-300"
        }
    }

    const currentLine = terminalLines[currentLineIndex]
    const typingText = currentLine?.type === "command"
        ? currentLine.content.substring(0, currentCharIndex)
        : ""

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Ventana de terminal estilo Linux */}
            <div className="rounded-xl overflow-hidden shadow-2xl border border-purple-500/30">
                {/* Barra de título */}
                <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-violet-900 px-4 py-3 flex items-center justify-between">
                    {/* Botones de ventana */}
                    <div className="flex items-center gap-2">
                        <button
                            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-md"
                            aria-label="Cerrar"
                        />
                        <button
                            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors shadow-md"
                            aria-label="Minimizar"
                        />
                        <button
                            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors shadow-md"
                            aria-label="Maximizar"
                        />
                    </div>

                    {/* Título */}
                    <div className="flex items-center gap-2 text-white/80 text-sm font-mono">
                        <span className="text-purple-300">⌘</span>
                        <span>felipe@portfolio:~</span>
                    </div>

                    {/* Spacer para centrar */}
                    <div className="w-14" />
                </div>

                {/* Contenido del terminal */}
                <div
                    ref={terminalRef}
                    className="bg-gradient-to-b from-gray-900 via-gray-900 to-purple-950 p-4 h-96 overflow-y-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent"
                >
                    {/* Líneas ya mostradas */}
                    {displayedLines.map((line, index) => (
                        <div key={index} className={`${getLineColor(line.type)} ${line.content === "" ? "h-4" : ""}`}>
                            {line.type === "command" ? (
                                <span>
                                    <span className="text-purple-400">felipe@portfolio</span>
                                    <span className="text-white">:</span>
                                    <span className="text-blue-400">~</span>
                                    <span className="text-white">$ </span>
                                    <span className="text-green-400">{line.content}</span>
                                </span>
                            ) : line.type === "link" && line.href ? (
                                <a
                                    href={line.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-cyan-300 transition-colors"
                                >
                                    {line.content}
                                </a>
                            ) : (
                                line.content
                            )}
                        </div>
                    ))}

                    {/* Línea actual siendo escrita */}
                    {isTyping && currentLine?.type === "command" && (
                        <div>
                            <span className="text-purple-400">felipe@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$ </span>
                            <span className="text-green-400">{typingText}</span>
                            <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-green-400 transition-opacity`}>▌</span>
                        </div>
                    )}

                    {/* Cursor final cuando termina */}
                    {!isTyping && (
                        <div>
                            <span className="text-purple-400">felipe@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$ </span>
                            <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-green-400 transition-opacity`}>▌</span>
                        </div>
                    )}
                </div>

                {/* Barra inferior con info */}
                <div className="bg-purple-900/80 px-4 py-2 flex items-center justify-between text-xs font-mono text-purple-300">
                    <span>bash 5.1.8</span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        {isTyping ? (language === "en" ? "Running..." : language === "eu" ? "Exekutatzen..." : "Ejecutando...") : (language === "en" ? "Completed" : language === "eu" ? "Osatua" : "Completado")}
                    </span>
                    <span>UTF-8</span>
                </div>
            </div>
        </div>
    )
}
