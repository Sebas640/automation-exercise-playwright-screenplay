import { Target } from './Target';

/** Menú superior, común a todas las páginas. */
export const Header = {
  LOGO: Target.the('el logo del sitio').locatedBy((page) =>
    page.locator('#header').getByRole('img', { name: 'Website for automation practice' }),
  ),
  HOME_LINK: Target.the('el botón Home').locatedBy((page) =>
    page.locator('#header').getByRole('link', { name: 'Home' }),
  ),
  PRODUCTS_LINK: Target.the('el botón Products').locatedBy((page) =>
    page.locator('#header').getByRole('link', { name: 'Products' }),
  ),
  CART_LINK: Target.the('el botón Cart').locatedBy((page) =>
    page.locator('#header').getByRole('link', { name: 'Cart' }),
  ),
};
