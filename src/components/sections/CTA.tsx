import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-sage-500 to-sage-600" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-8"
          >
            <Leaf className="w-4 h-4" />
            Join our growing community
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6"
          >
            Ready to parent
            <br />
            with confidence?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Join thousands of parents who've found calm in the chaos. Start free today and experience the difference trusted guidance makes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 shadow-xl"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
