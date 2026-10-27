import type { Actor } from '../actor/Actor';
import type { Interaction } from '../actor/Activity';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import type { Target } from '../ui/Target';

/** Escribe un valor en un campo, reemplazando su contenido. */
export class Enter implements Interaction {
  private constructor(
    private readonly value: string,
    private readonly target: Target,
  ) {}

  static theValue(value: string | number) {
    return {
      into: (target: Target) => new Enter(String(value), target),
    };
  }

  async performAs(actor: Actor): Promise<void> {
    const browser = BrowseTheWeb.as(actor);
    await browser.waitUntilPageIsReady();
    await browser.find(this.target).fill(this.value);
  }

  toString(): string {
    return `escribe "${this.value}" en ${this.target}`;
  }
}
