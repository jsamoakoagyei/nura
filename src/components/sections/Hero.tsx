import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

// Bubble component for decorative background
function Bubble({ className, delay = 0, duration = 8, size = 40 }: { className?: string; delay?: number; duration?: number; size?: number }) {
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0, scale: 0.5 }}
      animate={{ 
        y: "-100vh", 
        opacity: [0, 0.4, 0.6, 0.4, 0],
        scale: [0.5, 0.8, 1, 0.9, 0.7]
      }}
      transition={{ 
        duration, 
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute rounded-full bg-gradient-to-br from-azure-200/40 to-azure-400/20 backdrop-blur-sm border border-azure-200/30 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <Bubble className="left-[5%]" delay={0} duration={10} size={60} />
        <Bubble className="left-[15%]" delay={2} duration={12} size={30} />
        <Bubble className="left-[25%]" delay={1} duration={9} size={45} />
        <Bubble className="left-[40%]" delay={3} duration={11} size={25} />
        <Bubble className="left-[55%]" delay={0.5} duration={10} size={50} />
        <Bubble className="left-[70%]" delay={2.5} duration={13} size={35} />
        <Bubble className="left-[80%]" delay={1.5} duration={9} size={40} />
        <Bubble className="left-[90%]" delay={4} duration={12} size={28} />
        <Bubble className="left-[35%]" delay={5} duration={14} size={55} />
        <Bubble className="left-[65%]" delay={6} duration={11} size={32} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-azure-100 text-azure-700 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-azure-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-azure-500"></span>
            </span>
            Trusted by 50,000+ parents
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-foreground mb-6"
          >
            Parenthood is full of decisions.
            <br />
            <span className="text-primary">nura</span> helps you make the right ones.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
          >
            Real-world reviews, expert insight, and parent-to-parent wisdom—without the noise, ads, or pressure.
          </motion.p>

          {/* Support Line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-sm sm:text-base text-muted-foreground/80 max-w-xl mx-auto mb-10"
          >
            Built for expecting and new parents navigating baby gear, services, and care with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="hero" size="xl">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="hero-outline" size="xl">
              See how nura works
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Expert Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>Parent Trusted</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Community Powered</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
