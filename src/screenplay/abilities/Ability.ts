/** Marca de una habilidad que el actor puede tener. */
export interface Ability {}

/** Tipo (clase) de una habilidad; se usa para recuperarla desde el actor. */
export type AbilityType<T extends Ability> = abstract new (...args: never[]) => T;
