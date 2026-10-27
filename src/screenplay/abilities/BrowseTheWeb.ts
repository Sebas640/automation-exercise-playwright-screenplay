import type { Locator, Page } from '@playwright/test';
import type { Actor } from '../actor/Actor';
import type { Ability } from './Ability';
import type { Target } from '../ui/Target';

/** Habilidad de navegar en la web usando una página de Playwright. */
export class BrowseTheWeb implements Ability {
  private constructor(public readonly page: Page) {}

  static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  /** Obtiene la habilidad desde el actor. */
  static as(actor: Actor): BrowseTheWeb {
    return actor.abilityTo(BrowseTheWeb);
  }

  /** Convierte un Target (descripción + localizador) en un Locator de Playwright. */
  find(target: Target): Locator {
    return target.resolveFor(this.page);
  }

  /**
   * Espera a que la página actual termine de cargar (evento "load").
   * El sitio registra con jQuery el comportamiento de menús desplegables y
   * formularios; si se interactúa antes, el clic no tiene efecto o el
   * formulario se envía de forma nativa y recarga la página.
   * Es una espera por condición, no una pausa fija.
   */
  async waitUntilPageIsReady(): Promise<void> {
    await this.page.waitForLoadState('load');
  }
}
