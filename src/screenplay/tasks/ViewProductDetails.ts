import type { Actor } from '../actor/Actor';
import type { Task } from '../actor/Activity';
import { Click } from '../interactions/Click';
import type { Target } from '../ui/Target';
import { HomePage } from '../ui/HomePage';
import { ProductsPage } from '../ui/ProductsPage';

/** Abre el detalle de un producto con su botón "View Product". */
export class ViewProductDetails implements Task {
  private constructor(private readonly viewProductLink: Target) {}

  static ofTheFirstProductOnHomePage(): ViewProductDetails {
    return new ViewProductDetails(HomePage.FIRST_VIEW_PRODUCT_LINK);
  }

  static ofTheFirstProductInTheList(): ViewProductDetails {
    return new ViewProductDetails(ProductsPage.FIRST_VIEW_PRODUCT_LINK);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(this.viewProductLink));
  }

  toString(): string {
    return `abre el detalle del producto con ${this.viewProductLink}`;
  }
}
