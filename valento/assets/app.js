/* ==========================================================================
   VALENTO — shared behaviour: catalog, artwork, cart, nav, forms
   Vanilla JS, no build step. Loaded with `defer` on every page.
   ========================================================================== */

/* --- Catalog -------------------------------------------------------------
   Single source of truth for products. Prices are in whole USD.
   `tones` drives the generated artwork gradient (no photography yet).
   ------------------------------------------------------------------------- */

const CATALOG = [
  {
    id: 'marcella-wool-overcoat',
    name: 'Marcella Wool Overcoat',
    category: 'Outerwear',
    shape: 'coat',
    price: 890,
    badge: 'New',
    tones: ['#cfc4b2', '#8f8878'],
    blurb: 'A double-faced wool coat cut long and easy, with a soft shoulder that falls without padding.',
    materials: '80% virgin wool, 20% cashmere. Woven in Biella, Italy.',
    care: 'Dry clean only. Brush after wear; rest on a broad hanger.'
  },
  {
    id: 'sabbia-linen-shirt',
    name: 'Sabbia Linen Shirt',
    category: 'Shirts',
    shape: 'shirt',
    price: 180,
    badge: '',
    tones: ['#efe7d8', '#c9bda6'],
    blurb: 'Washed European linen with a relaxed body and a collar that sits well open or closed.',
    materials: '100% garment-washed linen, 165gsm.',
    care: 'Machine wash cold, line dry. Softens with every wash.'
  },
  {
    id: 'corso-pleated-trouser',
    name: 'Corso Pleated Trouser',
    category: 'Trousers',
    shape: 'trouser',
    price: 265,
    badge: '',
    tones: ['#b9ac96', '#7d7364'],
    blurb: 'A single-pleat trouser with a high rise and a straight leg that breaks once over the shoe.',
    materials: '68% wool, 30% viscose, 2% elastane.',
    care: 'Dry clean. Press pleats on low heat with a cloth.'
  },
  {
    id: 'nebbia-cashmere-knit',
    name: 'Nebbia Cashmere Knit',
    category: 'Knitwear',
    shape: 'knit',
    price: 420,
    badge: 'New',
    tones: ['#e2d6c4', '#a8977f'],
    blurb: 'Grade-A cashmere in a loose gauge, knit to hold its shape through years of wear.',
    materials: '100% grade-A Mongolian cashmere, 12-gauge.',
    care: 'Hand wash cool or dry clean. Dry flat, never hang.'
  },
  {
    id: 'vela-silk-slip-dress',
    name: 'Vela Silk Slip Dress',
    category: 'Dresses',
    shape: 'dress',
    price: 340,
    badge: '',
    tones: ['#d8cbc0', '#9b7f70'],
    blurb: 'Bias-cut sandwashed silk with a bare back and a hem that moves quietly.',
    materials: '100% sandwashed mulberry silk, 19 momme.',
    care: 'Dry clean. Store folded in the bag provided.'
  },
  {
    id: 'argento-leather-tote',
    name: 'Argento Leather Tote',
    category: 'Accessories',
    shape: 'bag',
    price: 520,
    badge: '',
    tones: ['#c3ab94', '#6f5a48'],
    blurb: 'Vegetable-tanned leather, unlined and unstructured, meant to slouch as it ages.',
    materials: 'Vegetable-tanned Tuscan leather, solid brass hardware.',
    care: 'Condition twice a year. Keep away from prolonged damp.'
  },
  {
    id: 'ponte-cotton-blazer',
    name: 'Ponte Cotton Blazer',
    category: 'Outerwear',
    shape: 'coat',
    price: 610,
    badge: '',
    tones: ['#c8bda9', '#7f7566'],
    blurb: 'An unlined cotton blazer with a half-canvas front — tailored, but built to be lived in.',
    materials: '100% Japanese cotton twill, horn buttons.',
    care: 'Dry clean. Steam rather than press.'
  },
  {
    id: 'riva-poplin-shirtdress',
    name: 'Riva Poplin Shirtdress',
    category: 'Dresses',
    shape: 'dress',
    price: 295,
    badge: '',
    tones: ['#e7e0d2', '#b0a693'],
    blurb: 'Crisp cotton poplin with a dropped shoulder and a belt you can wear or ignore.',
    materials: '100% long-staple cotton poplin, 120gsm.',
    care: 'Machine wash cold. Warm iron.'
  },
  {
    id: 'luce-merino-turtleneck',
    name: 'Luce Merino Turtleneck',
    category: 'Knitwear',
    shape: 'knit',
    price: 230,
    badge: '',
    tones: ['#d3c8b6', '#8e8271'],
    blurb: 'A fine-gauge merino turtleneck that layers flat under a coat and stands alone in spring.',
    materials: '100% extra-fine merino wool, 18.5 micron.',
    care: 'Machine wash wool cycle. Dry flat.'
  },
  {
    id: 'terra-wide-leg-jean',
    name: 'Terra Wide-Leg Jean',
    category: 'Trousers',
    shape: 'trouser',
    price: 210,
    badge: 'New',
    tones: ['#b6b2a8', '#6d6b66'],
    blurb: 'Rigid selvedge denim with a wide, clean leg. It will fade exactly where you fold it.',
    materials: '100% cotton selvedge denim, 13.5oz, woven in Okayama.',
    care: 'Wash sparingly, inside out, cold.'
  },
  {
    id: 'aria-cropped-cardigan',
    name: 'Aria Cropped Cardigan',
    category: 'Knitwear',
    shape: 'knit',
    price: 275,
    badge: '',
    tones: ['#e5dac9', '#a3907a'],
    blurb: 'A short, round-neck cardigan with mother-of-pearl buttons and a neat ribbed hem.',
    materials: '70% wool, 30% silk.',
    care: 'Hand wash cool. Dry flat.'
  },
  {
    id: 'notte-silk-scarf',
    name: 'Notte Silk Scarf',
    category: 'Accessories',
    shape: 'scarf',
    price: 145,
    badge: '',
    tones: ['#ddd0c2', '#8c7261'],
    blurb: 'A hand-rolled silk square, printed in three colourways from our archive drawings.',
    materials: '100% silk twill, hand-rolled edge. 90 × 90cm.',
    care: 'Dry clean only.'
  }
];

