# The Benefique Financial Times - CFO Edition

A sophisticated React-based financial reporting dashboard that transforms QuickBooks data into executive-ready visual reports. Designed for multi-entity businesses, it provides CFOs with real-time insights into cash position, revenue trends, profitability metrics, and operational KPIs.

## Overview

The BFT CFO Edition generates newspaper-style financial reports with rich data visualizations, combining traditional financial statements with modern analytics. Each report provides a comprehensive view of business health through charts, trend analysis, and key performance indicators.

## Tech Stack

- **React 19.2** - UI framework with modern hooks
- **Vite 7.2** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first styling with Vite plugin
- **Recharts 3.7** - Composable charting library for data visualization
- **Vercel** - Production deployment platform

## Key Features

### Financial Dashboards
- **Multi-Entity Support** - Separate reporting for business units with consolidated views
- **Cash Flow Monitoring** - Weekly cash trends, runway calculations, and liquidity metrics
- **Revenue Analytics** - Month-over-month comparisons with projections and prior period analysis
- **Profitability Metrics** - EBITDA, gross margins, net income tracking
- **Health Scoring** - Rule of 40, DSCR, and automated status indicators (Green/Yellow/Red)

### Visualizations
- Line charts for cash trends and revenue tracking
- Bar charts for period-over-period comparisons
- Area charts for cumulative performance
- Composed charts combining multiple metrics
- Pie charts for expense breakdowns
- Sparklines for at-a-glance trends

### Data Integration
- QuickBooks connectivity via g-accon sync
- Real-time data refresh timestamps
- Configurable client settings (name, industry, entities)
- Period-based reporting (MTD, YTD, TTM)

## Project Structure

```
bft-cfo-edition/
├── src/
│   ├── App.jsx          # Main dashboard component with all visualizations
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── vercel.json          # Deployment settings
└── package.json         # Dependencies and scripts
```

## Installation

```bash
# Clone the repository
git clone https://github.com/gerrit-design/bft-cfo-edition.git
cd bft-cfo-edition

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Development

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Configuration

Edit the `CONFIG` object in `src/App.jsx` to customize:

```javascript
const CONFIG = {
  clientName: 'Your Company',
  clientSlug: 'company-slug',
  industry: 'Your Industry',
  location: 'City, State',
  reportDate: 'Month Day, Year',
  entities: ['Entity 1', 'Entity 2'],
  primaryColor: '#1e3a5f',
  secondaryColor: '#166534',
  dataSource: 'QuickBooks via g-accon',
};
```

Update the data objects (`cashData`, `entityData`, `consolidated`) with your financial metrics.

## Data Structure

Each report requires:
- **Summary Metrics** - Overall status, cash runway, Rule of 40 score
- **Cash Data** - Current balance, change from prior period, weekly trends
- **Entity Data** - Per-unit revenue, EBITDA, margins, DSCR
- **Consolidated** - Combined metrics across all entities
- **Trend Data** - Historical performance for charts

## Deployment

Configured for Vercel with automatic deployments:

```bash
# Deploy to Vercel
vercel --prod
```

The `vercel.json` configuration handles SPA routing and build settings.

## Use Cases

- **Monthly CFO Reports** - Automated executive summaries
- **Board Presentations** - Visual financial storytelling
- **Multi-Entity Management** - Consolidated and per-unit analysis
- **Cash Flow Monitoring** - Early warning system for liquidity issues
- **Performance Tracking** - KPI dashboards for operational metrics

## Customization

The dashboard is designed to be white-labeled:
1. Update `CONFIG` with client details
2. Modify color scheme (`primaryColor`, `secondaryColor`)
3. Add/remove entities in the entities array
4. Customize chart types and metrics displayed
5. Adjust the newspaper masthead and styling

## License

Private repository - All rights reserved

## Credits

Developed by [Gerrit Design](https://github.com/gerrit-design) for Benefique Tax & Accounting Services.
