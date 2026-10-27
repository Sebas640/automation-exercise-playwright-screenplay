import { test, expect } from '../src/support/fixtures';
import { OpenTheHomePage } from '../src/screenplay/tasks/OpenTheHomePage';
import { GoTo } from '../src/screenplay/tasks/GoTo';
import { ViewProductDetails } from '../src/screenplay/tasks/ViewProductDetails';
import { FillInReview } from '../src/screenplay/tasks/FillInReview';
import { Click } from '../src/screenplay/interactions/Click';
import { CurrentUrl } from '../src/screenplay/questions/CurrentUrl';
import { Visibility } from '../src/screenplay/questions/Visibility';
import { Text } from '../src/screenplay/questions/Text';
import { Count } from '../src/screenplay/questions/Count';
import { ProductsPage } from '../src/screenplay/ui/ProductsPage';
import { ProductDetailPage } from '../src/screenplay/ui/ProductDetailPage';

test('Test Case 21: Add review on product', async ({ actor }) => {
  // 1. Navigate to http://automationexercise.com
  await actor.attemptsTo(OpenTheHomePage.now());

  // 2. Click on 'Products' button
  await actor.attemptsTo(GoTo.theProducts());

  // 3. Verify user is navigated to ALL PRODUCTS page successfully
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toBe('https://automationexercise.com/products');
  await expect.poll(() => actor.asks(Text.of(ProductsPage.TITLE))).toBe('ALL PRODUCTS');
  await expect.poll(() => actor.asks(Count.of(ProductsPage.PRODUCT_CARDS))).toBeGreaterThan(0);

  // 4. Click on 'View Product' button
  await actor.attemptsTo(ViewProductDetails.ofTheFirstProductInTheList());

  // 5. Verify 'Write Your Review' is visible
  await expect.poll(() => actor.asks(Visibility.of(ProductDetailPage.WRITE_REVIEW_TITLE))).toBe(true);

  // 6. Enter name, email and review
  await actor.attemptsTo(
    FillInReview.with({
      name: 'Estudiante QA',
      email: `qa.review.${Date.now()}@example.com`,
      text: 'Producto de buena calidad, llegó a tiempo y la talla es correcta.',
    }),
  );

  // 7. Click 'Submit' button
  await actor.attemptsTo(Click.on(ProductDetailPage.SUBMIT_REVIEW_BUTTON));

  // 8. Verify success message 'Thank you for your review.'
  await expect.poll(() => actor.asks(Visibility.of(ProductDetailPage.REVIEW_SUCCESS_MESSAGE))).toBe(true);
  await expect
    .poll(() => actor.asks(Text.of(ProductDetailPage.REVIEW_SUCCESS_MESSAGE)))
    .toBe('Thank you for your review.');
});
