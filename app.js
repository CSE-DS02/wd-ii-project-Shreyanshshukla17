/* =================================================================
   MEESHO CLONE — app.js
   Shreyansh Shukla (2503215400181)
   Single-file SPA: Constants → Catalogue → Store → DataLayer
   → Components → Bootstrap
   ================================================================= */
'use strict';

/* ================================================================
   SECTION 1 — CONSTANTS & CONFIG
   ================================================================ */
const CDN_BASE      = 'https://images.meesho.com/images/products/';
const FALLBACK_BASE = 'https://placehold.co/300x400/F43397/FFFFFF?text=';

const ACTION = {
  SET_PRODUCTS:     'SET_PRODUCTS',
  FILTER_CHANGE:    'FILTER_CHANGE',
  SEARCH_QUERY:     'SEARCH_QUERY',
  SORT_CHANGE:      'SORT_CHANGE',
  OPEN_MODAL:       'OPEN_MODAL',
  CLOSE_MODAL:      'CLOSE_MODAL',
  TOGGLE_CART:      'TOGGLE_CART',
  CLOSE_CART:       'CLOSE_CART',
  ADD_TO_CART:      'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  SET_QUANTITY:     'SET_QUANTITY',
  CLEAR_CART:       'CLEAR_CART',
  SHOW_TOAST:       'SHOW_TOAST',
  CLEAR_TOAST:      'CLEAR_TOAST',
};

const SORT_OPTIONS = [
  { value: 'relevance',     label: 'Relevance' },
  { value: 'price-asc',     label: 'Price: Low to High' },
  { value: 'price-desc',    label: 'Price: High to Low' },
  { value: 'rating-desc',   label: 'Top Rated' },
  { value: 'discount-desc', label: 'Biggest Discount' },
];

const CATEGORIES = {
  all:         { label: 'All',         emoji: '🛍️', subcategories: [] },
  kurtis:      { label: 'Kurtis',      emoji: '👗', subcategories: ['Anarkali Kurtis','Rayon Kurtis','Cotton Kurtis','Straight Kurtis','Long Kurtis','Printed Kurtis'] },
  sarees:      { label: 'Sarees',      emoji: '🥻', subcategories: ['Georgette Sarees','Chiffon Sarees','Cotton Sarees','Silk Sarees','Net Sarees','Banarasi Sarees'] },
  electronics: { label: 'Electronics', emoji: '📱', subcategories: ['Smartphones','Earphones','Smartwatches','Power Banks','Cables & Adapters','Bluetooth Speakers'] },
  jewelry:     { label: 'Jewelry',     emoji: '💍', subcategories: ['Earrings','Necklaces','Bangles','Rings','Anklets','Bracelets'] },
  beauty:      { label: 'Beauty',      emoji: '💄', subcategories: [] },
  home:        { label: 'Home Decor',  emoji: '🏠', subcategories: [] },
};

/* ================================================================
   SECTION 2 — PRODUCT CATALOGUE (60 products, 15 per category)
   Images: placehold.co used as reliable fallback CDN-style URLs
   ================================================================ */
function buildProduct(id, name, category, subCategory, price, disc, rating, reviews, imgId, desc, seller, tags) {
  const finalPrice = Math.round(price * (1 - disc / 100));
  const img = `https://picsum.photos/seed/${imgId}/400/533`;
  return { id, name, category, subCategory, price, discountPercent: disc, finalPrice,
           rating, reviewCount: reviews,
           images: [img, `https://picsum.photos/seed/${imgId}a/400/533`,
                       `https://picsum.photos/seed/${imgId}b/400/533`],
           primaryImage: img, description: desc, seller, inStock: true, tags };
}

