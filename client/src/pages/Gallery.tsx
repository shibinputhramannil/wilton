import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import gallery from "@/data/gallery.json";
import { CartDrawer, CartProvider, Footer, Header, MobileBottomBar } from "./Home";

function GalleryContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const photos = [...gallery, ...gallery, ...gallery.slice(0, 4)].slice(0, 16);
  const move = (direction: number) => setSelected((current) => current === null ? null : (current + direction + photos.length) % photos.length);
  return <div className="wilton-site inner-page"><Header solid onCart={() => setCartOpen(true)} /><main><section className="inner-hero inner-hero-gallery"><div className="site-container"><span className="eyebrow">The Wilton mood</span><h1>Made for lingering.</h1><p>Food, rooms, rooftops and the small details that make a stay feel easy.</p></div></section><section className="section full-gallery-section"><div className="site-container"><div className="full-gallery-grid">{photos.map((photo, index) => <button className={`full-gallery-item full-gallery-${(index % 8) + 1}`} key={`${photo.src}-${index}`} onClick={() => setSelected(index)} aria-label={`Open ${photo.caption}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span>{photo.caption}</span></button>)}</div></div></section></main><Footer /><MobileBottomBar onCart={() => setCartOpen(true)} /><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />{selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer"><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image viewer"><X /></button><button className="lightbox-arrow lightbox-left" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft /></button><figure><img src={photos[selected].src} alt={photos[selected].alt} /><figcaption>{photos[selected].caption}</figcaption></figure><button className="lightbox-arrow lightbox-right" onClick={() => move(1)} aria-label="Next image"><ChevronRight /></button></div>}</div>;
}

export default function GalleryPage() { return <CartProvider><GalleryContent /></CartProvider>; }
