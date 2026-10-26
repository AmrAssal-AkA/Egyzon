---
name: back-end-api-development
description: Designs and implements backend systems and REST APIs, including requirements, architecture, database schema, authentication, testing, and deployment. Use when building or changing server-side features, API endpoints, database models, or backend services.
---

# Back-End Development Skill

## When to use this skill

- use it when you need to design and implement backend systems and REST APIs for web or mobile applications.
- use it when need to Api contracts handoff to the front-end for integration.
- use it on tasks that involve creating or modifying server-side features, API endpoints, database models, or backend services.

## When not to use this skill

- There is no need to use this skill when the task is related to front-end development, UI/UX design, or client-side scripting. This skill is specifically focused on server-side programming and backend architecture.
- the task is small, isolated backend changes or bug fixes that do not require a comprehensive understanding of backend systems or API design. In such cases, a more specialized skill may be more appropriate.

---

# Phase 1: Requirements Gathering and Analysis

1. Business Analysis & Requirement:
   - Understand the business requirements and objectives for the backend system.
   - Prompt: "Analyze feauture requirements For $Arguments. Define user stories, acceptance criteria, and technical specifications for the backend system."
   - Expected Output: Requriment Document, User Stories, Acceptance Criteria, Technical Specifications
   - Context: Initial feature requirements and buisness objectives for the backend system.
   - Constraints: The backend system must be able to handle a high volume of requests and provide a good user experience.

2. Technical Architecture Design:
   - Use The same architecure design of the existing system, and design the technical architecture for the backend system, including components, modules, services, and data flow.
   - Prompt: "Design the technical architecture for feature $Arguments. Include components, modules, services, and data flow."
   - Expected Output: Technical design document with architecture diagrams, API specifications, and data models.
   - Context: Busienss Requirements and existing system architecture.
   - Constraints: The architecture must be scalable, maintainable, and follow best practices for backend development.

3. Flexibility and Risk Assessment:
   - Evaluate the flexibility of the backend system to accommodate future changes and assess potential risks.
   - Prompt: "Assess the flexibility and potential risks of the backend system for feature $Arguments. Identify areas that may require future modifications or improvements."
   - Expected Output: Risk assessment report with recommendations for mitigating risks and improving flexibility.
   - Context: Technical architecture design and business requirements.
   - Constraints: The backend system must be able to adapt to changing business needs and minimize potential risks.

# Phase 2: Architecture and Api Design

1. Api Design and Documentation:
   - Design RESTFUL APIs for the backend system, including versioning(v1, ...etc.), endpoints, request/response formats, and authentication mechanisms.
   - Prompt:"Design RESTFUL APIs for the backend system, including versioning(v1, ...etc.), endpoints, request/response formats, and authentication mechanisms.".
   - Expected Output: API design document with endpoint specifications, request/response examples, and authentication details.
   - Context: Technical architecture design and business requirements.
   - Constraints: The APIs must follow RESTful principles, be well-documented, and support authentication and authorization mechanisms.

2. Database Schema Design:
   - Design the database schema for the backend system, including tables, relationships, indexes, and constraints.
   - Prompt: "Design the database schema for the backend system from plannoing document provide with context, Including tables, relationships, indexes, and constraints."
   - Expected Output: Database schema design document with entity-relationship diagrams and table definitions.
   - Context: Technical architecture design, Business requirements and planning documents.
   - Constraints: The database schema must be normalized, efficient, and support the required data integrity and performance.

3. Authentication and Authorization:
   - Implement authentication and autorization mechanisms for the backend system, including user registeration, login, token generation, and role-based access control (RBAC).
   - Prompt: "Implement authentication and authorization mechanisms for the backend system, including user registration, login, token generation, and role-based access control (RBAC)."
   - Expected Output: Authentication and authorization implementation with code samples, configuration details, and security best practices.
   - Context: Technical architecture design, API design, and business requirements.
   - Constraints: The authentication and authorization mechanisms must be secure, scalable, and follow best practices for user management and access control.

# Phase 3: Implementation

**Before coding**: detect the project's existing stack, folder structure, and conventions, and follow them. do not indroduce new frameworks or libraries without stated resoans.

