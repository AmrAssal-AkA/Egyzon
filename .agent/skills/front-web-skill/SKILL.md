---
name: front-web-skill
description: Front-end skill for web application. Use when creating, modifying, reviewing, debugging, or refactoring web UI, pages, layouts, components,routing, client-side interactions, data fetching, responsive designs, accessibility, or back-end API integration. This skill applies to React and Next.js web applications and provides web-specific architecture, UX/UI, performance, and implementation practices.
---

# Front-end Skill for Web Application


## General Principles

- Follow the existing Front-end architecture and design patterns of the project.
- Prefer to use server-side rendering (SSR) and static site generation (SSG) when appropriate to improve performance and SEO.
- Maintain the page server-side rendering (SSR) and use `use client` only component that perform these specific task that require using of client-side elements such as (Hooks, State, Context, etc..).
- Do not modify the existing front-end architecture or introduce new frameworks or libraries without justification and approval from the team.
- Keep components small, focused, and reusable, and avoid creating large, monolithic components that are difficult to maintain or test.
- Use existing naming conventions, file structures, and coding standards of the project, and avoid introducing new conventions or styles without justification and approval from the team.

---

## Next.js Architecture

- Follow the existing Next.js project structure.
- Prefer the App Router when the project uses it.
- Follow the existing routing conventions.
- Keep pages and layouts focused on composition.
- Reuse existing layouts, templates, and components.
- Do not introduce a different routing architecture without explicit justification.

---

## Server Components

- Prefer Server Components by default when using the Next.js App Router.
- Keep components server-side whenever client-side functionality is not required.
- Use `use client` only when the component requires client-side functionality.
- Common reasons for using `use client` include:
  - React state
  - React hooks requiring client execution
  - Context
  - Browser APIs
  - Event handlers
  - Client-only libraries

- Keep the Client Component boundary as small as possible.
- Do not convert an entire page or layout into a Client Component when only a small part requires client-side behavior.

---

## Client Components

Before using `use client`:

1. Determine whether the functionality actually requires the client.
2. Check whether the functionality can remain in a Server Component.
3. Keep client-side logic isolated to the smallest appropriate component.
4. Avoid unnecessarily increasing the client JavaScript bundle.

Do not use `use client` simply because a component contains UI.

---

## Rendering

- Prefer React Server Components By default when using next.js App Router, and use client components only when necessary for interactivity or state management.
- Use `use client` only for components that require a client-side functionality, such as:
  - Components that use React hooks (e.g., `useState`, `useEffect`, `useContext`, etc.).
  - Components that manage local state or context.
  - Components that handle user interactions (e.g., form inputs, buttons, etc.).
  - Components that require access to browser APIs (e.g., `window`, `document`, etc.).
- Avoid using `use client` for components that do not require client-side functionality, as this can lead to unnecessary client-side rendering and performance issues.
- Use `use client` only for components that require client-side functionality, and avoid using it for components that can be rendered on the server.
- keep client/server boundaries as small as possible, and avoid passing large amounts of data or complex objects between client and server components.
- use static rendring when the content does not require dynamic data or user interactions, and prefer server-side rendering for pages that require dynamic data or user interactions.
- Do not convert an entire page to a client component when only a small part requires client-side functionality, and instead use a combination of server and client components to optimize performance and maintainability.

---

## Components

- Build reusable components when the same UI Pattern is used in multiple places, and avoid duplicating code or creating similar components with minor variations.
- Avoid creating abstractions for components that are only used in a single place, and instead keep them as simple, focused components that are easy to understand and maintain.
- Keep persentational components focused on rendering UI and avoid adding business logic or state management to them, and instead use container components or hooks to manage state and logic.
- Use the existing component library before creating custom components, and avoid creating new components that duplicate existing functionality or design patterns.
- Follow existing component APIs and conventions when creating new components, and avoid introducing new APIs or conventions without justification and approval from the team.

---

## TypeScript

- Use stict typing and interfaces to define component props and state, and avoid using `any` or `unknown` types unless absolutely necessary.
- Prefer explicit types for public components props, API reponses, reusable utilities, and shared data structures, and avoid relying on implicit types or type inference that may lead to unexpected behavior or errors.
- Reuse existing types and interfaces when possible, and avoid creating new types or interfaces that duplicate existing functionality or design patterns.
- Keep Api types consistent with the back-end API types, and avoid creating new types or interfaces that are inconsistent with the back-end API.
- Use type narrowing of unsafe types when necessary, and avoid using type assertions or type casting that may lead to unexpected behavior or errors.

