import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // El servidor del sitio a veces deja de responder unos segundos (scripts e
  // imágenes propias quedan pendientes). Se usan pocos workers para no
  // saturarlo y 1 reintento: el reporte marca esos casos como "flaky", y un
  // fallo real (un resultado esperado que no se cumple) falla en ambos intentos.
  workers: 2,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://automationexercise.com',
    actionTimeout: 15_000,
    navigationTimeout: 60_000,
    // Evidencias solo cuando una prueba falla
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