1. conventions:
   - Layers: route/controller -> service -> repository. No business logic in controller, no database access in controllers.
   - REST naming: plural nouns (`v1/users`), correct HTTP verbs, correct status codes (201 created, 204 deleted, 404 missing, 400 bad request, 500 internal server error, etc.), consistent response format (e.g., `{ "data": ..., "error": ... }`).
   - All list endPoints must be paginated.
   - Validating every input at boundary. Never build SQL by string concatenation. Use ORM or parameterized queries.
   - Secrets comes from environment variables only. Never hardcode secrets in code.

2. Error Handling and Logging:
   - use one Error shape for all errors, with a consistent structure and error codes.
     `{
   "error": {
     "code": "USER_NOT_FOUND",
     "message": "User not found",
     "details": {
       "userId": 123
     }
   }
 }`
   - Never leak Stack traces or internal error messages to the client. Log them internally for debugging.
   - Log error with request Id. Do not log PII or sensitive data. Use structured logging (JSON) for easier searching and filtering.

3. DataBase and migrations:
   - use the project migration tool. Never modify the database schema manually. Always use migrations for schema changes.
   - Each migration must be safe on existing data. If a migration is destructive, it must be approved and documented.
   - Index foreign keys and frequently filtered columns. Avoid unnecessary indexes that slow down writes. Use composite indexes for multi-column queries.
   - Avoid N+1 queries. Use eager loading or batch queries when fetching related data. Use pagination for large result sets.

## Done when

- [ ] the project builds and lints command passed suucessfully.
- [ ] Implementation match the API contract in Phase 2.
- [ ] Auth and validation are applied to every endpoint. No unvalidated input reaches the database.
- [ ] Migrations are apply cleanly on a fresh and an existing database. No data loss or corruption.
- [ ] No hardcoded secrets or credentials in the codebase. All secrets come from environment variables.
- [ ] No string-build quaries or raw SQL queries. All database access is through ORM or parameterized queries.
- [ ] No new dependencies or frameworks are introduced without approval. All dependencies are up-to-date and have no known vulnerabilities.

# Phase 4: Testing and security review

1. **Detect the project's existing testing framework and conventions, and follow them. do not introduce new testing frameworks or libraries without stated reasons.**

2. write tests:
   - cover each new or modified endpoint and service with: - **Happy path tests**: verify that the endpoint works as expected with valid input and returns the correct response. - **validation error**: missing, malformed, and out-of-range input. Verify that the endpoint returns the correct error response and status code. - **auth failure**: unauthenticated (401) and unauthorized (403) requests. Verify that the endpoint returns the correct error response and status code. - **non found/conflict**: missing resources (404) and conflicting resources (409). Verify that the endpoint returns the correct error response and status code. - **edge cases**: test edge cases and boundary conditions, such as pagination limits, maximum input lengths,boundary values and special characters. Verify that the endpoint handles these cases correctly and returns the expected response.
   - Test levels: - **Unit tests**: test individual functions and methods in isolation, using mocks and stubs for dependencies. Verify that the function behaves correctly and returns the expected output. - **Integration tests**: test the interaction between multiple components, such as services, repositories, and external APIs. Verify that the components work together correctly and return the expected output. - **End-to-end tests**: test the entire system from the user's perspective, simulating real-world scenarios and workflows. Verify that the system behaves correctly and meets the business requirements.

3. Run the Feedback loops:
   - Run the full tests loop.
   - If anything fails, fix the issue and re-run the tests until all tests pass successfully.
   - Repeat untill all tests pass and the system is stable. Never skip, delete, or ignore failing tests. All tests must pass before proceeding to the next phase.

4. Security Reviews:
   **Check every new or modified endpoint and service for security vulnerabilities, such as SQL injection, XSS, CSRF, and authentication bypass.**
   - **Authentication**: required unless explicity public. Verify that all endpoints require authentication and that the authentication mechanism is secure and follows best practices.
   - **Authorization**: the user may access this specific resource (check ownership/role, not just login).
   - **input validation**: type, length's, using of exciting schema project's validation library. Verify that all input is validated and sanitized to prevent injection attacks and other security vulnerabilities.
   - **Injection**: no storing-build queries or shall command from user input. Verify that all database queries and commands are parameterized or use an ORM to prevent SQL injection and other injection attacks.
   - **Error handling**: no leaking of stack traces or internal error messages to the client. Verify that all errors are handled gracefully and that sensitive information is not exposed to the client.
   - **Secrets**: no hardcoded secrets or credentials in the codebase. Verify that all secrets and credentials are stored securely and not exposed in the codebase.
   - **Rate limiting**: verify that rate limiting is implemented to prevent abuse and denial-of-service attacks.
   - **Logging and monitoring**: verify that logging and monitoring are implemented to detect and respond to security incidents.
   - **Dependencies**: verify that all dependencies are up-to-date and have no known vulnerabilities. Use a dependency scanning tool to identify and address any security issues in the project's dependencies.

   **use the QWASP Top 10 list as a reference for common web application security risks and best practices.**

