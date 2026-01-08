import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Template } from "@/data/templates";

interface TemplateCardProps {
  template: Template;
  index: number;
}

const TemplateCard = ({ template, index }: TemplateCardProps) => {
  const navigate = useNavigate();

  const categoryColors: Record<string, string> = {
    Basic: "bg-muted text-muted-foreground",
    Premium: "bg-primary/10 text-primary",
    Exclusive: "bg-gold/10 text-gold",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-rose-light">
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        {/* Placeholder Design */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl text-primary">{template.name}</h3>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className={categoryColors[template.category]}>
            {template.category}
          </Badge>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Button
            variant="hero"
            size="sm"
            onClick={() => navigate(template.demoUrl)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Lihat Demo
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          {template.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {template.features.length > 3 && (
            <span className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-full">
              +{template.features.length - 3} lagi
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-primary">
            {template.price}
          </span>
          <Button variant="elegant" size="sm" onClick={() => navigate("/register")}>
            Pilih
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
