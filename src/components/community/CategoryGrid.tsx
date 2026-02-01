import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Baby,
  Calendar,
  Moon,
  Sun,
  Footprints,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: string;
  name: string;
  description: string | null;
  stage: string | null;
  icon: string | null;
  display_order: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  sparkles: Sparkles,
  baby: Baby,
  calendar: Calendar,
  moon: Moon,
  sun: Sun,
  footprints: Footprints,
};

const stageColors: Record<string, { bg: string; text: string; border: string }> = {
  "trying-to-conceive": { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200" },
  "pregnancy-first-trimester": { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
  "pregnancy-second-trimester": { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  "pregnancy-third-trimester": { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  newborn: { bg: "bg-azure-50", text: "text-azure-600", border: "border-azure-200" },
  infant: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  toddler: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200" },
};

interface CategoryGridProps {
  selectedCategoryId: string | null;
  onSelectCategory: (id: string) => void;
}

export function CategoryGrid({ selectedCategoryId, onSelectCategory }: CategoryGridProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["forum-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_categories")
        .select("*")
        .order("display_order");
      
      if (error) throw error;
      return data as Category[];
    },
  });

  if (selectedCategoryId) {
    return null; // Hide grid when a category is selected
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-2">
          Browse by stage
        </h2>
        <p className="text-muted-foreground">
          Find discussions relevant to your parenting journey
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories?.map((category, index) => {
          const IconComponent = iconMap[category.icon || "heart"] || Heart;
          const colors = stageColors[category.stage || ""] || stageColors.newborn;

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectCategory(category.id)}
              className={`group p-6 rounded-2xl border-2 ${colors.border} ${colors.bg} 
                hover:shadow-lg transition-all duration-300 text-left hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} 
                flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <IconComponent className={`w-6 h-6 ${colors.text}`} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
