import type { Page } from '@playwright/test';

/**
 * Dominios de publicidad que muestran anuncios encima de la página
 * y pueden tapar los elementos con los que interactúan las pruebas.
 */
export const AD_DOMAINS = [
  'googlesyndication',
  'doubleclick',
  'googleads',
  'adservice',
  'googletagservices',
  'fundingchoicesmessages',
];

const AD_REQUEST = new RegExp(AD_DOMAINS.map((d) => d.replace(/\./g, '\\.')).join('|'), 'i');

/** Aborta todas las solicitudes cuya URL pertenezca a un dominio de anuncios. */
export async function blockAds(page: Page): Promise<void> {
  await page.route(AD_REQUEST, (route) => route.abort());
}