const CATEGORIES = ['All', 'Outerwear', 'Knitwear', 'Shirts', 'Trousers', 'Dresses', 'Accessories'];

const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const ONE_SIZE = ['One Size'];

const sizesFor = (product) =>
  product.category === 'Accessories' ? ONE_SIZE : APPAREL_SIZES;

const findProduct = (id) => CATALOG.find((p) => p.id === id);

const money = (n) => '$' + n.toLocaleString('en-US');

/* --- Generated artwork ---------------------------------------------------
   The brand has no photography yet, so each product renders as a garment
   silhouette over a tonal gradient. Swap `artwork()` for <img> tags once
   real shots exist — nothing else depends on it.
   ------------------------------------------------------------------------- */

const SILHOUETTES = {
  coat: 'M110,88 L190,88 L228,120 L236,250 L206,258 L212,332 L88,332 L94,258 L64,250 L72,120 Z',
  shirt: 'M112,92 L188,92 L222,118 L228,232 L200,240 L204,304 L96,304 L100,240 L72,232 L78,118 Z',
  knit: 'M108,96 L192,96 L232,124 L246,216 L214,228 L212,308 L88,308 L86,228 L54,216 L68,124 Z',
  trouser: 'M104,108 L196,108 L208,152 L192,334 L156,334 L150,212 L144,334 L108,334 L92,152 Z',
  dress: 'M114,94 L186,94 L204,128 L188,192 L234,334 L66,334 L112,192 L96,128 Z',
  bag: 'M92,168 L208,168 L220,318 L80,318 Z',
  scarf: 'M150,84 L232,214 L150,344 L68,214 Z'
};

const ACCENTS = {
  coat: '<path d="M150,88 L150,332 M150,96 L120,120 M150,96 L180,120" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>',
  shirt: '<path d="M150,92 L150,304 M132,92 L150,116 L168,92" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>',
  knit: '<path d="M124,96 Q150,116 176,96 M96,150 L96,300 M204,150 L204,300" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.35"/>',
  trouser: '<path d="M104,140 L196,140 M150,140 L150,212" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>',
  dress: '<path d="M114,94 Q150,118 186,94 M150,128 L150,334" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.35"/>',
  bag: '<path d="M116,168 Q150,96 184,168" fill="none" stroke="currentColor" stroke-width="4" opacity="0.6"/>',
  scarf: '<path d="M150,124 L206,214 L150,304 L94,214 Z" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>'
};

