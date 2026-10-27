import { test as base, expect } from '@playwright/test';
import { Actor } from '../screenplay/actor/Actor';
import { BrowseTheWeb } from '../screenplay/abilities/BrowseTheWeb';
import { blockAds } from './ad-blocker';

type ScreenplayFixtures = {
  /** Actor principal de las pruebas, ya equipado con la habilidad de navegar. */
  actor: Actor;
};

/**
 * Punto central de configuración de las pruebas:
 * - Sobrescribe la fixture `page` para bloquear anuncios en todas las pruebas.
 * - Crea el actor con la habilidad BrowseTheWeb.
 */
export const test = base.extend<ScreenplayFixtures>({
  page: async ({ page }, use) => {
    await blockAds(page);
    await use(page);
  },

  actor: async ({ page }, use) => {
    await use(Actor.named('Cliente').whoCan(BrowseTheWeb.using(page)));
  },
});

export { expect };
