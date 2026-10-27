import type { Actor } from '../actor/Actor';
import type { Interaction } from '../actor/Activity';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import type { Target } from '../ui/Target';

/** Desplaza la página hasta que el elemento quede a la vista. */
export class Scroll implements Interaction {
  private constructor(private readonly target: Target) {}

  static to(target: Target): Scroll {
    return new Scroll(target);
  }

  async performAs(actor: Actor): Promise<void> {
    const browser = BrowseTheWeb.as(actor);
    await browser.waitUntilPageIsReady();
    await browser.find(this.target).scrollIntoViewIfNeeded();
  }

  toString(): string {
    return `se desplaza hasta ${this.target}`;
  }
}
