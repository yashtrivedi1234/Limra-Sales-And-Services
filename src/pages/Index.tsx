import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import ProductCategories from "@/components/ProductCategories";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import MegaSale from "@/components/MegaSale";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <main className="overflow-x-hidden">
    <Hero />
    <BrandMarquee />
    <ProductCategories />
    <Services />
    <FeaturedProjects />
    <MegaSale />
    <SiteFooter />
  </main>
);

export default Index;
