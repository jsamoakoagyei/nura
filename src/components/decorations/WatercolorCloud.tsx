import { motion } from "framer-motion";

interface WatercolorCloudProps {
  className?: string;
  variant?: "light" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  delay?: number;
}

const sizeMap = {
  sm: { width: 120, height: 60 },
  md: { width: 200, height: 100 },
  lg: { width: 300, height: 150 },
  xl: { width: 450, height: 220 },
};

export function WatercolorCloud({
  className = "",
  variant = "light",
  size = "md",
  delay = 0,
}: WatercolorCloudProps) {
  const dimensions = sizeMap[size];
  const gradientId = `cloud-gradient-${variant}-${size}-${delay}`;
  const filterId = `cloud-blur-${variant}-${size}-${delay}`;

  // Colors based on variant
  const colors =
    variant === "light"
      ? {
          primary: "hsl(var(--azure-200))",
          secondary: "hsl(var(--azure-100))",
          opacity: 0.25,
        }
      : {
          primary: "hsla(0, 0%, 100%, 0.15)",
          secondary: "hsla(0, 0%, 100%, 0.05)",
          opacity: 0.35,
        };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: colors.opacity,
        x: [-3, 3, -3],
      }}
      transition={{
        opacity: { duration: 2, delay },
        x: {
          duration: 20 + delay * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      className={`absolute pointer-events-none ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <svg
        viewBox="0 0 200 100"
        className="w-full h-full"
        style={{ filter: `blur(${size === "sm" ? 15 : size === "md" ? 20 : 25}px)` }}
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
            <stop offset="40%" stopColor={colors.secondary} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0" />
          </radialGradient>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>
        {/* Organic cloud shape made of overlapping ellipses */}
        <g filter={`url(#${filterId})`}>
          <ellipse cx="70" cy="55" rx="45" ry="30" fill={`url(#${gradientId})`} />
          <ellipse cx="100" cy="45" rx="50" ry="35" fill={`url(#${gradientId})`} />
          <ellipse cx="140" cy="55" rx="40" ry="28" fill={`url(#${gradientId})`} />
          <ellipse cx="55" cy="50" rx="30" ry="22" fill={`url(#${gradientId})`} />
          <ellipse cx="115" cy="60" rx="35" ry="25" fill={`url(#${gradientId})`} />
          <ellipse cx="85" cy="40" rx="38" ry="26" fill={`url(#${gradientId})`} />
        </g>
      </svg>
    </motion.div>
  );
}
