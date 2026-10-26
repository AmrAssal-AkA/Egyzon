---
name: front-end-skill
description: General front-end development skill for building and maintaining user interfaces across web and mobile applications. Use when creating, modifying, reviewing, debugging, or refactoring front-end components, UI, state management, data integration, validation, accessibility, performance, or front-end architecture. This skill provides platform-agnostic front-end engineering principles and should be combined with the appropriate platform-specific skill such as front-web-skill or front-mobile-skill.
---

# Front-end Skill

### Overview

The frond-end skill provides general front-end development principles and best practices for building and maintaining user interfaces across web and mobile applications. It covers topics such as front-end architecture, UI design, state management, data integration, validation, accessibility, performance optimization, and security. This skill is platform-agnostic and should applied to both web and mobile front-end development tasks.

Platform-specific behavior should be defined in the appropriate specialized skill:

- `front-web-skill` for web applications
- `front-mobile-skill` for mobile applications

Do not duplicate platform rule in this skill. Instead, use the specialized skill for platform-specific rules and guidelines.

### General Principles

- Follow the existing Front-end architecture and design patterns of the project.
- Inspect the existing implementaion before making changes.
- Follow the existing coding standards and conventions of the project, including naming conventions, file structure, and code organization.
- Prioritize usability and accessibility in all front-end development tasks.
- Ensure that the front-end code is maintainable, scalable, and follows best practices.
- Reuse existing components and utilities whenever possible to maintain consistency and reduce duplication.
- Avoid unnecessary abstraction and complexity in the front-end codebase.
- keep components focused on a single responsibility and avoid mixing concerns.
- keep Business logic seperated from UI components and use state management libraries when necessary.
- Do not introduce new dependencies without justification and approval from the team. Always consider the impact on performance, bundle size, and maintainability before adding new libraries or frameworks.
- Write clean, readable, and well-documented code that is easy to understand and maintain.
- Do not modify unrelated Functionality.
- Do not rewrite existing working code without a clear reason or justification. Refactor code only when necessary to improve maintainability, performance, or readability.

### Data

- Do not hardcode data in the front-end codebase. Use APIs or configuration files to manage data and avoid duplication.
- treat external data as untrusted and validate it before use. Sanitize user input and handle errors gracefully to prevent security vulnerabilities and improve the user experience.
- Handle loading and error states gracefully in the UI, providing feedback to the user and allowing them to retry or recover from errors.
- Follow the existing Api/data fetching patterns and conventions of the project, including caching, pagination, and error handling.
- Keep Api contract consistant with the backend.
- Use environment variables to manage configuration settings and avoid hardcoding sensitive information in the front-end codebase.
- Avoid duplication Api logic accross components.
- Reuse existing Api clients, services, and utilities whenever possible to maintain consistency and reduce duplication.

### UI

- maintain consistancy with the existing design system and UI components of the project, including typography, color schemes, spacing, and layout.
- Build resuable Ui components when appropriate, and avoid duplicating code or creating unnecessary variations of existing components.
- consider accessibility and usability in all UI design and development tasks, including color contrast, keyboard navigation, and screen reader support.
- consider performance and optimization in all UI design and development tasks, including minimizing the use of heavy images, animations, and third-party libraries.
- handle edge cases and unexpected user behavior gracefully in the UI, providing feedback and guidance to the user when necessary.
- ensure that the UI is responsive and works well on different screen sizes and devices.
- Avoid unnessary complexity in the UI, and prioritize simplicity and clarity in design and functionality.
- Avoid excussive use of animations, transitions, or other visual effects that negatively affect user usability and performance.

---

### Accessibility

- Design and implements accessible user interfaces that comply with accessibility standards and guidelines, such as WCAG 2.1 by default.
- Ensure interactive elemeants are accesible via keyboard and screen readers, and provide alternative text for images and other non-text content.
- Provide meaningful labels for controls and form elements, and use semantic HTML to improve accessibility and usability.
- Maintain sufficient color contrast between text and background to ensure readability for users with visual impairments.
- Do not rely only on color to comminicate information or convey meaning, and provide alternative visual cues when necessary.
- provide cloer validation and error messages to help users understand and correct input errors.
- Ensure focuse and navigation behavior is appropriate for the platform and context, and avoid unexpected changes in focus or navigation that may confuse users.
- support accessive technologies and assistive devices, such as screen readers, voice recognition software, and alternative input devices.
- prefer semantic HTML and ARIA attributes to improve accessibility and usability, and avoid using non-semantic elements or custom controls that may not be accessible.

## Platform-specific accessibility guidelines should be defined in the appropriate specialized skill.

