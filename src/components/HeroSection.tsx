import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: "10,000+", label: "Pasangan Bahagia" },
    { icon: Sparkles, value: "50+", label: "Template Elegan" },
    { icon: Heart, value: "99%", label: "Kepuasan Pelanggan" },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Wedding decoration"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-rose-light rounded-full blur-3xl opacity-60 animate-float" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-gold-light rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-rose-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4 fill-current" />
              Platform Undangan Pernikahan #1 di Indonesia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Buat Undangan
            <br />
            <span className="text-gradient-rose">Pernikahan Impian</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Desain undangan digital yang elegan, mudah dibagikan, dan berkesan. 
            Pilih dari puluhan template premium yang siap pakai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="hero" size="xl" onClick={() => navigate("/templates")}>
              Lihat Template
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="elegant" size="xl" onClick={() => navigate("/pricing")}>
              Lihat Harga
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
