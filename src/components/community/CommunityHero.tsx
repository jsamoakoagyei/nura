import { motion } from "framer-motion";
import { Users, MessageCircle, Heart } from "lucide-react";

export function CommunityHero() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-azure-50 to-background" />
      
      {/* Floating decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-10 w-32 h-32 bg-azure-200 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-10 right-20 w-48 h-48 bg-blush-200 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-azure-100 text-azure-600 text-sm font-medium mb-6"
          >
            <Users className="w-4 h-4" />
            Join 10,000+ parents
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6"
          >
            Your parenting{" "}
            <span className="text-gradient">community</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Connect with parents at every stage. Share experiences, ask questions,
            and find support from those who truly understand.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 lg:gap-12"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-azure-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-azure-600" />
              </div>
              <div className="text-left">
                <p className="font-serif text-2xl font-semibold text-foreground">10k+</p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blush-100 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blush-300" />
              </div>
              <div className="text-left">
                <p className="font-serif text-2xl font-semibold text-foreground">50k+</p>
                <p className="text-sm text-muted-foreground">Discussions</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cream-100 flex items-center justify-center">
                <Heart className="w-6 h-6 text-rose-400" />
              </div>
              <div className="text-left">
                <p className="font-serif text-2xl font-semibold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Feel supported</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
