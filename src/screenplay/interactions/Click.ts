import type { Actor } from '../actor/Actor';
import type { Interaction } from '../actor/Activity';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import type { Target } from '../ui/Target';

/** Hace clic sobre un elemento. Playwright espera a que sea visible y accionable. */
export class Click implements Interaction {
  private constructor(private readonly target: Target) {}

  static on(target: Target): Click {
    return new Click(target);
  }

  async performAs(actor: Actor): Promise<void> {
    const browser = BrowseTheWeb.as(actor);
    await browser.waitUntilPageIsReady();
    await browser.find(this.target).click();
  }

  toString(): string {
    return `hace clic en ${this.target}`;
  }
}
