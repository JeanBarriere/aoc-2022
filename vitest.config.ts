import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  envPrefix: 'AOC_',
  test: {
    globals: true,
    environment: 'node',
    reporters: 'verbose'
  }
});
