# Backend Tests

This directory contains all the unit and integration tests for the backend of the Safety Suggestions Reporting System.

## Structure

- **Unit Tests**: Focus on testing individual functions or modules in isolation.
- **Integration Tests**: Validate the interaction between multiple modules or components.

## Running Tests

To run the tests, navigate to the `backend` directory and execute the following command:

```bash
npm test
```

## Writing Tests

1. Place unit tests in files named `<module>.test.ts` within the same directory as the module being tested.
2. Place integration tests in the `tests/integration` subdirectory.

## Tools and Frameworks

- **Jest**: Used as the primary testing framework.
- **Supertest**: Used for testing HTTP endpoints.

## Best Practices

- Write descriptive test cases.
- Mock external dependencies where necessary.
- Ensure tests are idempotent and can run independently.

## Adding New Tests

1. Create a new test file in the appropriate directory.
2. Follow the naming convention `<module>.test.ts`.
3. Use Jest's `describe` and `it` blocks to structure your tests.

## Example

```typescript
import { myFunction } from '../src/utils/helpers';

describe('myFunction', () => {
  it('should return the correct value', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });
});
```

## Debugging Tests

- Use `console.log` or Jest's `--verbose` flag for detailed output.
- Check the logs in the `backend/logs` directory for additional debugging information.

---
Happy Testing!