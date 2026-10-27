import { Target } from './Target';

/** Página principal (/). */
export const HomePage = {
  SLIDER: Target.the('el carrusel de la página principal').locatedBy((page) =>
    page.locator('#slider-carousel'),
  ),
  FEATURES_TITLE: Target.the('el título "Features Items"').locatedBy((page) =>
    page.getByRole('heading', { name: 'Features Items' }),
  ),
  VIEW_PRODUCT_LINKS: Target.the('los enlaces "View Product"').locatedBy((page) =>
    page.locator('.features_items').getByRole('link', { name: 'View Product' }),
  ),
  FIRST_VIEW_PRODUCT_LINK: Target.the('el primer enlace "View Product"').locatedBy((page) =>
    page.locator('.features_items').getByRole('link', { name: 'View Product' }).first(),
  ),
};
