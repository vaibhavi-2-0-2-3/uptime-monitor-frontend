export function NeonBackground() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute -inset-40 opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(40% 30% at 20% 20%, rgba(204,255,17,0.25), transparent 60%), radial-gradient(40% 30% at 80% 30%, rgba(204,255,17,0.18), transparent 60%), radial-gradient(40% 30% at 50% 80%, rgba(204,255,17,0.15), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)]" />
    </div>
  )
}
