import { test, expect } from '../src/support/fixtures';
import { OpenTheHomePage } from '../src/screenplay/tasks/OpenTheHomePage';
import { GoTo } from '../src/screenplay/tasks/GoTo';
import { SubscribeToNewsletter } from '../src/screenplay/tasks/SubscribeToNewsletter';
import { Scroll } from '../src/screenplay/interactions/Scroll';
import { CurrentUrl } from '../src/screenplay/questions/CurrentUrl';
import { Visibility } from '../src/screenplay/questions/Visibility';
import { Text } from '../src/screenplay/questions/Text';
import { HomePage } from '../src/screenplay/ui/HomePage';
import { Footer } from '../src/screenplay/ui/Footer';

test('Test Case 11: Verify Subscription in Cart page', async ({ actor }) => {
  // 1. Navigate to http://automationexercise.com
  await actor.attemptsTo(OpenTheHomePage.now());

  // 2. Verify that home page is visible successfully
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toBe('https://automationexercise.com/');
  await expect.poll(() => actor.asks(Visibility.of(HomePage.SLIDER))).toBe(true);

  // 3. Click 'Cart' button
  await actor.attemptsTo(GoTo.theCart());
  await expect.poll(() => actor.asks(CurrentUrl.ofThePage())).toContain('/view_cart');

  // 4. Scroll down to footer
  await actor.attemptsTo(Scroll.to(Footer.SECTION));

  // 5. Verify text 'SUBSCRIPTION'
  await expect.poll(() => actor.asks(Text.of(Footer.SUBSCRIPTION_TITLE))).toBe('SUBSCRIPTION');

  // 6. Enter email address in input and click arrow button
  await actor.attemptsTo(SubscribeToNewsletter.withEmail(`qa.cart.${Date.now()}@example.com`));

  // 7. Verify success message 'You have been successfully subscribed!' is visible
  await expect.poll(() => actor.asks(Visibility.of(Footer.SUCCESS_MESSAGE))).toBe(true);
  await expect
    .poll(() => actor.asks(Text.of(Footer.SUCCESS_MESSAGE)))
    .toBe('You have been successfully subscribed!');
});
