---
name: code-quality-skill
description: This skill provides general code quality guidelines and best practices for writing, reviewing, and improving code. It helps identify potential issues and recommends improvements to make code more readable, maintainable, testable, secure, efficient, and consistent with the existing project architecture and coding standards.
---
# Code Quality Skill

## 1. Purpose

The Purpose of the code quality skill is to write code and function suitable with the best practices, standards, and clean code principles. the main aim is to improve and enhance the qulity of the code and make it more readable, maintaonable, and efficient. The skill here will provide suggestions and recommendations to improve the code quality, identify potential issues, and offer best practices for writing clean and efficient code. in a way that makes the code easy for other developers to understand, modify, and maintain over time.

---

## 2. core principles

1. **Readability**: write code that is easy to read and understand, using clear naming conventions, consistent formatting, and appropriate comments.
2. **easy to understand the purpose**: write the code and functions in a way that makes it easy for other developers to understand the purpose and functionality of the code from the naming and structure of the code.
3. **Maintainability**: write the code that is easy to modify and maintain over time, with centeralized the logic, decrease the dependency, and avoid code duplication.
4. **Performance**: writing code with Best practices and efficient algorithms to ensure optimal performance and resource utilization and avoid unnecessary complexity.
5. **Security**: write code that insure the app security and is protected against common vulnerabilities and attacks, such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).
6. **Testing**: write code that is easy to test and includes appropriate unit tests, integration tests, and end-to-end tests to ensure the code works as expected and can be easily validated.

---

## 3. Guidelines for writing clean code

1. **Use meaningful names**: make sure the functions and variables are easy to understand and reflect their purpose and functionality from their names.
2. **keep functions small and one responsibility**: write functions that are small, focused, and have a single responsibility. avoid writing large functions that do too much.
3. **Avoid code dublication**: avoid the dublication of code by creating reusable functions and modules. in a way that makes the code is more maintainable and easier to modify.
4. **do not overuse comments**: use comments only when necessary to explain complex logic or provide context. avoid using comments to explain what the code does, as the code should be self-explanatory.
5. **Avoid unnecessary abstraction**: avoid creating unnecessary abstractions or layers of indirection that can make the code more complex and harder to understand. keep the code simple and straightforward.
6. **Follow coding standards**: follow the coding standards and best practices for the programming language and framework being used. this includes naming conventions, formatting, and code organization.
7. **Never silently ignore errors**: handle errors and exceptions appropriately, and avoid silently ignoring them. this can help prevent bugs and make the code more robust.

---

## 4. Business logic rules

1. **centralized Business logic across the app**: avoid dublication and scatteing of the business logic across the app. instead, centralize the business logic in a single location, such as a service or module, to make it easier to maintain and modify.
2. **Avoid mixing business logic with presentation logic**: keep the Business Logic seperate from presentation logic, such as make a boundary between the business logic in services/provider layer from the UI Components and other presentaion layer.
3. **Avoid magic strings and numbers**: avoid using of magic strings and numbers in the code, instead use constants or enums to make the code more readable and maintainable.
4. **Use appropriate data structures**: use appropriate data structures for the task at hand, such as arrays, objects, or maps, to ensure optimal performance and resource utilization.


---

## 5. Error Hadling

1. **Use try-catch blocks**: use try-catch blocks to handle exceptions and errors in the code, and provide appropriate error messages to help diagnose issues.
2. **Avoid silent failures**: avoid silently failing or ignoring errors, as this can lead to unexpected behavior and make it difficult to diagnose issues.
3. **Exception handling**: avoid throwing generic exceptions, and instead throw specific exceptions that provide more context about the error. this can help developers understand the root cause of the issue and make it easier to fix.
4. **Logging**: use logging to capture errors and exceptions, and provide appropriate context to help diagnose issues. this can include information about the request, user, and environment.
5. **Validation**: validate input data and parameters to ensure they meet the expected format and constraints, and provide appropriate error messages when validation fails.

---

## 6. Security

1. **Senitize User Input**: sanitize user input to prevent common vulnerabilities, such as SQL injection and cross-site scripting (XSS).
2. **Schema Validating**: validate the schema of every inputs to ensure that they meet the expected format and constraints, and provide appropriate error messages when validation fails.
3. **Authentication and Authorization**: implement appropriate authentication and authorization mechanisms to ensure that only authorized users can access sensitive data and functionality.
4. **Validate Client Requests**: do not trust client requests, and validate all incoming requests to ensure they meet the expected format and constraints. this can help prevent common vulnerabilities, such as cross-site request forgery (CSRF) and parameter tampering.
5. **Use HTTPS**: use HTTPS to encrypt data in transit and protect against man-in-the-middle attacks. this can help ensure that sensitive data, such as passwords and personal information, is transmitted securely.
6. **Keep Dependencies Up-to-Date**: keep all dependencies and libraries up-to-date to ensure that any security vulnerabilities are patched and fixed in a timely manner.

**Use this security part asside of `security-skill.md` file.**

---

## 7. Generic Rules

- MUST:

    1.  Must write readable and maintainable code.
    2. MUST follow the existing project architecture and conventions.
    3. MUST use descriptive names.
    4. MUST keep functions focused.
    5. MUST keep responsibilities separated.
    6. MUST handle errors explicitly.
    7. MUST validate external input.
    8. MUST remove unused code.
    9. MUST write tests for important behavior.
    10. MUST keep changes focused.
    11. MUST preserve existing behavior when refactoring.
    12. MUST use existing utilities and abstractions when they already solve the problem.