const CATALOGUE = [
  /* ---- KURTIS (15) ---- */
  buildProduct('k01','Rayon Anarkali Kurti - Blue Floral','kurtis','Anarkali Kurtis',699,45,4.3,2341,'kur01','Beautiful floral printed rayon anarkali kurti perfect for casual wear. Soft and breathable fabric.','Shree Ganesh Fashions',['anarkali','rayon','blue','floral','women']),
  buildProduct('k02','Cotton Straight Kurti - Yellow Print','kurtis','Straight Kurtis',499,38,4.1,1876,'kur02','Comfortable cotton straight kurti with traditional print. Ideal for daily wear.','Pari Fashion',['cotton','straight','yellow','print','daily']),
  buildProduct('k03','Georgette Long Kurti - Pink Embroidered','kurtis','Long Kurtis',899,52,4.5,3102,'kur03','Elegant georgette long kurti with intricate embroidery. Great for festivals.','Riya Collections',['georgette','long','pink','embroidery','festival']),
  buildProduct('k04','Rayon Printed Kurti - Green Leaves','kurtis','Rayon Kurtis',399,35,4.0,987,'kur04','Trendy leaf-print rayon kurti, lightweight and stylish for college or office.','Fabkart',['rayon','green','leaf','print','trendy']),
  buildProduct('k05','Cotton Anarkali Kurti - Red Block Print','kurtis','Anarkali Kurtis',599,42,4.2,1654,'kur05','Handblock printed cotton anarkali with rich red color. Traditional yet modern.','Artisan Weaves',['block print','red','cotton','anarkali','handmade']),
  buildProduct('k06','Crepe Kurti - Multicolor Geometric','kurtis','Straight Kurtis',549,40,3.9,765,'kur06','Multicolor geometric-print crepe kurti, semi-formal style with a clean silhouette.','Trendy Zone',['crepe','multicolor','geometric','semi-formal']),
  buildProduct('k07','Silk Blend Festive Kurti - Maroon Gold','kurtis','Long Kurtis',1299,48,4.6,4210,'kur07','Luxurious silk blend kurti with golden border embroidery for weddings and occasions.','Royal Threads',['silk','maroon','gold','festive','wedding']),
  buildProduct('k08','Linen Kurti - Pastel Blue Embroidered','kurtis','Straight Kurtis',749,44,4.4,2109,'kur08','Breezy linen kurti with delicate embroidery on neckline. Office-friendly.','Linen Luxe',['linen','pastel','blue','office','embroidery']),
  buildProduct('k09','Polyester Short Kurti - Black White','kurtis','Straight Kurtis',349,30,3.8,543,'kur09','Contemporary black and white polyester short kurti for casual outings.','UrbanStyle',['polyester','black','white','casual','short']),
  buildProduct('k10','Chanderi Kurti - Purple Zari Work','kurtis','Long Kurtis',1099,50,4.5,1899,'kur10','Exquisite chanderi kurti with zari border work. Party and occasion ready.','Zari & Zeal',['chanderi','purple','zari','occasion','party']),
  buildProduct('k11','Cotton Printed Kurti - Orange Paisley','kurtis','Rayon Kurtis',429,37,4.0,1023,'kur11','Vibrant paisley-print cotton kurti. Easy to wash and maintain.','DayCraft',['cotton','orange','paisley','wash-friendly']),
  buildProduct('k12','A-Line Kurti - Teal Mirror Work','kurtis','Anarkali Kurtis',799,46,4.3,1788,'kur12','Gorgeous teal A-line kurti adorned with mirror-work embellishments.','Mirror Magic',['a-line','teal','mirror work','embellished']),
  buildProduct('k13','Khadi Kurti - Earthy Brown Ethnic','kurtis','Cotton Kurtis',649,41,4.1,876,'kur13','Sustainable khadi kurti with earthy tones and ethnic prints. Eco-friendly fashion.','GreenThread',['khadi','brown','ethnic','sustainable','eco']),
  buildProduct('k14','Rayon Flared Kurti - Lavender Printed','kurtis','Rayon Kurtis',469,36,4.2,1234,'kur14','Flared rayon kurti in soft lavender with all-over print. Flattering silhouette.','FloralDreams',['rayon','flared','lavender','printed','flattering']),
  buildProduct('k15','Net Overlay Kurti - Royal Blue Party','kurtis','Long Kurtis',1199,55,4.7,3456,'kur15','Glamorous net overlay kurti in royal blue with sequin detailing for parties.','GlamourZone',['net','royal blue','party','sequin','glamorous']),

  /* ---- SAREES (15) ---- */
  buildProduct('s01','Georgette Saree - Pink Floral Printed','sarees','Georgette Sarees',899,55,4.4,3201,'sar01','Beautiful pink georgette saree with all-over floral print and lace border. Party-ready.','Saree Palace',['georgette','pink','floral','party','printed']),
  buildProduct('s02','Chiffon Saree - Sky Blue Plain','sarees','Chiffon Sarees',699,48,4.2,2109,'sar02','Lightweight chiffon saree in serene sky blue. Perfect for summer and office wear.','BlueWave Sarees',['chiffon','sky blue','plain','summer','office']),
  buildProduct('s03','Banarasi Silk Saree - Red Gold Zari','sarees','Silk Sarees',2499,40,4.8,5678,'sar03','Classic banarasi silk saree with gold zari weave and traditional motifs. Bridal must-have.','Varanasi Weaves',['banarasi','silk','red','gold','zari','bridal']),
  buildProduct('s04','Cotton Saree - Indigo Block Printed','sarees','Cotton Sarees',599,42,4.1,1450,'sar04','Handcrafted indigo block-printed cotton saree. Comfortable and eco-conscious.','Block & Soul',['cotton','indigo','block print','handcrafted']),
  buildProduct('s05','Net Saree - Peach Embroidered','sarees','Net Sarees',1299,50,4.5,2876,'sar05','Delicate peach net saree with resham embroidery all over. Festive stunner.','Embroidery House',['net','peach','embroidery','resham','festive']),
  buildProduct('s06','Chiffon Saree - Yellow Bandhani Print','sarees','Chiffon Sarees',749,46,4.3,1987,'sar06','Vibrant yellow chiffon saree with classic bandhani (tie-dye) pattern.','Rajwadi Creations',['chiffon','yellow','bandhani','rajasthani']),
  buildProduct('s07','Tussar Silk Saree - Beige Kalamkari','sarees','Silk Sarees',1799,44,4.6,3102,'sar07','Organic tussar silk saree with hand-painted kalamkari art. Collector\'s piece.','Artweave Studio',['tussar','silk','beige','kalamkari','hand-painted']),
  buildProduct('s08','Georgette Saree - Purple Sequin Party','sarees','Georgette Sarees',999,52,4.4,2540,'sar08','Party-wear georgette saree in rich purple with scattered sequin work. Head-turner.','Starlight Sarees',['georgette','purple','sequin','party','shimmer']),
  buildProduct('s09','Cotton Silk Saree - Mustard Traditional','sarees','Cotton Sarees',1099,47,4.2,1786,'sar09','Cotton-silk blend saree in warm mustard with temple-border design.','Heritage Looms',['cotton-silk','mustard','temple border','traditional']),
  buildProduct('s10','Organza Saree - Green Floral Applique','sarees','Net Sarees',1499,53,4.5,2234,'sar10','Sheer organza saree in mint green with 3D floral applique work. Very trendy.','Petal Couture',['organza','green','applique','3d flowers','trendy']),
  buildProduct('s11','Chanderi Saree - White Silver Stripes','sarees','Silk Sarees',1199,45,4.3,1567,'sar11','Elegant chanderi saree with silver-thread stripes and sheer texture. Formal events.','Chanderi Collection',['chanderi','white','silver','stripes','formal']),
  buildProduct('s12','Linen Saree - Rust Color Woven','sarees','Cotton Sarees',849,40,4.1,987,'sar12','Breathable linen saree in warm rust with woven motif border. Office-appropriate.','LoomCraft',['linen','rust','woven','office','casual']),
  buildProduct('s13','Crepe Saree - Navy Blue Printed','sarees','Georgette Sarees',679,43,4.0,834,'sar13','Solid navy crepe saree with printed pallu. Minimalist and office-chic.','ModernSilk',['crepe','navy','printed','minimalist','office']),
  buildProduct('s14','Bridal Lehenga Saree - Maroon Zardosi','sarees','Silk Sarees',3499,38,4.9,4321,'sar14','Opulent bridal saree with heavy zardosi embroidery and pearl work. Heirloom quality.','Bridal Couture',['bridal','maroon','zardosi','pearl','heavy work']),
  buildProduct('s15','Soft Silk Saree - Peacock Green','sarees','Silk Sarees',1599,50,4.6,2876,'sar15','Lustrous soft silk saree in peacock green with contrast blouse piece. Wedding collection.','Silk Empire',['soft silk','peacock green','wedding','contrast blouse']),

  /* ---- ELECTRONICS (15) ---- */
  buildProduct('e01','TWS Earbuds - 40Hr Battery ENC','electronics','Earphones',1999,45,4.3,8765,'ele01','True wireless earbuds with 40-hour total battery life, ENC mic, and IPX5 water resistance.','SoundPeak',['earbuds','wireless','tws','enc','waterproof']),
  buildProduct('e02','Smartwatch - 1.8" AMOLED Health Pro','electronics','Smartwatches',2499,40,4.4,6234,'ele02','Feature-packed smartwatch with 1.8" AMOLED display, 100+ sports modes, SpO2, and 7-day battery.','TechFit',['smartwatch','amoled','health','sports','fitness']),
  buildProduct('e03','20000mAh Power Bank - 22.5W Fast Charge','electronics','Power Banks',1299,35,4.5,11234,'ele03','Slim 20000mAh power bank with 22.5W fast charging, dual USB-A and USB-C ports.','ChargePlus',['power bank','20000mah','fast charge','slim','portable']),
  buildProduct('e04','Bluetooth Speaker - 10W Waterproof','electronics','Bluetooth Speakers',999,42,4.2,4567,'ele04','Portable 10W Bluetooth speaker with 360° sound, IPX6 rating, and 12-hour playtime.','BassBox',['bluetooth speaker','10w','waterproof','portable','bass']),
  buildProduct('e05','USB-C to USB-C Cable - 100W PD Nylon','electronics','Cables & Adapters',299,30,4.3,15678,'ele05','Braided nylon 100W USB-C PD charging cable, 1.5m length, compatible with laptops and phones.','CableKing',['usb-c','100w','pd','nylon','charging cable']),
  buildProduct('e06','Wired Earphones - Extra Bass 3.5mm','electronics','Earphones',399,38,4.0,9876,'ele06','High-fidelity wired earphones with extra-bass drivers and in-line mic for calls.','AudioZone',['wired','earphones','bass','3.5mm','in-line mic']),
  buildProduct('e07','Fitness Band - Heart Rate Sleep Track','electronics','Smartwatches',799,44,4.1,7890,'ele07','Lightweight fitness band with 24x7 heart rate, sleep tracking, and 15-day battery.','FitTrack',['fitness band','heart rate','sleep','lightweight','budget']),
  buildProduct('e08','10000mAh Power Bank - Slim USB-C','electronics','Power Banks',799,32,4.2,8765,'ele08','Ultra-slim 10000mAh power bank with USB-C input, LED indicators, airline-safe.','SlimCharge',['power bank','10000mah','slim','usb-c','airline safe']),
  buildProduct('e09','Type-C OTG Adapter - USB 3.0 Hub','electronics','Cables & Adapters',349,28,4.1,6543,'ele09','Compact 4-in-1 USB-C hub with USB 3.0, HDMI, SD card slot and PD charging.','HubPro',['otg','usb-c','hub','hdmi','sd card']),
  buildProduct('e10','Noise Cancelling Headphones - 35Hr','electronics','Earphones',3499,40,4.6,5432,'ele10','Over-ear ANC headphones with 35-hour battery, foldable design, and Hi-Res audio certification.','NoiseOff',['headphones','anc','noise cancelling','hi-res','foldable']),
  buildProduct('e11','Smart Speaker - Voice Assistant 360°','electronics','Bluetooth Speakers',1499,38,4.3,3456,'ele11','Smart speaker with built-in voice assistant, 360° sound, and multi-room audio support.','VoiceHome',['smart speaker','voice assistant','360','multi-room']),
  buildProduct('e12','Wireless Charging Pad - 15W Qi Certified','electronics','Cables & Adapters',699,35,4.2,4321,'ele12','Fast 15W Qi-certified wireless charging pad compatible with iPhone and Android devices.','ChargeWave',['wireless charging','15w','qi','pad','iphone compatible']),
  buildProduct('e13','Gaming Earphones - 7.1 Surround RGB','electronics','Earphones',1299,42,4.0,2987,'ele13','Gaming earphones with virtual 7.1 surround sound, RGB lighting, and retractable mic.','GameAudio',['gaming','7.1 surround','rgb','mic','earphones']),
  buildProduct('e14','Smartwatch Pro - GPS AMOLED Premium','electronics','Smartwatches',4499,35,4.7,7654,'ele14','Premium GPS smartwatch with always-on AMOLED, ECG, 5ATM water resistance, and 14-day battery.','TimeTech Pro',['smartwatch','gps','ecg','amoled','premium','5atm']),
  buildProduct('e15','30000mAh Laptop Power Bank - 65W PD','electronics','Power Banks',2999,30,4.5,3456,'ele15','High-capacity 30000mAh power bank with 65W PD for laptops, tablets and smartphones.','MegaCharge',['power bank','30000mah','65w','laptop','high capacity']),

  /* ---- JEWELRY (15) ---- */
  buildProduct('j01','Oxidised Silver Jhumka Earrings','jewelry','Earrings',299,60,4.5,5432,'jew01','Traditional oxidised silver jhumka earrings with intricate filigree work. Ethnic festival look.','SilverCraft',['earrings','jhumka','oxidised','silver','ethnic']),
  buildProduct('j02','Kundan Choker Necklace Set - Gold','jewelry','Necklaces',599,65,4.4,3210,'jew02','Stunning kundan choker necklace set with matching earrings. Perfect for bridal functions.','Kundan Palace',['kundan','choker','necklace','bridal','gold','set']),
  buildProduct('j03','Pearl Bracelet Set - White 6-piece','jewelry','Bracelets',199,55,4.3,4321,'jew03','Elegant faux pearl bracelet set of 6 pieces in classic white. Versatile daily wear.','PearlPlus',['pearl','bracelet','white','set','daily wear']),
  buildProduct('j04','Meenakari Bangle Set - Multicolor 4pcs','jewelry','Bangles',349,58,4.2,2876,'jew04','Vibrant meenakari work bangle set in multicolor floral patterns. Rajasthani craft.','Meena Craft',['meenakari','bangles','multicolor','rajasthani','set']),
  buildProduct('j05','Gold Plated Ring - Floral Adjustable','jewelry','Rings',149,62,4.1,6543,'jew05','Adjustable gold-plated floral ring that fits all sizes. Hypoallergenic and tarnish-resistant.','GoldGlow',['ring','gold plated','floral','adjustable','hypoallergenic']),
  buildProduct('j06','Anklet - Silver Ghungroo Payal','jewelry','Anklets',229,57,4.4,3987,'jew06','Traditional silver-toned ghungroo payal anklet with multiple rows of bells. Melodic style.','Payal House',['anklet','payal','ghungroo','silver','traditional']),
  buildProduct('j07','Layered Necklace - Bohemian Beaded','jewelry','Necklaces',249,55,4.3,2345,'jew07','Multi-strand boho beaded necklace in earth tones. Free-spirited festival look.','BohoJewels',['necklace','layered','bohemian','beads','festival']),
  buildProduct('j08','Stud Earrings - Crystal Zirconia Pack 5','jewelry','Earrings',199,60,4.5,7654,'jew08','Set of 5 crystal zirconia stud earrings in different colors. Minimalist everyday glam.','ZirconiaLux',['studs','zirconia','crystal','set','minimalist']),
  buildProduct('j09','Oxidised Cuff Bracelet - Tribal Motif','jewelry','Bracelets',279,56,4.2,1987,'jew09','Wide oxidised metal cuff bracelet with tribal-inspired engravings. Statement piece.','TribalCraft',['cuff','bracelet','oxidised','tribal','statement']),
  buildProduct('j10','Temple Necklace - Gold Tone Lakshmi','jewelry','Necklaces',449,62,4.6,4567,'jew10','South Indian temple jewelry necklace with Lakshmi motifs and ruby stones. Sacred and beautiful.','Temple Arts',['temple jewelry','lakshmi','gold','ruby','south indian']),
  buildProduct('j11','Polki Earrings - Antique Gold Drop','jewelry','Earrings',389,58,4.4,2345,'jew11','Polki-style antique gold drop earrings with mirror work and bead dangles.','Polki Studio',['polki','earrings','antique','drop','mirror work']),
  buildProduct('j12','Nose Ring - Small Clip-on No Pierce','jewelry','Rings',99,65,4.2,8765,'jew12','Tiny gold-plated nose ring clip-on style. No piercing needed. Comfortable all day.','NoseGlam',['nose ring','clip-on','no piercing','gold','tiny']),
  buildProduct('j13','Glass Bangle Set - Multicolor 24pcs','jewelry','Bangles',199,68,4.0,9876,'jew13','Vibrant glass bangle set of 24 pieces in assorted festive colors. Size 2.6.','ColorBangles',['glass','bangles','multicolor','24pcs','festive']),
  buildProduct('j14','Maang Tikka - Kundan Pearl Bridal','jewelry','Necklaces',349,60,4.5,3456,'jew14','Elegant kundan and pearl maang tikka for brides and bridesmaids. Adjustable chain.','BridalJewels',['maang tikka','kundan','pearl','bridal','adjustable']),
  buildProduct('j15','Silver Anklet - Delicate Chain Pair','jewelry','Anklets',189,55,4.3,5432,'jew15','Dainty 925 silver-plated anklet chain pair with small flower charms. Light and comfortable.','SilverFeet',['anklet','silver','chain','pair','flower','dainty']),
];