---

## Data Fetching

- Use `useSWR` Hook or project-approved data fetching strategies (such as TanStack Query or Server-Side Rendering) for client-side data fetching, caching, and state management.
- Follow existing data-fetching patterns and mutation patterns when creating new queries or handlers, and avoid introducing conflicting conventions.
- Avoid duplicating API requests in multiple components, and instead use a single source of truth for shared data whenever possible.
- Handle:
  - Loading states, error states, and success states for all data fetching operations, and provide appropriate feedback to the user.
  - Use optimistic updates and cache invalidation when appropriate to improve performance and user experience.
- Do not store server state on global client state (e.g. avoid putting server state in Zustand), and instead use dedicated data-fetching caches.

---

## Api integration

- Keep all API integration logic in next.js api routes, and avoid making direct API calls from client components or pages.
- Validate and safely handle API responses and errors, and provide appropriate feedback to the user.
- Avoid exposing sensitive information or credentials in API requests or responses, and use secure authentication and authorization mechanisms to protect sensitive data.
- Use existing API integration patterns and conventions when creating new API routes or endpoints, and avoid introducing new patterns or conventions without justification and approval from the team.
- Avoid duplicating API integration logic in multiple components or pages, and instead use a single source of truth for shared API integration logic whenever possible.
- Keep API integration logic separate from UI logic, and avoid mixing API integration logic with UI logic in components or pages.

---

## Styling

- Use TailwindCSS for styling, and avoid using other libraries or frameworks for styling without justification and approval from the team.
- Follow existing TailwindCSS patterns and conventions when creating new styles or components, and avoid introducing new patterns or conventions without justification and approval from the team.
- Avoid using inline styles or CSS modules for styling, and instead use TailwindCSS classes and utilities to style components and pages.
- Keep styles consistent with the existing design system and branding guidelines of the project, and avoid introducing new styles or design patterns that are inconsistent with the existing design system and branding guidelines.
- Avoid using !important or other CSS overrides that may lead to unexpected behavior or conflicts with existing styles.
- Reuse shadecn/ui components and styles when possible, and avoid creating new components or styles that duplicate existing functionality or design patterns.
- Keep responsive behavior consistent with the existing design system and branding guidelines of the project, and avoid introducing new responsive patterns or behaviors that are inconsistent with the existing design system and branding guidelines.

---

## Responsive Design

- Every Web interface should consider:
  - mobile
  - tablet
  - desktop
  - large desktop

Prefer responsive design layouts and components that adapt to different screen sizes and orientations, and avoid creating separate layouts or components for each device or screen size.

- Avoid:
  - Fixed-width layouts that do not adapt to different screen sizes or orientations.
  - Non-responsive components that do not adapt to different screen sizes or orientations.
  - Overlapping or hidden content that is not visible on smaller screens or devices.
  - Inconsistent spacing, alignment, or typography that does not adapt to different screen sizes or orientations.

---

## UI/UX

- Prioritize user experience and usability in all front-end development work, and avoid creating interfaces or interactions that are confusing, frustrating, or difficult to use.
- Maintain consistency in UI/UX design patterns and conventions across the application, and avoid introducing new patterns or conventions without justification and approval from the team.
- Follow accessibility best practices and guidelines, and avoid creating interfaces or interactions that are not accessible to users with disabilities or impairments.
- Use existing UI/UX design patterns and conventions when creating new interfaces or interactions, and avoid introducing new patterns or conventions without justification and approval from the team.
- Avoid creating interfaces or interactions that are not intuitive or do not follow established design patterns or conventions, and§ instead use established design patterns and conventions to create interfaces and interactions that are intuitive and easy to use.
- Provide accionable feedback to users for all interactions and actions, and avoid creating interfaces or interactions that do not provide feedback or confirmation to users.

---

## Accessibility

In addition to the general accessibility rules:

- Prefer semantic HTML.
- Use appropriate heading hierarchy.
- Use accessible form labels.
- Ensure keyboard navigation works.
- Ensure interactive elements have visible focus states.
- Use appropriate ARIA attributes when semantic HTML is insufficient.
- Provide meaningful alternative text for images.
- Ensure dialogs, menus, popovers, and other interactive components are keyboard accessible.
- Do not use color alone to communicate important information.

---

## SEO

For Pages Where SEO is relevant, follow these SEO best practices:

