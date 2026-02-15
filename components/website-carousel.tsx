"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"

function WebsiteCarouselComponent() {
    const { t } = useLanguage()
    const scrollRef = useRef<HTMLDivElement>(null)

    // State for controls and interaction
    const [isManuallyPaused, setIsManuallyPaused] = useState(false)
    const [isHoverPaused, setIsHoverPaused] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [velocity, setVelocity] = useState(1.4) // Controls auto-scroll speed and direction
    const animationRef = useRef<number>()
    const lastTimeRef = useRef<number>(0)
    const isScrollingRef = useRef(false) // To prevent loop conflict during manual scroll
    const singleSetWidthRef = useRef(0)


    const [isVisible, setIsVisible] = useState(true) // Default to true for better auto-start
    const containerRef = useRef<HTMLDivElement>(null) // Ref for Intersection Observer

    // Intersection Observer to pause animation when off-screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            { threshold: 0 } // Trigger as soon as 1px is visible
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])

    const websitesData = [
        {
            slug: "ssgl",
            url: "https://www.ssgl.cl/",
            imageSrc: "/img/websites/ssgl.png",
            logoSrc: "/img/logos/websites/ssgl.svg",
            borderClass: "border-green-500 hover:border-green-400",
            shadowClass: "hover:shadow-green-500/30",
            gradientClass: "from-green-900/90",
            textClass: "text-green-300",
            descColorClass: "text-green-200",
            tags: ["React", "Next.js", "Tailwind"],
            tagBgClass: "bg-green-500/20 border-green-400/30"
        },
        {
            slug: "sppa",
            url: "https://sppa.cl/",
            imageSrc: "/img/websites/previews/sppa-preview.webp",
            logoSrc: "/img/logos/websites/sppa.png",
            borderClass: "border-cyan-500 hover:border-cyan-400",
            shadowClass: "hover:shadow-cyan-500/30",
            gradientClass: "from-cyan-900/90",
            textClass: "text-cyan-300",
            descColorClass: "text-cyan-200",
            tags: ["HTML5", "CSS3", "JS"],
            tagBgClass: "bg-cyan-500/20 border-cyan-400/30"
        },
        {
            slug: "fpereiradev",
            url: "https://fpereiradev.sppa.cl/",
            imageSrc: "/img/websites/fpereiradev.png",
            logoSrc: "/img/logos/websites/fpereiradev.ico",
            borderClass: "border-purple-500 hover:border-purple-400",
            shadowClass: "hover:shadow-purple-500/30",
            gradientClass: "from-purple-900/90",
            textClass: "text-purple-300",
            descColorClass: "text-purple-200",
            tags: ["React", "Next.js"],
            tagBgClass: "bg-purple-500/20 border-purple-400/30"
        },
        {
            slug: "manuel",
            url: "https://manuel-pereira.sppa.cl/",
            imageSrc: "/img/websites/previews/manuel-preview.webp",
            logoSrc: "/img/logos/websites/manuel.svg",
            borderClass: "border-yellow-500 hover:border-yellow-400",
            shadowClass: "hover:shadow-yellow-500/30",
            gradientClass: "from-yellow-900/90",
            textClass: "text-yellow-300",
            descColorClass: "text-yellow-200",
            tags: ["Next.js", "React", "Photography"],
            tagBgClass: "bg-yellow-500/20 border-yellow-400/30"
        },
        {
            slug: "ourtransfer",
            url: "https://our-transfer.ssgl.cl/",
            imageSrc: "/img/websites/previews/ourtransfer-preview.webp",
            logoSrc: "/img/logos/websites/ssgl.svg",
            borderClass: "border-blue-500 hover:border-blue-400",
            shadowClass: "hover:shadow-blue-500/30",
            gradientClass: "from-blue-900/90",
            textClass: "text-blue-300",
            descColorClass: "text-blue-200",
            tags: ["React", "Cloud", "Azure"],
            tagBgClass: "bg-blue-500/20 border-blue-400/30"
        },
        {
            slug: "centroestetica",
            url: "https://centro-estetica-fernando-gonzalez.vercel.app/",
            imageSrc: "/img/websites/previews/centroestetica-preview.webp",
            logoSrc: "/img/logos/websites/centroestetica.png",
            borderClass: "border-pink-500 hover:border-pink-400",
            shadowClass: "hover:shadow-pink-500/30",
            gradientClass: "from-pink-900/90",
            textClass: "text-pink-300",
            descColorClass: "text-pink-200",
            tags: ["React", "GCP", "Shadcn"],
            tagBgClass: "bg-pink-500/20 border-pink-400/30"
        },
        {
            slug: "mrcomputer",
            url: "https://mrcomputer-webapp.vercel.app/",
            imageSrc: "/img/websites/previews/mrcomputer-preview.webp",
            logoSrc: "/img/logos/mrcomputer.png",
            borderClass: "border-indigo-500 hover:border-indigo-400",
            shadowClass: "hover:shadow-indigo-500/30",
            gradientClass: "from-indigo-900/90",
            textClass: "text-indigo-300",
            descColorClass: "text-indigo-200",
            tags: ["React", "SQL", "Dashboard"],
            tagBgClass: "bg-indigo-500/20 border-indigo-400/30"
        },
        {
            slug: "jody",
            url: "https://www.rendimientointegral.cl/",
            imageSrc: "/img/websites/previews/jody-preview.webp",
            logoSrc: "/img/logos/websites/jody.png",
            borderClass: "border-red-500 hover:border-red-400",
            shadowClass: "hover:shadow-red-500/30",
            gradientClass: "from-red-900/90",
            textClass: "text-red-300",
            descColorClass: "text-red-200",
            tags: ["React", "SQL", "Fitness"],
            tagBgClass: "bg-red-500/20 border-red-400/30"
        },
        {
            slug: "smartcare",
            url: "https://www.centromedicosmartcare.cl/",
            imageSrc: "/img/websites/previews/smartcare-preview.webp",
            logoSrc: "/img/logos/websites/smartcare.png",
            borderClass: "border-teal-500 hover:border-teal-400",
            shadowClass: "hover:shadow-teal-500/30",
            gradientClass: "from-teal-900/90",
            textClass: "text-teal-300",
            descColorClass: "text-teal-200",
            tags: ["React", "Medical", "Maps"],
            tagBgClass: "bg-teal-500/20 border-teal-400/30"
        }
    ]

    useEffect(() => {
        const updateWidth = () => {
            if (scrollRef.current) {
                singleSetWidthRef.current = scrollRef.current.scrollWidth / 4;
            }
        };

        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        const currentRef = scrollRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.disconnect();
        }
    }, [])

    // Animation Loop
    const animate = useCallback((time: number) => {
        if (!scrollRef.current) return

        if (!lastTimeRef.current) lastTimeRef.current = time
        const deltaTime = time - lastTimeRef.current
        lastTimeRef.current = time

        // Cap delta to prevent huge jumps after tab switching/suspension
        const effectiveDelta = Math.min(deltaTime, 64)

        const isPaused = isManuallyPaused || isHoverPaused || isDragging || isScrollingRef.current

        if (!isPaused && isVisible) {
            scrollRef.current.scrollLeft += (velocity * effectiveDelta) / 16
        }

        // Infinite Loop Check - Always Active to prevent getting stuck
        const singleSetWidth = singleSetWidthRef.current || (scrollRef.current ? scrollRef.current.scrollWidth / 4 : 0)

        if (scrollRef.current && singleSetWidth > 0) {
            if (scrollRef.current.scrollLeft >= singleSetWidth) {
                scrollRef.current.scrollLeft -= singleSetWidth
            } else if (scrollRef.current.scrollLeft <= 0) {
                scrollRef.current.scrollLeft += singleSetWidth
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }, [isManuallyPaused, isHoverPaused, isDragging, velocity, isVisible])

    useEffect(() => {
        const startAnimation = () => {
            lastTimeRef.current = 0
            animationRef.current = requestAnimationFrame(animate)
        }

        const stopAnimation = () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }

        if (isVisible) {
            startAnimation()
        } else {
            stopAnimation()
        }

        // Handle tab visibility change
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopAnimation()
            } else {
                startAnimation()
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            stopAnimation()
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [animate, isVisible])

    // Mouse/Touch Handlers
    const lastXRef = useRef(0)

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        lastXRef.current = e.pageX
        // We don't need to store scrollRef.current.scrollLeft here anymore
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX
        const walk = (x - lastXRef.current) * 2
        lastXRef.current = x

        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= walk
            // The animate loop will handle the wrapping immediately in next frame or we can force check?
            // Actually, the animate loop checks every frame (approx 16ms), which is fast enough.
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
        setIsHoverPaused(false)
    }

    const togglePause = () => setIsManuallyPaused(!isManuallyPaused)

    // Touch Handlers for Mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        lastXRef.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        const x = e.touches[0].clientX
        const walk = (x - lastXRef.current) * 2
        lastXRef.current = x

        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= walk
        }
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    const scrollManual = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const singleSetWidth = singleSetWidthRef.current || container.scrollWidth / 4;

            // Calculate scroll amount based on screen width
            // Default: 350px (card) + 24px (gap-6) = 374px
            // Mobile: 300px + 24px = 324px
            const scrollAmount = window.innerWidth < 768 ? 324 : 374;

            if (singleSetWidth > 0) {
                // Only jump if we are dangerously close to the edges
                // This prevents unnecessary position resets that might conflict with smooth scrolling
                if (direction === 'left' && container.scrollLeft < scrollAmount) {
                    container.scrollLeft += singleSetWidth
                } else if (direction === 'right' && container.scrollLeft >= singleSetWidth * 3) {
                    container.scrollLeft -= singleSetWidth
                }
            }

            // Conflict prevention: Pause loop during smooth scroll
            isScrollingRef.current = true;

            container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })

            // Resume loop after animation (allow enough time for smooth scroll to finish)
            // 800ms should be sufficient for most smooth transitions
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 800)
        }
    }

    return (
        <div ref={containerRef} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center px-4 gap-4">
                <div className="text-left">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent mb-1">
                        {t("websites.otherProjects.title") || "Más Proyectos y Colaboraciones"}
                    </h3>
                    <p className="text-purple-300/80 text-sm max-w-lg">
                        Explora una variedad de sitios web desarrollados para diferentes industrias.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-full backdrop-blur-sm border border-white/10">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scrollManual('left')}
                        className="w-10 h-10 rounded-full hover:bg-white/10 text-white"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <Button
                        variant={isManuallyPaused ? "secondary" : "ghost"}
                        size="icon"
                        onClick={togglePause}
                        className={`w-10 h-10 rounded-full transition-all ${isManuallyPaused ? "bg-white text-purple-900 hover:bg-gray-200" : "hover:bg-white/10 text-white"}`}
                        aria-label={isManuallyPaused ? "Play" : "Pause"}
                    >
                        {isManuallyPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5" />}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scrollManual('right')}
                        className="w-10 h-10 rounded-full hover:bg-white/10 text-white"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div
                className="relative w-full overflow-hidden mask-gradient group"
                onMouseEnter={() => setIsHoverPaused(true)}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={scrollRef}
                    className={`flex gap-6 overflow-x-hidden cursor-grab active:cursor-grabbing select-none py-10 px-4 items-stretch`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}

                    // Touch events for mobile
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}

                    style={{ scrollBehavior: 'auto' }}
                >
                    {/* Note: We force scrollBehavior: auto here to control it manually in the loop, 
                  but we use scrollBy with 'smooth' behavior for buttons which works as an override */}

                    {[...websitesData, ...websitesData, ...websitesData, ...websitesData].map((site, index) => (
                        <div
                            key={`${site.slug}-${index}`}
                            className={`relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border-2
                    ${site.borderClass} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${site.shadowClass}
                    w-[300px] md:w-[350px] flex-shrink-0 flex flex-col`}
                        >
                            <div className="aspect-video relative overflow-hidden flex-shrink-0">
                                <Image
                                    src={site.imageSrc}
                                    alt={t(`websites.${site.slug}.title`)}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                                    draggable={false}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${site.gradientClass} to-transparent opacity-60`}></div>
                                <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl p-1.5 shadow-lg border border-white/30 group-hover:scale-110 transition-transform">
                                    <Image
                                        src={site.logoSrc}
                                        alt="Logo"
                                        fill
                                        className="object-contain"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h4 className={`text-xl font-bold mb-2 transition-colors ${site.textClass}`}>{t(`websites.${site.slug}.title`)}</h4>
                                <p className={`${site.descColorClass} text-sm mb-4 line-clamp-2 flex-grow`}>
                                    {t(`websites.${site.slug}.desc`)}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {site.tags.map(tag => (
                                            <span key={tag} className={`px-2 py-0.5 ${site.tagBgClass} rounded text-xs`}>{tag}</span>
                                        ))}
                                    </div>

                                    <a
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors w-full justify-center text-sm font-medium ${site.textClass} group-hover:text-white`}
                                        onClick={(e) => {
                                            if (isDragging) e.preventDefault() // Prevent click when dragging
                                        }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        {t("websites.visitBtn")}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const WebsiteCarousel = React.memo(WebsiteCarouselComponent)
