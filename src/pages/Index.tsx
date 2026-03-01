import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import Services from "@/components/Services";
import ProductCategories from "@/components/ProductCategories";
import AboutPreview from "@/components/AboutPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProjects from "@/components/FeaturedProjects";
import BlogPreview from "@/components/BlogPreview";
import CTASection from "@/components/CTASection";
import Newsletter from "@/components/Newsletter";
import Product from "@/components/Product";
import HVACSolutions from "@/components/HVACSolutions";

const Index = () => (
  <main>
    <Hero />
    
    <AboutPreview />
   
    <HVACSolutions />
    
    <Services />
    <ProductCategories />
    <BrandMarquee />
    <FeaturedProjects />
    <Product />
    <WhyChooseUs />
    <CTASection />
    <BlogPreview />
    {/* <Newsletter /> */}
  </main>
);

export default Index;