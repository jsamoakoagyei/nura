import { cn } from "@/lib/utils";

interface ProductImagePlaceholderProps {
  category: string;
  className?: string;
}

const CATEGORY_EMOJI: Record<string, string> = {
  stroller: "🚀",
  "infant-car-seat": "🚗",
};

export function ProductImagePlaceholder({
  category,
  className,
}: ProductImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "w-full h-full bg-gradient-to-br from-blush-100 via-azure-100 to-cream-100 flex items-center justify-center",
        className
      )}
    >
      <span className="text-3xl">{CATEGORY_EMOJI[category] || "📦"}</span>
    </div>
  );
}
