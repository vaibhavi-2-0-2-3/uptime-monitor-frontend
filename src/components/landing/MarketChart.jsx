import { useState, useMemo, useEffect } from "react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

export function MarketChart({ data, title = "Response Time Monitor", description = "Track performance across all your endpoints" }) {
  const dataSets = useMemo(() => {
    const d1 = [
      { t: "00:00", uptime: 142 },
      { t: "04:00", uptime: 138 },
      { t: "08:00", uptime: 156 },
      { t: "12:00", uptime: 189 },
      { t: "16:00", uptime: 167 },
      { t: "20:00", uptime: 145 },
      { t: "Now", uptime: 148 },
    ]
    const d1w = [
      { t: "Mon", uptime: 152 },
      { t: "Tue", uptime: 148 },
      { t: "Wed", uptime: 156 },
      { t: "Thu", uptime: 143 },
      { t: "Fri", uptime: 151 },
      { t: "Sat", uptime: 139 },
      { t: "Sun", uptime: 145 },
    ]
    const d1m = [
      { t: "W1", uptime: 158 },
      { t: "W2", uptime: 152 },
      { t: "W3", uptime: 149 },
      { t: "W4", uptime: 144 },
    ]
    const d3m = [
      { t: "Oct", uptime: 168 },
      { t: "Nov", uptime: 155 },
      { t: "Dec", uptime: 148 },
    ]
    const d1y = [
      { t: "Jan", uptime: 195 },
      { t: "Mar", uptime: 178 },
      { t: "May", uptime: 165 },
      { t: "Jul", uptime: 158 },
      { t: "Sep", uptime: 152 },
      { t: "Nov", uptime: 148 },
    ]
    const dall = [
      { t: "2022", uptime: 245 },
      { t: "2023", uptime: 198 },
      { t: "2024", uptime: 165 },
      { t: "2025", uptime: 148 },
    ]
    return { "1D": d1, "1W": d1w, "1M": d1m, "3M": d3m, "1Y": d1y, ALL: dall }
  }, [])

  const [range, setRange] = useState("1M")
  const baseData = data ?? dataSets[range]
  const [activeData, setActiveData] = useState(baseData)

  useEffect(() => {
    setActiveData(data ?? dataSets[range])
  }, [range, dataSets, data])

  const first = activeData[0]?.uptime ?? 0
  const last = activeData[activeData.length - 1]?.uptime ?? 0
  const [hoverValue, setHoverValue] = useState(null)

  const current = hoverValue ?? last
  const base = first || current
  const delta = current - base
  const pct = base ? (delta / base) * 100 : 0

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-black/70 dark:text-white/70">{description}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-xs font-medium rounded transition ${range === r
                ? "bg-[var(--brand)] text-black"
                : "bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/20"
                }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-3">
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Current</div>
            <div className="text-2xl font-bold">{current.toFixed(0)}ms</div>
          </div>
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Change</div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">{Math.abs(delta).toFixed(0)}ms</span>
              {delta < 0 ? (
                <TrendingDown className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingUp className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>
          <div>
            <div className="text-xs text-black/60 dark:text-white/60">Change %</div>
            <div className="text-2xl font-bold">{pct.toFixed(1)}%</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(204,255,17,0.1)" />
            <XAxis dataKey="t" stroke="rgba(0,0,0,0.3)" />
            <YAxis stroke="rgba(0,0,0,0.3)" />
            <Tooltip
              onMouseMove={(state) => {
                if (state.isTooltipActive) {
                  setHoverValue(state.activePayload?.[0]?.value ?? null)
                }
              }}
              onMouseLeave={() => setHoverValue(null)}
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(204,255,17,0.5)",
                borderRadius: "8px",
                color: "#CCFF11",
              }}
            />
            <Line
              type="monotone"
              dataKey="uptime"
              stroke="#CCFF11"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
