import { Button } from "@/components/ui/button";
import categories from "@/data/categories.json";
import facilities from "@/data/facilities.json";
import gallery from "@/data/gallery.json";
import offers from "@/data/offers.json";
import rooms from "@/data/rooms.json";
import site from "@/data/site.json";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Building2,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  Flame,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  Utensils,
  Wifi,
  X,
  Youtube,
} from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Offer = (typeof offers)[number];
type CartItem = Offer & { quantity: number };

const heroSlides = [
  { eyebrow: "The Wilton table", title: "We Have Recipes In Our DNA", copy: "Family flavours, generous portions and a Wayanad welcome in every plate.", cta: "Our story", href: "/about", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop" },
  { eyebrow: "Multi-cuisine, one warm table", title: "Mandi, Biriyani & Beyond", copy: "From slow-cooked mandi to Kerala classics, bring the whole table hungry.", cta: "Explore the menu", href: "/menu", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1600&auto=format&fit=crop" },
  { eyebrow: "Open-air Wayanad evenings", title: "Dine on Our Rooftop", copy: "A little more sky, a little more time, and dinner worth lingering over.", cta: "See the gallery", href: "/gallery", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop" },
  { eyebrow: "Stay in Sultan Bathery", title: "Stay With Us in Sultan Bathery", copy: "A comfortable room, a good night's rest and an easy start to tomorrow.", cta: "View rooms", href: "/rooms", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&auto=format&fit=crop" },
  { eyebrow: "Made for the road home", title: "Take Away in Minutes", copy: "Call ahead, collect warm favourites and get back to the people waiting.", cta: "Order for pickup", href: "#offers", image: "https://images.unsplash.com/photo-1527477378408-1bc09c21311b?w=1600&auto=format&fit=crop" },
];

const facilityIcons = { sparkles: Sparkles, sun: Sun, utensils: Utensils, bed: BedDouble, clock: Clock3, wifi: Wifi, car: CarFront, shield: ShieldCheck } as const;

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: Offer) => void;
  changeQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  total: number;
  count: number;
}>({ items: [], addItem: () => undefined, changeQuantity: () => undefined, removeItem: () => undefined, total: 0, count: 0 });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("wilton-cart") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("wilton-cart", JSON.stringify(items)); }, [items]);
  const addItem = (item: Offer) => setItems((current) => {
    const existing = current.find((entry) => entry.id === item.id);
    return existing ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...current, { ...item, quantity: 1 }];
  });
  const changeQuantity = (id: string, delta: number) => setItems((current) => current.flatMap((entry) => entry.id !== id ? [entry] : entry.quantity + delta > 0 ? [{ ...entry, quantity: entry.quantity + delta }] : []));
  const removeItem = (id: string) => setItems((current) => current.filter((entry) => entry.id !== id));
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return <CartContext.Provider value={{ items, addItem, changeQuantity, removeItem, total, count }}>{children}</CartContext.Provider>;
}

export function useCart() { return useContext(CartContext); }

function Logo({ light = false }: { light?: boolean }) {
  return <a className={`brand-lockup ${light ? "brand-lockup-light" : ""}`} href="#top" aria-label="Wilton Restaurant & Hotel home">
    <span className="brand-mark"><span>W</span></span>
    <span><strong>Wilton</strong><small>Restaurant · Hotel</small></span>
  </a>;
}

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    <span className="gold-rule" aria-hidden="true" />
    {copy && <p>{copy}</p>}
  </div>;
}

