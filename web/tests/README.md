# Web Tests

This directory contains all the test files for the web application of the Safety Suggestions Reporting System.

## Structure

- **Unit Tests**: Test individual components and utility functions.
- **Integration Tests**: Test interactions between multiple components or modules.
- **End-to-End Tests**: Simulate user interactions and test the application as a whole.

## Tools and Frameworks

- **Testing Library**: For unit and integration tests of React components.
- **Cypress**: For end-to-end testing.
- **Jest**: As the test runner and assertion library.

## Running Tests

To run the tests, navigate to the `web` directory and use the following commands:

### Unit and Integration Tests
```bash
npm run test
```

### End-to-End Tests
```bash
npm run test:e2e
```

## Writing Tests

1. **Unit Tests**:
   - Place unit tests in the same directory as the component being tested, with a `.test.tsx` suffix.
   - Example: `src/components/Button.test.tsx`.

2. **Integration Tests**:
   - Place integration tests in the `tests/integration` directory.
   - Example: `tests/integration/DashboardIntegration.test.tsx`.

3. **End-to-End Tests**:
   - Place end-to-end tests in the `tests/e2e` directory.
   - Example: `tests/e2e/LoginFlow.test.ts`.

## Best Practices

- Write descriptive test cases that clearly explain the purpose of the test.
- Use mock data and services to isolate the functionality being tested.
- Ensure tests are deterministic and do not rely on external factors like network or time.

## Debugging Tests

- Use the `--watch` flag with Jest to run tests interactively.
- For Cypress, use the interactive test runner to debug end-to-end tests.

## Additional Resources

- [React Testing Library Documentation](https://testing-library.com/docs/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)