import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TemplateCard from "@/components/TemplateCard";
import PricingCard from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import { templates } from "@/data/templates";
import { pricingPlans } from "@/data/pricing";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "Template Premium",
      description: "Puluhan template elegan yang siap pakai untuk hari spesial Anda",
    },
    {
      icon: Zap,
      title: "Mudah & Cepat",
      description: "Buat undangan dalam hitungan menit tanpa perlu keahlian desain",
    },
    {
      icon: Shield,
      title: "Aman & Terpercaya",
      description: "Data Anda aman dengan sistem keamanan tingkat tinggi",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mengapa <span className="text-gradient-rose">WeddingKu?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami menyediakan solusi undangan digital terbaik dengan berbagai keunggulan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-card text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Template <span className="text-gradient-rose">Populer</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lihat koleksi template terbaik kami yang telah digunakan ribuan pasangan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.slice(0, 3).map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="elegant" size="lg" onClick={() => navigate("/templates")}>
              Lihat Semua Template
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pilih <span className="text-gradient-rose">Paket</span> Anda
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Harga terjangkau untuk undangan impian Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-rose rounded-3xl p-12 text-center shadow-hover"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Siap Membuat Undangan?
            </h2>
            <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8">
              Bergabunglah dengan ribuan pasangan yang telah mempercayakan undangan mereka kepada kami
            </p>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => navigate("/register")}
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              Mulai Sekarang - Gratis!
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
