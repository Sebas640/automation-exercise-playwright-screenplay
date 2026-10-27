import type { Locator, Page } from '@playwright/test';

/**
 * Un elemento de la interfaz con un nombre legible y la forma de localizarlo.
 * Los Targets viven en los archivos de ui/ y se usan desde Interactions y Questions.
 */
export class Target {
  private constructor(
    private readonly description: string,
    private readonly locate: (page: Page) => Locator,
  ) {}

  static the(description: string) {
    return {
      locatedBy: (locate: (page: Page) => Locator) => new Target(description, locate),
    };
  }

  resolveFor(page: Page): Locator {
    return this.locate(page);
  }

  toString(): string {
    return this.description;
  }
}
