import type { Actor } from '../actor/Actor';
import type { Interaction } from '../actor/Activity';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/** Abre una URL (relativa a baseURL o absoluta). */
export class Navigate implements Interaction {
  private constructor(private readonly url: string) {}

  static to(url: string): Navigate {
    return new Navigate(url);
  }

  async performAs(actor: Actor): Promise<void> {
    await BrowseTheWeb.as(actor).page.goto(this.url);
  }

  toString(): string {
    return `navega a ${this.url}`;
  }
}
