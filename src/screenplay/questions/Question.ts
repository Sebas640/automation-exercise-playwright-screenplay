import type { Actor } from '../actor/Actor';

/**
 * Una pregunta que el actor hace sobre el estado del sistema.
 * Devuelve un valor que la prueba compara con el resultado esperado.
 */
export interface Question<T> {
  answeredBy(actor: Actor): Promise<T>;
  toString(): string;
}