/* ================================================================
   SECTION 3 — APP STORE (pub/sub state management)
   ================================================================ */
function createStore(initialState, reducer) {
  let state = { ...initialState };
  const listeners = {};

  function emit(event) {
    (listeners[event] || []).forEach(fn => fn(state));
  }

  return {
    getState() { return { ...state }; },
    dispatch(action) {
      const next = reducer(state, action);
      if (next !== state) {
        state = next;
        emit('stateChange');
      }
    },
    subscribe(event, handler) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(handler);
      return () => { listeners[event] = listeners[event].filter(h => h !== handler); };
    },
  };
}

/* ---- Initial state ---- */
function loadCart() {
  try {
    const raw = localStorage.getItem('meesho_cart_v2');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

const initialState = {
  products:         [],
  filteredProducts: [],
  activeCategory:   'all',
  searchQuery:      '',
  sortOption:       'relevance',
  priceRange:       [0, 5000],
  ratingFilter:     0,
  cart:             loadCart(),
  cartOpen:         false,
  modalProduct:     null,
  toastMessage:     null,
  toastType:        'default',
};

/* ---- Filtering helper ---- */
function applyFilters(allProducts, state) {
  let results = allProducts.slice();
  const { activeCategory, searchQuery, priceRange, ratingFilter, sortOption } = state;

  if (activeCategory && activeCategory !== 'all') {
    results = results.filter(p => p.category === activeCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.seller.toLowerCase().includes(q)
    );
  }
  results = results.filter(p => p.finalPrice >= priceRange[0] && p.finalPrice <= priceRange[1]);
  if (ratingFilter > 0) results = results.filter(p => p.rating >= ratingFilter);

  // stable sort: preserve original index as tiebreak
  const indexed = results.map((p, i) => ({ p, i }));
  switch (sortOption) {
    case 'price-asc':     indexed.sort((a, b) => a.p.finalPrice - b.p.finalPrice || a.i - b.i); break;
    case 'price-desc':    indexed.sort((a, b) => b.p.finalPrice - a.p.finalPrice || a.i - b.i); break;
    case 'rating-desc':   indexed.sort((a, b) => b.p.rating - a.p.rating || a.i - b.i); break;
    case 'discount-desc': indexed.sort((a, b) => b.p.discountPercent - a.p.discountPercent || a.i - b.i); break;
    default: break;
  }
  return indexed.map(({ p }) => p);
}

/* ---- Cart helpers ---- */
function saveCart(cart) {
  try { localStorage.setItem('meesho_cart_v2', JSON.stringify(cart)); } catch { /* noop */ }
}

function cartReducer(cart, action) {
  switch (action.type) {
    case ACTION.ADD_TO_CART: {
      const product = action.payload;
      const idx = cart.findIndex(i => i.productId === product.id);
      if (idx >= 0) {
        return cart.map((item, i) => i === idx
          ? { ...item, quantity: item.quantity + 1, lineTotal: (item.quantity + 1) * product.finalPrice }
          : item);
      }
      return [...cart, { productId: product.id, product, quantity: 1, lineTotal: product.finalPrice }];
    }
    case ACTION.REMOVE_FROM_CART:
      return cart.filter(i => i.productId !== action.payload);
    case ACTION.SET_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (quantity < 1) return cart.filter(i => i.productId !== productId);
      return cart.map(i => i.productId === productId
        ? { ...i, quantity, lineTotal: quantity * i.product.finalPrice } : i);
    }
    case ACTION.CLEAR_CART: return [];
    default: return cart;
  }
}

/* ---- Root reducer ---- */
function rootReducer(state, action) {
  switch (action.type) {
    case ACTION.SET_PRODUCTS: {
      const products = action.payload;
      const filteredProducts = applyFilters(products, state);
      return { ...state, products, filteredProducts };
    }
    case ACTION.FILTER_CHANGE: {
      const next = { ...state, ...action.payload };
      return { ...next, filteredProducts: applyFilters(next.products, next) };
    }
    case ACTION.SEARCH_QUERY: {
      const next = { ...state, searchQuery: action.payload };
      return { ...next, filteredProducts: applyFilters(next.products, next) };
    }
    case ACTION.SORT_CHANGE: {
      const next = { ...state, sortOption: action.payload };
      return { ...next, filteredProducts: applyFilters(next.products, next) };
    }
    case ACTION.OPEN_MODAL:  return { ...state, modalProduct: action.payload };
    case ACTION.CLOSE_MODAL: return { ...state, modalProduct: null };
    case ACTION.TOGGLE_CART: return { ...state, cartOpen: !state.cartOpen };
    case ACTION.CLOSE_CART:  return { ...state, cartOpen: false };
    case ACTION.SHOW_TOAST:  return { ...state, toastMessage: action.payload.msg, toastType: action.payload.type || 'default' };
    case ACTION.CLEAR_TOAST: return { ...state, toastMessage: null };
    case ACTION.ADD_TO_CART:
    case ACTION.REMOVE_FROM_CART:
    case ACTION.SET_QUANTITY:
    case ACTION.CLEAR_CART: {
      const cart = cartReducer(state.cart, action);
      saveCart(cart);
      return { ...state, cart };
    }
    default:
      console.warn('[Store] Unknown action:', action.type);
      return state;
  }
}

const store = createStore(initialState, rootReducer);

/* ================================================================
   SECTION 4 — HELPERS
   ================================================================ */
function computeCartTotals(cart) {
  return cart.reduce((acc, item) => ({
    itemCount: acc.itemCount + item.quantity,
    subtotal:  acc.subtotal  + item.lineTotal,
    mrpTotal:  acc.mrpTotal  + item.product.price * item.quantity,
    savings:   acc.savings   + (item.product.price - item.product.finalPrice) * item.quantity,
  }), { itemCount: 0, subtotal: 0, mrpTotal: 0, savings: 0 });
}

function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }

