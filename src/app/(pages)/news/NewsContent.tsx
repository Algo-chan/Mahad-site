"use client";

import { useState } from "react";
import { ArticlesGrid } from "@/components/sections/news/ArticlesGrid";
import { CategoryTabs, type NewsTab } from "@/components/sections/news/CategoryTabs";
import { FeaturedArticle, type NewsArticle } from "@/components/sections/news/FeaturedArticle";

const TAB_TO_CATEGORY: Partial<Record<NewsTab, string>> = {
  announcements: "announcement",
  events: "event",
  achievements: "achievement",
  charity: "charity",
};

export function NewsContent({ articles }: { articles: NewsArticle[] }) {
  const [activeTab, setActiveTab] = useState<NewsTab>("all");

  const featured = articles.find((article) => article.featured) ?? articles[0];
  const category = TAB_TO_CATEGORY[activeTab];
  const visible = articles.filter(
    (article) => !article.featured && (!category || article.category === category),
  );

  return (
    <div>
      {featured ? <FeaturedArticle article={featured} /> : null}
      <CategoryTabs active={activeTab} onChange={setActiveTab} />
      <ArticlesGrid articles={visible} />
    </div>
  );
}
