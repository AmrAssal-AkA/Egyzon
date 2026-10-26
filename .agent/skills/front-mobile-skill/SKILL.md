---
name: front-mobile-skill
description: Mobile-specific front-end development skill for React Native and Expo applications. Use when creating, modifying, reviewing, debugging, or refactoring mobile screens, components, navigation, gestures, forms, native APIs, platform-specific behavior, mobile UI, responsive layouts, performance, accessibility, or API integration. Use together with front-end-skill for general front-end principles.
---

# Front-End Skill for Mobile Applications

## overview

This skill provide mobile-specific front-end development practices for React Native and Expo applications. It should be used together with the general `front-end-skill` for general front-end principles. This skill covers mobile-specific topics such as mobile screens, components, navigation, gestures, forms, native APIs, platform-specific behavior, mobile UI, responsive layouts, performance, accessibility, and API integration.

---

## Technology Stack

- React Native
- Expo
- Expo Router
- Typescript
- nativewind

Follow the actual versions and dependencies in the project package.json file.

---

## React Native and Expo

- Use React Native Components insted of web DOM elements.
- Follow the existing project structure and conventions for React Native and Expo applications.
- Reuse existing components and styles when possible, and follow the DRY (Don't Repeat Yourself) principle.
- Avoid Platform-specific implementations unless necessary. Use cross-platform components and APIs when possible.
- Use Platform-specific code only when necessary, and keep it isolated in separate files or components.

Do not use:

- Web-specific libraries or APIs that are not compatible with React Native or Expo.
- Browser-specific features or APIs that are not available in React Native or Expo.
- Web-DOM elements or HTML tags that are not supported in React Native or Expo.

unless Project requirements explicitly require it.

---

## Expo

- profer Expo Apis when they provide the required functionality, as they are optimized for React Native and Expo applications.
- Check exsiting Expo Packages and libraries before introducing new native dependencies, as they may provide the required functionality without the need for additional native code.
- Follow the Project's Expo configuration and settings, and avoid making changes that may affect the build or deployment process.
- Avoid modifying native configuration unless required, as it may introduce compatibility issues with future Expo updates.
- Consider both iOS and Android behavior when implementing features, and test on both platforms to ensure consistent user experience.
- Use Expo's built-in tools and features for testing, debugging, and profiling React Native applications, such as Expo Go, Expo DevTools, and Expo CLI.

Before adding dependencies:

1. Check Whether Expo already provides the required functionality.
2. Check existing project dependencies and libraries for similar functionality.
3. Check Platform compatibility and support for the required functionality.
4. Consider Bundle and maintanance impact of adding new dependencies.

---

## Navigation

- Follow the existing Expo Router architecture and conventions for navigation in the project.
- Reuse existing layouts and navigation patterns when possible, and follow the DRY (Don't Repeat Yourself) principle.
- Keep navigation logic and state management separate from UI components, busuness logic, and use context or state management libraries when necessary.
- Use the appropriate navigation patterns for the specific use case, such as stack navigation, tab navigation, drawer navigation, or nested navigation.
- Do not intorduce new navigation libraries when the existing Expo Router provides the required functionality, unless Project requirements explicitly require it.
- Handle authenticated and unauthenticated navigation according to the existing project structure and conventions, and avoid introducing new authentication flows or patterns unless necessary.

---

## Mobile UI

Design interfaces for:

- small phone screens
- large phone screens
- tablets when supported

consider the following when designing mobile UI:

- safe area insets and device-specific UI elements (e.g., notches, status bars, home indicators)
- screen dimensions and aspect ratios for different devices
- Orientation changes and responsive layouts for different screen sizes
- Keyboard behavior and input methods for mobile devices
- Touch target sizes and spacing for interactive elements
- Scrolling behavior and performance for long lists or content
- loading indicators and feedback for asynchronous operations
- Empty states and error handling for mobile UI components
- Error messages and validation feedback for forms and inputs

Avoid assuming a specific screen size or resolution, and test the UI on multiple devices and screen sizes to ensure a consistent user experience.

---

## Safe Area

- Respect device safe area insets when designing mobile UI, and avoid placing important content or interactive elements in areas that may be obscured by device-specific UI elements (e.g., notches, status bars, home indicators).
- use the project's existing safe area handling mechanisms and components, such as `SafeAreaView` or `useSafeAreaInsets`, to ensure consistent behavior across different devices and screen sizes.
- Do not position important content using hardcoded values or assumptions about device dimensions, as this may lead to inconsistent behavior across different devices and screen sizes.
- Avoid using absolute positioning or fixed layouts that may not adapt to different screen sizes or orientations, and use responsive layouts and flexbox for mobile UI components.

---

## Keyboard Handling

For Forms:

- consider keyboard visibility and input focus when designing mobile UI, and avoid placing important content or interactive elements in areas that may be obscured by the keyboard.
- Prevent keyboard from covering important fields or actions by using appropriate layout techniques, such as `KeyboardAvoidingView`, `ScrollView`, or `FlatList` with keyboard-aware behavior.
- Handle scrolling appropriately when the keyboard is visible, and ensure that users can access all form fields and actions without obstruction.
- Use the project's existing keyboard handling mechanisms and components, such as `KeyboardAvoidingView` or `useKeyboard`, to ensure consistent behavior across different devices and screen sizes.
- Test Forms on both iOS and Android devices, as keyboard behavior may differ between platforms, and ensure that the UI adapts appropriately to different keyboard types and input methods.

---

## Touch interactions

- Ensure interactive elements have appropriate touch target sizes and spacing, and avoid placing interactive elements too close together, which may lead to accidental taps or gestures.
- Provide clear visual feedback for interactions, such as button presses, gestures, or form submissions, and avoid using subtle or ambiguous feedback that may confuse users.
- Avoid interactions that depend on hover or mouse events, as these are not applicable to touch-based devices, and use touch-friendly interactions instead.
- Consider Touch Behavior and Geasures instead of mouse events, and use appropriate touch gestures for navigation, scrolling, and other interactions.
- Handle geatures acording to the existing project structure and conventions, and avoid introducing new gesture patterns or behaviors unless necessary.

---

## Platform Differences

consider differences between:

- iOS
- Android

when behavior differs:

1. Determine whether the Platform-independent solution is exists.
2. Prefer shared implementation when possible, and avoid introducing platform-specific code unless necessary.
3. Use platform-specific code only when necessary, and keep it isolated in separate files or components.\

Do not duplicate entire screens unnecessarily to handle small platform differences.

---

## Styling

- Use nativewind for styling React Native components, and follow the existing project conventions and patterns for styling.
- Reuse existing styles and components when possible, and follow the DRY (Don't Repeat Yourself) principle.
- Follow the project's mobile design system and guidelines, and avoid introducing new styles or components that may conflict with the existing design.
- Avoid mixing multiple styling systems or approaches, and use a consistent styling approach throughout the project.
- Maintain consistent styling, typography, and theming across different screens and components, and avoid introducing inconsistent styles or themes that may confuse users.

---

## Mobile Accessibility

- Provide accessible labels and hints for interactive elements, such as buttons, links, and form fields, and avoid using ambiguous or unclear labels that may confuse users.
- Ensure controls have appropriate touch target sizes and spacing, and avoid placing interactive elements too close together, which may lead to accidental taps or gestures.
- Support screen readers and other assistive technologies, and avoid using visual cues or interactions that may not be accessible to all users.
- Don't rely solely on color to convey information or status, and provide alternative visual cues or text for users with color vision deficiencies.
- Provide clear feedback for validation and errors in forms and inputs, and avoid using subtle or ambiguous feedback that may confuse users.
- Consider dynamic text sizes wheere supported, and avoid using fixed font sizes that may not adapt to user preferences or accessibility settings.
- Follow React Native accessibility Apis and guidelines, and avoid using custom implementations that may not be compatible with assistive technologies.

---

## Permissions

when Using device capabilities such:

- Camera
- Location
- Notifications
- photos
- Microphone
- Contacts

consider the following:

- Require Permissions
- Permissions denied
- permissions granted
- permission changed
- permission differences
- user experience
- Privacy requirements

Never assume that permission have been grented, and always check for permission status before accessing device capabilities. Handle permission requests and denials gracefully, and provide clear explanations to users about why permissions are needed.

---

## Error and network handling

Mobile applications should account for unreliable network conditions.

Handle:

- Request timeouts
- Request failures
- Timeouts
- offline conditions
- Empty Responses
- Authentication expiration
- Retry behavior

Provide useful feedback to users when network errors occur, and avoid displaying generic or technical error messages that may confuse users. Implement appropriate retry mechanisms for failed requests, and consider caching or offline support for critical data when possible.

---

## Mobile Security

- Never embed private secrets or sensitive information in the mobile application code, and use secure storage mechanisms for sensitive data.
- Do not assume mobile applications code is secret, and avoid exposing sensitive information through logs, error messages, or other means.
- Do not rely on Client-side authorization or validation, and always validate user input and authentication on the server-side.
- Treat Api Responses as untrusted, and validate and sanitize data received from external sources before using it in the application.
- Use secure storage mechanisms when sesitive local data must be stored, and avoid storing sensitive information in plain text or insecure locations.
- Follow the project's authentication, authorization, and token-management practices, and avoid introducing new authentication flows or patterns that may compromise security.
- Request Only the device Permissions required by the application functionality, and avoid requesting unnecessary permissions that may compromise user privacy or security.

---

## Mobile Specific verfication

After implementation, verify the following:

1. Run formatting.
2. Run linting.
3. Run TypeScript type checking.
4. Run relevant tests.
5. Verify the affected screen.
6. Verify navigation.
7. Verify loading, empty, and error states.
8. Verify keyboard behavior for forms.
9. Verify safe-area behavior.
10. Verify iOS behavior when applicable.
11. Verify Android behavior when applicable.
12. Review the final diff.

Do not claim the implementation is complete without performing the applicable verification.
