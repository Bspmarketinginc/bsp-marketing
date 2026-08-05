# Valento

Website for the clothing brand **Valento**. Static HTML, CSS and vanilla JS — no
build step, no dependencies. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000/valento/
```

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, featured edit, brand story, standards, new arrivals, newsletter |
| `shop.html` | Full collection with category filters, sorting and `?category=` deep links |
| `product.html` | Product detail, driven by `?id=<product-id>` — sizes, add to bag, related pieces |
| `about.html` | Brand story, materials, timeline |
| `contact.html` | Contact form plus shipping, returns, repairs and sizing info |
| `assets/styles.css` | All styling |
| `assets/app.js` | Catalog, generated artwork, cart, nav, forms |

## Editing the catalog

Products live in one array — `CATALOG` at the top of `assets/app.js`. Every page
renders from it, so adding a piece there puts it in the shop grid, the filters,
related products and the cart automatically. Each entry needs:

```js
{
  id: 'kebab-case-id',      // used in product.html?id=...
  name: 'Display Name',
  category: 'Outerwear',    // must be one of CATEGORIES
  shape: 'coat',            // artwork silhouette: coat, shirt, knit, trouser, dress, bag, scarf
  price: 890,               // whole USD
  badge: 'New',             // '' for none
  tones: ['#cfc4b2', '#8f8878'],  // light + dark gradient tones
  blurb: '…', materials: '…', care: '…'
}
```

Accessories get a single "One Size" option; everything else gets XS–XL. That rule
is `sizesFor()` in `assets/app.js`.

## Product imagery

There is no photography yet, so `artwork()` generates an SVG garment silhouette
over a tonal gradient for each product. When real photos arrive, replace the
`artwork()` calls with `<img>` tags — nothing else depends on it.

## Not yet connected

Two things are deliberately inert until a backend exists, and both say so in the
UI rather than pretending to work:

- **Forms** (newsletter, contact). Add a `data-endpoint` attribute with a form
  handler URL — e.g. `data-endpoint="https://formspree.io/f/xxxxxxx"`, matching
  the approach used elsewhere in this repo — and `initForms()` will POST to it.
  Without one, the form validates and reports that nothing was sent.
- **Checkout.** The bag persists to `localStorage` and totals correctly, but the
  Checkout button reports that checkout isn't connected. Wire it to a payment
  provider when one is chosen.
