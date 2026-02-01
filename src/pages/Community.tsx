import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommunityHero } from "@/components/community/CommunityHero";
import { CategoryGrid } from "@/components/community/CategoryGrid";
import { ForumSection } from "@/components/community/ForumSection";

export default function Community() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 lg:pt-20">
        <CommunityHero />
        
        <section className="container mx-auto px-4 py-12 lg:py-16">
          <CategoryGrid
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
          
          <ForumSection
            categoryId={selectedCategoryId}
            onBack={() => setSelectedCategoryId(null)}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
