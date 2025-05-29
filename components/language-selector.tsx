"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import Image from "next/image"

const languages = [
	{ code: "es", name: "Español", flag: "/flags/es.png" },
	{ code: "en", name: "English", flag: "/flags/en.png" },
	{ code: "eu", name: "Euskera", flag: "/flags/eu.png" },
]

export function LanguageSelector() {
	const { language, setLanguage } = useLanguage()
	const [isOpen, setIsOpen] = useState(false)

	const currentLanguage = languages.find((lang) => lang.code === language)

	return (
		<div className="relative">
			<Button
				variant="ghost"
				size="sm"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 text-white hover:text-purple-300"
			>
				<Image
					src={currentLanguage?.flag || ""}
					alt={currentLanguage?.name || ""}
					width={24}
					height={24}
					className="rounded-full"
				/>
				<span className="hidden sm:inline">{currentLanguage?.name}</span>
				<ChevronDown
					className={`h-4 w-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</Button>

			{isOpen && (
				<div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 overflow-hidden z-50">
					{languages.map((lang) => (
						<button
							key={lang.code}
							onClick={() => {
								setLanguage(lang.code as any)
								setIsOpen(false)
							}}
							className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-white/20 transition-colors ${
								language === lang.code ? "bg-white/20" : ""
							}`}
						>
							<Image
								src={lang.flag}
								alt={lang.name}
								width={24}
								height={24}
							/>
							<span className="text-white">{lang.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
