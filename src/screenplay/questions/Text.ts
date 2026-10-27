import type { Actor } from '../actor/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import type { Target } from '../ui/Target';
import type { Question } from './Question';

/**
 * Texto que el usuario ve en el elemento (innerText, que respeta estilos
 * como text-transform: uppercase). Devuelve '' si el elemento aún no existe.
 */
export class Text implements Question<string> {
  private constructor(private readonly target: Target) {}

  static of(target: Target): Text {
    return new Text(target);
  }

  async answeredBy(actor: Actor): Promise<string> {
    const [first = ''] = await BrowseTheWeb.as(actor).find(this.target).allInnerTexts();
    return first.trim();
  }

  toString(): string {
    return `el texto de ${this.target}`;
  }
}
