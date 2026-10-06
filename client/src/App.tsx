import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/menu" component={MenuPage} /><Route path="/about" component={AboutPage} /><Route path="/rooms" component={RoomsPage} /><Route path="/gallery" component={GalleryPage} /><Route path="/contact" component={ContactPage} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "Restaurant", "@id": "#restaurant", "name": site.name, "description": site.descriptor, "address": { "@type": "PostalAddress", "streetAddress": site.address, "addressLocality": "Sultan Bathery", "addressRegion": "Kerala", "postalCode": "673592", "addressCountry": "IN" }, "telephone": site.phone, "openingHours": "Mo-Su 07:00-23:00", "servesCuisine": ["Kerala", "Mandi", "Biriyani", "Tandoori", "Arabic", "Chinese"], "priceRange": "₹₹" }, { "@type": "Hotel", "@id": "#hotel", "name": "Wilton Hotel", "description": "Comfortable A/c rooms with Wayanad hospitality in Sultan Bathery.", "address": { "@type": "PostalAddress", "streetAddress": site.address, "addressLocality": "Sultan Bathery", "addressRegion": "Kerala", "postalCode": "673592", "addressCountry": "IN" }, "telephone": site.roomReservation }] };
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
import MenuPage from "./pages/Menu";
import AboutPage from "./pages/About";
import RoomsPage from "./pages/Rooms";
import GalleryPage from "./pages/Gallery";
import ContactPage from "./pages/Contact";
import site from "./data/site.json";