function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

function fallbackImg(img, label) {
  img.onerror = null;
  img.src = `${FALLBACK_BASE}${encodeURIComponent(label)}`;
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  const star  = (cls) => `<svg class="star-icon ${cls}" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
  return `${'<span class="star filled">★</span>'.repeat(full)}${half ? '<span class="star half">★</span>' : ''}${'<span class="star empty">☆</span>'.repeat(empty)}`;
}

/* Toast helper */
let _toastTimer = null;
function showToast(msg, type = 'default') {
  store.dispatch({ type: ACTION.SHOW_TOAST, payload: { msg, type } });
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => store.dispatch({ type: ACTION.CLEAR_TOAST }), 3200);
}

/* ================================================================
   SECTION 5 — NAVBAR COMPONENT
   ================================================================ */
function mountNavbar() {
  const root = document.getElementById('navbar-root');

  root.innerHTML = `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <button class="navbar-hamburger" id="hamburger-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav-drawer">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <a href="#app" class="navbar-logo" aria-label="Meesho Home">
        <span class="navbar-logo-text">meesho<span>India's #1 Shopping App</span></span>
      </a>
      <div class="navbar-search">
        <svg class="navbar-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
        <input id="search-input" type="search" class="navbar-search-input" placeholder="Search for products, brands and more" aria-label="Search products" autocomplete="off">
        <button id="search-clear" class="navbar-search-clear" aria-label="Clear search">✕</button>
      </div>
      <div class="navbar-actions">
        <button class="navbar-action-btn" aria-label="Account">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Account</span>
        </button>
        <button class="navbar-action-btn navbar-cart-btn" id="cart-toggle-btn" aria-label="Shopping cart" aria-haspopup="dialog">
          <span style="position:relative;display:inline-flex;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <span class="cart-count-badge" id="cart-badge" aria-label="0 items in cart">0</span>
          </span>
          <span>Cart</span>
        </button>
      </div>
    </nav>`;

  /* search */
  const searchInput = document.getElementById('search-input');
  const clearBtn    = document.getElementById('search-clear');
  const debouncedSearch = debounce(q => store.dispatch({ type: ACTION.SEARCH_QUERY, payload: q }), 300);

  searchInput.addEventListener('input', () => {
    const q = searchInput.value;
    clearBtn.classList.toggle('visible', q.length > 0);
    debouncedSearch(q);
  });
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.remove('visible');
    store.dispatch({ type: ACTION.SEARCH_QUERY, payload: '' });
  });

  /* cart toggle */
  document.getElementById('cart-toggle-btn').addEventListener('click', () =>
    store.dispatch({ type: ACTION.TOGGLE_CART }));

  /* hamburger */
  document.getElementById('hamburger-btn').addEventListener('click', openMobileNav);
}

function updateCartBadge(count) {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  badge.textContent = count;
  badge.setAttribute('aria-label', `${count} item${count !== 1 ? 's' : ''} in cart`);
  badge.style.display = count > 0 ? 'flex' : 'none';
}

/* ================================================================
   SECTION 6 — MOBILE NAV DRAWER
   ================================================================ */
function mountMobileNav() {
  const drawer   = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');

  const catLinks = Object.entries(CATEGORIES).map(([key, cat]) =>
    `<li class="mobile-nav-item"><a href="#" data-cat="${key}" aria-label="Shop ${cat.label}">
      <span style="font-size:1.25rem">${cat.emoji}</span>${cat.label}
    </a></li>`).join('');

  drawer.innerHTML = `
    <div class="mobile-nav-header">
      <span class="mobile-nav-header-title">🛍️ Meesho</span>
      <button class="mobile-nav-close" id="mobile-nav-close-btn" aria-label="Close menu">✕</button>
    </div>
    <ul class="mobile-nav-list">
      ${catLinks}
      <li class="mobile-nav-divider"></li>
      <li class="mobile-nav-item"><a href="#"><span style="font-size:1.25rem">👤</span>My Account</a></li>
      <li class="mobile-nav-item"><a href="#"><span style="font-size:1.25rem">📦</span>My Orders</a></li>
      <li class="mobile-nav-item"><a href="#"><span style="font-size:1.25rem">❓</span>Help & Support</a></li>
    </ul>`;

  drawer.querySelectorAll('[data-cat]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.cat;
      store.dispatch({ type: ACTION.FILTER_CHANGE, payload: { activeCategory: cat } });
      closeMobileNav();
      document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.getElementById('mobile-nav-close-btn').addEventListener('click', closeMobileNav);
  backdrop.addEventListener('click', closeMobileNav);
}

function openMobileNav() {
  const drawer   = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const btn      = document.getElementById('hamburger-btn');
  drawer.classList.add('is-open');
  backdrop.classList.remove('hidden');
  document.body.classList.add('scroll-locked');
  btn && btn.setAttribute('aria-expanded', 'true');
}

function closeMobileNav() {
  const drawer   = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const btn      = document.getElementById('hamburger-btn');
  drawer.classList.remove('is-open');
  backdrop.classList.add('hidden');
  document.body.classList.remove('scroll-locked');
  btn && btn.setAttribute('aria-expanded', 'false');
}

/* ================================================================
   SECTION 7 — HERO BANNER
   ================================================================ */
function mountHero() {
  const root = document.getElementById('hero-root');
  root.innerHTML = `
    <div class="offer-strip" aria-live="polite">
      🎉 Free Delivery on orders above ₹199 &nbsp;|&nbsp; 10 Crore+ Happy Customers &nbsp;|&nbsp; 100% Secure Payments 🔒
    </div>
    <div class="hero-banner">
      <div class="hero-content">
        <p class="hero-eyebrow">🛍️ India's Favourite Shopping App</p>
        <h1 class="hero-heading">Shop <span>Millions</span> of Products at Lowest Prices</h1>
        <p class="hero-sub">Fashion, Electronics, Jewelry & more — Free Delivery over ₹199. Discover trending styles from 50,000+ sellers.</p>
        <div class="hero-actions">
          <button class="hero-cta-primary" onclick="document.getElementById('product-grid-root').scrollIntoView({behavior:'smooth'})">
            Shop Now →
          </button>
          <button class="hero-cta-secondary" onclick="store.dispatch({type:'FILTER_CHANGE',payload:{activeCategory:'kurtis'}})">
            Explore Kurtis
          </button>
        </div>
      </div>
    </div>`;
}

/* ================================================================
   SECTION 8 — CATEGORY SHORTCUTS
   ================================================================ */
function mountCategoryShortcuts() {
  const root = document.getElementById('category-shortcuts-root');
  const state = store.getState();

  root.innerHTML = `
    <nav class="category-shortcuts-track" aria-label="Browse categories">
      ${Object.entries(CATEGORIES).map(([key, cat]) =>
        `<button class="category-chip ${state.activeCategory === key ? 'is-active' : ''}"
                 data-cat="${key}" aria-label="Browse ${cat.label}"
                 aria-pressed="${state.activeCategory === key}">
          <span class="category-chip-emoji" aria-hidden="true">${cat.emoji}</span>
          ${cat.label}
        </button>`).join('')}
    </nav>`;

  root.querySelectorAll('.category-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      store.dispatch({ type: ACTION.FILTER_CHANGE, payload: { activeCategory: cat } });
      document.getElementById('product-grid-root').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function syncCategoryShortcuts(activeCategory) {
  document.querySelectorAll('.category-chip').forEach(btn => {
    const isActive = btn.dataset.cat === activeCategory;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });
}

/* ================================================================
   SECTION 9 — FILTER SIDEBAR
   ================================================================ */
function renderFilterPanel(state) {
  const activeFiltersCount = [
    state.activeCategory !== 'all',
    state.priceRange[0] > 0 || state.priceRange[1] < 5000,
    state.ratingFilter > 0,
  ].filter(Boolean).length;

  return `
    <div class="filter-panel">
      <div class="filter-panel-header">
        <span class="filter-panel-title">Filters ${activeFiltersCount > 0 ? `<span class="filter-active-count">${activeFiltersCount}</span>` : ''}</span>
        <button class="filter-clear-btn" id="filter-clear-all" aria-label="Clear all filters">Clear All</button>
      </div>

      <div class="filter-section is-open">
        <button class="filter-section-toggle" aria-expanded="true">
          Category
          <svg class="filter-section-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="filter-section-body">
          <ul class="filter-option-list">
            ${[['all','All Products'],['kurtis','Kurtis'],['sarees','Sarees'],['electronics','Electronics'],['jewelry','Jewelry']].map(([val, lbl]) => `
            <li><label class="filter-option-label">
              <input type="radio" name="filter-category" value="${val}" ${state.activeCategory === val ? 'checked' : ''} aria-label="${lbl}">
              ${lbl}
            </label></li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="filter-section is-open">
        <button class="filter-section-toggle" aria-expanded="true">
          Price Range
          <svg class="filter-section-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="filter-section-body">
          <div class="price-range-container">
            <div class="price-range-labels">
              <span class="price-range-label" id="price-min-label">${fmt(state.priceRange[0])}</span>
              <span class="price-range-label" id="price-max-label">${fmt(state.priceRange[1])}</span>
            </div>
            <div class="price-range-track">
              <div class="price-range-fill" id="price-fill"></div>
              <input type="range" id="price-min" min="0" max="5000" step="50" value="${state.priceRange[0]}" aria-label="Minimum price" aria-valuemin="0" aria-valuemax="5000">
              <input type="range" id="price-max" min="0" max="5000" step="50" value="${state.priceRange[1]}" aria-label="Maximum price" aria-valuemin="0" aria-valuemax="5000">
            </div>
          </div>
        </div>
      </div>

      <div class="filter-section is-open">
        <button class="filter-section-toggle" aria-expanded="true">
          Customer Rating
          <svg class="filter-section-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="filter-section-body">
          <ul class="filter-option-list">
            ${[[0,'All Ratings'],[4,'4★ & Above'],[3,'3★ & Above'],[2,'2★ & Above'],[1,'1★ & Above']].map(([val, lbl]) => `
            <li><label class="filter-option-label">
              <input type="radio" name="filter-rating" value="${val}" ${state.ratingFilter === val ? 'checked' : ''} aria-label="${lbl}">
              ${lbl}
            </label></li>`).join('')}
          </ul>
        </div>
      </div>
    </div>`;
}

function attachFilterEvents(container) {
  /* accordion toggles */
  container.querySelectorAll('.filter-section-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.filter-section');
      const isOpen  = section.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

  /* category radio */
  container.querySelectorAll('input[name="filter-category"]').forEach(radio => {
    radio.addEventListener('change', () => {
      store.dispatch({ type: ACTION.FILTER_CHANGE, payload: { activeCategory: radio.value } });
    });
  });

  /* rating radio */
  container.querySelectorAll('input[name="filter-rating"]').forEach(radio => {
    radio.addEventListener('change', () => {
      store.dispatch({ type: ACTION.FILTER_CHANGE, payload: { ratingFilter: Number(radio.value) } });
    });
  });

  /* price range sliders */
  const minSlider = container.querySelector('#price-min');
  const maxSlider = container.querySelector('#price-max');
  const minLabel  = container.querySelector('#price-min-label');
  const maxLabel  = container.querySelector('#price-max-label');
  const fill      = container.querySelector('#price-fill');

  function updateSliderUI() {
    const min = Number(minSlider.value);
    const max = Number(maxSlider.value);
    const pct1 = (min / 5000) * 100;
    const pct2 = (max / 5000) * 100;
    if (fill) { fill.style.left = pct1 + '%'; fill.style.width = (pct2 - pct1) + '%'; }
    if (minLabel) minLabel.textContent = fmt(min);
    if (maxLabel) maxLabel.textContent = fmt(max);
  }

  const debouncedPriceDispatch = debounce((min, max) => {
    store.dispatch({ type: ACTION.FILTER_CHANGE, payload: { priceRange: [min, max] } });
  }, 200);

  if (minSlider && maxSlider) {
    updateSliderUI();
    minSlider.addEventListener('input', () => {
      if (Number(minSlider.value) > Number(maxSlider.value)) minSlider.value = maxSlider.value;
      updateSliderUI();
      debouncedPriceDispatch(Number(minSlider.value), Number(maxSlider.value));
    });
    maxSlider.addEventListener('input', () => {
      if (Number(maxSlider.value) < Number(minSlider.value)) maxSlider.value = minSlider.value;
      updateSliderUI();
      debouncedPriceDispatch(Number(minSlider.value), Number(maxSlider.value));
    });
  }

  /* clear all */
  const clearBtn = container.querySelector('#filter-clear-all');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      store.dispatch({ type: ACTION.FILTER_CHANGE, payload: {
        activeCategory: 'all', priceRange: [0, 5000], ratingFilter: 0,
      }});
    });
  }
}

