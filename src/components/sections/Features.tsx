import { motion } from "framer-motion";
import { 
  FlaskConical, 
  ShoppingBag, 
  MessageCircle, 
  Stethoscope,
  ArrowRight,
  Star,
  CheckCircle,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: FlaskConical,
    title: "Baby Gear Studio",
    description: "Independent, research-driven product reviews and comparisons. Side-by-side testing across safety, durability, ease of use, and value.",
    highlights: ["Expert Testing", "Video Demos", "Recall Alerts"],
    color: "bg-sage-100 text-sage-600",
    href: "#studio",
  },
  {
    icon: ShoppingBag,
    title: "Curated Marketplace",
    description: "Shop only Studio-tested and community-validated products. Stage-based bundles make it easy to get exactly what you need.",
    highlights: ["Vetted Products", "Stage Bundles", "Registry"],
    color: "bg-blush-100 text-rose-500",
    href: "#shop",
  },
  {
    icon: MessageCircle,
    title: "Community Forum",
    description: "A safe, moderated space organized by parenting stage. Connect with peers, share experiences, and get real support.",
    highlights: ["Stage-Based", "Anonymous Option", "Expert Q&A"],
    color: "bg-cream-200 text-amber-600",
    href: "#community",
  },
  {
    icon: Stethoscope,
    title: "Trusted Care Directory",
    description: "Find verified medical and wellness professionals. From pediatricians to lactation consultants, all credentials verified.",
    highlights: ["Verified Providers", "Real Reviews", "Easy Booking"],
    color: "bg-sage-100 text-sage-600",
    href: "#care",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function Features() {
  return (
    <section className="py-24 lg:py-32 bg-background" id="features">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-4 block"
          >
            Four Pillars of Support
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6"
          >
            Everything you need,
            <br />
            <span className="text-primary">one trusted place</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            No more juggling apps. NURTUR brings together expert guidance, vetted commerce, peer support, and care provider access.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative bg-card rounded-3xl p-8 lg:p-10 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.color} mb-6`}>
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-6">
                {feature.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={feature.href}
                className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
