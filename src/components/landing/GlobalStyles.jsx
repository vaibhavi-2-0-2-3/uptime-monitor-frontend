export function GlobalStyles() {
  return (
    <style>{`
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
          margin-top: 0;
        }
      }

      .vh-center {
        display: grid;
        place-items: center;
      }
    `}</style>
  )
}
