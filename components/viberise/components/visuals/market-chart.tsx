"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Star } from "lucide-react"

type Point = { t: string; uptime: number }

export interface MarketChartProps {
  data?: Point[]
  title?: string
  description?: string
}

/**
 * Uptime monitoring chart - showing response times and availability
 */
export function MarketChart({
  data: externalData,
  title = "Response Time Monitor",
  description = "Track performance across all your endpoints",
}: MarketChartProps) {
  type Range = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL"

  // Response time datasets (in ms)
  const dataSets = React.useMemo(() => {
    const d1: Point[] = [
      { t: "00:00", uptime: 142 },
      { t: "04:00", uptime: 138 },
      { t: "08:00", uptime: 156 },
      { t: "12:00", uptime: 189 },
      { t: "16:00", uptime: 167 },
      { t: "20:00", uptime: 145 },
      { t: "Now", uptime: 148 },
    ]
    const d1w: Point[] = [
      { t: "Mon", uptime: 152 },
      { t: "Tue", uptime: 148 },
      { t: "Wed", uptime: 156 },
      { t: "Thu", uptime: 143 },
      { t: "Fri", uptime: 151 },
      { t: "Sat", uptime: 139 },
      { t: "Sun", uptime: 145 },
    ]
    const d1m: Point[] = [
      { t: "W1", uptime: 158 },
      { t: "W2", uptime: 152 },
      { t: "W3", uptime: 149 },
      { t: "W4", uptime: 144 },
    ]
    const d3m: Point[] = [
      { t: "Oct", uptime: 168 },
      { t: "Nov", uptime: 155 },
      { t: "Dec", uptime: 148 },
    ]
    const d1y: Point[] = [
      { t: "Jan", uptime: 195 },
      { t: "Mar", uptime: 178 },
      { t: "May", uptime: 165 },
      { t: "Jul", uptime: 158 },
      { t: "Sep", uptime: 152 },
      { t: "Nov", uptime: 148 },
    ]
    const dall: Point[] = [
      { t: "2022", uptime: 245 },
      { t: "2023", uptime: 198 },
      { t: "2024", uptime: 165 },
      { t: "2025", uptime: 148 },
    ]
    return {
      "1D": d1,
      "1W": d1w,
      "1M": d1m,
      "3M": d3m,
      "1Y": d1y,
      ALL: dall,
    } as Record<Range, Point[]>
  }, [])

  const [range, setRange] = React.useState<Range>("1M")
  const baseData = externalData ?? dataSets[range]
  const [activeData, setActiveData] = React.useState<Point[]>(baseData)
  React.useEffect(() => {
    setActiveData(externalData ?? dataSets[range])
  }, [range, dataSets, externalData])

  // Header values
  const first = activeData[0]?.uptime ?? 0
  const last = activeData[activeData.length - 1]?.uptime ?? 0
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const [hoverLabel, setHoverLabel] = React.useState<string | null>(null)

  const current = hoverValue ?? last
  const base = first || current
  const delta = current - base
  const pct = base ? (delta / base) * 100 : 0
  // For response time, lower is better, so we flip the logic
  const isImproved = delta <= 0

  const lineColor = isImproved ? "#22c55e" : "#ef4444"
  const fillFrom = isImproved ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"
  const fillTo = isImproved ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)"

  const onMove = (e: any) => {
    const p = e?.activePayload?.[0]?.payload
    if (p) {
      setHoverValue(p.uptime)
      setHoverLabel(p.t)
    }
  }
  const onLeave = () => {
    setHoverValue(null)
    setHoverLabel(null)
  }

  return (
    <Card className="overflow-hidden border-black/10 bg-white/70 dark:border-white/10 dark:bg-black/40">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/10">
                <span className="text-base" aria-hidden>
                  {"⚡"}
                </span>
              </span>
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-black/60 hover:text-black hover:bg-black/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10"
            aria-label="Add to dashboard"
            title="Add to dashboard"
          >
            <Star className="h-4 w-4" />
          </button>
        </div>

        {/* Response time header */}
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <div className="text-3xl font-bold tabular-nums">{current}ms</div>
          <div
            className={[
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
              isImproved
                ? "bg-[rgba(34,197,94,0.12)] text-[color:rgb(22,163,74)] ring-1 ring-[rgba(34,197,94,0.25)]"
                : "bg-[rgba(239,68,68,0.12)] text-[color:rgb(220,38,38)] ring-1 ring-[rgba(239,68,68,0.25)]",
            ].join(" ")}
            aria-live="polite"
          >
            {isImproved ? <TrendingDown className="mr-1 h-3.5 w-3.5" /> : <TrendingUp className="mr-1 h-3.5 w-3.5" />}
            {delta >= 0 ? "+" : ""}
            {delta}ms {" ("}
            {delta >= 0 ? "+" : ""}
            {pct.toFixed(1)}
            {"%)"}
            {hoverLabel ? ` · ${hoverLabel}` : null}
          </div>
        </div>

        {/* Time range tabs */}
        <div className="mt-3">
          <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
            <TabsList className="grid w-full grid-cols-6 bg-white/60 dark:bg-white/10">
              {(["1D", "1W", "1M", "3M", "1Y", "ALL"] as Range[]).map((r) => (
                <TabsTrigger
                  key={r}
                  value={r}
                  className="data-[state=active]:bg-[var(--brand)] data-[state=active]:text-black"
                >
                  {r}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <ChartContainer
          config={{
            uptime: {
              label: "Response Time",
              color: lineColor,
            },
          }}
          className="h-[280px] w-full sm:h-[300px] md:h-[320px]"
          style={
            {
              "--color-uptime": lineColor,
            } as React.CSSProperties
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activeData}
              margin={{ top: 10, right: 12, left: 12, bottom: 0 }}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <defs>
                <linearGradient id="uptimeFillDynamic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={fillFrom} />
                  <stop offset="100%" stopColor={fillTo} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-black/5 dark:text-white/10"
                vertical={false}
              />
              <XAxis
                dataKey="t"
                tickMargin={8}
                tick={{ fill: "currentColor", opacity: 0.55, fontSize: 12 }}
                axisLine={{ stroke: "currentColor", opacity: 0.1 }}
                tickLine={{ stroke: "currentColor", opacity: 0.1 }}
                minTickGap={24}
              />
              <YAxis
                width={42}
                tickMargin={6}
                tickFormatter={(v) => v + "ms"}
                tick={{ fill: "currentColor", opacity: 0.55, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 10", "dataMax + 10"]}
              />

              <ChartTooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.25 }}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    className="rounded-md bg-white/90 p-2 text-xs shadow-md ring-1 ring-black/10 backdrop-blur dark:bg-black/70 dark:ring-white/10"
                  />
                }
              />

              <Line
                type="monotone"
                dataKey="uptime"
                stroke="var(--color-uptime)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                fill="url(#uptimeFillDynamic)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Context row */}
        <div className="mt-3 grid gap-2 text-xs text-black/70 dark:text-white/70 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: lineColor, boxShadow: `0 0 8px ${lineColor}88` }}
            />
            <span>Avg response time</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
            <span>99.98% uptime this month</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/15" />
            <span>12 global check locations</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
