"use client";

import { useState } from "react";
import { ArticlesGrid } from "@/components/sections/news/ArticlesGrid";
import { CategoryTabs, type NewsTab } from "@/components/sections/news/CategoryTabs";
import { FeaturedArticle, type NewsArticle } from "@/components/sections/news/FeaturedArticle";
import { useTranslation } from "@/hooks/useTranslation";

const TAB_TO_CATEGORY: Partial<Record<NewsTab, string>> = {
  announcements: "announcement",
  events: "event",
  achievements: "achievement",
  charity: "charity",
};

export function NewsContent() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<NewsTab>("all");

  const articles = (t("news.articles") as NewsArticle[]) ?? [];
  const featured = articles.find((article) => article.featured);
  const category = TAB_TO_CATEGORY[activeTab];
  const visible = articles.filter(
    (article) => !article.featured && (!category || article.category === category),
  );

  return (
    <div>
      <FeaturedArticle article={featured ?? articles[0]} />
      <CategoryTabs active={activeTab} onChange={setActiveTab} />
      <ArticlesGrid articles={visible} />
    </div>
  );
}
