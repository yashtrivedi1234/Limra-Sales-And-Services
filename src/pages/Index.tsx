import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import ProductCategories from "@/components/ProductCategories";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import BlogPreview from "@/components/BlogPreview";
import MegaSale from "@/components/MegaSale";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <main className="">
    <SiteHeader />
    <Hero />
    <BrandMarquee />
    <ProductCategories />
    <Services />
    <FeaturedProjects />
    <BlogPreview />
    {/* <MegaSale /> */}
    <SiteFooter />
  </main>
);

export default Index;
