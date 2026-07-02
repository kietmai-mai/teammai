import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const COLORS = { gold: "#C9A962", navy: "#102A43", green: "#10B981" }

const fmtCur = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

interface ChartProps {
  barData: { name: string; payment: number; fill: string }[]
  pieData: { name: string; value: number }[]
  chartData: { year: number; savings: number }[]
  closingCosts: number
}

const pieColors = [COLORS.navy, COLORS.green]

export default function RefinanceCharts({ barData, pieData, chartData, closingCosts }: ChartProps) {
  return (
    <>
      {/* Bar + Pie charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-navy-800 rounded-xl border border-navy-100 dark:border-navy-700 p-4 sm:p-5">
          <h4 className="font-display font-bold text-navy-800 dark:text-white text-sm mb-4">Monthly Payment Comparison</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#888" }} />
              <YAxis tick={{ fontSize: 11, fill: "#888" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => fmtCur(v)} />
              <Bar dataKey="payment" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-navy-800 rounded-xl border border-navy-100 dark:border-navy-700 p-4 sm:p-5">
          <h4 className="font-display font-bold text-navy-800 dark:text-white text-sm mb-4">Total Interest Comparison</h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={85}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name === "Current Interest" ? "Current" : "New"} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => fmtCur(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line chart */}
      <div className="bg-white dark:bg-navy-800 rounded-xl border border-navy-100 dark:border-navy-700 p-4 sm:p-5">
        <h4 className="font-display font-bold text-navy-800 dark:text-white text-sm mb-4">Cumulative Savings Over Time</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} label={{ value: "Years", position: "insideBottom", offset: -5, style: { fontSize: 11 } }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => fmtCur(v)} />
            <Line type="monotone" dataKey="savings" stroke={COLORS.gold} strokeWidth={3} dot={{ fill: COLORS.gold, r: 3 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-center text-xs text-navy-400 mt-2">Savings after deducting ${closingCosts.toLocaleString()} in closing costs</p>
      </div>
    </>
  )
}
