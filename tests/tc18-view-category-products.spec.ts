import { test, expect } from '../src/support/fixtures';
import { OpenTheHomePage } from '../src/screenplay/tasks/OpenTheHomePage';
import { BrowseCategory } from '../src/screenplay/tasks/BrowseCategory';
import { CurrentUrl } from '../src/screenplay/questions/CurrentUrl';
import { Visibility } from '../src/screenplay/questions/Visibility';
import { Text } from '../src/screenplay/questions/Text';
import { Count } from '../src/screenplay/questions/Count';
import { LeftSidebar } from '../src/screenplay/ui/LeftSidebar';
import { ProductsPage } from '../src/screenplay/ui/ProductsPage';

test('Test Case 18: View Category Products', async ({ actor }) => {
  // 1. Navigate to http://automationexercise.com
  await actor.attemptsTo(OpenTheHomePage.now());

  // 2. Verify that categories are visible on left side bar
  await expect.poll(() => actor.asks(Visibility.of(LeftSidebar.CATEGORY_TITLE))).toBe(true);
  for (const category of ['Women', 'Men', 'Kids']) {
    await expect.poll(() => actor.asks(Visibility.of(LeftSidebar.category(category)))).toBe(true);
  }

  // 3. Click on 'Women' category
  // 4. Click on the 'Tops' link under 'Women' category
  await actor.attemptsTo(BrowseCategory.named('Women').withSubCategory('Tops'));

  // 5. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toContain('/category_products/');
  await expect.poll(() => actor.asks(Text.of(ProductsPage.TITLE))).toBe('WOMEN - TOPS PRODUCTS');
  await expect.poll(() => actor.asks(Count.of(ProductsPage.PRODUCT_CARDS))).toBeGreaterThan(0);

  // 6. On left side bar, click on any sub-category link of 'Men' category
  const urlOfWomenTops = await actor.asks(CurrentUrl.ofThePage());
  await actor.attemptsTo(BrowseCategory.named('Men').withSubCategory('Tshirts'));

  // 7. Verify that user is navigated to that category page
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).not.toBe(urlOfWomenTops);
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toContain('/category_products/');
  await expect.poll(() => actor.asks(Text.of(ProductsPage.TITLE))).toBe('MEN - TSHIRTS PRODUCTS');
  await expect.poll(() => actor.asks(Count.of(ProductsPage.PRODUCT_CARDS))).toBeGreaterThan(0);
});
