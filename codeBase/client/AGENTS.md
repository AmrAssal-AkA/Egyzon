# AGENTS.MD - Egyzon client-side project

# Project Overview

Egyzon is a mulit-vendor ecommerce website design to match between the Egyptian vendors shop owners to Customers in such an easy an efficient way in this directory we work on the client-side(user-face pages) designing pages with reusable compnent, hooks contexts, services, Api server integration using `src/app/api` routes to make the connection between the express server endpoints and i `src/services/` we write the logic and how we need the connection between the app client-side work with the server-side to excude tht action, in the last in designing the paqes we use a Techniqus called componet-based architecture in simple way it means that we divide the page into small reusable components and each component is responsible for a specific functionality and we compose them together to create the page, in the ui and styling we use tailwindcss and shadcn ui components, with the main call not mess with the hydration and server rendring feature by Nextjs app router in meaning don't transfer the main page to client component it should be server component and the sub components can be client components by just adding 'use client' at the top of the file, expecially the component that we need to use React Hooks such as (useState, UseEffect).

## 1.ProjectStack & Environment

- **Framework**: Next.js v16+ (app router)
- **Language**: TypeScript v5+ (Strict Mode)
- **Styling**: Tailwind Css v4
- **Data Fetching**: swr v2+
- **State Management**: Zustand v5+
- **Ui Components**: Shadcn UI
- **Icons**: lucida-react / react-icons
- **HTTP Client**: Axios v1+ (via structured `ServerClient` instances)

## 2.Excutable Commands

- **Run Dev Server**: `npm run dev`
- **Build Application**: `npm run build`
- **Start Application**: `npm start`
- **Run Type-Checking**: `npx tsc --noEmit`,
- **Add shadcn component**: `npx shadcn@latest add <component-name>`

## 3. Project Architecture & Capabilities

Do not hardcode full file paths. The application follows the standard Next.js App Router architecture:

- `src` -> the main client-side source folder that contains all project-related modules and app logic.
- `src/app` -> route-level files such as pages, layouts, loading/error/not-found templates, and route groups like `(auth)`, `(seller)`, and `(store)`.
- `src/app/api` -> Next.js API route handlers used to connect the client app with the Express backend endpoints.
- `src/components` -> reusable UI components organized by feature area such as auth, checkout, common, home, products, seller, UI primitives, and user dashboard.
- `src/contexts` -> global React context providers, including authentication context.
- `src/hooks` -> custom hooks for shared stateful logic such as auth and product-related behavior.
- `src/lib` -> shared utilities, server client helpers, and auth-related helper modules.
- `src/services` -> client-side service layer responsible for API calls and data handling.
- `src/stores` -> Zustand store modules for app-level state management.
- `src/types` -> TypeScript type definitions for auth, products, and other data structures.
- `src/provider` -> app-level providers such as theme and global wrapper setup.
- `src/middleware.ts` -> Next.js middleware for request handling and route/auth-related logic.
- `public` -> static assets such as images and other public files.
- Root config files (`package.json`, `tsconfig.json`, `next.config.ts`, `components.json`, `tailwind/postcss` configs) -> project tooling, dependencies, and app configuration.

# 4. coding convenction & Patterns

## General Rules
- MUST Follow the existing architecture before and stick to it
- MUST NOT create duplicates utitlities, hooks and existing component
- MUST keep changes minimal and localized to existing tasks
- MUST reuse existing component, hooks, services, utilitis, lib, and types whenever possible.
- SHOULD keep the comments as minimal as possible, and you could just write the importand comments only.
- MUST NOT refactor existing code unless explicitly requested.
- MUST NOT introduce new dependencies without explicit permission.
- MUST preserve existing functionality and avoid breaking changes.
- MUST NOT modify unrelated files or features.

---
## Next.js App Router Architecture

- Pages (page.tsx) must remain Server Component unless it was requested by the user.
- Layout should remain server component
- Only interactive child component may use `"use client"`.
- NEVER convert an entire to a Client Component just to use React Hooks.
- MOVE interactive login into a client component instead.


---
## React Components

- EACH component MUST have a single responsibility.
- component MUST remain smaller and reusable.
- extract repeated UI into a reusable component.
- Avoid nesting deeply tsx/Jsx component.
-  Use early returns instead of nested conditional rendering when possible.

Examples

```tsx
   if (isLoading) return <loading/>;

   return <prooductGrid products={products} />
```
---
## State Management

- Local UI state MUST use React hooks.
- Global application state MUST use Zustand.
- Authentication MUST use the existing Auth Context.
- MUST NOT duplicate state across Context, Zustand, and component state.
- Prefer derived state over storing computed values.