### State

- Prefer using local state when state is only relevant to a single component or a small part of the application, and avoid using global state for local state management.
- use existing global state soluttion for shared client state across multiple components.
- Do not introduce new state management libraries or frameworks without justification and approval from the team.
- Avoid dublication the same state in multiple components, and use a single source of truth for shared state whenever possible.
- keep server state separeted from client/UI state when project architecture allows it, and use appropriate data fetching and caching strategies to manage server state.
- Avoid unnecessary re-renders and performance issues by optimizing state updates and minimizing the number of components that depend on a particular piece of state.
- Use memorzation and other performance optimization techniques only when necessary, and avoid premature optimization that may introduce complexity or reduce maintainability.
- Do not optimize pramturely without profiling and measuring performance, and consider the trade-offs between performance, maintainability, and readability when making optimization decisions.

---

### Forms user input validation

- validate user input on the client-side before sending it to the server, and provide clear feedback to the user when input is invalid or incomplete.
- Use appropriate validation techniques and libraries for the platform and context, and avoid duplicating validation logic across components or modules.
- Avoid relying solely on client-side validation for security, and always validate user input on the server-side as well.
- Provide clear and concise error messages for validation failures, and avoid exposing sensitive information or implementation details in error messages.
- Use appropriate input types and constraints for form fields, and avoid using generic input types that may lead to invalid or unexpected input.
- Consider accessibility and usability when designing and implementing form validation, and provide alternative feedback mechanisms for users with disabilities or assistive technologies.
- Avoid unnecessary complexity in form validation logic, and prioritize simplicity and clarity in validation rules.
- Backend validation remain authoritative, and do not rely solely on client-side validation for security or data integrity.

---

### Performance

- Avoid unnecessary re-renders and performance issues by optimizing state updates and minimizing the number of components that depend on a particular piece of state.
- Avoid unnecessary network requests and data fetching, and use caching and other optimization techniques to reduce latency and improve performance.
- Reuse cached when appropriate, and avoid duplicating data fetching logic across components.
- Avoid loading unnecessary dependencies or resources, and use code splitting and lazy loading techniques to improve performance and reduce bundle size.
- optimze large lists and expensive operations when required, and use virtualization or other techniques to improve performance and reduce memory usage.
- Avoid unnecessary animations or visual effects that negatively affect performance, and use hardware acceleration and other optimization techniques when appropriate.
- Prefer simpler solutions over complex ones, and avoid premature optimization that may introduce complexity or reduce maintainability.
- Messure or verify performance issues before applying it complecated optimization techniques, and consider the trade-offs between performance, maintainability, and readability when making optimization decisions.

## Platform-specific performance optimization guidelines should be defined in the appropriate specialized skill.

### security

- Follow best practices for front-end security, including input validation, output encoding, and protection against cross-site scripting (XSS) and other common vulnerabilities.
- Treat all user input and external data as untrusted.
- Validate data before using it.
- Never expose secrets, private credentials, or server-only configuration in front-end code.
- Do not rely on client-side authorization for security decisions.
- Follow the project's authentication and authorization architecture.
- Avoid unsafe rendering of untrusted content.
- Protect against common client-side security vulnerabilities.
- Use secure communication mechanisms provided by the application's architecture.
- Do not store sensitive information using insecure client-side storage mechanisms.

## Authentication-specific rules should be defined in the authentication/security skills.

### Error handling

- Handle expected errors explicitly and provide clear feedback to the user when errors occur.
- Provide usefil and user-friendly error messages that help users understand and recover from errors.
- proide recovery options and guidance for users when errors occur, and avoid leaving users in a state of confusion or frustration.
- Do not expose sensitive information or implementation details in error messages, and avoid revealing internal state or configuration information to users.
- Do not silently ignore errors or fail silently, and always provide feedback to the user when errors occur.
- Log errors and exceptions for debugging and troubleshooting purposes, and use appropriate logging mechanisms provided by the application's architecture.
- Preserve useful debugging information during development without exposing it to end-users in production, and use appropriate error reporting and monitoring tools to track errors and issues in production.

---

### Validation

before completing any task, validate the following:

- Ensure that the task aligns with the existing front-end architecture and design patterns of the project.
- Ensure that the task follows best practices for front-end development, including performance optimization, cross-browser compatibility, and security considerations.
- Ensure that the task does not introduce new dependencies or complexity without justification

**Follow this steps to validate the task:**

1. Run formating and linting tools to ensure that the code follows the project's coding standards and conventions.
2. Run typechecking.
3. Run relevent task tests to ensure that the task does not introduce regressions or break existing functionality.
4. Review the final diff.
