export function Accordion({ children, type = "single", collapsible = true, ...props }) {
  return <div {...props}>{children}</div>
}

export function AccordionItem({ children, value }) {
  return <div data-value={value}>{children}</div>
}

export function AccordionTrigger({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full flex justify-between items-center px-4 py-3 border-b border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition text-left font-medium"
    >
      {children}
      <span className="text-lg">▼</span>
    </button>
  )
}

export function AccordionContent({ children, ...props }) {
  return (
    <div {...props} className="px-4 py-3">
      {children}
    </div>
  )
}
