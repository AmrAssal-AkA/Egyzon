# AGENTS.MD - Egyzon Admin-side project

# Project Overview

Egyzon admin is the internal management dashboard for the multi-vendor marketplace. In this directory, the team builds the admin-side experience for monitoring platform activity, reviewing seller applications, managing products and categories, and handling transaction-related operations. The app is a React-based single-page application with reusable components, hooks, contexts, services, and route-level pages.

## 1. Project Stack & Environment

- **Library**: React 19.x
- **Build Tool**: Create React App via react-scripts 5.x
- **Language**: TypeScript 4.9.x
- **Routing**: react-router-dom 7.x
- **Styling**: Tailwind CSS 3.4.x
- **UI Components**: Radix UI Themes
- **Icons**: lucide-react
- **Data Fetching**: SWR 2.x and Axios 1.x
- **State Management**: Zustand 5.x for shared state, React Context for auth/session concerns
- **Testing**: React Testing Library and Jest
- **Compatibility**: Modern Chromium, Firefox, and Safari via CRA browserslist settings

## 2. Executable Commands

- **Build Application**: `npm run build`
- **Start Application**: `npm start`
- **Run Tests**: `npm test`


## 3. Project Architecture & Capabilities

Do not hardcode full file paths. This project is a React SPA built with Create React App, not a Next.js app. The architecture follows the existing admin-side structure below:

- **src/pages/**: route-level screens and page containers
- **src/components/**: reusable UI components for dashboards, tables, forms, cards, and shared layouts
- **src/context/**: shared React context for application-wide concerns such as auth/session state
- **src/hooks/**: custom hooks for reusable logic and data orchestration
- **src/lib/**: shared utilities and transport helpers, including the Axios-based server client
- **src/services/**: API/service layer used by pages and components to talk to the backend
- **src/types/**: shared TypeScript interfaces and models
- **src/index.css** and related styles: Tailwind entry point and global styling
- **public/**: static assets and app shell files

### Architecture Rules

- Routing is handled by `react-router-dom`, not by an app router.
- Keep pages focused on composition and presentation; move business logic into hooks or services.
- Reuse existing components, hooks, services, utilities, and types before creating anything new.
- Keep changes localized to the relevant feature area and preserve the current CRA-based runtime behavior.
- Avoid introducing Next.js-specific patterns such as app router, server components, or route handlers in this project.

### Capabilities

- Admin dashboard and management screens
- Seller review/approval workflows
- Product, category, and transaction monitoring views
- Reusable UI patterns for forms, lists, tables, and dialogs

# 4. Coding Conventions & Patterns

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
## React SPA Architecture

- Keep route-level screens in `src/pages/` and compose them from reusable components.
- Use client-only React features only where necessary; do not convert the whole app to a client component pattern.
- Keep interactive behavior inside components or hooks rather than scattering it across pages.
- Preserve the existing CRA structure and avoid introducing new framework conventions.

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
page -> hooks/services -> src/lib/serverClient -> backend

---
## API Layer

- Backend communication should be handled through the existing service layer and `src/lib/serverClient.ts`.
- Business logic should not be written directly inside components.
- Services are responsible for request logic and error handling.
- Components should communicate with the backend through services only.

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

- Always place business logic in `src/services` or `src/hooks`.
- Route backend requests through the existing service layer and `src/lib/serverClient.ts`.
- Never call the backend directly from React components.
- Use `ServerClient` for Axios-based requests.
- Use SWR for client-side fetching and caching where appropriate.
- Keep authentication tokens out of client-side storage; follow the existing auth flow.
- Reuse existing UI components before creating new ones.

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