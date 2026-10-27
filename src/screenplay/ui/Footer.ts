import { Target } from './Target';

/** Pie de página con el formulario de suscripción. */
export const Footer = {
  SECTION: Target.the('el pie de página').locatedBy((page) => page.locator('#footer')),
  SUBSCRIPTION_TITLE: Target.the('el título de suscripción').locatedBy((page) =>
    page.locator('#footer').getByRole('heading', { name: 'Subscription' }),
  ),
  EMAIL_INPUT: Target.the('el campo de correo de suscripción').locatedBy((page) =>
    page.locator('#footer').getByPlaceholder('Your email address'),
  ),
  SUBSCRIBE_BUTTON: Target.the('el botón de flecha de suscripción').locatedBy((page) =>
    page.locator('#subscribe'),
  ),
  SUCCESS_MESSAGE: Target.the('el mensaje de suscripción exitosa').locatedBy((page) =>
    page.locator('#success-subscribe'),
  ),
};
