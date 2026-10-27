import type { Actor } from '../actor/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import type { Target } from '../ui/Target';
import type { Question } from './Question';

/** ¿Cuántos elementos visibles coinciden con el Target? */
export class Count implements Question<number> {
  private constructor(private readonly target: Target) {}

  static of(target: Target): Count {
    return new Count(target);
  }

  async answeredBy(actor: Actor): Promise<number> {
    return BrowseTheWeb.as(actor).find(this.target).filter({ visible: true }).count();
  }

  toString(): string {
    return `la cantidad de ${this.target}`;
  }
}
