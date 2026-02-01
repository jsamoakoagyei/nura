import { motion } from "framer-motion";
import { Baby, Sparkles, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Sparkles,
    title: "Tell us about your journey",
    description: "Share your due date or child's age, preferences, and what matters most to you.",
  },
  {
    number: "02",
    icon: Baby,
    title: "Get personalized guidance",
    description: "Receive stage-appropriate content, product recommendations, and community connections.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Parent with confidence",
    description: "Access trusted resources, shop with certainty, and connect with expert care when needed.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-azure-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-medium mb-4 block"
            >
              Simple & Personalized
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground"
            >
              How nura works
            </motion.h2>
          </div>

          {/* Steps */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center lg:text-left"
              >
                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}

                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary text-primary-foreground mb-6 relative">
                  <step.icon className="w-8 h-8" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blush-200 text-foreground text-sm font-semibold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button variant="hero" size="xl">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
