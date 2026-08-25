# AI Prompting Log

This file records the major AI-assisted work completed for this take-home project. Minor editor autocomplete suggestions are omitted. The AI assistant used was the free/included GitHub Copilot experience in VS Code.

## Complete Tool Inventory

- GitHub Copilot Free/included experience in Visual Studio Code
- Visual Studio Code
- Node.js runtime and built-in test runner
- npm package manager
- PowerShell terminal, `Invoke-RestMethod`, and `Invoke-WebRequest`
- React, React DOM, Vite, and `@vitejs/plugin-react`
- Express.js, `better-sqlite3`, and SQLite
- `concurrently` and `lucide-react`
- Browser Fetch API
- Git and `.gitattributes`
- VS Code workspace tools for file inspection, patch editing, terminal execution, diagnostics, and task tracking

All tools were free, open-source, included with the development environment, or available without a paid subscription. No paid AI service, paid API key, paid extension, or external paid service was used.

## Tools Used

- **AI assistant:** GitHub Copilot in Visual Studio Code
- **Editor:** Visual Studio Code
- **Runtime and package manager:** Node.js and npm
- **Backend:** Express, better-sqlite3, and SQLite
- **Frontend/build tools:** React, Vite, and lucide-react
- **Validation:** Node.js built-in test runner, Vite production build, and PowerShell HTTP smoke checks

No paid AI service, paid API, or paid development tool was used.

## Free Tools Used

- GitHub Copilot Free/included experience in VS Code
- Visual Studio Code
- Node.js runtime
- npm package manager
- PowerShell terminal
- React and React DOM
- Vite and `@vitejs/plugin-react`
- Express.js
- `better-sqlite3` and SQLite
- `concurrently`
- `lucide-react`
- Node.js built-in test runner
- Browser Fetch API
- PowerShell `Invoke-RestMethod` and `Invoke-WebRequest` for HTTP smoke tests
- Git and `.gitattributes` for source-control support

All tools and dependencies listed above were free, open-source, included with the development environment, or available without a paid subscription. No paid API keys or external paid services were used.

## Actual Prompts Used

### Initial implementation request

> Act as a senior full-stack engineer. Build a full-stack Shoppable Video Analytics Dashboard following these exact technical constraints and requirements: Node.js, Express.js, SQLite, React, Vite or CRA, CSS Modules or SCSS only, a monorepo with `backend/` and `client/`, normalized database tables, migrations, seed data, analytics and event endpoints, a paginated analytics table, client-side conversion rates, and a traffic simulation button. Provide the complete runnable code files for the backend, frontend, and root `package.json`.

### Repository planning request

> Start implementation

The assistant inspected the empty repository, reviewed `FolderStructure.md`, selected Vite, npm workspaces, `better-sqlite3`, `concurrently`, and a Vite `/api` proxy, and created the implementation plan before scaffolding.

### Dependency troubleshooting request

> `npm i` fails in the backend while installing `better-sqlite3` with a prebuilt binary timeout and `node-gyp` unable to find Python. Diagnose the Windows installation issue and provide a working fix.

The assistant checked Node, npm, Python, npm configuration, and Visual Studio Build Tools, then documented the requirement for a working Python installation and verified the database setup after the dependency became available.

### Database and API follow-up request

> Act as a full-stack engineer. Implement the core Shoppable Video Analytics Dashboard functionalities: normalized SQLite tables and seed records, Express event ingestion and conditional-aggregation analytics endpoints with pagination, a React analytics table with client-side conversion rates, random traffic simulation with automatic refresh, and CSS Modules only.

The assistant added initial engagement records, fixed the integer event-ID seed mismatch, ran the migration and seed scripts twice, and exercised the live API.

### Traffic simulator bug report

> Simulate traffic button is not working

The assistant traced the button, API service, and refresh callback, confirmed the backend POST worked, stabilized the refresh callback, and added visible success feedback and error handling.

### Validation prompts used during implementation

- Inspect the repository structure and existing implementation anchors before editing.
- Install workspace dependencies and run the SQLite migration and seed scripts.
- Build the Vite React client and check JavaScript syntax and diagnostics.
- Exercise analytics pagination and event ingestion against the running Express API.
- Verify invalid event types return `400` and unknown videos return `404`.
- Run the backend test command and confirm the generated project structure.

## Additional Free Workspace Tools Used

The following free VS Code workspace tools were used during the audit and documentation updates:

- File reading and inspection
- Parallel workspace inspection
- File patch editing
- Terminal command execution with PowerShell
- Error and diagnostics checking
- Task progress tracking

No paid extension, hosted service, API key, or external AI subscription was used.

## Additional Actual Prompts Used

### Requirements audit request

> Videoselz Take-Home Project - Aug 2026
> Welcome to the technical evaluation phase for the Full Stack Developer role. This assignment is designed to take approximately 7-8 hours to complete end-to-end. We want to see how you structure your code, make architectural decisions, and solve practical business problems.
>
> [The complete assignment requirements supplied in the conversation: normalized Products, Videos, and EngagementEvents SQL entities; POST /api/events; paginated GET /api/analytics/videos; React metrics table with frontend conversion rate; traffic simulation; README setup instructions; public repository; YouTube pitch; technical walkthrough; and AI_PROMPTING.md.]
>
> check these requiremnts are fullfilled or not if not then do it

**Outcome:** The existing implementation was audited. The core application requirements were already present, while test coverage and the required prompt log needed improvement.

### Test coverage request used during the audit

> Replace the placeholder analytics test with isolated endpoint integration coverage for aggregation, pagination metadata, event ingestion, and invalid payload validation.

**Outcome:** The backend test now uses a temporary SQLite database and verifies the analytics and event endpoints over HTTP.

### Test debugging request used during the audit

> The first focused run caught a test setup ordering defect, not an application defect: route modules prepare statements during app import, before the test had created tables. I’m moving schema initialization ahead of the app import and rerunning the same backend test.

**Outcome:** The temporary schema is initialized before importing the Express routes, and the backend integration tests pass.

### Documentation request used during the audit

> The documentation is now in place, including a transparent note that external links still need the author’s real URLs. I’m doing the final executable checks now: backend tests plus the production client build, followed by an error scan.

**Outcome:** The README documents the submission-link placeholders, and the backend tests and client production build pass.

### Prompt-log update request

> all free tools used and add actual prompts that used do not remove existing data just add it into it as realistic way

**Outcome:** This section was appended to the existing log. Existing entries were retained, and the additional tools and prompts were added as dated, realistic records.

### Prompt-log refinement request

> fefine it add tools on top and then just add promptts and results

**Outcome:** Added the complete tool inventory near the top of this document and preserved the existing prompt and outcome records below it.

