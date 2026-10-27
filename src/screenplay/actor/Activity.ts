import type { Actor } from './Actor';

/**
 * Algo que el actor puede hacer. Tanto las Tasks (acciones de negocio)
 * como las Interactions (acciones básicas sobre la página) son actividades.
 * toString() describe la actividad en lenguaje natural para el reporte.
 */
export interface Activity {
  performAs(actor: Actor): Promise<void>;
  toString(): string;
}

/** Acción básica sobre la página (clic, escribir, desplazarse...). */
export interface Interaction extends Activity {}

/** Acción de negocio compuesta por interacciones u otras tareas. */
export interface Task extends Activity {}
