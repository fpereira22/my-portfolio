"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "../hooks/useLanguage"
import { ChevronDown } from "lucide-react"

const languages = [
	{ code: "es", flag: "/flags/es.png", label: "Español" },
	{ code: "en", flag: "/flags/en.png", label: "English" },
	{ code: "eu", flag: "/flags/eu.png", label: "Euskara" },
]

export function LanguageSelector() {
	const { language, setLanguage } = useLanguage()
	const [isOpen, setIsOpen] = useState(false)
	const selected = languages.find((lang) => lang.code === language)

	return (
		<div className="relative">
			{/* Botón principal: bandera + texto (escritorio), solo bandera (móvil) */}
			<Button
				onClick={() => setIsOpen(!isOpen)}
				variant="ghost"
				size="sm"
				className="flex items-center gap-2 text-white hover:text-purple-300 hover:bg-white/10"
			>
				<Image
					src={selected?.flag || "/flags/es.png"}
					alt={selected?.label || "Español"}
					width={24}
					height={18}
					className="rounded shadow"
				/>
				<span className="hidden md:inline">{selected?.label}</span>
				<ChevronDown className="w-4 h-4 ml-1" />
			</Button>

			{/* Menú desplegable */}
			{isOpen && (
				<div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none z-50">
					<div className="py-1" role="menu" aria-orientation="vertical">
						{languages.map((lang) => (
							<button
								key={lang.code}
								onClick={() => {
									setLanguage(lang.code as "es" | "en" | "eu")
									setIsOpen(false)
								}}
								className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
									language === lang.code ? "font-bold" : ""
								}`}
								role="menuitem"
							>
								<Image
									src={lang.flag}
									alt={lang.label}
									width={20}
									height={15}
									className="rounded"
								/>
								<span>{lang.label}</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
