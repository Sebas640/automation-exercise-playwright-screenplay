import { test } from '@playwright/test';
import type { Ability, AbilityType } from '../abilities/Ability';
import type { Activity } from './Activity';
import type { Question } from '../questions/Question';

/**
 * El Actor es quien ejecuta la prueba.
 * - Tiene habilidades (Abilities): whoCan(...)
 * - Realiza actividades (Tasks e Interactions): attemptsTo(...)
 * - Responde preguntas sobre el estado del sistema (Questions): asks(...)
 */
export class Actor {
  private readonly abilities = new Map<AbilityType<Ability>, Ability>();

  private constructor(public readonly name: string) {}

  static named(name: string): Actor {
    return new Actor(name);
  }

  whoCan(...abilities: Ability[]): this {
    for (const ability of abilities) {
      this.abilities.set(ability.constructor as AbilityType<Ability>, ability);
    }
    return this;
  }

  abilityTo<T extends Ability>(type: AbilityType<T>): T {
    const ability = this.abilities.get(type);
    if (!ability) {
      throw new Error(`${this.name} no tiene la habilidad ${type.name}`);
    }
    return ability as T;
  }

  /** Ejecuta cada actividad en orden; cada una aparece como un paso en el reporte HTML. */
  async attemptsTo(...activities: Activity[]): Promise<void> {
    for (const activity of activities) {
      await test.step(`${this.name} ${activity.toString()}`, () => activity.performAs(this));
    }
  }

  async asks<T>(question: Question<T>): Promise<T> {
    return question.answeredBy(this);
  }
}
