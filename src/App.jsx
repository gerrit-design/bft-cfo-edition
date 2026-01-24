import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ComposedChart, PieChart, Pie, Cell, ReferenceLine } from 'recharts';

// ============================================================
// THE BENEFIQUE FINANCIAL TIMES - CFO EDITION
// Enhanced with visualizations and educational content
// ============================================================

export default function App() {

  // ============================================================
  // CONFIG
  // ============================================================

  const CONFIG = {
    clientName: 'Titan Group',
    clientSlug: 'titan',
    industry: 'Marine & Industrial Services',
    location: 'Hollywood, Florida',
    reportDate: 'January 24, 2026',
    editionNumber: 1,
    periodStart: 'February 2025',
    periodEnd: 'January 2026',
    currentDay: 24,
    daysInMonth: 31,
    isMultiEntity: true,
    entities: ['Distribution', 'Services'],
    hasConsolidated: true,
    primaryColor: '#1e3a5f',
    secondaryColor: '#166534',
    dataSource: 'QuickBooks via g-accon',
    lastSync: '2026-01-24 06:22:13',
  };

  const monthProgress = Math.round((CONFIG.currentDay / CONFIG.daysInMonth) * 100);

  // ============================================================
  // DATA - January 24, 2026
  // ============================================================

  const summaryMetrics = {
    overallStatus: 'GREEN',
    statusReason: 'Strong January Performance',
    cashRunway: 50,
    ttmNetIncome: 440520,
    ruleOf40Score: 40,
  };

  const cashData = {
    current: 193031,
    prior: 139918,
    change: 53113,
    changePct: 38,
    daysOnHand: 50,
    trend: [
      { week: 'Dec 27', cash: 166675 },
      { week: 'Jan 3', cash: 119415 },
      { week: 'Jan 10', cash: 188960 },
      { week: 'Jan 17', cash: 179300 },
      { week: 'Jan 24', cash: 193031 },
    ],
  };

  const entityData = [
    {
      name: 'Distribution',
      status: 'YELLOW',
      statusNote: 'Revenue down 35% MoM',
      cash: 75742,
      revenue: 168320,
      revenueProjected: 217510,
      revenuePrior: 253638,
      ebitda: 23273,
      ebitdaPct: 14,
      grossMarginPct: 38,
      dscr: 2.44,
      ttmRevenue: 3112257,
      ttmNetIncome: 328253,
    },
    {
      name: 'Services',
      status: 'GREEN',
      statusNote: 'Revenue up 16% MoM',
      cash: 117289,
      revenue: 311386,
      revenueProjected: 402466,
      revenuePrior: 269217,
      ebitda: 133820,
      ebitdaPct: 43,
      grossMarginPct: 69,
      dscr: 1.42,
      ttmRevenue: 3221203,
      ttmNetIncome: 112267,
    },
  ];

  const consolidated = {
    cash: 193031,
    revenue: 479706,
    revenueProjected: 619976,
    ebitda: 157093,
    ebitdaPct: 33,
    ttmRevenue: 6333460,
    ttmEbitda: 533941,
    ttmEbitdaPct: 8,
    ttmNetIncome: 440520,
    dscr: 1.93,
    annualizedGrowth: 32,
  };

  const revenueTrend = [
    { month: 'Aug', distribution: 195767, services: 280093, total: 475860 },
    { month: 'Sep', distribution: 188074, services: 158400, total: 346474 },
    { month: 'Oct', distribution: 494486, services: 294372, total: 788858 },
    { month: 'Nov', distribution: 308689, services: 281942, total: 590631 },
    { month: 'Dec', distribution: 253638, services: 269217, total: 522855 },
    { month: 'Jan*', distribution: 217510, services: 402466, total: 619976 },
  ];

  const actionItems = [
    { priority: 1, item: 'Verify Services payroll spike (+181%)', context: 'Unusually high - may be catch-up or bonus', urgency: 'HIGH' },
    { priority: 2, item: 'Check Distribution revenue timing', context: 'Down 35% MoM - likely timing, not trend', urgency: 'MEDIUM' },
    { priority: 3, item: 'Schedule intercompany settlement', context: 'Services owes Distribution ~$35K', urgency: 'LOW' },
  ];

  // ============================================================
  // UTILITY FUNCTIONS
  // ============================================================

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '—';
    const absValue = Math.abs(value);
    if (absValue >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (absValue >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'GREEN': return 'text-emerald-600';
      case 'YELLOW': return 'text-amber-500';
      case 'RED': return 'text-red-600';
      default: return 'text-stone-500';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'GREEN': return 'bg-emerald-50 border-emerald-200';
      case 'YELLOW': return 'bg-amber-50 border-amber-200';
      case 'RED': return 'bg-red-50 border-red-200';
      default: return 'bg-stone-50 border-stone-200';
    }
  };

  // ============================================================
  // UI COMPONENTS
  // ============================================================

  // Gauge Chart Component for visual metric display
  const GaugeChart = ({ value, max, label, status, size = 120 }) => {
    const percentage = Math.min((value / max) * 100, 100);
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI; // Half circle
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const colors = {
      GREEN: '#10b981',
      YELLOW: '#f59e0b',
      RED: '#ef4444',
    };

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size / 2 + 20} className="overflow-visible">
          {/* Background arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke={colors[status] || colors.GREEN}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
          {/* Value text */}
          <text x={size / 2} y={size / 2 - 5} textAnchor="middle" className="text-2xl font-bold fill-stone-800">
            {typeof value === 'number' ? value.toFixed(value < 10 ? 1 : 0) : value}
          </text>
          <text x={size / 2} y={size / 2 + 12} textAnchor="middle" className="text-[10px] fill-stone-500">
            {label}
          </text>
        </svg>
      </div>
    );
  };

  // Progress Ring for simple percentage display
  const ProgressRing = ({ value, max = 100, size = 80, label, sublabel }) => {
    const percentage = Math.min((value / max) * 100, 100);
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
          <span className="text-lg font-bold text-stone-800">{value}</span>
          {sublabel && <span className="text-[9px] text-stone-500">{sublabel}</span>}
        </div>
        {label && <span className="mt-1 text-xs text-stone-600">{label}</span>}
      </div>
    );
  };

  // Explainer Box - Educational content for owners
  const ExplainerBox = ({ title, children, icon }) => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mt-4">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon || '💡'}</div>
        <div>
          <h4 className="font-semibold text-blue-900 mb-1">{title}</h4>
          <p className="text-sm text-blue-800 leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );

  // Metric Card with visual indicator
  const MetricCard = ({ title, value, subtext, status, trend, explainer }) => (
    <div className={`rounded-xl p-5 border-2 ${getStatusBg(status)} relative overflow-hidden`}>
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-wide text-stone-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-stone-800">{value}</p>
        {subtext && <p className="text-sm text-stone-600 mt-1">{subtext}</p>}
        {trend !== undefined && (
          <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium ${
            trend >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      {/* Status indicator bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${
        status === 'GREEN' ? 'bg-emerald-400' : status === 'YELLOW' ? 'bg-amber-400' : 'bg-red-400'
      }`}></div>
    </div>
  );

  // Section with icon and title
  const Section = ({ icon, title, subtitle, children }) => (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-stone-200">
        <span className="text-2xl">{icon}</span>
        <div>
          <h2 className="text-xl font-bold text-stone-800">{title}</h2>
          {subtitle && <p className="text-sm text-stone-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );

  // Status Badge
  const StatusBadge = ({ status, size = 'normal' }) => {
    const sizeClasses = size === 'large' ? 'text-lg px-4 py-2' : 'text-sm px-3 py-1';
    return (
      <span className={`inline-flex items-center gap-2 rounded-full font-semibold ${sizeClasses} ${
        status === 'GREEN' ? 'bg-emerald-100 text-emerald-700' :
        status === 'YELLOW' ? 'bg-amber-100 text-amber-700' :
        'bg-red-100 text-red-700'
      }`}>
        {status === 'GREEN' ? '✓' : status === 'YELLOW' ? '!' : '✕'} {status}
      </span>
    );
  };

  // ============================================================
  // MAIN RENDER
  // ============================================================

  return (
    <div className="bg-gradient-to-b from-stone-100 to-stone-200 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* ============================================================ */}
        {/* HEADER */}
        {/* ============================================================ */}

        <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-8 rounded-b-3xl shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Benefique Fractional CFO</p>
              <h1 className="text-3xl md:text-4xl font-bold">The Financial Times</h1>
              <p className="text-xl text-slate-300 mt-1">{CONFIG.clientName} Edition</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{CONFIG.reportDate}</p>
              <p className="text-slate-400">{CONFIG.location}</p>
            </div>
          </div>

          {/* Month Progress */}
          <div className="mt-6 bg-slate-700/50 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>January Progress</span>
              <span className="font-bold">{monthProgress}% complete</span>
            </div>
            <div className="h-3 bg-slate-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                style={{ width: `${monthProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Day {CONFIG.currentDay} of {CONFIG.daysInMonth} • Numbers are projected to end of month</p>
          </div>
        </header>

        <main className="px-4 md:px-6 py-8">

          {/* ============================================================ */}
          {/* OVERALL STATUS - THE BIG PICTURE */}
          {/* ============================================================ */}

          <Section icon="🎯" title="The Big Picture" subtitle="Your business health at a glance">

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-stone-500 text-sm mb-2">Overall Business Status</p>
                  <StatusBadge status={summaryMetrics.overallStatus} size="large" />
                  <p className="text-stone-600 mt-2">{summaryMetrics.statusReason}</p>
                </div>

                <div className="flex gap-8">
                  <div className="text-center relative">
                    <ProgressRing value={summaryMetrics.cashRunway} max={90} size={90} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">{summaryMetrics.cashRunway}</span>
                      <span className="text-[9px] text-stone-500">days</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-2">Cash Runway</p>
                  </div>

                  <div className="text-center relative">
                    <ProgressRing value={summaryMetrics.ruleOf40Score} max={60} size={90} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">{summaryMetrics.ruleOf40Score}</span>
                      <span className="text-[9px] text-stone-500">score</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-2">Rule of 40</p>
                  </div>
                </div>
              </div>
            </div>

            <ExplainerBox title="What does GREEN status mean?" icon="✅">
              Your business is healthy! You have enough cash to operate for {summaryMetrics.cashRunway} days without new revenue,
              you're profitable, and you can comfortably pay all your debts. Keep doing what you're doing.
            </ExplainerBox>
          </Section>

          {/* ============================================================ */}
          {/* CASH HEALTH */}
          {/* ============================================================ */}

          <Section icon="💰" title="Cash Health" subtitle="The lifeblood of your business">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard
                title="Cash on Hand"
                value={formatCurrency(cashData.current)}
                subtext="Combined both entities"
                status="GREEN"
                trend={cashData.changePct}
              />
              <MetricCard
                title="Cash Runway"
                value={`${cashData.daysOnHand} days`}
                subtext="How long you can operate"
                status={cashData.daysOnHand >= 45 ? 'GREEN' : cashData.daysOnHand >= 30 ? 'YELLOW' : 'RED'}
              />
              <MetricCard
                title="Monthly Profit"
                value={formatCurrency(summaryMetrics.ttmNetIncome / 12)}
                subtext="Average per month (TTM)"
                status="GREEN"
              />
            </div>

            {/* Cash Trend Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-stone-800 mb-4">5-Week Cash Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={cashData.trend}>
                  <defs>
                    <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(v) => formatCurrency(v)}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="cash" stroke="#10b981" fill="url(#cashGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm">
                <span className="text-emerald-600 font-semibold">↑ {formatCurrency(cashData.change)}</span>
                <span className="text-stone-500">since December 27</span>
              </div>
            </div>

            <ExplainerBox title="Why Cash Runway Matters" icon="⏱️">
              Cash runway tells you how many days you could keep operating if all revenue stopped today.
              <strong> 50 days is healthy</strong> — it gives you time to react to surprises. We recommend keeping
              at least 30 days on hand. Below 14 days is a red alert.
            </ExplainerBox>
          </Section>

          {/* ============================================================ */}
          {/* REVENUE & PROFITABILITY */}
          {/* ============================================================ */}

          <Section icon="📈" title="Revenue & Profitability" subtitle="Are you making money?">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="TTM Revenue"
                value={formatCurrency(consolidated.ttmRevenue)}
                subtext="Last 12 months"
                status="GREEN"
              />
              <MetricCard
                title="TTM Profit"
                value={formatCurrency(consolidated.ttmNetIncome)}
                subtext="Net income"
                status="GREEN"
              />
              <MetricCard
                title="This Month"
                value={formatCurrency(consolidated.revenueProjected)}
                subtext="Projected revenue"
                status="GREEN"
              />
              <MetricCard
                title="EBITDA Margin"
                value={`${consolidated.ebitdaPct}%`}
                subtext="This month"
                status="GREEN"
              />
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-stone-800 mb-4">6-Month Revenue by Business Unit</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenueTrend} barGap={0}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(v) => formatCurrency(v)}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="distribution" stackId="a" fill="#1e3a5f" name="Distribution" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="services" stackId="a" fill="#10b981" name="Services" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#1e3a5f]"></span>
                  Distribution
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-500"></span>
                  Services
                </span>
              </div>
            </div>

            <ExplainerBox title="Understanding Your Profit Margins" icon="📊">
              <strong>EBITDA Margin of {consolidated.ebitdaPct}%</strong> means that for every $100 in revenue,
              you keep ${consolidated.ebitdaPct} after paying for goods and operating expenses (before interest,
              taxes, and depreciation). This month is exceptionally strong — your trailing 12-month average is {consolidated.ttmEbitdaPct}%.
            </ExplainerBox>
          </Section>

          {/* ============================================================ */}
          {/* DEBT COVERAGE */}
          {/* ============================================================ */}

          <Section icon="🏦" title="Debt Coverage" subtitle="Can you pay your obligations?">

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <GaugeChart
                    value={consolidated.dscr}
                    max={3}
                    label="DSCR"
                    status={consolidated.dscr >= 1.25 ? 'GREEN' : consolidated.dscr >= 1.0 ? 'YELLOW' : 'RED'}
                    size={160}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-stone-800 mb-2">Debt Service Coverage: {consolidated.dscr.toFixed(2)}x</h3>
                  <p className="text-stone-600 mb-4">
                    Your business generates <strong>{consolidated.dscr.toFixed(1)} times</strong> the cash needed to pay all debt obligations.
                    This is a comfortable margin.
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xs text-stone-500">Danger Zone</p>
                      <p className="font-bold text-red-600">&lt; 1.0x</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-xs text-stone-500">Caution</p>
                      <p className="font-bold text-amber-600">1.0 - 1.25x</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3 ring-2 ring-emerald-400">
                      <p className="text-xs text-stone-500">You Are Here</p>
                      <p className="font-bold text-emerald-600">&gt; 1.25x ✓</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ExplainerBox title="What is DSCR?" icon="🎓">
              <strong>Debt Service Coverage Ratio (DSCR)</strong> answers a simple question: "Can I pay my loans?"
              It compares your operating income to your debt payments. A DSCR of {consolidated.dscr.toFixed(2)}x means
              you make ${(consolidated.dscr * 100).toFixed(0)} for every $100 of debt payments owed.
              Banks typically want to see at least 1.25x before lending.
            </ExplainerBox>
          </Section>

          {/* ============================================================ */}
          {/* RULE OF 40 */}
          {/* ============================================================ */}

          <Section icon="⚖️" title="Growth vs. Profit Balance" subtitle="The Rule of 40">

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <p className="text-stone-500 mb-2">Your Rule of 40 Score</p>
                <div className={`inline-block text-6xl font-bold ${
                  summaryMetrics.ruleOf40Score >= 40 ? 'text-emerald-600' :
                  summaryMetrics.ruleOf40Score >= 25 ? 'text-amber-500' : 'text-red-600'
                }`}>
                  {summaryMetrics.ruleOf40Score}
                </div>
                <p className={`text-lg font-medium mt-2 ${
                  summaryMetrics.ruleOf40Score >= 40 ? 'text-emerald-600' :
                  summaryMetrics.ruleOf40Score >= 25 ? 'text-amber-500' : 'text-red-600'
                }`}>
                  {summaryMetrics.ruleOf40Score >= 40 ? '🎉 Target Achieved!' :
                   summaryMetrics.ruleOf40Score >= 25 ? 'Getting There' : 'Needs Work'}
                </p>
              </div>

              {/* Visual breakdown */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center bg-blue-50 rounded-xl p-4 flex-1 max-w-[140px]">
                  <p className="text-xs text-stone-500 uppercase">Growth Rate</p>
                  <p className="text-3xl font-bold text-blue-600">+{consolidated.annualizedGrowth}%</p>
                </div>
                <div className="text-2xl font-bold text-stone-400">+</div>
                <div className="text-center bg-emerald-50 rounded-xl p-4 flex-1 max-w-[140px]">
                  <p className="text-xs text-stone-500 uppercase">EBITDA Margin</p>
                  <p className="text-3xl font-bold text-emerald-600">{consolidated.ttmEbitdaPct}%</p>
                </div>
                <div className="text-2xl font-bold text-stone-400">=</div>
                <div className="text-center bg-stone-100 rounded-xl p-4 flex-1 max-w-[140px]">
                  <p className="text-xs text-stone-500 uppercase">Score</p>
                  <p className="text-3xl font-bold text-stone-800">{summaryMetrics.ruleOf40Score}</p>
                </div>
              </div>

              <div className="h-4 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    summaryMetrics.ruleOf40Score >= 40 ? 'bg-emerald-500' :
                    summaryMetrics.ruleOf40Score >= 25 ? 'bg-amber-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${Math.min(summaryMetrics.ruleOf40Score / 60 * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-stone-500 mt-1">
                <span>0</span>
                <span className="font-medium">Target: 40</span>
                <span>60+</span>
              </div>
            </div>

            <ExplainerBox title="What is the Rule of 40?" icon="🧮">
              The Rule of 40 is a simple test used by investors: <strong>Growth Rate + Profit Margin should equal at least 40</strong>.
              It shows if you're balancing growth and profitability well. A fast-growing company can have lower margins,
              while a slow-growing company needs higher margins. You're at {summaryMetrics.ruleOf40Score} —
              {summaryMetrics.ruleOf40Score >= 40 ? " you've hit the target!" : " keep pushing toward 40."}
            </ExplainerBox>
          </Section>

          {/* ============================================================ */}
          {/* ENTITY BREAKDOWN */}
          {/* ============================================================ */}

          <Section icon="🏢" title="Business Unit Performance" subtitle="How each part of the business is doing">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entityData.map((entity) => (
                <div key={entity.name} className={`bg-white rounded-2xl shadow-lg overflow-hidden`}>
                  <div className={`px-5 py-4 ${
                    entity.status === 'GREEN' ? 'bg-emerald-600' :
                    entity.status === 'YELLOW' ? 'bg-amber-500' : 'bg-red-600'
                  } text-white`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{entity.name}</h3>
                      <span className="text-white/80 text-sm">{entity.statusNote}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-stone-50 rounded-lg">
                        <p className="text-xs text-stone-500 uppercase">Cash</p>
                        <p className="text-xl font-bold text-stone-800">{formatCurrency(entity.cash)}</p>
                      </div>
                      <div className="text-center p-3 bg-stone-50 rounded-lg">
                        <p className="text-xs text-stone-500 uppercase">Gross Margin</p>
                        <p className="text-xl font-bold text-stone-800">{entity.grossMarginPct}%</p>
                      </div>
                      <div className="text-center p-3 bg-stone-50 rounded-lg">
                        <p className="text-xs text-stone-500 uppercase">EBITDA Margin</p>
                        <p className="text-xl font-bold text-stone-800">{entity.ebitdaPct}%</p>
                      </div>
                      <div className="text-center p-3 bg-stone-50 rounded-lg">
                        <p className="text-xs text-stone-500 uppercase">DSCR</p>
                        <p className="text-xl font-bold text-stone-800">{entity.dscr.toFixed(2)}x</p>
                      </div>
                    </div>

                    <div className="border-t border-stone-200 pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-500">MTD Revenue</span>
                        <span className="font-medium">{formatCurrency(entity.revenue)} → {formatCurrency(entity.revenueProjected)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">TTM Revenue</span>
                        <span className="font-medium">{formatCurrency(entity.ttmRevenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">TTM Net Income</span>
                        <span className="font-medium text-emerald-600">{formatCurrency(entity.ttmNetIncome)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <ExplainerBox title="Distribution vs Services" icon="🔍">
              <strong>Distribution</strong> sells parts and equipment — it has inventory and longer payment cycles.
              <strong> Services</strong> provides labor and installation — it gets paid faster and has higher margins.
              Both units are profitable. Distribution's revenue dip this month is likely timing, not a trend.
            </ExplainerBox>
          </Section>

          {/* ============================================================ */}
          {/* ACTION ITEMS */}
          {/* ============================================================ */}

          <Section icon="✅" title="This Week's Focus" subtitle="Key items that need your attention">

            <div className="space-y-4">
              {actionItems.map((item, idx) => (
                <div key={idx} className={`bg-white rounded-xl shadow-lg p-5 border-l-4 ${
                  item.urgency === 'HIGH' ? 'border-red-500' :
                  item.urgency === 'MEDIUM' ? 'border-amber-500' : 'border-stone-300'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      item.urgency === 'HIGH' ? 'bg-red-500' :
                      item.urgency === 'MEDIUM' ? 'bg-amber-500' : 'bg-stone-400'
                    }`}>
                      {item.priority}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-stone-800">{item.item}</h4>
                      <p className="text-sm text-stone-500 mt-1">{item.context}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.urgency === 'HIGH' ? 'bg-red-100 text-red-700' :
                      item.urgency === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {item.urgency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ============================================================ */}
          {/* FOOTER */}
          {/* ============================================================ */}

          <footer className="bg-white rounded-2xl shadow-lg p-6 mt-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="font-bold text-stone-800">The Benefique Financial Times</p>
                <p className="text-sm text-stone-500">Published by Benefique Fractional CFO Services</p>
                <p className="text-xs text-stone-400 mt-1">© 2026 Benefique Capital LLC</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-stone-500">Data synced: {CONFIG.lastSync}</p>
                <p className="text-sm text-stone-500">Next edition: Saturday, February 1, 2026</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-200 text-center">
              <p className="text-xs text-stone-400">
                Questions? Contact your Fractional CFO team at <strong>gerrit@benefique.com</strong>
              </p>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
