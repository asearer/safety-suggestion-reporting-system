# Mobile Tests

This directory contains all the test files for the mobile application of the Safety Suggestions Reporting System. The tests are designed to ensure the reliability, functionality, and performance of the mobile app.

## Structure

- **Unit Tests**: Test individual components and utility functions.
- **Integration Tests**: Test the interaction between multiple components or services.
- **End-to-End Tests**: Simulate real user interactions to ensure the app works as expected.

## Tools and Frameworks

- **Testing Library**: For unit and integration tests.
- **Jest**: The primary test runner and assertion library.
- **Detox**: For end-to-end testing of the mobile app.

## Running Tests

1. **Unit and Integration Tests**:
   ```bash
   npm run test
   ```

2. **End-to-End Tests**:
   Ensure the emulator or physical device is set up and running, then execute:
   ```bash
   npm run e2e
   ```

## Writing Tests

- Place unit and integration tests in the same directory as the component or utility being tested, using the `.test.tsx` or `.test.ts` suffix.
- End-to-end tests should be placed in the `e2e` subdirectory.

## Best Practices

- Write descriptive test cases that clearly explain the purpose of the test.
- Mock external dependencies to isolate the functionality being tested.
- Ensure tests are deterministic and do not rely on external factors like network conditions.

## Troubleshooting

- If tests fail, check the logs for detailed error messages.
- Ensure all dependencies are installed and up-to-date.
- Verify that the emulator or device is properly configured for end-to-end tests.

---
By maintaining a robust test suite, we can ensure the mobile app remains reliable and user-friendly.