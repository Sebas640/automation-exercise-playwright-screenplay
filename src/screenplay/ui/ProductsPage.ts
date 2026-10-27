import { Target } from './Target';

/**
 * Listados de productos: "All Products" (/products), y también las páginas
 * de categoría y de marca, que reutilizan la misma estructura.
 */
export const ProductsPage = {
  TITLE: Target.the('el título del listado de productos').locatedBy((page) =>
    page.locator('.features_items').getByRole('heading', { level: 2 }).first(),
  ),
  PRODUCT_CARDS: Target.the('las tarjetas de productos').locatedBy((page) =>
    page.locator('.features_items .product-image-wrapper'),
  ),
  FIRST_VIEW_PRODUCT_LINK: Target.the('el primer botón "View Product"').locatedBy((page) =>
    page.locator('.features_items').getByRole('link', { name: 'View Product' }).first(),
  ),
};
