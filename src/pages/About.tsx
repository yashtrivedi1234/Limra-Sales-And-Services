import { motion } from "framer-motion";
import { Shield, Award, Users, Target, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const stats = [
  { value: "9+", label: "Years Experience" },
  { value: "5000+", label: "Projects Completed" },
  { value: "50+", label: "Expert Technicians" },
  { value: "8+", label: "Premium Brands" },
];

const values = [
  { icon: Shield, title: "Reliability", desc: "We stand behind every installation with comprehensive warranties and responsive after-sales support." },
  { icon: Award, title: "Excellence", desc: "Only premium brands and certified technicians — no shortcuts, no compromises on quality." },
  { icon: Users, title: "Customer First", desc: "Every solution is tailored to the client's space, budget, and comfort requirements." },
  { icon: Target, title: "Innovation", desc: "We stay ahead with the latest energy-efficient and smart HVAC technologies." },
];

const milestones = [
  { year: "2017", text: "Founded in Bareilly as a small AC service workshop" },
  { year: "2020", text: "Became authorized Daikin dealer for the region" },
  { year: "2023", text: "Expanded to commercial VRV and chiller systems" },
  { year: "2026", text: "Completed landmark projects across UP including airports and hotels" },
  
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => (
  <>
    <SiteHeader />
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-bold text-sm tracking-widest uppercase mb-4">
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            Building Comfort <br className="hidden sm:block" />Since 2017
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-primary-foreground/70 text-lg leading-relaxed"
          >
            LIMRA Sales And Services is Bareilly's most trusted HVAC partner — delivering premium air conditioning solutions for homes, offices, hospitals, hotels, and industrial facilities.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-black text-accent">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-2 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                What started as a humble air conditioning service workshop in Bareilly in 2017 has grown into one of the region's leading HVAC solutions providers. LIMRA Sales And Services was founded with a simple belief: everyone deserves reliable, energy-efficient comfort.
              </p>
              <p>
                Over 25 years, we've built deep partnerships with the world's finest brands — Daikin, Mitsubishi Heavy, Carrier, Midea, and more — becoming their authorized dealer and installation partner for residential and large-scale commercial projects.
              </p>
              <p>
                From cooling a single room to engineering climate control for airports and five-star hotels, our team of 50+ certified technicians delivers solutions that are designed to last, built to perform, and backed by our unwavering service commitment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl md:text-4xl font-black text-foreground text-center mb-12">
            What Drives Us
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <v.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl md:text-4xl font-black text-foreground text-center mb-12">
            Our Journey
          </motion.h2>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.08, duration: 0.5 } } }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-sm">
                  {m.year}
                </div>
                <div className="pt-3">
                  <p className="text-foreground font-medium">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Work With Us?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Whether it's a residential split AC or a commercial VRV system — we've got you covered.
          </p>
          <a
            href="tel:+919839171701"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Get a Free Consultation
          </a>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
);

export default About;
