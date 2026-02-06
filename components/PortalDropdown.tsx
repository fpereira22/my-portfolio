// PortalDropdown.tsx
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

export function PortalDropdown({ anchorRef, children, show }: { anchorRef: React.RefObject<HTMLElement>, children: React.ReactNode, show: boolean }) {
  const [style, setStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (anchorRef.current && show) {
      const rect = anchorRef.current.getBoundingClientRect()
      setStyle({
        position: "fixed",
        left: rect.left,
        top: rect.bottom + 4,
        width: rect.width,
        zIndex: 99999,
      })
    }
  }, [anchorRef, show])

  if (!show) return null

  return createPortal(
    <div style={style} className="bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
      {children}
    </div>,
    document.body
  )
}