import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StrollerCarousel } from "@/components/studio/StrollerCarousel";
import { Button } from "@/components/ui/button";

export default function Studio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-azure-50 via-background to-blush-50">
      <Navbar />
      
      {/* Main content */}
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <Link to="/">
              <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mb-4">
              The Baby Gear Studio
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore strollers through real parent experiences. 
              Swipe to discover what works in everyday life.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StrollerCarousel />
          </motion.div>

          {/* Instruction hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            Swipe, drag, or use arrow keys to explore
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