function mountFilterSidebar() {
  const root = document.getElementById('filter-sidebar-root');
  root.innerHTML = renderFilterPanel(store.getState());
  attachFilterEvents(root);
}

function syncFilterSidebar(state) {
  const root = document.getElementById('filter-sidebar-root');
  root.innerHTML = renderFilterPanel(state);
  attachFilterEvents(root);
}

/* Mobile filter drawer */
function mountMobileFilterDrawer() {
  const drawer   = document.getElementById('filter-mobile-drawer');
  const backdrop = document.getElementById('filter-backdrop');
  drawer.innerHTML = `
    <div class="filter-drawer-header">
      <span class="filter-drawer-title">Filters</span>
      <button class="filter-drawer-close" id="filter-drawer-close" aria-label="Close filters">✕</button>
    </div>
    <div class="filter-drawer-body" id="filter-drawer-body"></div>
    <div class="filter-drawer-footer">
      <button class="filter-reset-btn" id="filter-mobile-reset">Reset</button>
      <button class="filter-apply-btn" id="filter-mobile-apply">Apply Filters</button>
    </div>`;

  document.getElementById('filter-drawer-close').addEventListener('click', closeMobileFilter);
  document.getElementById('filter-mobile-apply').addEventListener('click', closeMobileFilter);
  document.getElementById('filter-mobile-reset').addEventListener('click', () => {
    store.dispatch({ type: ACTION.FILTER_CHANGE, payload: { activeCategory: 'all', priceRange: [0,5000], ratingFilter: 0 } });
    closeMobileFilter();
  });
  backdrop.addEventListener('click', closeMobileFilter);
}

