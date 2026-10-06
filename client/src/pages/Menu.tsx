import { useMemo, useState } from "react";
import { ArrowRight, Check, Search, ShoppingBag, X } from "lucide-react";
import menu from "@/data/menu.json";
import { CartDrawer, CartProvider, Footer, Header, MobileBottomBar, useCart, type Offer } from "./Home";

const categories = ["All", ...Array.from(new Set(menu.map((item) => item.category)))];

function MenuContent() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem, count } = useCart();
  const visible = useMemo(() => menu.filter((item) => (active === "All" || item.category === active) && (!vegOnly || item.veg) && `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [active, query, vegOnly]);
  return <div className="wilton-site inner-page"><Header solid onCart={() => setCartOpen(true)} /><main><section className="inner-hero"><div className="site-container"><span className="eyebrow">The Wilton table</span><h1>Full menu</h1><p>Kerala comfort, mandi, biriyani, tandoor, mezze and more—made for the whole table.</p></div></section><section className="section menu-section"><div className="site-container"><div className="menu-toolbar"><div className="menu-search"><Search size={17} /><input aria-label="Search menu" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes..." />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}</div><button className={`veg-filter ${vegOnly ? "active" : ""}`} onClick={() => setVegOnly(!vegOnly)}><span><Check size={12} /></span> Vegetarian</button></div><div className="menu-tabs" role="tablist">{categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => setActive(category)}>{category}</button>)}</div><div className="menu-grid">{visible.map((item) => <article className="menu-card" key={item.id}><img src={item.image} alt={item.name} loading="lazy" /><div className="menu-card-content"><div className="menu-card-top"><span className={`diet-marker ${item.veg ? "veg" : "nonveg"}`} title={item.veg ? "Vegetarian" : "Non-vegetarian"} /> <span className="menu-tag">{item.tag}</span></div><h2>{item.name}</h2><p>{item.description}</p><div className="menu-card-bottom"><strong>₹{item.price}</strong><button onClick={() => addItem(item)} aria-label={`Add ${item.name} to cart`}>Add <ShoppingBag size={15} /></button></div></div></article>)}</div>{visible.length === 0 && <div className="empty-menu"><h2>No dishes found</h2><p>Try another search or browse the full table.</p><button className="button button-spice" onClick={() => { setQuery(""); setActive("All"); setVegOnly(false); }}>Reset menu <ArrowRight size={16} /></button></div>}<div className="menu-note"><span>Prices shown are proposed and ready to update.</span><span>Ask the team about today's specials.</span></div></div></section></main><Footer /><MobileBottomBar onCart={() => setCartOpen(true)} /><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} /><button className="floating-cart" onClick={() => setCartOpen(true)}><ShoppingBag size={16} /> Cart <span>{count}</span></button></div>;
}

export default function MenuPage() { return <CartProvider><MenuContent /></CartProvider>; }
