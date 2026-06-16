# Preproute — Test Management App

A 5-page test management application built as part of the Preproute Assignment.

**Live Demo:** [Add Vercel URL]  
**Walkthrough Video:** [Add video link]

**Login credentials:**

- Username: `vedant-admin`
- Password: `vedant123`

---

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS
- Zustand (state management)
- React Hook Form
- Axios
- React Router v6

---

## Pages

1. **Login** — JWT auth, token stored in localStorage
2. **Dashboard** — list all tests, search, filter, edit/delete/view
3. **Create/Edit Test** — cascading subject → topic → subtopic dropdowns, marking scheme
4. **Add Questions** — MCQ form, question sidebar tracker, bulk submit to API
5. **Preview & Publish** — test summary, all questions, publish to live

---

## Project Structure

```
src/
├── api/          # Axios instance + all API calls
├── components/   # Reusable UI components
├── pages/        # Co-located page folders (index + subcomponents + custom hook)
├── store/        # Zustand stores (auth, test, question)
├── types/        # TypeScript interfaces
└── utils/        # localStorage ID cache
```

---

## Key Decisions

- **Zustand over Context** — components only re-render when their subscribed slice changes
- **Co-located folders** — each page has its own folder, keeping files under ~80 lines
- **Custom hooks** — all page logic lives in `useQuestions.ts`, `usePreview.ts` etc, keeping `index.tsx` clean
- **localStorage ID cache** — API returns names in GET but needs UUIDs in POST, so IDs are cached after creation to make edit mode work

---

## API Notes

The API had undocumented constraints discovered during testing:

- `subject` field required in `questions/bulk` (not in docs)
- `difficulty` only accepts `easy`, `medium`, `hard` (not `difficult`)
- `tests` type enum values not documented — emailed Preproute for clarification

---

## Setup

```bash
npm install
npm run dev
```