function syncMobileFilterDrawer(state) {
  const body = document.getElementById('filter-drawer-body');
  if (!body) return;
  body.innerHTML = renderFilterPanel(state);
  attachFilterEvents(body);
}

function openMobileFilter() {
  document.getElementById('filter-mobile-drawer').classList.add('is-open');
  document.getElementById('filter-backdrop').classList.remove('hidden');
  document.body.classList.add('scroll-locked');
  syncMobileFilterDrawer(store.getState());
}

function closeMobileFilter() {
  document.getElementById('filter-mobile-drawer').classList.remove('is-open');
  document.getElementById('filter-backdrop').classList.add('hidden');
  document.body.classList.remove('scroll-locked');
}

/* ================================================================
   SECTION 10 — SORT CONTROL
   ================================================================ */
function mountSortControl() {
  const root = document.getElementById('sort-control-root');

  root.innerHTML = `
    <button class="mobile-filter-trigger" id="mobile-filter-btn" aria-label="Open filters">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="8" y2="18"/></svg>
      Filters
      <span class="filter-active-count" id="mobile-filter-count" style="display:none">0</span>
    </button>
    <div class="sort-select-wrap">
      <select class="sort-select" id="sort-select" aria-label="Sort products by">
        ${SORT_OPTIONS.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
      </select>
      <svg class="sort-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
    <span class="results-count" id="results-count" aria-live="polite">Showing 0 products</span>`;

  document.getElementById('sort-select').addEventListener('change', (e) => {
    store.dispatch({ type: ACTION.SORT_CHANGE, payload: e.target.value });
  });

  document.getElementById('mobile-filter-btn').addEventListener('click', openMobileFilter);
}

function syncSortControl(state) {
  const sel = document.getElementById('sort-select');
  if (sel) sel.value = state.sortOption;

  const cnt = document.getElementById('results-count');
  if (cnt) cnt.textContent = `Showing ${state.filteredProducts.length} product${state.filteredProducts.length !== 1 ? 's' : ''}`;

  const filterCount = [
    state.activeCategory !== 'all',
    state.priceRange[0] > 0 || state.priceRange[1] < 5000,
    state.ratingFilter > 0,
  ].filter(Boolean).length;
  const mobileCount = document.getElementById('mobile-filter-count');
  if (mobileCount) {
    mobileCount.textContent = filterCount;
    mobileCount.style.display = filterCount > 0 ? 'inline-flex' : 'none';
  }
}

/* ================================================================
   SECTION 11 — PRODUCT CARD
   ================================================================ */
function renderProductCard(product, cartItems) {
  const inCart = cartItems.some(i => i.productId === product.id);
  const article = document.createElement('article');
  article.className = 'product-card';
  article.setAttribute('data-id', product.id);
  article.setAttribute('tabindex', '0');
  article.setAttribute('aria-label', `${product.name}, ${fmt(product.finalPrice)}`);
  article.setAttribute('role', 'button');

  article.innerHTML = `
    <div class="product-card-image-wrap">
      <img src="${product.primaryImage}" alt="${product.name}"
           loading="lazy" width="300" height="400"
           onerror="this.onerror=null;this.src='${FALLBACK_BASE}${encodeURIComponent(product.category)}'">
      <span class="discount-badge" aria-label="${product.discountPercent}% discount">${product.discountPercent}% off</span>
    </div>
    <div class="product-card-body">
      <p class="product-card-brand">${product.seller}</p>
      <h3 class="product-card-name">${product.name}</h3>
      <div class="product-card-rating">
        <span class="rating-pill" aria-label="Rating ${product.rating} out of 5">
          ${product.rating}
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        </span>
        <span class="rating-count">(${product.reviewCount.toLocaleString('en-IN')})</span>
      </div>
      <div class="product-card-price-row">
        <span class="product-card-price">${fmt(product.finalPrice)}</span>
        <span class="product-card-orig">${fmt(product.price)}</span>
        <span class="product-card-disc">${product.discountPercent}% off</span>
      </div>
      <div class="product-card-cta">
        <button class="product-card-add-btn ${inCart ? 'in-cart' : ''}"
                data-id="${product.id}"
                aria-label="${inCart ? 'Go to cart' : 'Add ' + product.name + ' to cart'}">
          ${inCart ? '✓ Added to Cart' : '+ Add to Cart'}
        </button>
      </div>
    </div>`;

  /* card click → modal */
  article.addEventListener('click', (e) => {
    if (e.target.closest('.product-card-add-btn')) return;
    store.dispatch({ type: ACTION.OPEN_MODAL, payload: product });
  });

  /* keyboard enter/space → modal */
  article.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('button')) {
      e.preventDefault();
      store.dispatch({ type: ACTION.OPEN_MODAL, payload: product });
    }
  });

  /* add to cart button */
  article.querySelector('.product-card-add-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (inCart) {
      store.dispatch({ type: ACTION.TOGGLE_CART });
    } else {
      store.dispatch({ type: ACTION.ADD_TO_CART, payload: product });
      showToast(`"${product.name.slice(0,30)}…" added to cart 🛒`, 'success');
    }
  });

  return article;
}

/* ================================================================
   SECTION 12 — PRODUCT GRID
   ================================================================ */
function renderSkeletons(count = 8) {
  const grid = document.getElementById('product-grid-root');
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'skeleton-card';
    div.setAttribute('aria-hidden', 'true');
    div.innerHTML = `
      <div class="skeleton skeleton-image"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line w-3-4"></div>
        <div class="skeleton skeleton-line w-full"></div>
        <div class="skeleton skeleton-line w-full"></div>
        <div class="skeleton skeleton-line w-1-2"></div>
        <div class="skeleton skeleton-line w-full" style="height:2rem;margin-top:0.5rem"></div>
      </div>`;
    frag.appendChild(div);
  }
  grid.appendChild(frag);
}

