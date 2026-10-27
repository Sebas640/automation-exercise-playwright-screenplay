import type { Actor } from '../actor/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import type { Target } from '../ui/Target';
import type { Question } from './Question';

/** ¿El elemento está visible en este momento? */
export class Visibility implements Question<boolean> {
  private constructor(private readonly target: Target) {}

  static of(target: Target): Visibility {
    return new Visibility(target);
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    return BrowseTheWeb.as(actor).find(this.target).first().isVisible();
  }

  toString(): string {
    return `la visibilidad de ${this.target}`;
  }
}
