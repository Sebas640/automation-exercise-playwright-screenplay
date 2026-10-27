import type { Actor } from '../actor/Actor';
import type { Task } from '../actor/Activity';
import { Enter } from '../interactions/Enter';
import { ProductDetailPage } from '../ui/ProductDetailPage';

/** Cambia la cantidad en el detalle del producto. */
export class SetProductQuantity implements Task {
  private constructor(private readonly quantity: number) {}

  static to(quantity: number): SetProductQuantity {
    return new SetProductQuantity(quantity);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Enter.theValue(this.quantity).into(ProductDetailPage.QUANTITY_INPUT));
  }

  toString(): string {
    return `aumenta la cantidad a ${this.quantity}`;
  }
}
