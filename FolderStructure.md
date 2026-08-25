video-analytics-dashboard/
│
├── .gitignore
├── README.md                      # Setup instructions, pitch link, loom link, repo links
├── AI_PROMPTING.md                # Mandatory AI interaction log
├── package.json                   # Root scripts to run backend + client concurrently
│
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── src/
│   │   ├── app.js                 # Express app initialization & middleware
│   │   ├── server.js              # Server entry point / port listener
│   │   │
│   │   ├── config/
│   │   │   └── database.js        # SQLite connection setup (e.g. better-sqlite3 / sqlite3)
│   │   │
│   │   ├── db/
│   │   │   ├── schema.sql         # Table definitions (Products, Videos, EngagementEvents)
│   │   │   ├── migrate.js         # Migration script to run DDL
│   │   │   ├── seed.js            # Mock data seeder (sample products & videos)
│   │   │   └── database.sqlite    # Local SQLite file (ignored in git if preferred)
│   │   │
│   │   ├── controllers/
│   │   │   ├── eventController.js     # Handles POST /api/events
│   │   │   └── analyticsController.js # Handles GET /api/analytics/videos
│   │   │
│   │   ├── models/                # (Optional / or query helpers)
│   │   │   ├── Event.js
│   │   │   └── Analytics.js       # SQL aggregation query logic with pagination
│   │   │
│   │   ├── routes/
│   │   │   ├── index.js           # API route combiner
│   │   │   ├── eventRoutes.js     # /api/events routing
│   │   │   └── analyticsRoutes.js # /api/analytics routing
│   │   │
│   │   └── middleware/
│   │       ├── errorHandler.js    # Global error response handler
│   │       └── validateEvent.js   # Request payload validation
│   │
│   └── tests/                     # Basic unit / integration tests (optional)
│       └── analytics.test.js
│
└── client/
    ├── package.json
    ├── public/
    │   └── index.html
    │
    └── src/
        ├── index.js               # React root render
        ├── App.jsx                # Main layout shell
        │
        ├── components/
        │   ├── Header/
        │   │   ├── Header.jsx
        │   │   └── Header.module.css
        │   │
        │   ├── AnalyticsTable/
        │   │   ├── AnalyticsTable.jsx        # Data table showing metrics & conversion rate
        │   │   └── AnalyticsTable.module.css # Modular CSS (no Tailwind)
        │   │
        │   ├── Pagination/
        │   │   ├── Pagination.jsx
        │   │   └── Pagination.module.css
        │   │
        │   └── TrafficSimulator/
        │       ├── TrafficSimulator.jsx      # Simulate Traffic button & event triggers
        │       └── TrafficSimulator.module.css
        │
        ├── services/
        │   └── api.js             # Axios / Fetch client functions for /api endpoints
        │
        ├── hooks/
        │   └── useVideoAnalytics.js # Custom hook for data fetching & state management
        │
        └── styles/
            ├── variables.css      # Design tokens (colors, typography, spacing)
            └── global.css         # Global resets & typography base