import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Sparkles, TrendingUp } from "lucide-react";
import { NewsCard } from "@/components/news/NewsCard";
import { CategoryFilter } from "@/components/news/CategoryFilter";
import {
  getFeaturedArticle,
  getArticlesByCategory,
  getTrendingTopics,
  newsCategories,
  type NewsCategory,
} from "@/lib/news-data";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | "All">("All");
  const featuredArticle = getFeaturedArticle();
  const filteredArticles = getArticlesByCategory(selectedCategory);
  const trendingTopics = getTrendingTopics();
  
  // Exclude featured article from the grid
  const latestArticles = filteredArticles.filter(
    (article) => article.id !== featuredArticle.id
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6">
            <Newspaper className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">News & Insights</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Smart Cities News Hub
          </h1>
          <p className="text-muted-foreground text-lg">
            Curated urban intelligence, not breaking news chaos
          </p>
        </motion.div>

        {/* Trending Topics */}
        {trendingTopics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl mx-auto mb-8"
          >
            <div className="card-urban p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Trending Topics</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (
                  <motion.button
                    key={topic}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(topic)}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-leaf/20 text-leaf border border-leaf/30 hover:bg-leaf/30 transition-colors"
                  >
                    {topic}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-8"
        >
          <CategoryFilter
            categories={newsCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* Featured Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Featured Story</h2>
          </div>
          <NewsCard article={featuredArticle} variant="featured" />
        </motion.div>

        {/* Latest News Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              {selectedCategory === "All" ? "Latest News" : `${selectedCategory} News`}
            </h2>
            <span className="text-sm text-muted-foreground">
              ({latestArticles.length} {latestArticles.length === 1 ? "article" : "articles"})
            </span>
          </div>

          {latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <NewsCard article={article} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card-urban p-12 text-center">
              <p className="text-muted-foreground">
                No articles found in this category. Try selecting a different category.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default News;
