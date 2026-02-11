
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard | Felipe Pereira A.",
    description: "Panel de gestión y administración de proyectos.",
    alternates: {
        canonical: "https://fpereiradev.sppa.cl/dashboard",
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
