import { test, expect } from '../src/support/fixtures';
import { OpenTheHomePage } from '../src/screenplay/tasks/OpenTheHomePage';
import { ViewProductDetails } from '../src/screenplay/tasks/ViewProductDetails';
import { SetProductQuantity } from '../src/screenplay/tasks/SetProductQuantity';
import { AddProductToCart } from '../src/screenplay/tasks/AddProductToCart';
import { Click } from '../src/screenplay/interactions/Click';
import { CurrentUrl } from '../src/screenplay/questions/CurrentUrl';
import { Visibility } from '../src/screenplay/questions/Visibility';
import { Text } from '../src/screenplay/questions/Text';
import { InputValue } from '../src/screenplay/questions/InputValue';
import { HomePage } from '../src/screenplay/ui/HomePage';
import { ProductDetailPage } from '../src/screenplay/ui/ProductDetailPage';
import { CartPage } from '../src/screenplay/ui/CartPage';

test('Test Case 13: Verify Product quantity in Cart', async ({ actor }) => {
  const quantity = 4;

  // 1. Navigate to http://automationexercise.com
  await actor.attemptsTo(OpenTheHomePage.now());

  // 2. Verify that home page is visible successfully
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toBe('https://automationexercise.com/');
  await expect.poll(() => actor.asks(Visibility.of(HomePage.SLIDER))).toBe(true);

  // 3. Click 'View Product' for any product on home page
  await actor.attemptsTo(ViewProductDetails.ofTheFirstProductOnHomePage());

  // 4. Verify product detail is opened
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toMatch(/\/product_details\/\d+$/);
  await expect.poll(() => actor.asks(Visibility.of(ProductDetailPage.INFORMATION))).toBe(true);
  await expect.poll(() => actor.asks(Text.of(ProductDetailPage.NAME))).not.toBe('');
  const productName = await actor.asks(Text.of(ProductDetailPage.NAME));

  // 5. Increase quantity to 4
  await actor.attemptsTo(SetProductQuantity.to(quantity));
  await expect.poll(() => actor.asks(InputValue.of(ProductDetailPage.QUANTITY_INPUT))).toBe(String(quantity));

  // 6. Click 'Add to cart' button
  await actor.attemptsTo(AddProductToCart.fromItsDetailPage());

  // 7. Click 'View Cart' button
  await actor.attemptsTo(Click.on(ProductDetailPage.VIEW_CART_LINK));

  // 8. Verify that product is displayed in cart page with exact quantity
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toContain('/view_cart');
  await expect.poll(() => actor.asks(Visibility.of(CartPage.productRow(productName)))).toBe(true);
  await expect.poll(() => actor.asks(Text.of(CartPage.quantityOf(productName)))).toBe(String(quantity));
});