function renderGrid(products, cart) {
  const grid = document.getElementById('product-grid-root');
  grid.innerHTML = '';

  if (!products.length) {
    grid.innerHTML = `
      <div class="empty-state" role="status">
        <svg class="empty-state-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <h2 class="empty-state-title">No products found</h2>
        <p class="empty-state-sub">Try adjusting your filters or search term to discover more products.</p>
        <button class="empty-state-btn" onclick="store.dispatch({type:'FILTER_CHANGE',payload:{activeCategory:'all',searchQuery:'',priceRange:[0,5000],ratingFilter:0}});document.getElementById('search-input').value=''">
          Clear All Filters
        </button>
      </div>`;
    return;
  }

  const frag = document.createDocumentFragment();
  products.forEach(p => frag.appendChild(renderProductCard(p, cart)));
  grid.appendChild(frag);
}

/* ================================================================
   SECTION 13 — PRODUCT DETAIL MODAL
   ================================================================ */
let modalEscListener = null;

function openModal(product) {
  const overlay = document.getElementById('modal-overlay');
  const state   = store.getState();
  const inCart  = state.cart.some(i => i.productId === product.id);

  overlay.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true" aria-label="${product.name}" id="modal-dialog">
      <button class="modal-close-btn" id="modal-close-btn" aria-label="Close product details">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-body">
        <div class="modal-gallery">
          <img id="modal-main-img" class="modal-main-img" src="${product.primaryImage}" alt="${product.name}"
               onerror="this.onerror=null;this.src='${FALLBACK_BASE}${encodeURIComponent(product.category)}'">
          <div class="modal-thumb-strip" role="list" aria-label="Product images">
            ${product.images.map((img, idx) => `
              <img class="modal-thumb ${idx === 0 ? 'active' : ''}" src="${img}" alt="${product.name} view ${idx+1}"
                   loading="lazy" data-idx="${idx}" role="listitem"
                   onerror="this.onerror=null;this.src='${FALLBACK_BASE}${encodeURIComponent(product.category)}'">
            `).join('')}
          </div>
        </div>
        <div class="modal-info">
          <p class="modal-brand">${CATEGORIES[product.category]?.emoji || ''} ${product.seller}</p>
          <h1 class="modal-name">${product.name}</h1>
          <p class="modal-seller">Sold by: ${product.seller} &nbsp;|&nbsp; ${product.subCategory}</p>
          <div class="modal-price-row">
            <span class="modal-price">${fmt(product.finalPrice)}</span>
            <span class="modal-orig">${fmt(product.price)}</span>
            <span class="modal-disc">${product.discountPercent}% off</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
            <span class="rating-pill" aria-label="Rating ${product.rating} out of 5">
              ${product.rating} ★
            </span>
            <span class="rating-count">${product.reviewCount.toLocaleString('en-IN')} ratings</span>
          </div>
          <div class="modal-divider"></div>
          <p class="modal-desc">${product.description}</p>
          ${product.finalPrice > 199 ? `
          <p class="modal-delivery">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            Free Delivery
          </p>` : ''}
          <p style="font-size:0.75rem;color:var(--muted);margin-top:0.5rem;">
            Tags: ${product.tags.slice(0,5).join(', ')}
          </p>
          <div class="modal-cta-row">
            <button class="modal-add-btn ${inCart ? 'in-cart' : ''}" id="modal-add-cart-btn"
                    aria-label="${inCart ? 'Go to cart' : 'Add to cart'}">
              ${inCart ? '✓ Go to Cart' : '🛒 Add to Cart'}
            </button>
            <button class="modal-wish-btn" id="modal-wish-btn" aria-label="Add to wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>`;

  overlay.classList.add('is-open');
  overlay.removeAttribute('aria-hidden');
  document.body.classList.add('scroll-locked');

  /* thumbnail click */
  overlay.querySelectorAll('.modal-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const mainImg = document.getElementById('modal-main-img');
      mainImg.src = thumb.src;
      overlay.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  /* add to cart */
  document.getElementById('modal-add-cart-btn').addEventListener('click', () => {
    const currentState = store.getState();
    const isInCart = currentState.cart.some(i => i.productId === product.id);
    if (isInCart) {
      closeModal();
      store.dispatch({ type: ACTION.TOGGLE_CART });
    } else {
      store.dispatch({ type: ACTION.ADD_TO_CART, payload: product });
      showToast(`"${product.name.slice(0,30)}…" added to cart 🛒`, 'success');
      const btn = document.getElementById('modal-add-cart-btn');
      if (btn) { btn.textContent = '✓ Go to Cart'; btn.classList.add('in-cart'); }
    }
  });

  /* close button */
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);

  /* backdrop click */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  /* wishlist */
  document.getElementById('modal-wish-btn').addEventListener('click', () => {
    showToast('Added to wishlist ❤️', 'info');
  });

  /* escape key */
  modalEscListener = (e) => { if (e.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', modalEscListener);

  /* focus first button */
  setTimeout(() => {
    const btn = document.getElementById('modal-close-btn');
    btn && btn.focus();
  }, 100);
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '';
  document.body.classList.remove('scroll-locked');
  if (modalEscListener) {
    document.removeEventListener('keydown', modalEscListener);
    modalEscListener = null;
  }
  store.dispatch({ type: ACTION.CLOSE_MODAL });
}

/* ================================================================
   SECTION 14 — CART DRAWER
   ================================================================ */
function mountCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  drawer.innerHTML = `
    <div class="cart-header">
      <h2 class="cart-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        My Cart
      </h2>
      <span class="cart-item-count-label" id="cart-item-count"></span>
      <button class="cart-close-btn" id="cart-close-btn" aria-label="Close cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="cart-items-list" id="cart-items-list" aria-live="polite"></div>
    <div id="cart-summary-area"></div>`;

  document.getElementById('cart-close-btn').addEventListener('click', () =>
    store.dispatch({ type: ACTION.CLOSE_CART }));

  /* close on backdrop */
  document.getElementById('cart-backdrop').addEventListener('click', () =>
    store.dispatch({ type: ACTION.CLOSE_CART }));

  /* escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && store.getState().cartOpen)
      store.dispatch({ type: ACTION.CLOSE_CART });
  });
}

function renderCartItem(item) {
  const div = document.createElement('div');
  div.className = 'cart-item';
  div.setAttribute('data-id', item.productId);
  div.innerHTML = `
    <img class="cart-item-img" src="${item.product.primaryImage}" alt="${item.product.name}"
         onerror="this.onerror=null;this.src='${FALLBACK_BASE}${encodeURIComponent(item.product.category)}'">
    <div class="cart-item-details">
      <p class="cart-item-name">${item.product.name}</p>
      <p class="cart-item-seller">${item.product.seller}</p>
      <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.25rem;">
        <span class="cart-item-price">${fmt(item.product.finalPrice)}</span>
        <span class="cart-item-orig">${fmt(item.product.price)}</span>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-action="dec" aria-label="Decrease quantity">−</button>
        <span class="qty-value" aria-label="Quantity: ${item.quantity}">${item.quantity}</span>
        <button class="qty-btn" data-action="inc" aria-label="Increase quantity">+</button>
        <button class="cart-item-remove" data-action="remove" aria-label="Remove ${item.product.name} from cart">Remove</button>
      </div>
    </div>`;

  div.querySelector('[data-action="dec"]').addEventListener('click', () => {
    store.dispatch({ type: ACTION.SET_QUANTITY, payload: { productId: item.productId, quantity: item.quantity - 1 } });
  });
  div.querySelector('[data-action="inc"]').addEventListener('click', () => {
    store.dispatch({ type: ACTION.SET_QUANTITY, payload: { productId: item.productId, quantity: item.quantity + 1 } });
  });
  div.querySelector('[data-action="remove"]').addEventListener('click', () => {
    store.dispatch({ type: ACTION.REMOVE_FROM_CART, payload: item.productId });
    showToast('Item removed from cart', 'info');
  });

  return div;
}

function updateCartDrawer(cart) {
  const listEl    = document.getElementById('cart-items-list');
  const summaryEl = document.getElementById('cart-summary-area');
  const countEl   = document.getElementById('cart-item-count');
  if (!listEl || !summaryEl) return;

  const totals = computeCartTotals(cart);
  if (countEl) countEl.textContent = totals.itemCount > 0 ? `${totals.itemCount} item${totals.itemCount !== 1 ? 's' : ''}` : '';

  listEl.innerHTML = '';

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty" role="status">
        <svg class="cart-empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <h3 class="cart-empty-title">Your cart is empty</h3>
        <p class="cart-empty-sub">Looks like you haven't added anything yet. Start shopping!</p>
        <button class="cart-shop-btn" onclick="store.dispatch({type:'CLOSE_CART'})">Continue Shopping</button>
      </div>`;
    summaryEl.innerHTML = '';
    return;
  }

  const frag = document.createDocumentFragment();
  cart.forEach(item => frag.appendChild(renderCartItem(item)));
  listEl.appendChild(frag);

  summaryEl.innerHTML = `
    <div class="cart-summary">
      <div class="cart-summary-row">
        <span>Total MRP (${totals.itemCount} item${totals.itemCount !== 1 ? 's' : ''})</span>
        <span>${fmt(totals.mrpTotal)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Discount</span>
        <span class="cart-savings">− ${fmt(totals.savings)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Delivery</span>
        <span style="color:var(--success);font-weight:600;">${totals.subtotal >= 199 ? 'FREE' : fmt(50)}</span>
      </div>
      <div class="cart-summary-row total">
        <span>Total Amount</span>
        <span>${fmt(totals.subtotal + (totals.subtotal >= 199 ? 0 : 50))}</span>
      </div>
      <p class="cart-savings" style="margin-top:0.5rem;text-align:center;">
        🎉 You save ${fmt(totals.savings)} on this order!
      </p>
      <button class="cart-checkout-btn" id="checkout-btn">
        Proceed to Checkout →
      </button>
    </div>`;

  document.getElementById('checkout-btn').addEventListener('click', () => {
    showToast('Checkout coming soon! 🚀', 'info');
  });
}

function toggleCartDrawer(isOpen) {
  const drawer   = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (isOpen) {
    drawer.classList.add('is-open');
    backdrop.classList.remove('hidden');
  } else {
    drawer.classList.remove('is-open');
    backdrop.classList.add('hidden');
  }
}

/* ================================================================
   SECTION 15 — TOAST
   ================================================================ */
function mountToast() {
  /* toast div already in HTML */
}

function updateToast(msg, type) {
  const toastEl = document.getElementById('toast');
  if (!toastEl) return;

  if (!msg) {
    toastEl.classList.remove('is-visible');
    return;
  }

  const icons = {
    success: `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
    error:   `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
    info:    `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>`,
    default: `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01"/></svg>`,
  };

  toastEl.innerHTML = `
    <div class="toast-inner ${type || 'default'}">
      ${icons[type] || icons.default}
      <span class="toast-message">${msg}</span>
    </div>`;

  toastEl.classList.add('is-visible');
}

/* ================================================================
   SECTION 16 — FOOTER
   ================================================================ */
function mountFooter() {
  const root = document.getElementById('footer-root');
  root.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div>
          <div class="footer-brand-logo" aria-label="Meesho">meesho</div>
          <p class="footer-tagline">India's largest reselling platform. Shop from 50,000+ sellers across India with free delivery and easy returns.</p>
          <div class="footer-social-row" aria-label="Social media links">
            <a href="#" class="footer-social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" class="footer-social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="footer-social-link" aria-label="Twitter / X">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" class="footer-social-link" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h3 class="footer-col-title">Company</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">About Us</a></li>
            <li><a href="#" class="footer-link">Careers</a></li>
            <li><a href="#" class="footer-link">Blog</a></li>
            <li><a href="#" class="footer-link">Press</a></li>
            <li><a href="#" class="footer-link">Investor Relations</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-col-title">Help</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Customer Service</a></li>
            <li><a href="#" class="footer-link">Returns & Refunds</a></li>
            <li><a href="#" class="footer-link">Order Tracking</a></li>
            <li><a href="#" class="footer-link">FAQ</a></li>
            <li><a href="#" class="footer-link">Report an Issue</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-col-title">Shop</h3>
          <ul class="footer-links">
            ${Object.entries(CATEGORIES).filter(([k]) => k !== 'all').map(([key, cat]) =>
              `<li><a href="#" class="footer-link" data-cat-link="${key}">${cat.emoji} ${cat.label}</a></li>`
            ).join('')}
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <div>
          <p class="footer-attribution">Meesho Clone by Shreyansh Shukla (2503215400181)</p>
          <p style="margin-top:0.25rem">© 2024 Meesho Clone. Educational project only — not affiliated with Meesho Inc.</p>
        </div>
        <div class="footer-legal-links">
          <a href="#" class="footer-legal-link">Privacy Policy</a>
          <a href="#" class="footer-legal-link">Terms of Use</a>
          <a href="#" class="footer-legal-link">Grievance Policy</a>
        </div>
      </div>
    </div>`;

  /* footer category links */
  root.querySelectorAll('[data-cat-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.catLink;
      store.dispatch({ type: ACTION.FILTER_CHANGE, payload: { activeCategory: cat } });
      document.getElementById('product-grid-root').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ================================================================
   SECTION 17 — BOOTSTRAP & STORE WIRING
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Mount static components */
  mountNavbar();
  mountMobileNav();
  mountHero();
  mountCategoryShortcuts();
  mountSortControl();
  mountFilterSidebar();
  mountMobileFilterDrawer();
  mountCartDrawer();
  mountToast();
  mountFooter();

  /* 2. Show skeletons immediately */
  renderSkeletons(8);

  /* 3. Load catalogue into store */
  store.dispatch({ type: ACTION.SET_PRODUCTS, payload: CATALOGUE });

  /* 4. Initial renders from loaded state */
  const s0 = store.getState();
  renderGrid(s0.filteredProducts, s0.cart);
  updateCartBadge(computeCartTotals(s0.cart).itemCount);
  updateCartDrawer(s0.cart);
  syncSortControl(s0);

  /* 5. Subscribe to all state changes */
  store.subscribe('stateChange', (state) => {
    /* product grid */
    renderGrid(state.filteredProducts, state.cart);

    /* sort control & results count */
    syncSortControl(state);

    /* category shortcuts */
    syncCategoryShortcuts(state.activeCategory);

    /* filter sidebar */
    syncFilterSidebar(state);

    /* cart badge */
    const totals = computeCartTotals(state.cart);
    updateCartBadge(totals.itemCount);

    /* cart drawer content */
    updateCartDrawer(state.cart);

    /* cart drawer open/close */
    toggleCartDrawer(state.cartOpen);

    /* modal */
    if (state.modalProduct) {
      const overlay = document.getElementById('modal-overlay');
      if (!overlay.classList.contains('is-open')) {
        openModal(state.modalProduct);
      }
    } else {
      const overlay = document.getElementById('modal-overlay');
      if (overlay.classList.contains('is-open')) {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = '';
        document.body.classList.remove('scroll-locked');
      }
    }

    /* toast */
    updateToast(state.toastMessage, state.toastType);
  });

  /* 6. Validate catalogue invariants (dev check) */
  const violations = CATALOGUE.filter(p =>
    p.finalPrice !== Math.round(p.price * (1 - p.discountPercent / 100))
  );
  if (violations.length) {
    console.warn('[Catalogue] Discount invariant violations:', violations.map(p => p.id));
  }

  console.log(`%c Meesho Clone by Shreyansh Shukla (2503215400181) `,
    'background:#F43397;color:#fff;font-weight:700;padding:4px 8px;border-radius:4px;');
  console.log(`%c ${CATALOGUE.length} products loaded across ${Object.keys(CATEGORIES).length - 1} categories `,
    'background:#9B26AF;color:#fff;padding:2px 8px;border-radius:4px;');
});
