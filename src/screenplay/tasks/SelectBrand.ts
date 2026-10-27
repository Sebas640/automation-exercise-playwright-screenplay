import type { Actor } from '../actor/Actor';
import type { Task } from '../actor/Activity';
import { Click } from '../interactions/Click';
import { LeftSidebar } from '../ui/LeftSidebar';

/** Selecciona una marca en la barra lateral. */
export class SelectBrand implements Task {
  private constructor(private readonly brand: string) {}

  static named(brand: string): SelectBrand {
    return new SelectBrand(brand);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(LeftSidebar.brand(this.brand)));
  }

  toString(): string {
    return `selecciona la marca ${this.brand}`;
  }
}
