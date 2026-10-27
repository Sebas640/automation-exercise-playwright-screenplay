import type { Actor } from '../actor/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import type { Question } from './Question';

/** URL actual de la página (decodificada, para comparar nombres con espacios o "&"). */
export class CurrentUrl implements Question<string> {
  static ofThePage(): CurrentUrl {
    return new CurrentUrl();
  }

  async answeredBy(actor: Actor): Promise<string> {
    return decodeURIComponent(BrowseTheWeb.as(actor).page.url());
  }

  toString(): string {
    return 'la URL actual';
  }
}
