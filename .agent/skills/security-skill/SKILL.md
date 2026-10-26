---
name: security-skill
description: General security engineering skill for designing, implementing, reviewing, debugging, and maintaining secure software applications. Use when handling authentication, authorization, user input, secrets, sensitive data, API security, dependency security, secure storage, error handling, logging, or security-related architecture. This skill is technology-agnostic and should be combined with platform-specific skills such as front-web-skill, front-mobile-skill, backend-skill, database-skill, or authentication-skill.
---

# Security Skill

## Overview

This skill is provided a general principles for building a secure software application.Security must be considered throughout the the application lifecycle rather than after implementation. this skill is platform-agonstic and applies to:

- Frontend appliications
- Backend services
- Application programming interfaces (APIs)
- Mobile applications
- Databases
- Authentication and authorization systems
- third-party integrations
- Dependencies and infrastructure

Platform-specific security skills should be used in conjunction with this skill to ensure comprehensive security coverage.

---

## Core Security Principles

- Treat all external input as untrusted and validate it rigorously.
- Follw the principle of least privilege for user access and system permissions.
- Minimize access to sensitive resourcea and data, and use encryption for data at rest and in transit.
- Minimize collection and storage of sensitive data, and implement secure data handling practices.
- Fail securely by providing generic error messages and avoiding information leakage.
- Never rely on client-side controls for security decusions; always enforce security on the server side.
- Prefer secure defaults and configurations, and avoid exposing unnecessary services or endpoints.
- Keep security-sensitive logic centralized and auiditable, and avoid duplicating security logic across the application.
- Avoid unnecessary security complexity, and prefer simple and well-understood security mechanisms.
- Do not weaken existing security controls or introduce new vulnerabilities when adding new features or making changes to the application.
- Do not expose sensitive implementation details or secrets in client-side code, logs, or error messages.
- Do not modify unrelated security or application behavior when making changes to the application, and ensure that security controls are not bypassed or weakened.

---

## Authentication and Authorization

- Use Project-specific authentication and authorization mechanisms, such as OAuth, OpenID Connect, or JWT, to manage user access and permissions.
- Authenetication and authorization are seprate concerns and should be implemented independently, with authentication verifying user identity and authorization determining access rights.
- Password must be securely hashed using a appropriate hashing algorithm (e.g., bcrypt, Argon2) and salted to protect against brute-force attacks.
- Never log Passwords tokens,session identifiers, or other sensitive authentication information.
- Use short-lived access tokens and refresh tokens to minimize the impact of token compromise.
- Handle credintials expiration and revocation properly, and provide users with a secure way to reset their passwords or revoke access.
- Follow least privilege principles when assigning roles and permissions, and avoid granting excessive access rights to users or services.
- Never rely on hidden Ui elements or client-side checks for authorization decisions; always enforce authorization on the server side.
- Prevent users from accessing resources that belongs to other users or roles, and implement proper access control checks for all sensitive operations.
- Use Role-Based Access Control (RBAC) to manage user permissions and access rights, and avoid hardcoding access control logic in the application code.
- Check ownership and permissions for all sensitive operations, and avoid exposing sensitive data or functionality to unauthorized users.
- Use centerlized guards and middleware to enforce authentication and authorization checks consistently across the application, and avoid duplicating access control logic in multiple places.
- Don't trust authentication state state supplied by the client, and always verify authentication and authorization on the server side.
- Authentication implemtentation details belongs `authentication-skill` and authorization implementation details belongs `authorization-skill`. Use those skills for platform-specific guidance on implementing authentication and authorization mechanisms.

---

## input Validation and Sanitization

- validate all external input, including user input, API requests, and third-party data, to ensure it meets expected formats and constraints.
- Validate request bodies, query parameters, headers, uploaded files, and an external services to prevent injection attacks, data corruption, and unexpected behavior.
- Enforce type, length, format, range, and business rules for all input data, and reject any input that does not meet the expected criteria.
- Reject malformatted or unexpected input, and provide clear error messages to users without exposing sensitive information.
- Don't assume frontend validation is sufficient; always validate input on the server side to prevent bypassing client-side checks.
- Backend validation remain authoritative and should be the final gatekeeper for input validation, even if frontend validation is implemented.
- senitize and safely encode data according to its output context (e.g., HTML, JavaScript, SQL, XML) to prevent injection attacks and cross-site scripting (XSS) vulnerabilities.
- Avoid unsafe parsing or untrusted deserialization of input data, and use secure libraries or frameworks for handling structured data formats (e.g., JSON, XML).

