import type { Actor } from '../actor/Actor';
import type { Task } from '../actor/Activity';
import { Click } from '../interactions/Click';
import { LeftSidebar } from '../ui/LeftSidebar';

/** En la barra lateral: despliega una categoría y entra a una de sus subcategorías. */
export class BrowseCategory implements Task {
  private constructor(
    private readonly category: string,
    private readonly subCategory: string,
  ) {}

  static named(category: string) {
    return {
      withSubCategory: (subCategory: string) => new BrowseCategory(category, subCategory),
    };
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(LeftSidebar.category(this.category)),
      Click.on(LeftSidebar.subCategory(this.category, this.subCategory)),
    );
  }

  toString(): string {
    return `navega a la categoría ${this.category} > ${this.subCategory}`;
  }
}
