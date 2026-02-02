import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The Little Voyage completely changed how I approached my pregnancy. The Studio reviews saved me from so many impulse purchases, and the community made me feel less alone.",
    author: "Sarah M.",
    role: "First-time Mom",
    avatar: "S",
  },
  {
    quote: "Finally, one app that does it all. I found my daughter's pediatrician through the Care Directory and couldn't be happier. The verification process gave me real peace of mind.",
    author: "Michael T.",
    role: "Father of Two",
    avatar: "M",
  },
  {
    quote: "The stage-based bundles were a lifesaver. I knew exactly what to buy for each phase, and everything was actually tested and recommended by real parents.",
    author: "Jessica L.",
    role: "Expecting Parent",
    avatar: "J",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-4 block"
          >
            Loved by Parents
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6"
          >
            Stories from our community
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-1 mb-2"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            4.9 out of 5 based on 2,500+ reviews
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative bg-card rounded-3xl p-8 border border-border"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-azure-200 mb-4" />

              {/* Quote Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
