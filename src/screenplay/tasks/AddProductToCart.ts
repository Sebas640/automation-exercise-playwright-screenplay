import type { Actor } from '../actor/Actor';
import type { Task } from '../actor/Activity';
import { Click } from '../interactions/Click';
import { ProductDetailPage } from '../ui/ProductDetailPage';

/** Desde el detalle del producto, pulsa "Add to cart". */
export class AddProductToCart implements Task {
  static fromItsDetailPage(): AddProductToCart {
    return new AddProductToCart();
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(ProductDetailPage.ADD_TO_CART_BUTTON));
  }

  toString(): string {
    return 'agrega el producto al carrito';
  }
}
