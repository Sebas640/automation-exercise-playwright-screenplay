import { Target } from './Target';

const rowOf = (page: import('@playwright/test').Page, productName: string) =>
  page
    .locator('#cart_info_table tbody tr')
    .filter({ has: page.locator('.cart_description').getByRole('link', { name: productName, exact: true }) });

/** Carrito de compras (/view_cart). */
export const CartPage = {
  PRODUCT_ROWS: Target.the('los productos del carrito').locatedBy((page) =>
    page.locator('#cart_info_table tbody tr'),
  ),
  productRow: (productName: string) =>
    Target.the(`la fila del producto "${productName}" en el carrito`).locatedBy((page) =>
      rowOf(page, productName),
    ),
  quantityOf: (productName: string) =>
    Target.the(`la cantidad del producto "${productName}" en el carrito`).locatedBy((page) =>
      rowOf(page, productName).locator('.cart_quantity'),
    ),
};
