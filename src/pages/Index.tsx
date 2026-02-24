import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import Services from "@/components/Services";
import ProductCategories from "@/components/ProductCategories";
import AboutPreview from "@/components/AboutPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProjects from "@/components/FeaturedProjects";
import BlogPreview from "@/components/BlogPreview";
import CTASection from "@/components/CTASection";

const Index = () => (
  <main className="">
    {/* 1. First Impression */}
    <Hero />
    
    {/* 2. Immediate Social Proof/Trust */}
    <BrandMarquee />
    
    {/* 3. Core Offering (What do you do?) */}
    <Services />
    <ProductCategories />
    
    {/* 4. Why You? (Building the Brand Story) */}
    <AboutPreview />
    <WhyChooseUs />
    
    {/* 5. Proof of Quality (Show, don't just tell) */}
    <FeaturedProjects />
    
    {/* 6. Authority & Engagement */}
    <BlogPreview />
    
    {/* 7. Final Push */}
    <CTASection />
  </main>
);

export default Index;