"use client"

export function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --brand: #CCFF11;
        --header-h: 64px; /* mobile header height */
      }
      html {
        scroll-behavior: smooth;
      }
      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }
      }
      @media (min-width: 768px) {
        :root {
          --header-h: 72px; /* md+ header height */
        }
      }

      /* Hero: exact viewport height and centering */
      .vh-hero {
        height: calc(100svh - var(--header-h));
        scroll-margin-top: var(--header-h);
        display: grid;
        place-items: center;
      }
      @supports not (height: 1svh) {
        .vh-hero {
          height: calc(100dvh - var(--header-h));
        }
      }

      /* Sections: desktop/tablet full-height centered */
      .vh-section {
        min-height: calc(100svh - var(--header-h));
        scroll-margin-top: var(--header-h);
        display: grid;
        place-items: center;
      }
      @supports not (height: 1svh) {
        .vh-section {
          min-height: calc(100dvh - var(--header-h));
        }
      }
      .vh-section > .container {
        width: 100%;
      }

      /* Mobile layout fixes: add vertical spacing and disable full-height centering */
      @media (max-width: 640px) {
        .vh-section {
          display: block;                 /* natural flow on mobile */
          min-height: auto;               /* stop forcing full viewport height */
          padding-block: clamp(20px, 6vh, 40px); /* vertical breathing room */
        }
        .vh-section + .vh-section {
          margin-top: 24px;               /* separation between sections */
        }
        /* Keep hero centered but add a bit of breathing room for notches */
        .vh-hero {
          height: calc(100svh - var(--header-h));
          padding-block: 12px;
        }
      }

      @keyframes dividerGlow {
        0% {
          box-shadow: 0 0 12px rgba(204, 255, 17, 0.6), 0 0 24px rgba(204, 255, 17, 0.4);
        }
        100% {
          box-shadow: 0 0 30px rgba(204, 255, 17, 0.9), 0 0 60px rgba(204, 255, 17, 0.6);
        }
      }
      .divider-glow {
        animation: dividerGlow 2.8s ease-in-out infinite alternate;
      }

      /* Pointer cursor for actionable buttons */
      button:not([disabled]),
      [role="button"]:not([aria-disabled="true"]),
      input[type="button"],
      input[type="submit"] {
        cursor: pointer;
      }

      /* Disabled states show a not-allowed cursor */
      button[disabled],
      [aria-disabled="true"] {
        cursor: not-allowed;
      }
    `}</style>
  )
}
