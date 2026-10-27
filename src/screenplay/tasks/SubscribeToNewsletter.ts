import type { Actor } from '../actor/Actor';
import type { Task } from '../actor/Activity';
import { Click } from '../interactions/Click';
import { Enter } from '../interactions/Enter';
import { Footer } from '../ui/Footer';

/** Escribe el correo en el pie de página y pulsa el botón de flecha. */
export class SubscribeToNewsletter implements Task {
  private constructor(private readonly email: string) {}

  static withEmail(email: string): SubscribeToNewsletter {
    return new SubscribeToNewsletter(email);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Enter.theValue(this.email).into(Footer.EMAIL_INPUT),
      Click.on(Footer.SUBSCRIBE_BUTTON),
    );
  }

  toString(): string {
    return `se suscribe al boletín con ${this.email}`;
  }
}
