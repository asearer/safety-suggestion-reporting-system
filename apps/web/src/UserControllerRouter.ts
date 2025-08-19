/**
 * Client build placeholder for server-side router.
 * Prevents bundling errors if this module is imported on the client.
 */

const noopRouter = {
  get: () => noopRouter,
  post: () => noopRouter,
  put: () => noopRouter,
  delete: () => noopRouter,
  use: () => noopRouter,
};

export default noopRouter as unknown as {
  get: (...args: unknown[]) => unknown;
  post: (...args: unknown[]) => unknown;
  put: (...args: unknown[]) => unknown;
  delete: (...args: unknown[]) => unknown;
  use: (...args: unknown[]) => unknown;
};