export function Header({ onCart, solid = false }: { onCart: () => void; solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["Menu", "/menu"], ["About", "/about"], ["Rooms", "/rooms"], ["Gallery", "/gallery"], ["Contact", "/contact"]];
  return <>
    <div className="utility-bar"><div className="site-container utility-inner"><span>Take Away <a href={site.takeawayHref}>{site.takeaway}</a></span><span>Room Reservation <a href={site.roomReservationHref}>{site.roomReservation}</a></span></div></div>
    <header className={`site-header ${scrolled || solid ? "site-header-scrolled" : ""}`}>
      <div className="site-container header-inner"><Logo light={!scrolled} />
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}<a className="nav-order" href="#offers">Order Now <ArrowUpRight size={15} /></a><button className="cart-button" onClick={onCart} aria-label={`Open cart with ${count} items`}><ShoppingBag size={18} /><span>{count}</span></button></nav>
        <div className="mobile-header-actions"><button className="cart-button" onClick={onCart} aria-label={`Open cart with ${count} items`}><ShoppingBag size={18} /><span>{count}</span></button><button className="menu-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>{mobileOpen ? <X /> : <MenuIcon />}</button></div>
      </div>
      {mobileOpen && <div className="mobile-menu"><div className="site-container">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}<a className="mobile-menu-order" href="#offers" onClick={() => setMobileOpen(false)}>Order Now <ArrowUpRight size={16} /></a></div></div>}
    </header>
  </>;
}

