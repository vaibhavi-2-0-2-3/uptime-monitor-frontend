"use client"

import * as React from "react"

export interface FloatingCoinsProps {
  reduced: boolean
}

/**
 * Floating status indicators - representing uptime monitoring concepts
 * - Server/monitoring related emojis
 * - Bubble-style motion: slow upward rise + gentle horizontal sway + soft pulse
 * - Glass bubble with neon #CCFF11 ring
 * - Motion-safety with prefers-reduced-motion
 */
export function FloatingCoins({ reduced }: FloatingCoinsProps) {
  // Server and monitoring related emoji set
  const ICONS = React.useMemo(
    () => [
      "🟢", // online status
      "⚡", // fast response
      "📊", // analytics
      "🔔", // alerts
      "🌐", // global
      "🖥️", // server
      "📈", // uptime
      "✅", // check passed
      "🔒", // secure
      "⏱️", // response time
      "🌍", // worldwide
      "💚", // healthy
      "🛡️", // protected
      "📡", // monitoring
      "🔋", // uptime
      "⭐", // status
    ],
    [],
  )

  type Bubble = {
    id: number
    emoji: string
    size: number
    left: number
    delay: number
    riseDur: number
    swayDur: number
    pulseDur: number
    amp: number
    depth: number
  }

  const bubbles: Bubble[] = React.useMemo(() => {
    const count = reduced ? 12 : 26
    const arr: Bubble[] = []
    for (let i = 0; i < count; i++) {
      const emoji = ICONS[i % ICONS.length]
      const size = 22 + Math.round(Math.random() * 28)
      const left = Math.round(Math.random() * 100)
      const delay = Math.random() * 8
      const riseDur = 18 + Math.random() * 24
      const swayDur = 3 + Math.random() * 4
      const pulseDur = 2.2 + Math.random() * 1.6
      const amp = 6 + Math.random() * 18
      const depth = 0.35 + Math.random() * 0.65
      arr.push({ id: i, emoji, size, left, delay, riseDur, swayDur, pulseDur, amp, depth })
    }
    return arr
  }, [ICONS, reduced])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={
            {
              left: `${b.left}%`,
              bottom: "-12vh",
              fontSize: `${b.size}px`,
              opacity: Math.min(1, b.depth * 0.95),
              zIndex: Math.round(b.depth * 100),
              animationDelay: `${b.delay}s`,
              "--rise-dur": `${b.riseDur}s`,
            } as React.CSSProperties
          }
        >
          <span
            className="bubble-sway"
            style={
              {
                "--amp": `${b.amp}px`,
                "--sway-dur": `${b.swayDur}s`,
              } as React.CSSProperties
            }
          >
            <span
              className="bubble-face"
              style={
                {
                  "--pulse-dur": `${b.pulseDur}s`,
                } as React.CSSProperties
              }
            >
              <span className="bubble-emoji">{b.emoji}</span>
            </span>
          </span>
        </span>
      ))}

      <style jsx>{`
        :root {
          --brand: #CCFF11;
        }

        .bubble {
          position: absolute;
          transform: translate(-50%, 0);
          will-change: transform, opacity, filter;
          animation: rise var(--rise-dur) linear infinite;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .bubble-sway {
          display: inline-block;
          will-change: transform;
          animation: sway var(--sway-dur) ease-in-out infinite alternate;
        }

        .bubble-face {
          position: relative;
          display: inline-block;
          width: 1em;
          height: 1em;
          padding: 0.35em;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.72);
          color: #000;
          border: 2px solid rgba(204, 255, 17, 0.55);
          box-shadow:
            0 10px 30px rgba(204, 255, 17, 0.2),
            0 0 14px rgba(204, 255, 17, 0.25);
          backdrop-filter: blur(8px) saturate(120%);
          will-change: transform, box-shadow;
          animation: pulse var(--pulse-dur) ease-in-out infinite;
        }
        :global(html.dark) .bubble-face {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-color: rgba(204, 255, 17, 0.5);
          box-shadow:
            0 10px 28px rgba(204, 255, 17, 0.15),
            0 0 12px rgba(204, 255, 17, 0.22);
        }

        .bubble-face::before {
          content: "";
          position: absolute;
          top: 6%;
          left: 12%;
          width: 58%;
          height: 26%;
          border-radius: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0));
          filter: blur(1.8px);
          pointer-events: none;
        }

        .bubble-face::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          box-shadow:
            inset 0 0 16px rgba(204, 255, 17, 0.22),
            0 0 18px rgba(204, 255, 17, 0.18);
          pointer-events: none;
        }

        .bubble-emoji {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) translateZ(0);
          display: block;
          line-height: 1;
          font-size: 0.72em;
          text-align: center;
          -webkit-font-smoothing: antialiased;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12));
          pointer-events: none;
        }

        @keyframes rise {
          0% {
            transform: translate(-50%, 0);
          }
          100% {
            transform: translate(-50%, -120vh);
          }
        }

        @keyframes sway {
          0% {
            transform: translateX(calc(-1 * var(--amp, 12px)));
          }
          100% {
            transform: translateX(var(--amp, 12px));
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bubble,
          .bubble-sway,
          .bubble-face {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