let artworkSeed = 0;

/**
 * Renders a product as an inline SVG string.
 * @param {object} product  entry from CATALOG
 * @param {number} variant  0-2, shifts the light source for gallery thumbs
 */
function artwork(product, variant = 0) {
  const uid = 'g' + (artworkSeed += 1);
  const [light, dark] = product.tones;
  const angles = [
    { x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
    { x1: '100%', y1: '0%', x2: '0%', y2: '100%' },
    { x1: '50%', y1: '0%', x2: '50%', y2: '100%' }
  ][variant % 3];

  return `
<svg viewBox="0 0 300 400" role="img" aria-label="${escapeAttr(product.name)}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg-${uid}" x1="${angles.x1}" y1="${angles.y1}" x2="${angles.x2}" y2="${angles.y2}">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </linearGradient>
    <linearGradient id="fg-${uid}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.5"/>
    </linearGradient>
  </defs>
  <rect width="300" height="400" fill="url(#bg-${uid})"/>
  <g color="${dark}">
    <path d="${SILHOUETTES[product.shape]}" fill="url(#fg-${uid})"/>
    ${ACCENTS[product.shape] || ''}
  </g>
</svg>`.trim();
}

const escapeAttr = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

/* --- Cart ----------------------------------------------------------------
   Lines are keyed by `${productId}::${size}` and persisted to localStorage.
   ------------------------------------------------------------------------- */

const CART_KEY = 'valento.cart.v1';

const Cart = {
  lines: [],

  load() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      // Drop anything that no longer matches a live product.
      this.lines = Array.isArray(parsed)
        ? parsed.filter((l) => l && findProduct(l.id) && Number(l.qty) > 0)
                .map((l) => ({ id: l.id, size: String(l.size), qty: Math.min(Number(l.qty), 99) }))
        : [];
    } catch {
      this.lines = [];
    }
  },

  save() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(this.lines));
    } catch {
      /* storage disabled (private mode) — cart stays in memory for this page */
    }
    renderCart();
  },

  add(id, size, qty = 1) {
    const existing = this.lines.find((l) => l.id === id && l.size === size);
    if (existing) existing.qty = Math.min(existing.qty + qty, 99);
    else this.lines.push({ id, size, qty });
    this.save();
  },

  setQty(index, qty) {
    if (!this.lines[index]) return;
    if (qty <= 0) this.lines.splice(index, 1);
    else this.lines[index].qty = Math.min(qty, 99);
    this.save();
  },

  remove(index) {
    this.lines.splice(index, 1);
    this.save();
  },

  get count() {
    return this.lines.reduce((n, l) => n + l.qty, 0);
  },

  get subtotal() {
    return this.lines.reduce((sum, l) => {
      const product = findProduct(l.id);
      return product ? sum + product.price * l.qty : sum;
    }, 0);
  }
};

function renderCart() {
  const badge = document.querySelector('[data-cart-count]');
  if (badge) {
    badge.textContent = Cart.count;
    badge.hidden = Cart.count === 0;
  }

  const body = document.querySelector('[data-cart-body]');
  const total = document.querySelector('[data-cart-total]');
  const checkout = document.querySelector('[data-checkout]');
  if (!body) return;

  if (!Cart.lines.length) {
    body.innerHTML = '<p class="empty-state">Your bag is empty.</p>';
  } else {
    body.innerHTML = Cart.lines.map((line, i) => {
      const product = findProduct(line.id);
      return `
        <div class="line">
          <div class="line-thumb">${artwork(product)}</div>
          <div>
            <div class="line-name">${escapeAttr(product.name)}</div>
            <div class="line-sub">Size ${escapeAttr(line.size)}</div>
            <div class="line-qty">
              <button type="button" data-qty="${i}" data-step="-1" aria-label="Decrease quantity">&minus;</button>
              <span>${line.qty}</span>
              <button type="button" data-qty="${i}" data-step="1" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="line-remove" data-remove="${i}">Remove</button>
          </div>
          <div class="line-price">${money(product.price * line.qty)}</div>
        </div>`;
    }).join('');
  }

  if (total) total.textContent = money(Cart.subtotal);
  if (checkout) checkout.disabled = Cart.lines.length === 0;
}

