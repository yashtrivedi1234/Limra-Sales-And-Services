import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import ProductCategories from "@/components/ProductCategories";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import BlogPreview from "@/components/BlogPreview";

import SiteFooter from "@/components/SiteFooter";
import AboutPreview from "@/components/AboutPreview";

import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";

const Index = () => (
  <main className="">
    <SiteHeader />
    <Hero />
    <AboutPreview />
    <BrandMarquee />
    <ProductCategories />
    <Services />
    <FeaturedProjects />
    <BlogPreview />

    
    <WhyChooseUs />
    <CTASection />  
    <SiteFooter />
  </main>
);

export default Index;
