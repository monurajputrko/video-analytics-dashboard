# Reelmetric

A full-stack shoppable video analytics dashboard built with React, Express, and SQLite.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- Windows native builds may require the Visual Studio C++ workload if `better-sqlite3` cannot download its prebuilt binary.

## Run locally

```bash
npm install
npm run db:setup
npm run dev
```

The dashboard runs at `http://localhost:5173`; the API runs at `http://localhost:4000`.

`npm run db:setup` creates the normalized SQLite schema and seeds five products and ten videos. It is safe to run repeatedly.

## API

- `POST /api/events` with `{ "videoId": "video-1", "eventType": "view" }`
- `GET /api/analytics/videos?page=1&limit=5`

The client uses the Vite development proxy, so browser requests remain relative to `/api`.

## Production client build

```bash
npm run build
```

## Take-home submission links

Replace the placeholders below before submitting:

- **Public GitHub repository:** [Repo](https://github.com/monurajputrko/video-analytics-dashboard)
- **30-second YouTube pitch (Private or Unlisted):** [pitch](https://youtube.com/shorts/VIZYZruRJHU?feature=share)
- **Technical walkthrough (Loom or screen recording):** [Technical walkthrough](https://www.loom.com/share/6c35761a289c4dea8167feb791a0f461)

The implementation checklist is covered by [AI_PROMPTING.md](AI_PROMPTING.md), the normalized SQLite schema in `backend/src/db/schema.sql`, the API integration tests in `backend/tests/analytics.test.js`, and the React dashboard in `client/src/`.