- Use meanigful page titles.
- Provide descriptive meta descriptions where appropriate.
- Use semantic HTML and structured data to improve search engine visibility and accessibility.
- maintain proper heading hierarchy and use appropriate heading tags (e.g., `<h1>`, `<h2>`, `<h3>`, etc.) to structure content.
- Ensure important content is available to search engines and not hidden behind JavaScript or other client-side rendering techniques.
- Perfer server-side rendering (SSR) and static site generation (SSG) when appropriate to improve performance and SEO.
- Follow the project's existing metadate architecture and conventions for SEO, and avoid introducing new patterns or conventions without justification and approval from the team.

## Do not add SEO configuration to pages where it is not relevant, such as internal pages, admin pages, or pages that are not intended to be indexed by search engines.

## Browser APIs

- Browser-only Apis must not used during server-side rendering (SSR) or static site generation (SSG), and should only be used in client components or hooks that are executed on the client-side.
- Access browser Apis only from Client Components or client-side execution.
- Consider hydration behavior when using browser APIs, and avoid using browser APIs in components or hooks that are rendered on the server or during static site generation.
- Do not assume `winow` or `document`, `localSotrage` or othter browser globals are available in all components or hooks, and instead check for their existence before using them.

---

## Performance

- Perfer Server-side rendering (SSR) and static site generation (SSG) when appropriate to improve performance and SEO.
- minimize the use of client-side rendering and avoid unnecessary re-renders or state updates that can impact performance.
- Avoid unnecessary client-side JavaScript execution and reduce the amount of JavaScript sent to the client, and instead use server-side rendering or static site generation when appropriate.
- Use code splitting and lazy loading to reduce the initial load time of the application, and avoid loading unnecessary code or components that are not needed for the initial render.
- Optimize images and other media assets for performance, and avoid using large or unoptimized images or media that can impact load times and performance.
- Use caching and other performance optimization techniques to improve the performance of the application, and avoid introducing new performance bottlenecks or issues that can impact the user experience.
- Monitor and analyze performance metrics and use tools like Lighthouse, WebPageTest, or Chrome DevTools to identify and address performance issues, and avoid ignoring performance issues or failing to address them in a timely manner.

---

## Web Security

- Treat Browser input and external data as untrusted, and validate and sanitize all input and data before using it in the application.
- Avoid exposing sensitive information or credentials in the front-end code, and use secure authentication and authorization mechanisms to protect sensitive data.
- Use HTTPS for all communication between the client and server, and avoid using insecure protocols or connections that can compromise the security of the application.
- Follow best practices for web security, such as using Content Security Policy (CSP), Cross-Origin Resource Sharing (CORS), and other security mechanisms to protect against common web vulnerabilities and attacks.
- Keep dependencies and libraries up to date and avoid using outdated or vulnerable libraries that can introduce security risks to the application.
- Monitor and address security vulnerabilities and issues in a timely manner, and avoid ignoring or delaying the resolution of security issues that can impact the security of the application.
- Avoid introducing XSS vulnerabilities by properly escaping and sanitizing user input and output, and using secure coding practices to prevent injection attacks.
- Do not rely on client-side authentication or authorization mechanisms, and instead use server-side authentication and authorization to protect sensitive data and resources.
- Use secure cookie and session mechanisms to protect user sessions and prevent session hijacking or other attacks.
- Follow the project's CSRF protection mechanisms and avoid introducing new vulnerabilities or issues that can compromise the security of the application.

---

## Error and Loading UI

For Pages and asynchronous operations where loading and error states are relevant, follow these best practices:

- Loading states should be visually distinct and provide feedback to the user that an operation is in progress.
- Error states should be visually distinct and provide feedback to the user that an operation has failed
- Empty states should be visually distinct and provide feedback to the user that there is no data available.
- Retry states should be visually distinct and provide feedback to the user that an operation can be retried.
- Partial failure states should be visually distinct and provide feedback to the user that an operation has partially failed, and provide options for the user to recover or retry the operation.
- Non-found states should be visually distinct and provide feedback to the user that the requested resource or page was not found, and provide options for the user to navigate or search for other resources.

use the project existing Next.js error and loading conventions.
Do create duplicate error-handling architectures.

---

## web specific vaification

After Implemtation:

1. Run formatting.
2. Run linting.
3. Run TypeScript type checking.
4. Run relevant tests.
5. Verify the affected route.
6. Verify responsive behavior.
7. Verify loading and error states.
8. Verify accessibility for affected interactions.
9. Verify Server/Client Component boundaries.
10. Review the final diff

Do not claim the implementation is complete without performing the applicable verification.
