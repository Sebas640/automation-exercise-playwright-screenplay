import type { Actor } from '../actor/Actor';
import type { Task } from '../actor/Activity';
import { Navigate } from '../interactions/Navigate';

/** Abre la página principal de Automation Exercise. */
export class OpenTheHomePage implements Task {
  static now(): OpenTheHomePage {
    return new OpenTheHomePage();
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Navigate.to('http://automationexercise.com'));
  }

  toString(): string {
    return 'abre la página principal';
  }
}
