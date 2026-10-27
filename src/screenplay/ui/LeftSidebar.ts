import { Target } from './Target';

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Los enlaces incluyen un icono o un contador antes del texto
 * (p. ej. " Women" o "(6) Polo"), por eso se compara la palabra final completa.
 */
const endsWithWord = (text: string) => new RegExp(`(^|\\s|\\))${escapeRegExp(text)}$`);

/** Barra lateral izquierda con categorías y marcas. */
export const LeftSidebar = {
  CATEGORY_TITLE: Target.the('el título Category').locatedBy((page) =>
    page.locator('.left-sidebar').getByRole('heading', { name: 'Category' }),
  ),
  CATEGORY_LINKS: Target.the('las categorías de la barra lateral').locatedBy((page) =>
    page.locator('#accordian .panel-title a'),
  ),
  category: (name: string) =>
    Target.the(`la categoría "${name}"`).locatedBy((page) =>
      page.locator('#accordian').getByRole('link', { name: endsWithWord(name) }),
    ),
  subCategory: (category: string, subCategory: string) =>
    Target.the(`la subcategoría "${subCategory}" de "${category}"`).locatedBy((page) =>
      // El id del panel desplegable coincide con el nombre de la categoría (#Women, #Men, #Kids)
      page.locator(`#accordian #${category}`).getByRole('link', { name: subCategory, exact: true }),
    ),

  BRANDS_TITLE: Target.the('el título Brands').locatedBy((page) =>
    page.locator('.brands_products').getByRole('heading', { name: 'Brands' }),
  ),
  BRAND_LINKS: Target.the('las marcas de la barra lateral').locatedBy((page) =>
    page.locator('.brands-name').getByRole('link'),
  ),
  brand: (name: string) =>
    Target.the(`la marca "${name}"`).locatedBy((page) =>
      page.locator('.brands-name').getByRole('link', { name: endsWithWord(name) }),
    ),
};
