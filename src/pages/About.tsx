import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WatercolorCloud } from "@/components/decorations/WatercolorCloud";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          {/* Decorative clouds */}
          <WatercolorCloud className="top-8 left-[5%]" size="lg" delay={0} />
          <WatercolorCloud className="top-20 right-[10%]" size="md" delay={0.3} />
          <WatercolorCloud className="bottom-10 left-[15%]" size="sm" delay={0.6} />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4"
            >
              About The Little Voyage
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              A steady hand through the journey of parenthood
            </motion.p>
          </div>
        </section>

        {/* Founder's Note Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
                  A Note from the Founder
                </h2>
                
                <div className="font-serif text-foreground/90 space-y-6 text-lg leading-relaxed">
                  <p>
                    Parenthood begins long before the first sleepless night or the first stroller walk. It begins in the questions—the quiet wondering, the endless research, the hope of getting it right.
                  </p>
                  
                  <p>
                    The Little Voyage was created for that moment.
                  </p>
                  
                  <p>
                    I wanted to build a space that feels steady and reassuring—a place where new and expectant parents can slow down, feel informed, and move forward with confidence. Not louder opinions. Not endless lists. Just thoughtful guidance, honest reviews, and a sense that someone is walking beside you.
                  </p>
                  
                  <p>
                    Every recommendation here is rooted in care, research, and lived experience. We take our time so you don't have to rush. We believe choosing for your family should feel empowering, not overwhelming.
                  </p>
                  
                  <p>
                    This journey is deeply personal. You deserve a guide that respects that.
                  </p>
                  
                  <p className="font-medium">
                    Welcome to The Little Voyage.<br />
                    We're glad you're here.
                  </p>
                  
                  <p className="text-2xl mt-8">
                    —
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
