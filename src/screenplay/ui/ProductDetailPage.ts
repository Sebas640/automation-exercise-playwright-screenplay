import { Target } from './Target';

/** Detalle de un producto (/product_details/:id). */
export const ProductDetailPage = {
  INFORMATION: Target.the('la información del producto').locatedBy((page) =>
    page.locator('.product-information'),
  ),
  NAME: Target.the('el nombre del producto').locatedBy((page) =>
    page.locator('.product-information').getByRole('heading', { level: 2 }),
  ),
  PRICE: Target.the('el precio del producto').locatedBy((page) =>
    page.locator('.product-information').getByText(/^Rs\. \d+/),
  ),
  QUANTITY_INPUT: Target.the('el campo Quantity').locatedBy((page) => page.locator('#quantity')),
  ADD_TO_CART_BUTTON: Target.the('el botón "Add to cart"').locatedBy((page) =>
    page.locator('.product-information').getByRole('button', { name: 'Add to cart' }),
  ),
  VIEW_CART_LINK: Target.the('el enlace "View Cart" del mensaje de confirmación').locatedBy((page) =>
    page.locator('#cartModal').getByRole('link', { name: 'View Cart' }),
  ),

  // Reseñas
  WRITE_REVIEW_TITLE: Target.the('el título "Write Your Review"').locatedBy((page) =>
    page.getByRole('link', { name: 'Write Your Review' }),
  ),
  REVIEW_NAME_INPUT: Target.the('el campo Your Name').locatedBy((page) =>
    page.locator('#review-form').getByPlaceholder('Your Name', { exact: true }),
  ),
  REVIEW_EMAIL_INPUT: Target.the('el campo Email Address').locatedBy((page) =>
    page.locator('#review-form').getByPlaceholder('Email Address', { exact: true }),
  ),
  REVIEW_TEXT_INPUT: Target.the('el campo de reseña').locatedBy((page) =>
    page.locator('#review-form').getByPlaceholder('Add Review Here!', { exact: true }),
  ),
  SUBMIT_REVIEW_BUTTON: Target.the('el botón Submit de la reseña').locatedBy((page) =>
    page.locator('#review-form').getByRole('button', { name: 'Submit' }),
  ),
  // Se apunta a la alerta y no al contenedor #review-section: el contenedor
  // mide 0 px de alto (su hijo es flotante) aunque el mensaje se vea en pantalla.
  REVIEW_SUCCESS_MESSAGE: Target.the('el mensaje de reseña enviada').locatedBy((page) =>
    page.locator('#review-section .alert-success'),
  ),
};
