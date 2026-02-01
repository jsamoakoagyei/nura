import * as React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { feedbackSave, feedbackUnsave } from "@/lib/feedback";

interface SaveButtonProps {
  isSaved: boolean;
  onToggle: () => void;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "card";
  className?: string;
}

const SaveButton = React.forwardRef<HTMLButtonElement, SaveButtonProps>(
  ({ isSaved, onToggle, size = "default", variant = "default", className }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-12 w-12",
    };

    const iconSizes = {
      sm: "w-4 h-4",
      default: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const variantClasses = {
      default: "bg-white/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg",
      card: "bg-white/80 backdrop-blur-sm hover:bg-white",
    };

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();

      // Trigger appropriate feedback based on current state
      if (isSaved) {
        feedbackUnsave();
      } else {
        feedbackSave();
      }

      onToggle();
    };

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={cn(
          "rounded-full transition-all",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        aria-label={isSaved ? "Remove from gear list" : "Save to gear list"}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isSaved ? [1, 1.3, 1] : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
          }}
        >
          <Heart
            className={cn(
              iconSizes[size],
              "transition-colors duration-200",
              isSaved
                ? "fill-rose-500 text-rose-500"
                : "fill-transparent text-muted-foreground"
            )}
          />
        </motion.div>
      </Button>
    );
  }
);

SaveButton.displayName = "SaveButton";

export { SaveButton };
