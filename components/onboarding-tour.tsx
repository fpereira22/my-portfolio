"use client"

import { useEffect, useRef } from "react"
import { driver } from "driver.js"
import "driver.js/dist/driver.css"
import { useLanguage } from "@/hooks/useLanguage"

// Export event name to avoid typos
export const START_TOUR_EVENT = "start-onboarding-tour";

export function OnboardingTour() {
    const { t, language } = useLanguage()

    // We use a ref to hold the driver instance so we can manipulate it across renders
    const driverRef = useRef<any>(null);
    const isTourActive = useRef(false);

    // Track the current step index to restore position or advance on language change
    // Step indices: 0: Welcome, 1: Navigation, 2: Language, 3: Scroll Button
    const activeStepIndex = useRef<number>(0);

    const handleScrollClick = () => {
        localStorage.setItem("hasSeenOnboardingTour", "true");
        if (driverRef.current) {
            driverRef.current.destroy();
        }
        isTourActive.current = false;
    };

    // Function to create and start the tour - wrapped in ref to be accessible in event listener
    const initTourRef = useRef<((startAtIndex?: number) => void) | null>(null);

    initTourRef.current = (startAtIndex: number = 0) => {
        // Destroy existing instance if any
        if (driverRef.current) {
            driverRef.current.destroy();
        }

        const steps = [
            {
                popover: {
                    title: t("tour.welcome.title"),
                    description: t("tour.welcome.desc"),
                    align: "center",
                },
            },
            {
                element: "#main-header",
                popover: {
                    title: t("tour.header.title"),
                    description: t("tour.header.desc"),
                    side: "bottom",
                    align: "start",
                },
            },
            {
                element: "#language-selector-wrapper",
                popover: {
                    title: t("tour.language.title"),
                    description: t("tour.language.desc"),
                    side: "left", // Changed from bottom to left to avoid blocking menu
                    align: "center",
                },
                onHighlightStarted: (element: Element) => {
                    document.getElementById("main-header")?.classList.add("tour-highlight-header");
                },
                onDeselected: (element: Element) => {
                    document.getElementById("main-header")?.classList.remove("tour-highlight-header");
                }
            },
            {
                element: "#scroll-down-btn",
                popover: {
                    title: t("tour.scroll.title"),
                    description: t("tour.scroll.desc"),
                    side: "top",
                    align: "center",
                },
                onHighlightStarted: (element: Element) => {
                    element?.addEventListener("click", handleScrollClick);
                },
                onDeselected: (element: Element) => {
                    element?.removeEventListener("click", handleScrollClick);
                }
            },
        ];

        driverRef.current = driver({
            popoverClass: "driverjs-theme",
            showProgress: true,
            steps: steps as any[],
            nextBtnText: t("tour.next"),
            prevBtnText: t("tour.prev"),
            doneBtnText: t("tour.done"),
            allowClose: true,
            allowKeyboardControl: true,

            // Update active step index
            onHighlightStarted: (element, step, options) => {
                // driver.js v1 doesn't pass index directly in step object always, but let's try to track it via internal state if needed
                // Actually we can just check active index
                if (driverRef.current) {
                    activeStepIndex.current = driverRef.current.getActiveIndex();
                    isTourActive.current = true;
                }
            },

            onDestroyStarted: () => {
                if (!driverRef.current.hasNextStep() || confirm(t("tour.confirm_exit"))) {
                    driverRef.current.destroy();
                    localStorage.setItem("hasSeenOnboardingTour", "true");
                    isTourActive.current = false;
                    activeStepIndex.current = 0;
                }
            },
            onCloseClick: () => {
                localStorage.setItem("hasSeenOnboardingTour", "true");
                driverRef.current.destroy();
                isTourActive.current = false;
                activeStepIndex.current = 0;
            }
        });

        // Start at specified index
        driverRef.current.drive(startAtIndex);
        isTourActive.current = true;
    };


    // Effect to handle language changes
    useEffect(() => {
        // If tour is active, we need to restart it with new language
        if (isTourActive.current) {
            // Special handling for language selector step (index 2)
            // If user was on step 2 (Language) and changed language, we move to step 3 (Scroll)
            const nextStep = activeStepIndex.current === 2 ? 3 : activeStepIndex.current;

            // Re-init tour at the calculated step
            // Use timeout to allow DOM to settle if needed (language change might cause re-renders)
            setTimeout(() => {
                if (initTourRef.current) initTourRef.current(nextStep);
            }, 100);
        }
    }, [language, t]); // Re-run when language changes


    // Effect to listen for custom start event
    useEffect(() => {
        const handleStartEvent = () => {
            if (initTourRef.current) initTourRef.current(0);
        };

        window.addEventListener(START_TOUR_EVENT, handleStartEvent);

        // Auto-start check (only on mount)
        const hasSeenTour = localStorage.getItem("hasSeenOnboardingTour");
        if (!hasSeenTour) {
            // Delay heavily to ensure layout is ready
            setTimeout(() => {
                // Check again inside timeout just in case
                if (!isTourActive.current && !localStorage.getItem("hasSeenOnboardingTour")) {
                    if (initTourRef.current) initTourRef.current(0);
                }
            }, 1500);
        }

        return () => {
            window.removeEventListener(START_TOUR_EVENT, handleStartEvent);
            if (driverRef.current && isTourActive.current) {
                driverRef.current.destroy();
            }
        };
    }, []); // Only on mount

    return null;
}