/* --- Cart drawer ---------------------------------------------------------- */

function openDrawer() {
  document.querySelector('[data-drawer]')?.classList.add('is-open');
  document.querySelector('[data-drawer-backdrop]')?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.querySelector('[data-drawer]')?.classList.remove('is-open');
  document.querySelector('[data-drawer-backdrop]')?.classList.remove('is-open');
  document.body.style.overflow = '';
}

let toastTimer;
function toast(message) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el.classList.add('is-open'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-open'), 2600);
}

/* --- Product card --------------------------------------------------------- */

function productCard(product) {
  return `
    <a class="card" href="product.html?id=${encodeURIComponent(product.id)}">
      <div class="card-media">
        ${artwork(product)}
        ${product.badge ? `<span class="card-tag">${escapeAttr(product.badge)}</span>` : ''}
      </div>
      <div class="card-name">${escapeAttr(product.name)}</div>
      <div class="card-meta">
        <span class="card-cat">${escapeAttr(product.category)}</span>
        <span class="card-price">${money(product.price)}</span>
      </div>
    </a>`;
}

/* --- Scroll reveal -------------------------------------------------------- */

function initReveal() {
  // Only pick up elements we haven't already observed, so this is safe to
  // call again after a page script injects more markup.
  const items = document.querySelectorAll('.reveal:not([data-observed])');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px' });

  items.forEach((el) => {
    el.dataset.observed = '1';
    io.observe(el);
  });
}

/* --- Forms ---------------------------------------------------------------
   No backend is wired up yet. Set data-endpoint on a form (e.g. a Formspree
   URL) and it will POST there; without one it validates and reports that
   submissions aren't connected, rather than silently pretending to send.
   ------------------------------------------------------------------------- */

function initForms() {
  document.querySelectorAll('form[data-form]').forEach((form) => {
    const note = form.querySelector('[data-note]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        if (note) {
          note.textContent = 'Thanks — this form isn’t connected to a mailbox yet, so nothing was sent.';
          note.classList.remove('is-ok');
        }
        return;
      }

      const button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      if (note) { note.textContent = 'Sending…'; note.classList.remove('is-ok'); }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        });
        if (!res.ok) throw new Error('Request failed with ' + res.status);
        form.reset();
        if (note) { note.textContent = 'Thank you — we’ll be in touch shortly.'; note.classList.add('is-ok'); }
      } catch {
        if (note) { note.textContent = 'Something went wrong. Please email hello@valento.com instead.'; note.classList.remove('is-ok'); }
      } finally {
        if (button) button.disabled = false;
      }
    });
  });
}

/* --- Boot ----------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Mark the current page in the nav.
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  // Mobile menu.
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Nav border once scrolled.
  const nav = document.querySelector('.nav');
  const onScroll = () => nav?.classList.toggle('is-stuck', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Cart wiring.
  Cart.load();
  renderCart();

  document.querySelector('[data-cart-open]')?.addEventListener('click', openDrawer);
  document.querySelector('[data-cart-close]')?.addEventListener('click', closeDrawer);
  document.querySelector('[data-drawer-backdrop]')?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  document.querySelector('[data-cart-body]')?.addEventListener('click', (e) => {
    const stepBtn = e.target.closest('[data-qty]');
    if (stepBtn) {
      const i = Number(stepBtn.dataset.qty);
      Cart.setQty(i, (Cart.lines[i]?.qty || 0) + Number(stepBtn.dataset.step));
      return;
    }
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) Cart.remove(Number(removeBtn.dataset.remove));
  });

  document.querySelector('[data-checkout]')?.addEventListener('click', () => {
    toast('Checkout is not connected on this preview');
  });

  // Deferred a frame: page-level scripts fill their grids on this same event,
  // and an empty container has no height to intersect with.
  requestAnimationFrame(initReveal);
  initForms();

  // Year stamp in the footer.
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
