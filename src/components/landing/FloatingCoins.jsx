import { useMemo } from "react"

export function FloatingCoins({ reduced = false }) {
  const ICONS = useMemo(
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

  const bubbles = useMemo(() => {
    const count = reduced ? 12 : 26
    const arr = []
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
    <>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="bubble"
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
              className="bubble-sway"
              style={{
                "--amp": `${b.amp}px`,
                "--sway-dur": `${b.swayDur}s`,
              }}
            >
              <span
                className="bubble-face"
                style={{
                  "--pulse-dur": `${b.pulseDur}s`,
                }}
              >
                <span className="bubble-emoji">{b.emoji}</span>
              </span>
            </span>
          </span>
        ))}
      </div>

      <style>{`
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

        html.dark .bubble-face {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-color: rgba(204, 255, 17, 0.3);
          box-shadow:
            0 10px 30px rgba(204, 255, 17, 0.15),
            0 0 14px rgba(204, 255, 17, 0.2);
        }

        .bubble-emoji {
          display: inline-block;
          width: 1em;
          height: 1em;
          line-height: 1;
          font-size: 1em;
          text-align: center;
          vertical-align: middle;
        }

        @keyframes rise {
          0% {
            transform: translate(-50%, 0) scaleY(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -100vh) scaleY(1);
            opacity: 0;
          }
        }

        @keyframes sway {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--amp));
          }
        }

        @keyframes pulse {
          0%, 100% {
            filter: drop-shadow(0 4px 6px rgba(204, 255, 17, 0.15));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 8px 12px rgba(204, 255, 17, 0.25));
            transform: scale(1.04);
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
    </>
  )
}