---
## Date Fetching

- MUST use `useSWR` for all client-side GET requests.
- MUST use `useSWRMutation` for mutations when appropriate.
- MUST NOT fetch API data using `useEffect` unless explicitly requested.
- MUST NOT call Axios directly from React components.
- MUST fetch through the existing service layer.

#### correct flows:
page -> Hooks (optional) -> services -> src/app/api -> server

---
## Api Layer

- Api routes MUST be inside `src/app/api` act as a bridge between next.js App router and the express Backend.
- Business Logic MUST not be written inside API route handlers.
- Services are responsible for request Logic.
- Components MUST communicate through services only.
---
## TypeScript

- Strict typing is required.
- Avoid `any`.
- Prefer interfaces for shared models.
- Export reusable types from `src/types`.
- Public functions SHOULD have explicit return types.
---
## Styling

- Use Tailwind CSS utilities.
- Use existing Shadcn UI components whenever possible.
- Avoid inline styles.
- Keep styling consistent with existing components.
- Reuse design patterns already used across the application.
---
## file organization

- Place new files in the appropriate existing feature folder.
- Do NOT create new folders unless necessary.
- Follow the existing naming conventions.
- Keep related files grouped together.
---
## Imports
Import order:

1. React
2. Next.js
3. Third-party libraries
4. Internal aliases (`@/...`)
5. Relative imports

Remove unused imports.

keep a line spacing between React imports, Next.js imports, and third-party imports.

---
## Error Handling


- Never ignore caught errors.
- Return meaningful error messages.
- Avoid empty catch blocks.
- Preserve existing error handling patterns.
---
## Performance

- Avoid unnecessary re-renders.
- Memoize expensive computations only when needed.
- Lazy-load large components when appropriate.
- Do not prematurely optimize.
---
## Accessibility

- Use semantic HTML.
- Preserve keyboard accessibility.
- Use proper ARIA attributes when needed.
- Maintain accessible Shadcn component behavior.
---
## Code Quality

- Keep functions focused on one responsibility.
- Prefer readable code over clever code.
- Avoid unnecessary abstractions.
- Remove dead code.
- Remove unused variables.
- Do not leave TODO placeholders unless explicitly requested.

---
## Project-Specific Patterns

- Always use `src/services` for business logic.
- Always proxy backend requests through `src/app/api`.
- Never call the Express server directly from React components.
- Use `ServerClient` for all Axios requests.
- Use SWR for client-side fetching and caching.
- Use HTTP-only cookies for authentication; never expose or persist tokens in `localStorage`.
- Reuse existing Shadcn components before creating new UI.
---
## Security

- Authentication tokens MUST NEVER be stored in `localStorage`, `sessionStorage`, or any client-accessible storage.
- Authentication MUST use HTTP-only cookies managed by the existing authentication flow.
- Components MUST NOT access, expose, or manipulate authentication tokens directly.
- Never hardcode secrets, API keys, credentials, or environment variables.
- Secrets MUST only be accessed through server-side environment variables.
- Never commit or expose `.env` values.
- Validate all user input before sending it to the backend whenever client-side validation exists.
- Do NOT trust client-side validation alone; the backend remains the source of truth.
- Sanitize any user-generated content before rendering if required.
- Avoid using `dangerouslySetInnerHTML` unless explicitly requested and the content is sanitized.
- Do not expose internal server errors or stack traces to users.
- Use HTTPS endpoints in production.
- Preserve existing authentication, authorization, middleware, and security-related logic.
- Do NOT bypass authentication or authorization checks for convenience.
- Do NOT weaken existing security mechanisms to make code "work."
- Follow the principle of least privilege when implementing new features.
- All backend communication MUST go through the existing `src/app/api` route handlers.
- Client Components MUST NEVER communicate directly with the Express backend.
- Services MUST use the existing `ServerClient` Axios instance.
- Authentication requests MUST preserve cookie-based sessions (`withCredentials` where applicable).
- Never expose backend URLs, tokens, or internal implementation details in the UI.
- Do not introduce new authentication flows unless explicitly requested.

---
## Forbidden Actions

- MUST NOT Change project architecture.
- MUST NOT Rename files without request.
- MUST NOT Move files without request.
- MUST NOT Create duplicate hooks, services, or components.
- MUST NOT Add dependencies without permission.
- MUST NOT Modify unrelated code.
- MUST NOT Change existing APIs without request.
- MUST NOT Convert Server Components into Client Components unnecessarily.
- MUST NOT Store authentication tokens in localStorage.
- MUST NOT use git commands