---

## Output and Injection security

Protect against injection vulnerabilities by properly escaping and encoding output data based on its context. This includes:

- SQL injection: Use parameterized queries or prepared statements to prevent SQL injection attacks. Avoid concatenating user input directly into SQL queries.
- Command injection: Avoid executing system commands with user input. If necessary, validate and sanitize input, and use safe APIs that do not invoke the shell.
- Cross-site scripting (XSS): Sanitize and encode user-generated content before rendering it in web pages. Use Content Security Policy (CSP) headers to mitigate XSS risks.
- XML injection: Validate and sanitize XML input, and avoid using untrusted data in XML parsers or transformers. Use secure libraries that handle XML safely.
- noSQL injection: Validate and sanitize input used in NoSQL queries, and avoid directly embedding user input in query structures. Use parameterized queries or query builders provided by the database library.
- Template injection: Avoid rendering untrusted data in templates without proper escaping or sanitization. Use template engines that automatically escape output and follow best practices for template security.
- Path traversal: Validate and sanitize file paths, and avoid using user input directly in file system operations. Use secure APIs that prevent directory traversal attacks.
- Header injection: Validate and sanitize HTTP headers, and avoid including untrusted input in response headers. Use secure libraries or frameworks that handle header manipulation safely.
- UnSafe deserialization: Avoid deserializing untrusted data, and use secure serialization formats and libraries that enforce type safety and integrity checks.

Prefer parametrized queries, prepared statements, and safe APIs over manual string concatenation or interpolation when constructing queries or commands. Always validate and sanitize input data before using it in any context that could lead to injection vulnerabilities.

Never construct excutable commands or queries directly from untrusted input, and avoid using eval or similar functions that execute code dynamically. Always follow the principle of least privilege when executing commands or queries, and limit the scope of user input to prevent unintended consequences.

---

## Secret and Credentials

- Never Hardcode: - passwords - Api Keys - Access tokens - Refresh tokens - private keys - Database credentials - Encryption keys - Third-party credentials

Use the project's approved environment/configuration or secret management mechanisms

- Rules: - Never Commit secrets to source controls - Never expose server-only secrets to client-side code or public repositories - Never log secrets or sensitive information in logs, error messages, or monitoring systems - Never Place the secrets in error messages or stack traces that could be exposed to users or attackers - Do not expose secrets throgh API responses or public endpoints - Rotate compromized credentials for different environment and services, and update the application configuration accordingly

---

## Sensitive Data Handling

- Collect only the data that is necessary for the application's functionality, and avoid storing sensitive data unless absolutely required.
- Avoid unnecessary storage of sensitive data, and implement secure data handling practices to protect it from unauthorized access or disclosure.
- Encrypt sensitive data when required by threat model, regulatory requirements, or industry best practices. Use strong encryption algorithms and key management practices to protect sensitive data at rest and in transit.
- protect sensitive data during transmission by using secure communication protocols (e.g., HTTPS, TLS) and validating certificates to prevent man-in-the-middle attacks.
- Restrict access to sensitive data based on the principle of least privilege, and implement proper access control mechanisms to prevent unauthorized access.
- Avoid exposing sensitive data in Urls, query parameters, or logs, and use secure methods for transmitting sensitive information (e.g., POST requests, encrypted payloads).
- Do not log personal data, authentication credentials, or other sensitive information in application logs, error messages, or monitoring systems. Use secure logging practices to protect sensitive data from unauthorized access.
- Delete sensitive data when it is no longer needed, and implement secure data disposal practices to prevent data leakage or recovery.

---

## Api Security

