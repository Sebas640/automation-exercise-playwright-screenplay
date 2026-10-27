import type { Actor } from '../actor/Actor';
import type { Task } from '../actor/Activity';
import { Click } from '../interactions/Click';
import { Header } from '../ui/Header';
import type { Target } from '../ui/Target';

/** Navega a una sección del sitio usando el menú superior. */
export class GoTo implements Task {
  private constructor(
    private readonly section: string,
    private readonly menuLink: Target,
  ) {}

  static theCart(): GoTo {
    return new GoTo('el carrito', Header.CART_LINK);
  }

  static theProducts(): GoTo {
    return new GoTo('los productos', Header.PRODUCTS_LINK);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(this.menuLink));
  }

  toString(): string {
    return `va a ${this.section} desde el menú`;
  }
}