- MUST NOT: 
    1. MUST NOT write unnecessarily complex code.
    2. MUST NOT duplicate logic.
    3. MUST NOT use meaningless names.
    ```tsx
      // Bad
      const data = getData();
      const x = calculate(x);
      const temp = process(input);

      // Good
      const customer = getCustomer();
      const repairCost = calculateRepairCost();
      const validatedRequest = validateRepairRequest(input);
    ```
    4. MUST NOT ignore errors.
    5. MUST NOT use magic numbers or strings.
    ```tsx 
    // Bad
      if (ticket.status === "COMPLETED") {
        ...
      }
      // Prefer the project's established constants/enums:
      // Better
        if (ticket.status === RepairStatus.COMPLETED) {
            ...
        }
    ```
    6. MUST NOT swallow exceptions without a valid reason.
    7. MUST NOT create unnecessary abstractions.
    8. MUST NOT create excessively large functions or classes.
    9. MUST NOT mix unrelated responsibilities in the same module.
    10. MUST NOT put business logic inside presentation components when it belongs in the business/domain layer.
    11. MUST NOT rely only on client-side validation.
    12. MUST NOT commit debugging code.
    ```tsx 
      // Bad 
      console.log("Debugging info:", data);
      console.log("Debugging info:", data);
    ```
    13. MUST NOT leave commented-out code in the codebase.
    14. MUST NOT add comments that simply describe what obvious code is doing.
    ```tsx
      // Bad
      // Increment counter
      counter++;
    ```
    15. MUST NOT optimize prematurely.
    16. MUST NOT introduce a dependency when the existing codebase or platform already provides an appropriate solution.
    17. MUST NOT ignore compiler, type-checker, linter, or test failures without a documented and valid reason.
    18. MUST NOT make unrelated refactoring while implementing a focused feature or bug fix.

- Do:
  1. DO prefer simple solutions over clever solutions.
  2. DO make the code self-explanatory through good naming and structure.
  3. DO reuse existing project patterns.
  4. DO fail fast when invalid input or state is detected.
  5. DO use early returns to reduce nesting and improve readability.
  6. DO keep dependencies up-to-date to ensure security and stability.
  7. DO prefer composition over unnecessary inheritance to promote flexibility and maintainability.
  8. DO document non-obvious decisions and complex business rules.
  9. DO Consider edge cases and error scenarios when implementing features or fixes.
  10. DO refactor dublicated or unnecessary code to improve maintainability and reduce technical debt.
  11. DO run relevant tests after making changes to ensure that the code behaves as expected and that no regressions have been introduced.
  12. DO keep the implementation as small as reasonably possible while maintaining correctness and readability. This helps reduce complexity and makes the code easier to understand and maintain.

- DO NOT:
  1. DO NOT sacrifice readability just to reduce the number of lines.
  2. DO NOT create abstractions just because two pieces of code look similar.
  3. DO NOT hide important behavior behind vague helper functions.
  4. DO NOT assume that code works without testing the relevant behavior.
  5. DO NOT use comments as a replacement for good code structure.
  6. DO NOT catch an error only to rethrow the same error without adding useful context.
  7. DO NOT expose internal implementation details unnecessarily.
  8. DO NOT make broad architectural changes for a small feature.
  9. DO NOT introduce patterns or technologies that are inconsistent with the existing project without justification.
  10. DO NOT leave TODOs for functionality required by the current implementation.

---

## 8. Quality Priority

When making implementation decisions, prioritize the following aspects of code quality in order of importance:

1. **Correctness**: Ensure that the code behaves as expected and meets the requirements. Correctness is the foundation of code quality, as incorrect code can lead to bugs, security vulnerabilities, and other issues.
2. **Security**: Ensure that the code is secure and protected against common vulnerabilities and attacks. Security is critical to protect sensitive data and prevent unauthorized access.
3. **Maintainability**: Ensure that the code is easy to modify and maintain over time. Maintainable code is easier to understand, debug, and extend, which reduces technical debt and improves long-term productivity.
4. **Readability**: Ensure that the code is easy to read and understand. Readable code is easier to review, debug, and maintain, which improves collaboration and reduces the likelihood of introducing bugs.
5. **Testibility**: Ensure that the code is easy to test and includes appropriate unit tests, integration tests, and end-to-end tests. Testable code is easier to validate and ensures that changes do not introduce regressions or break existing functionality.
6. **Performance**: Ensure that the code is efficient and optimized for performance. While performance is important, it should not come at the expense of correctness, security, maintainability, readability, or testability.
7. **Brevity**: Ensure that the code is concise and avoids unnecessary complexity. Brevity can improve readability and maintainability, but it should not sacrifice clarity or introduce ambiguity.

Do not scrifice correctness, security, maintainability, readability, or testability for performance or brevity. Always prioritize the aspects of code quality in the order listed above to ensure that the code is of high quality and meets the needs of the project and its stakeholders.

---

## 9. Conclusion

- the goal of the skill is not make the code unnecessarily complex or difficult to understand, the goal is to produce code that is correct, secure, maintainable, readable, testable, performant, and consistand with the rest of project.

- Before considering an implementation complete, verify that:

  - The code solves the intended problem correctly.
  - The implementation follows the existing project architecture and conventions.
  - The code is readable and its purpose is clear from its structure and naming.
  - Responsibilities are properly separated.
  - Business logic is not duplicated or scattered unnecessarily.
  - Inputs are validated and errors are handled appropriately.
  - No unnecessary complexity or abstraction has been introduced.
  - No unused, duplicated, or debugging code remains.
  - Important behavior and edge cases are covered by tests.
  - Security requirements are respected.
  - Performance is reasonable for the expected use case.
  - The change does not introduce unintended side effects.
  - The implementation does not modify unrelated parts of the codebase.