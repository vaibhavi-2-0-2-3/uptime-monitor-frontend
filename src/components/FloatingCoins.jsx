"use client"
import * as React from "react"

export default function FloatingCoins({ reduced = false }) {
  // coin set
  const COINS = React.useMemo(
    () => ["📊", "💰", "💵", "⚡", "🌐", "🔔", "📈", "🛡️", "💚"],
    []
  )

  // bubble structure
  const bubbles = React.useMemo(() => {
    const count = reduced ? 10 : 22
    const arr = []

    for (let i = 0; i < count; i++) {
      const emoji = COINS[i % COINS.length]
      const size = 22 + Math.round(Math.random() * 28) // 22–50px
      const left = Math.round(Math.random() * 100) // %
      const delay = Math.random() * 8 // seconds
      const riseDur = 18 + Math.random() * 24 // 18–42s
      const swayDur = 3 + Math.random() * 4 // 3–7s
      const pulseDur = 2.2 + Math.random() * 1.6 // 2.2–3.8s
      const amp = 6 + Math.random() * 18 // sway px
      const depth = 0.35 + Math.random() * 0.65 // opacity + z-index

      arr.push({
        id: i,
        emoji,
        size,
        left,
        delay,
        riseDur,
        swayDur,
        pulseDur,
        amp,
        depth,
      })
    }

    return arr
  }, [COINS, reduced])

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="coin-bubble"
          style={{
            left: `${b.left}%`,
            bottom: "-12vh",
            fontSize: `${b.size}px`,
            opacity: Math.min(1, b.depth * 0.95),
            zIndex: Math.round(b.depth * 100),
            animationDelay: `${b.delay}s`,
            "--rise-dur": `${b.riseDur}s`,
          }}
        >
          <span
            className="coin-sway"
            style={{
              "--amp": `${b.amp}px`,
              "--sway-dur": `${b.swayDur}s`,
            }}
          >
            <span
              className="coin-face"
              style={{
                "--pulse-dur": `${b.pulseDur}s`,
              }}
            >
              <span className="coin-emoji">{b.emoji}</span>
            </span>
          </span>
        </span>
      ))}

      {/* All animations/styles */}
      <style jsx>{`
        :root {
          --brand: #ccff11;
        }

        .coin-bubble {
          position: absolute;
          transform: translate(-50%, 0);
          will-change: transform, opacity, filter;
          animation: rise var(--rise-dur) linear infinite;
        }

        .coin-sway {
          display: inline-block;
          will-change: transform;
          animation: sway var(--sway-dur) ease-in-out infinite alternate;
        }

        .coin-face {
          position: relative;
          display: inline-block;
          width: 1em;
          height: 1em;
          padding: 0.35em;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.72);
          color: #000;
          border: 2px solid rgba(204, 255, 17, 0.55);
          box-shadow: 0 10px 30px rgba(204, 255, 17, 0.2),
            0 0 14px rgba(204, 255, 17, 0.25);
          backdrop-filter: blur(8px) saturate(120%);
          animation: pulse var(--pulse-dur) ease-in-out infinite;
        }

        .coin-face::before {
          content: "";
          position: absolute;
          top: 6%;
          left: 12%;
          width: 58%;
          height: 26%;
          border-radius: 50%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.7),
            rgba(255, 255, 255, 0)
          );
          filter: blur(1.8px);
        }

        .coin-emoji {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.72em;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12));
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

        /* Motion reduction */
        @media (prefers-reduced-motion: reduce) {
          .coin-bubble,
          .coin-sway,
          .coin-face {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
