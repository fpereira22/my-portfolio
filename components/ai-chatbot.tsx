"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { useLanguage } from "../hooks/useLanguage"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  // Efecto para el mensaje de bienvenida
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      text: getWelcomeMessage(),
      isBot: true,
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [language])

  const getWelcomeMessage = () => {
    switch (language) {
      case "en":
        return "Hello! I'm Felipe's virtual assistant. What would you like to know?"
      case "eu":
        return "Kaixo! Felipe-ren asistente birtuala naiz. Zer jakin nahi duzu?"
      default:
        return "¡Hola! Soy el asistente virtual de Felipe. ¿Qué te gustaría saber?"
    }
  }

  // Efecto para hacer scroll hacia abajo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Función para enviar mensajes a la API
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInputValue = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInputValue, language }),
      });

      if (!response.ok) {
        throw new Error(`API Error`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "Sorry, I couldn't get a response.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error contacting the backend:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops, something went wrong. Try again.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // El resto del código es el JSX para renderizar el componente...
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <Bot className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 bg-white rounded-2xl shadow-2xl border transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-80 h-96"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">ChatBot AI</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsMinimized(!isMinimized)}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 w-8 h-8"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 w-8 h-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot ? "bg-blue-100" : "bg-purple-100"
                    }`}
                  >
                    {message.isBot ? (
                      <Bot className="w-4 h-4 text-blue-600" />
                    ) : (
                      <User className="w-4 h-4 text-purple-600" />
                    )}

                  </div>
                  <div
                    className={`rounded-2xl p-3 ${
                      message.isBot
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    }`}
                  >
                    {/* La etiqueta <p> ha sido reemplazada por el componente <ReactMarkdown> */}
                    <div className="text-sm prose">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Regla para los enlaces (<a>)
                          a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" />
                          ),
                          // Regla para las imágenes (<img>)
                          img: ({ node, ...props }) => (
                            <img
                              {...props}
                              style={{
                                maxWidth: '100%',
                                borderRadius: '8px',
                                marginTop: '8px'
                              }}
                              alt="Imagen enviada por el chatbot" // Alt text por accesibilidad
                            />
                          ),
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  language === "en"
                    ? "Type your message..."
                    : language === "eu"
                      ? "Idatzi zure mezua..."
                      : "Escribe tu mensaje..."
                }
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 text-gray-900 placeholder:text-gray-500"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}