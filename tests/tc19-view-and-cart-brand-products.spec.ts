import { test, expect } from '../src/support/fixtures';
import { OpenTheHomePage } from '../src/screenplay/tasks/OpenTheHomePage';
import { GoTo } from '../src/screenplay/tasks/GoTo';
import { SelectBrand } from '../src/screenplay/tasks/SelectBrand';
import { CurrentUrl } from '../src/screenplay/questions/CurrentUrl';
import { Visibility } from '../src/screenplay/questions/Visibility';
import { Text } from '../src/screenplay/questions/Text';
import { Count } from '../src/screenplay/questions/Count';
import { LeftSidebar } from '../src/screenplay/ui/LeftSidebar';
import { ProductsPage } from '../src/screenplay/ui/ProductsPage';

test('Test Case 19: View & Cart Brand Products', async ({ actor }) => {
  // 1. Navigate to http://automationexercise.com
  await actor.attemptsTo(OpenTheHomePage.now());

  // 2. Click on 'Products' button
  await actor.attemptsTo(GoTo.theProducts());

  // 3. Verify that Brands are visible on left side bar
  await expect.poll(() => actor.asks(Visibility.of(LeftSidebar.BRANDS_TITLE))).toBe(true);
  await expect.poll(() => actor.asks(Count.of(LeftSidebar.BRAND_LINKS))).toBeGreaterThan(0);

  // 4. Click on any brand name
  await actor.attemptsTo(SelectBrand.named('Polo'));

  // 5. Verify that user is navigated to brand page and brand products are displayed
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toContain('/brand_products/Polo');
  await expect.poll(() => actor.asks(Text.of(ProductsPage.TITLE))).toBe('BRAND - POLO PRODUCTS');
  await expect.poll(() => actor.asks(Count.of(ProductsPage.PRODUCT_CARDS))).toBeGreaterThan(0);

  // 6. On left side bar, click on any other brand link
  await actor.attemptsTo(SelectBrand.named('H&M'));

  // 7. Verify that user is navigated to that brand page and can see products
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toContain('/brand_products/H&M');
  await expect.poll(() => actor.asks(Text.of(ProductsPage.TITLE))).toBe('BRAND - H&M PRODUCTS');
  await expect.poll(() => actor.asks(Count.of(ProductsPage.PRODUCT_CARDS))).toBeGreaterThan(0);
});
