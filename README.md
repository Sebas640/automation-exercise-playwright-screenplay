# Automatización de pruebas web: Automation Exercise (Playwright + Screenplay)

Proyecto académico de **Aseguramiento de la Calidad del Software**. Automatiza 5 casos de prueba del sitio
[automationexercise.com](https://automationexercise.com) con **Playwright Test** y **TypeScript**, usando el
patrón de diseño **Screenplay** implementado dentro del proyecto (sin Serenity/JS).

## Objetivo

- Verificar de forma automática y repetible funciones clave de una tienda en línea: suscripción, carrito,
  categorías, marcas y reseñas de productos.
- Organizar el código con el patrón Screenplay para que las pruebas se lean como una historia de usuario
  y sea fácil mantenerlas.
- Obtener evidencia de cada ejecución: reporte HTML, y captura de pantalla y video cuando una prueba falla.

## El patrón Screenplay

Screenplay describe una prueba como **un actor que tiene habilidades, realiza tareas y hace preguntas**.

| Concepto | Qué es | Dónde está en el proyecto |
|---|---|---|
| **Actor** | Quien ejecuta la prueba (el usuario "Cliente"). | `src/screenplay/actor/Actor.ts` |
| **Abilities** | Lo que el actor puede hacer. Aquí: navegar con un navegador (`BrowseTheWeb`, que guarda la `page` de Playwright). | `src/screenplay/abilities/` |
| **Interactions** | Acciones básicas sobre la página: navegar, hacer clic, escribir, desplazarse. | `src/screenplay/interactions/` |
| **Tasks** | Acciones de negocio, formadas por interacciones: suscribirse, ver un producto, elegir una marca... | `src/screenplay/tasks/` |
| **Questions** | Lo que el actor consulta para verificar: si algo es visible, un texto, una cantidad, la URL. | `src/screenplay/questions/` |
| **UI / Targets** | Localizadores de la interfaz, separados por página, cada uno con un nombre legible. | `src/screenplay/ui/` |

### Cómo se aplicó

```
Actor ──tiene──> Ability (BrowseTheWeb → page)
  │
  ├── attemptsTo(Task...) ──> Task ──> Interaction ──> Target (ui/) ──> Locator de Playwright
  │
  └── asks(Question) ──> valor (texto, visible, URL...) ──> expect.poll(...) en la prueba
```

- El actor se crea en una **fixture** (`src/support/fixtures.ts`) con la habilidad `BrowseTheWeb`.
- `actor.attemptsTo(...)` ejecuta cada actividad dentro de un `test.step`, así el reporte HTML muestra
  pasos legibles como *"Cliente se suscribe al boletín con qa...@example.com"*.
- Las verificaciones usan `expect.poll(() => actor.asks(Pregunta))`, que reintenta hasta que se cumpla el
  resultado esperado o se acabe el tiempo. **No hay esperas fijas (sleep).**
- Las Interactions esperan a que la página termine de cargar (`waitForLoadState('load')`) antes de
  actuar, porque el sitio activa sus menús desplegables y formularios con jQuery al cargar.

Ejemplo (Test Case 11):

```ts
await actor.attemptsTo(OpenTheHomePage.now());
await actor.attemptsTo(GoTo.theCart());
await actor.attemptsTo(Scroll.to(Footer.SECTION));
await expect.poll(() => actor.asks(Text.of(Footer.SUBSCRIPTION_TITLE))).toBe('SUBSCRIPTION');
await actor.attemptsTo(SubscribeToNewsletter.withEmail('qa@example.com'));
await expect.poll(() => actor.asks(Text.of(Footer.SUCCESS_MESSAGE)))
  .toBe('You have been successfully subscribed!');
```

### Localizadores

Se priorizan localizadores estables: roles accesibles (`getByRole`), textos visibles, placeholders e
identificadores propios del sitio (`#subscribe`, `#quantity`, `#review-form`). El sitio no usa atributos
`data-qa` en las páginas de estos casos (solo en login y registro).

### Bloqueo de anuncios

El sitio muestra anuncios que tapan la página. En `src/support/ad-blocker.ts` se bloquean con
`page.route` las solicitudes a dominios de publicidad (googlesyndication, doubleclick, googleads,
adservice, googletagservices, fundingchoicesmessages). Se aplica **en un solo lugar**: la fixture `page`
de `src/support/fixtures.ts`, que usan todas las pruebas.

## Estructura de carpetas

```
automation-exercise-playwright/
├── playwright.config.ts        # Chromium, reporte HTML, captura y video al fallar
├── package.json
├── tsconfig.json
├── src/
│   ├── screenplay/
│   │   ├── actor/              # Actor y contratos Activity / Task / Interaction
│   │   ├── abilities/          # Ability, BrowseTheWeb
│   │   ├── interactions/       # Navigate, Click, Enter, Scroll
│   │   ├── tasks/              # OpenTheHomePage, GoTo, SubscribeToNewsletter, ViewProductDetails,
│   │   │                       # SetProductQuantity, AddProductToCart, BrowseCategory, SelectBrand, FillInReview
│   │   ├── questions/          # Visibility, Text, Count, CurrentUrl, InputValue
│   │   └── ui/                 # Target y localizadores: Header, HomePage, Footer, ProductsPage,
│   │                           # ProductDetailPage, CartPage, LeftSidebar
│   └── support/
│       ├── ad-blocker.ts       # Bloqueo centralizado de anuncios
│       └── fixtures.ts         # Fixtures: page con bloqueo de anuncios y actor
└── tests/                      # Un archivo por caso de prueba
    ├── tc11-subscription-in-cart.spec.ts
    ├── tc13-product-quantity-in-cart.spec.ts
    ├── tc18-view-category-products.spec.ts
    ├── tc19-view-and-cart-brand-products.spec.ts
    └── tc21-add-review-on-product.spec.ts
```

## Instalación

Requisitos: [Node.js](https://nodejs.org) 18 o superior y Git.

```bash
git clone https://github.com/Sebas640/automation-exercise-playwright-screenplay.git
cd automation-exercise-playwright-screenplay
npm install
npx playwright install chromium
```

## Ejecución

| Comando | Qué hace |
|---|---|
| `npm test` | Ejecuta las 5 pruebas en Chromium (modo sin interfaz). |
| `npm run test:headed` | Ejecuta las pruebas mostrando el navegador. |
| `npx playwright test tests/tc13-product-quantity-in-cart.spec.ts` | Ejecuta un solo caso. |
| `npm run report` | Abre el reporte HTML de la última ejecución. |
| `npm run typecheck` | Revisa los tipos de TypeScript. |

Evidencias:

- **Reporte HTML:** `playwright-report/index.html`.
- **Al fallar una prueba:** captura de pantalla, video y traza en `test-results/` (también enlazados
  desde el reporte HTML).

## Casos de prueba automatizados

| # | Caso | Archivo | Qué verifica |
|---|---|---|---|
| 11 | Verify Subscription in Cart page | `tests/tc11-subscription-in-cart.spec.ts` | Desde el carrito, el pie muestra `SUBSCRIPTION` y al suscribirse aparece `You have been successfully subscribed!`. |
| 13 | Verify Product quantity in Cart | `tests/tc13-product-quantity-in-cart.spec.ts` | Un producto agregado con cantidad 4 aparece en el carrito con cantidad exacta 4. |
| 18 | View Category Products | `tests/tc18-view-category-products.spec.ts` | Las categorías son visibles; Women > Tops muestra `WOMEN - TOPS PRODUCTS`; Men > Tshirts lleva a su página. |
| 19 | View & Cart Brand Products | `tests/tc19-view-and-cart-brand-products.spec.ts` | Las marcas son visibles; Polo y luego H&M llevan a su página con productos. |
| 21 | Add review on product | `tests/tc21-add-review-on-product.spec.ts` | Se llega a ALL PRODUCTS, se escribe una reseña y aparece `Thank you for your review.` |

Cada archivo de prueba conserva como comentarios los pasos originales del caso, para comparar
fácilmente cada paso con su código.
