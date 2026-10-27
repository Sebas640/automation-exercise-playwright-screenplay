/** Marca de una habilidad que el actor puede tener. */
export interface Ability {}

/** Clase de una habilidad; se usa para recuperarla desde el actor (ej. BrowseTheWeb). */
export type AbilityType<T extends Ability> = { readonly prototype: T; readonly name: string };