For Apis:
- Authenticate protected endpoints using appropriate authentication mechanisms (e.g., OAuth, JWT, API keys) to ensure that only authorized users or services can access the API.
- Implement rate limiting and throttling to prevent abuse and denial-of-service attacks on the API
- Validate and sanitize all incoming API requests to prevent injection attacks, data corruption, and unexpected behavior. Enforce strict input validation and reject any requests that do not meet the expected criteria.
- Use HTTPS for all API communication to protect data in transit and prevent eavesdropping
- Use Consistant security middleware or guards to enforce authentication, authorization, and input validation across all API endpoints. Avoid duplicating security logic in multiple places.
- Use Safe Pagination and filtering mechanisms to prevent excessive data exposure and protect against resource exhaustion attacks. Implement proper access control checks for paginated or filtered data.
- Validate external webhooks and callbacks to ensure that they originate from trusted sources, and implement proper authentication and authorization checks for incoming webhook requests.
- Protect sensitive endpoints against abuse by implementing additional security measures such as IP whitelisting, request signing, or CAPTCHA challenges for critical operations.
- Implement proper error handling and logging for API requests, and avoid exposing sensitive information in error messages or logs. Use generic error messages for unauthorized or failed requests to prevent information leakage.
- Use API versioning and deprecation strategies to manage changes to the API without breaking existing clients. Communicate changes clearly to API consumers and provide migration paths for deprecated endpoints.
- Use API documentation and security best practices to educate developers and consumers about secure API usage, authentication mechanisms, and potential security risks. Provide clear guidelines for secure integration with the API.

---

## Session and Token storage

When using sessions or tokens for authentication and authorization, follow these best practices:
- Use JWT mechanisms for stateless authentication and authorization, and ensure that tokens are securely generated, signed, and validated.
- Store all session tokens scurely using HttpOnly and Secure flags to prevent access from client-side scripts and ensure transmission over HTTPS.
- Use short-lived session tokens and implement proper expiration and renewal mechanisms to minimize the impact of token compromise. Implement token rotation and refresh mechanisms to maintain session security.
- Avoid storing sensitive information in session tokens or cookies, and use secure storage mechanisms for any sensitive data that needs to be persisted across sessions
- Implement proper session management practices, including session invalidation on logout, session expiration, and protection against session fixation and hijacking attacks. Use unique session identifiers and regenerate session tokens after authentication or privilege changes.
- Never log token values or session identifiers in application logs, error messages, or monitoring systems. Use secure logging practices to protect sensitive session information from unauthorized access.
- Implement proper access control checks for all session-based operations, and avoid exposing sensitive functionality or data to unauthorized users. Use role-based access control (RBAC) or attribute-based access control (ABAC) mechanisms to enforce fine-grained access control policies.
- Do not trust decoded token values or session identifiers supplied by the client, and always verify authentication and authorization on the server side. Use secure token validation libraries or frameworks to ensure the integrity and authenticity of tokens.
- Use secure transport mechanisms (e.g., HTTPS, TLS) for all session and token communication to protect against eavesdropping and man-in-the-middle attacks. Validate certificates and implement proper certificate pinning if necessary.
- Do not implemaent custom cryptographic algorithms or token generation mechanisms; use well-established libraries and frameworks that follow industry best practices for secure token management.


Platform-specific storage belong to the relavant `front-web-skill`, `front-mobile-skill` . Use those skills for platform-specific guidance on securely storing session tokens and sensitive data.
---

## Error Handling and Logging

- Implement proper error handling mechanisms to gracefully handle unexpected errors and exceptions in the application. Avoid exposing sensitive information in error messages or stack traces that could be exploited by attackers.
- Use generic error messages for users, and log detailed error information securely for debugging and monitoring purposes. Avoid logging sensitive data, authentication credentials, or other sensitive information in application logs or monitoring systems.
- Implement centralized error handling and logging mechanisms to ensure consistent error reporting and monitoring across the application. Use structured logging formats and log levels to facilitate analysis and troubleshooting.
- Avoid exposing sensitive implementation details or stack traces in error messages or logs that could be exploited by attackers. Use secure logging practices to protect sensitive information from unauthorized access.
- Implement proper access control checks for error handling and logging operations, and avoid exposing sensitive functionality or data to unauthorized users. Use role-based access control (RBAC) or attribute-based access control (ABAC) mechanisms to enforce fine-grained access control policies for error handling and logging operations.
- Use secure logging libraries or frameworks that provide features such as log rotation, log encryption, and secure log storage to protect sensitive information in logs from unauthorized access. Implement proper log retention policies and securely archive or delete logs when they are no longer needed to prevent data leakage or recovery.
- Monitor and analyze application logs for security events, anomalies, and potential security incidents. Implement alerting mechanisms to notify administrators of suspicious activities or security breaches, and follow incident response procedures to mitigate the impact of security incidents.

