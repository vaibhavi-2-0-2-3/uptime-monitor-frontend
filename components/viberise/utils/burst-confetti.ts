"use client"

export function burstConfetti() {
  const root = document.body
  const container = document.createElement("div")
  container.setAttribute(
    "style",
    ["position:fixed", "inset:0", "pointer-events:none", "z-index:70", "overflow:hidden"].join(";"),
  )
  root.appendChild(container)
  const colors = ["#CCFF11", "#E9FF8C", "#D7FF4D", "#F6FFE0"]
  const pieces = 40
  for (let i = 0; i < pieces; i++) {
    const el = document.createElement("span")
    const size = 6 + Math.round(Math.random() * 6)
    el.textContent = "•"
    el.setAttribute(
      "style",
      [
        "position:absolute",
        `left:${50 + (Math.random() * 40 - 20)}%`,
        `top:${50 + (Math.random() * 20 - 10)}%`,
        `font-size:${size}px`,
        `color:${colors[i % colors.length]}`,
        "filter:drop-shadow(0 0 4px rgba(204,185,17,0.6))",
        "will-change:transform,opacity",
      ].join(";"),
    )
    container.appendChild(el)
    const dx = (Math.random() - 0.5) * 200
    const dy = -100 - Math.random() * 150
    const rot = (Math.random() - 0.5) * 180
    el.animate(
      [
        { transform: "translate3d(0,0,0) rotate(0)", opacity: 1 },
        { transform: `translate3d(${dx}px, ${dy}px, 0) rotate(${rot}deg)`, opacity: 0 },
      ],
      { duration: 1200 + Math.random() * 600, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
    )
  }
  setTimeout(() => root.removeChild(container), 2000)
}