function Hero({ onCart }: { onCart: () => void }) {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 5000); return () => window.clearInterval(timer); }, []);
  const slide = heroSlides[active];
  return <section className="hero" id="top" aria-roledescription="carousel" aria-label="Wilton highlights">
    <div className="hero-media" key={slide.image} style={{ backgroundImage: `url(${slide.image})` }} />
    <div className="hero-overlay" />
    <div className="site-container hero-content"><div className="hero-copy" key={slide.title}><span className="eyebrow eyebrow-light">{slide.eyebrow}</span><h1>{slide.title}</h1><p>{slide.copy}</p><a className="button button-spice" href={slide.href}>{slide.cta}<ArrowRight size={17} /></a></div></div>
    <div className="hero-controls site-container"><div className="hero-progress" aria-hidden="true"><span style={{ width: `${((active + 1) / heroSlides.length) * 100}%` }} /></div><div className="hero-control-row"><span className="hero-count">0{active + 1} <i>/ 0{heroSlides.length}</i></span><div className="hero-arrows"><button onClick={() => setActive((active - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide"><ChevronLeft /></button><button onClick={() => setActive((active + 1) % heroSlides.length)} aria-label="Next slide"><ChevronRight /></button></div></div></div>
    <div className="hero-quick-actions"><button className="quick-order" onClick={onCart}><ShoppingBag size={16} /> Order Now</button><a href="#rooms"><BedDouble size={16} /> Reserve a Room</a><a href="#contact"><MessageCircle size={16} /> Contact</a></div>
  </section>;
}

function AboutSection() {
  return <section className="section about-section" id="about"><div className="site-container about-grid"><div className="about-image-wrap"><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop" alt="A generous shared table at Wilton Restaurant" loading="lazy" /><span className="image-note"><strong>01</strong><span>Made for sharing<br />since the beginning</span></span></div><div className="about-copy"><SectionHeading eyebrow="Our story" title="Recipes in Our DNA" copy="The best tables carry a little memory with them." /><p>Wilton grows from a family love of feeding people well. The story reaches back to the late Neeliyath Hassan Haji and Thoufeeq Hotel in Meenangadi, and forward through two decades of welcoming families, travellers and friends in Sultan Bathery. Today, our table brings Kerala comfort, mandi, biriyani, tandoor, Arabic mezze and Chinese favourites under one roof—served with the same generous spirit that started it all.</p><a className="text-link" href="#contact">Read our story <ArrowUpRight size={16} /></a></div></div></section>;
}

function OfferCard({ offer, onAdd }: { offer: Offer; onAdd: (offer: Offer) => void }) {
  return <article className="offer-card"><div className="offer-image"><img src={offer.image} alt={offer.name} loading="lazy" /><span>{offer.tag}</span></div><div className="offer-card-body"><div><h3>{offer.name}</h3><p>{offer.description}</p></div><div className="offer-bottom"><strong>₹{offer.price}</strong><button onClick={() => onAdd(offer)}>Add to Cart <Plus size={16} /></button></div></div></article>;
}

function OffersSection({ onCart }: { onCart: () => void }) {
  const { addItem } = useCart();
  return <section className="section offers-section" id="offers"><div className="site-container"><div className="section-heading-row"><SectionHeading eyebrow="From the kitchen" title="The generous table" copy="A few Wilton favourites to start with. Prices shown are proposed and easy to edit." /><button className="round-arrow" aria-label="Scroll offers" onClick={onCart}><ArrowRight /></button></div><div className="offers-scroller">{offers.map((offer) => <OfferCard key={offer.id} offer={offer} onAdd={addItem} />)}</div><div className="section-footnote"><span><Flame size={16} /> Proposed pricing · confirm with Wilton</span><button className="text-link" onClick={onCart}>View your order <ArrowRight size={16} /></button></div></div></section>;
}

function CategorySection() {
  return <section className="section category-section" id="menu"><div className="site-container"><SectionHeading eyebrow="Find your favourite" title="A menu with room for everyone" copy="One kitchen, many cravings—browse the flavours that make Wilton feel like your table." /><div className="category-grid">{categories.map((category, index) => <a className={`category-card category-${index + 1}`} key={category.name} href="#offers"><img src={category.image} alt={category.name} loading="lazy" /><div className="category-overlay"><span>{category.eyebrow}</span><h3>{category.name}</h3><p>{category.description}</p><ArrowUpRight size={18} /></div></a>)}</div></div></section>;
}

function FacilitiesSection() {
  return <section className="section facilities-section"><div className="site-container facilities-grid"><div className="facilities-intro"><span className="eyebrow">Why Wilton</span><h2>Come for the food.<br /><em>Stay for the feeling.</em></h2><p>Thoughtful details make a family meal, a road-trip stop or a night away feel easy.</p><a className="button button-outline" href="#contact">Plan your visit <ArrowRight size={16} /></a></div><div className="facility-list">{facilities.map((facility) => { const Icon = facilityIcons[facility.icon as keyof typeof facilityIcons] || Sparkles; return <div className="facility-item" key={facility.title}><span className="facility-icon"><Icon size={21} /></span><div><h3>{facility.title}</h3><p>{facility.description}</p></div></div>; })}</div></div></section>;
}

function RoomsSection() {
  const reserve = (room: string) => { const text = `Hello Wilton, I would like to enquire about the ${room}. Please share availability and rates.`; window.open(`https://wa.me/917902534444?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer"); };
  return <section className="section rooms-section" id="rooms"><div className="site-container"><div className="section-heading-row"><SectionHeading eyebrow="Stay a little longer" title="A comfortable base in Wayanad" copy="Three easy ways to rest well in Sultan Bathery. Call or WhatsApp for availability." /><a className="text-link" href={site.roomReservationHref}>Call {site.roomReservation} <ArrowUpRight size={16} /></a></div><div className="rooms-grid">{rooms.map((room, index) => <article className={`room-card room-card-${index + 1}`} key={room.name}><img src={room.image} alt={room.name} loading="lazy" /><div className="room-card-content"><span>{room.meta}</span><h3>{room.name}</h3><p>{room.description}</p><button className="button button-cream" onClick={() => reserve(room.name)}>Reserve <ArrowUpRight size={15} /></button></div></article>)}</div></div></section>;
}

function GallerySection() {
  return <section className="section gallery-section" id="gallery"><div className="site-container"><div className="section-heading-row"><SectionHeading eyebrow="A look around" title="Made for lingering" copy="A few glimpses of the food, rooms and rooftop mood. The full gallery is coming next." /><a className="button button-outline" href="#contact">Plan a visit <ArrowRight size={16} /></a></div><div className="gallery-grid">{gallery.slice(0, 6).map((photo, index) => <figure className={`gallery-item gallery-item-${index + 1}`} key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption>{photo.caption}</figcaption></figure>)}</div></div></section>;
}

function TestimonialsSection() {
  const testimonials = ["The kind of place you return to before the trip is even over. Warm service and generous plates.", "We stopped for dinner and stayed for the rooftop. Everything felt relaxed, thoughtful and full of flavour.", "A lovely base in Sultan Bathery—clean rooms, easy parking and food that made the whole family happy."];
  return <section className="section testimonials-section"><div className="site-container testimonials-wrap"><div className="tripadvisor-mark"><span>★</span><strong>Tripadvisor</strong><small>Traveller reviews</small></div><div className="testimonial-grid">{testimonials.map((quote, index) => <blockquote key={quote}><div className="stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" />)}</div><p>“{quote}”</p><footer>Wilton guest · <span>Review placeholder {index + 1}</span></footer></blockquote>)}</div></div></section>;
}

function ContactSection() {
  const [sent, setSent] = useState(false);
  const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); const body = `Name: ${form.get("name")}\nPhone: ${form.get("phone")}\nEmail: ${form.get("email")}\nLocation: ${form.get("location")}\nMessage: ${form.get("message")}`; window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Wilton website enquiry")}&body=${encodeURIComponent(body)}`; setSent(true); };
  return <section className="section contact-section" id="contact"><div className="site-container contact-grid"><div className="contact-copy"><SectionHeading eyebrow="Come say hello" title="Your table is waiting" copy="Find us on National Highway 212, or call ahead and we’ll help you plan the stop." /><div className="contact-details"><a href={site.phoneHref}><Phone size={18} /><span><small>Main line</small><strong>{site.phone}</strong></span></a><a href={site.takeawayHref}><ShoppingBag size={18} /><span><small>Take Away</small><strong>{site.takeaway}</strong></span></a><div><Clock3 size={18} /><span><small>Open every day</small><strong>{site.hours}</strong></span></div><div><MapPin size={18} /><span><small>Address</small><strong>{site.shortAddress}</strong></span></div></div><div className="social-row"><a href={site.socials.facebook} aria-label="Facebook"><Facebook /></a><a href={site.socials.instagram} aria-label="Instagram"><Instagram /></a><a href={site.socials.youtube} aria-label="YouTube"><Youtube /></a><a href={site.socials.tripadvisor} aria-label="TripAdvisor"><Star /></a></div></div><div className="contact-form-card"><div className="form-card-top"><span className="eyebrow">Send a note</span><MessageCircle size={25} /></div><form onSubmit={submit}><div className="form-row"><label>Name<input name="name" required placeholder="Your name" /></label><label>Phone<input name="phone" required placeholder="7902 000 000" /></label></div><div className="form-row"><label>Email<input name="email" type="email" placeholder="you@example.com" /></label><label>Location<input name="location" placeholder="Sultan Bathery" /></label></div><label>Message<textarea name="message" required placeholder="Tell us how we can help..." rows={4} /></label><button className="button button-spice form-submit" type="submit">Send enquiry <ArrowRight size={16} /></button>{sent && <p className="form-success"><Check size={15} /> Your email draft is ready to send.</p>}</form></div></div><div className="map-card"><iframe title="Map showing Wilton Restaurant & Hotel in Sultan Bathery" src={site.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="site-container footer-grid"><div><Logo light /><p className="footer-blurb">Recipes in our DNA. Wayanad hospitality on the table and a comfortable stay under one roof.</p></div><div><span className="footer-label">Explore</span><a href="#menu">Menu</a><a href="#about">Our story</a><a href="#rooms">Rooms</a><a href="#gallery">Gallery</a></div><div><span className="footer-label">Contact</span><a href={site.phoneHref}>{site.phone}</a><a href={site.takeawayHref}>Take Away · {site.takeaway}</a><a href={site.roomReservationHref}>Rooms · {site.roomReservation}</a><span>{site.address}</span></div><div><span className="footer-label">Find us</span><span>{site.hours}</span><span>Facebook · Instagram</span><span>YouTube · TripAdvisor</span><a className="footer-order" href="#offers">Order for pickup <ArrowUpRight size={15} /></a></div></div><div className="site-container footer-bottom"><span>© Wilton Restaurant · Sultan Bathery, Kerala</span><span>Multi-cuisine dining · Roof top restaurant · Hotel</span></div></footer>;
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, changeQuantity, removeItem, total } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", notes: "" });
  useEffect(() => { if (!open) setCheckout(false); }, [open]);
  if (!open) return null;
  const placeOrder = (event: React.FormEvent) => { event.preventDefault(); const summary = items.map((item) => `${item.name} x${item.quantity} — ₹${item.price * item.quantity}`).join("\n"); const message = `Hello Wilton, I would like to place an order.\n\n${summary}\n\nTotal: ₹${total}\n\nName: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}\nNotes: ${customer.notes || "—"}\n\nDelivery within Sultan Bathery only.`; window.open(`https://wa.me/${site.orderWhatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer"); window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Wilton order from ${customer.name}`)}&body=${encodeURIComponent(message)}`; };
  return <div className="drawer-layer" role="presentation"><button className="drawer-scrim" onClick={onClose} aria-label="Close cart" /><aside className="cart-drawer" aria-label="Your order"><div className="drawer-header"><div><span className="eyebrow">Wilton order</span><h2>{checkout ? "Checkout" : "Your table, to go"}</h2></div><button onClick={onClose} aria-label="Close cart"><X /></button></div>{!checkout ? <>{items.length === 0 ? <div className="cart-empty"><ShoppingBag size={38} /><h3>Your cart is ready</h3><p>Add a favourite from the offers section and we’ll keep it here.</p><button className="button button-spice" onClick={onClose}>Browse favourites <ArrowRight size={16} /></button></div> : <><div className="cart-items">{items.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-main"><h3>{item.name}</h3><strong>₹{item.price * item.quantity}</strong><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}><Plus size={13} /></button><button className="remove-item" onClick={() => removeItem(item.id)}>Remove</button></div></div></div>)}</div><div className="drawer-summary"><div><span>Subtotal</span><strong>₹{total}</strong></div><p>Delivery within Sultan Bathery only.</p><button className="button button-spice wide-button" onClick={() => setCheckout(true)}>Checkout <ArrowRight size={16} /></button></div></>}</> : <form className="checkout-form" onSubmit={placeOrder}><p className="checkout-note"><MapPin size={16} /> Delivery within Sultan Bathery only.</p><label>Name<input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} required placeholder="Your name" /></label><label>Phone<input value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} required placeholder="7902 000 000" /></label><label>Address in Sultan Bathery<textarea value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} required placeholder="House / landmark / area" rows={3} /></label><label>Notes <span>(optional)</span><textarea value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} placeholder="Extra spice, pickup timing..." rows={3} /></label><div className="checkout-total"><span>Total</span><strong>₹{total}</strong></div><button className="button button-spice wide-button" type="submit">Place Order <MessageCircle size={16} /></button><button type="button" className="back-button" onClick={() => setCheckout(false)}>Back to cart</button><small className="email-note">WhatsApp opens to the restaurant and an email draft is prepared.</small></form>}</aside></div>;
}

export function MobileBottomBar({ onCart }: { onCart: () => void }) {
  return <div className="mobile-bottom-bar"><a href={site.phoneHref}><Phone size={16} /><span>Call</span></a><button onClick={onCart}><ShoppingBag size={16} /><span>Order Now</span></button><a href={site.roomReservationHref}><BedDouble size={16} /><span>Book Room</span></a></div>;
}

function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  return <div className="wilton-site"><Header onCart={() => setCartOpen(true)} /><main><Hero onCart={() => setCartOpen(true)} /><AboutSection /><OffersSection onCart={() => setCartOpen(true)} /><CategorySection /><FacilitiesSection /><RoomsSection /><GallerySection /><TestimonialsSection /><ContactSection /></main><Footer /><MobileBottomBar onCart={() => setCartOpen(true)} /><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} /></div>;
}

export default function Home() { return <CartProvider><HomePage /></CartProvider>; }
