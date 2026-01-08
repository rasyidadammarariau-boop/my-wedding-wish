import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PricingPlan } from "@/data/pricing";

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

const PricingCard = ({ plan, index }: PricingCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative bg-card rounded-2xl overflow-hidden transition-all duration-300 ${
        plan.isPopular
          ? "shadow-hover border-2 border-primary scale-105"
          : "shadow-card border border-border hover:shadow-hover"
      }`}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-rose py-2 text-center">
          <span className="text-primary-foreground text-sm font-medium flex items-center justify-center gap-1">
            <Star className="h-4 w-4 fill-current" />
            Paling Populer
          </span>
        </div>
      )}

      <div className={`p-8 ${plan.isPopular ? "pt-14" : ""}`}>
        {/* Plan Name */}
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          {plan.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          {plan.description}
        </p>

        {/* Price */}
        <div className="mb-8">
          <span className="font-display text-4xl font-bold text-foreground">
            {plan.price}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <span className="text-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={plan.isPopular ? "hero" : "elegant"}
          size="lg"
          className="w-full"
          onClick={() => navigate("/register")}
        >
          {plan.buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