5. Performance sanity check:
   - List endPoint are paginated, and the response time is within acceptable limits (e.g., < 500ms for 95% of requests).
   - No N+1 queries or inefficient database access patterns that could lead to performance issues.
   - Quaries on large tables uses indexes and optimized queries to minimize response time and resource usage.
   - Meet the project letency target if one is defined (for example, P95 under 300 ms).

## Done When

- [ ] All Test Passes Including the new ones for every changed or new endpoint and service.
- [ ] Each endpoint has tests for happy path, validation errors, auth failures, non-found/conflict, and edge cases.
- [ ] coverage meets the project target (e.g., 80% or higher) for unit, integration, and end-to-end tests.
- [ ] Every item in the security review checklist has been addressed and verified, with no critical vulnerabilities remaining.
- [ ] Dependancies audit shows no known vulnerabilities, and all dependencies are up-to-date.
- [ ] No Test were skipped, removed it, or weakend to get a pass.

# Phase 5: Documentation and Handoff

1. **Update the Api contract**:
   - check the project have existing API contract (e.g., OpenAPI/Swagger) and update it with any new or modified endpoints, request/response formats, and authentication details.
   - The contract should be match the implemented Behavior. If there are any discrepancies, update the contract or implementation to ensure consistency.
   - For every endPoint, document:
     - Method and path.
     - Authenication and required roles/permissions.
     - Request paramters, query options, and body (with typs, required field and constraints).
     - Success Response with example and status code.
     - All Error responses with example (with error code, message, and status code).
     - Pagination, filtering, and sorting parameters for list endpoints.
   - Mark Breaking changes and deprecated endpoints clearly in the documentation, and provide guidance for clients on how to migrate to the new endpoints or versions.

2. **Write handoff notes**:
   **Produce a short summary for the front-end team (or API consumers) covering the following points**:
   - **what changed**: new, modified, and removed endPoints.
   - **Breaking changes**: what breakes and how to migrate (or "none").
   - **Auth flow**: how to obtain, send, and refresh credentials.
   - **Error handling**: how to interpret error codes and messages, and what to do in case of errors.
   - **Environment**: Base Url and how to get test credintials or seed data
   - **Known limitation**: rate limiting, payload size limits, or any other constraints that clients should be aware of.

3. **Update Project documentation**:
   - Add or update the Readme and setup instructions to reflect the new or modified backend features, including any new dependencies, configuration settings, or environment variables.
   - List every environment variable with its purpose, default value, and any required format or constraints.
   - Document how to run migrations and tests, and any other relevant information for developers working on the backend system.

4. **Verify the documentation**:
   - Ensure that the API contract, handoff notes, and project documentation are accurate, complete, and up-to-date.
   - Verify that the documentation is clear, concise, and easy to understand for both developers and non-technical stakeholders.
   - Review the documentation with the front-end team or API consumers to ensure that it meets their needs and expectations.

## Done When

- [ ] API contract is updated and matches the implemented behavior.
- [ ] Every endpoint is documented with method, path, auth, request/response formats, and error responses.
- [ ] Breaking changes and deprecations are flagged (or explicitly "none")
- [ ] Handoff note is written for the consumers of the API
- [ ] README and environment variable docs are up to date
- [ ] Examples in the docs were tested against the running service

---

# Success Criteria

- All acceptance criteria from business requirements are met
- Test coverage exceeds minimum threshold (80% default)
- Security scan shows no critical vulnerabilities
- Performance meets defined budgets and SLOs
- Feature flags configured for controlled rollout
- Monitoring and alerting fully operational
- Documentation complete and approved
- Successful deployment to production with rollback capability
- Product analytics tracking feature usage
- A/B test metrics configured (if applicable)
