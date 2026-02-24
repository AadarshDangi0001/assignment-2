# Custom Portfolio + API

A stylized Vite + React frontend paired with a lightweight Express API so the "Name", "About Company", and "Why Choose" text can be edited directly from tools such as Postman.

## Project structure

- Frontend SPA: [src](src) (entry point: [src/App.jsx](src/App.jsx))
- API server: [backend-portolio](backend-portolio) (entry point: [backend-portolio/src/server.js](backend-portolio/src/server.js))

## Setup & local development

1. **Install frontend dependencies**
   ```bash
   npm install
   ```
2. **Install backend dependencies**
   ```bash
   cd backend-portolio
   npm install
   ```
3. **Start the API** (default port 4000)
   ```bash
   npm run dev
   ```
4. **Start the Vite dev server** in a separate terminal window
   ```bash
   npm run dev
   ```

Set `VITE_API_BASE_URL` if you need to point the frontend at a non-default API origin (see [.env.example](.env.example)).

## API reference

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| GET    | `/api/company`    | Returns the current text payload |
| PUT    | `/api/company`    | Updates any combination of fields|

### Request body

```json
{
  "name": "Jenny Creative Studio",
  "about": "Boutique fashion collective crafting contemporary portraits...",
  "whyChoose": "We obsess over narrative-rich visuals..."
}
```

All fields are optional on update; any omitted fields retain their previous value.

### Example Postman/cURL update

```bash
curl -X PUT http://localhost:4000/api/company \
  -H "Content-Type: application/json" \
  -d '{
        "name": "Atelier A",
        "about": "Design-first studio crafting immersive editorials.",
        "whyChoose": "Fast turnarounds, cinematic lighting, collaborative process."
      }'
```

## Frontend integration

The new "Live API Section" in [src/App.jsx](src/App.jsx) fetches data from `/api/company` on load and exposes a refresh button. Any changes you send through the API are reflected immediately without rebuilding the frontend.

## Production tips

- Host the API independently (Render, Railway, Fly.io, etc.) and expose the base URL through `VITE_API_BASE_URL`.
- The backend persists data to [backend-portolio/src/data/company.json](backend-portolio/src/data/company.json). Mount persistent storage or swap in a real database if you need multi-instance deployments.
