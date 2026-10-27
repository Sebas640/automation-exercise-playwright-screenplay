import type { Actor } from '../actor/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import type { Target } from '../ui/Target';
import type { Question } from './Question';

/** Valor actual de un campo de formulario. */
export class InputValue implements Question<string> {
  private constructor(private readonly target: Target) {}

  static of(target: Target): InputValue {
    return new InputValue(target);
  }

  async answeredBy(actor: Actor): Promise<string> {
    return BrowseTheWeb.as(actor).find(this.target).inputValue();
  }

  toString(): string {
    return `el valor de ${this.target}`;
  }
}
