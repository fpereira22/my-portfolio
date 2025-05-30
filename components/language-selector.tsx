"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "../hooks/useLanguage"

const languages = [
	{ code: "es", flag: "/flags/es.png", label: "Español" },
	{ code: "en", flag: "/flags/en.png", label: "English" },
	{ code: "eu", flag: "/flags/eu.png", label: "Euskara" },
]

export function LanguageSelector() {
	const { language, setLanguage } = useLanguage()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="relative">
			{/* Escritorio: icono + texto */}
			<div className="hidden md:block">
				<Button
					onClick={() => setIsOpen(!isOpen)}
					variant="ghost"
					size="sm"
					className="text-white hover:text-purple-300 hover:bg-white/10"
				>
					<Globe className="w-4 h-4 mr-1" />
					{languages.find((lang) => lang.code === language)?.label}
				</Button>
				{isOpen && (
					<div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none z-50">
						<div
							className="py-1"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="options-menu-button"
						>
							{languages.map((lang) => (
								<button
									key={lang.code}
									onClick={() => {
										setLanguage(lang.code as "es" | "en" | "eu")
										setIsOpen(false)
									}}
									className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
									role="menuitem"
								>
									<div className="flex items-center gap-2">
										<Image
											src={lang.flag}
											alt={lang.label}
											width={20}
											height={20}
											className="rounded-full"
										/>
										{lang.label}
									</div>
								</button>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Móvil: solo banderas */}
			<div className="flex md:hidden gap-2">
				{languages.map((lang) => (
					<button
						key={lang.code}
						onClick={() => setLanguage(lang.code as "es" | "en" | "eu")}
						className={`rounded-full border-2 ${
							language === lang.code
								? "border-purple-600"
								: "border-transparent"
						} p-0.5 transition`}
						aria-label={lang.label}
					>
						<Image
							src={lang.flag}
							alt={lang.label}
							width={28}
							height={20}
							className="rounded"
						/>
					</button>
				))}
			</div>
		</div>
	)
}
