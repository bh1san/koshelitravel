
"use client";

import { mockBlogArticles, type BlogArticle } from '@/lib/mock-data';
import { BlogCard } from './blog-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Newspaper, ArrowRight } from 'lucide-react';

export function LatestBlogsSection() {
  const latestPublishedArticles = mockBlogArticles
    .filter(article => article.status === 'published')
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3); // Get the top 3 latest published articles

  return (
    <section id="latest-blogs" className="py-12 md:py-16 bg-secondary">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3 flex items-center justify-center gap-2">
            <Newspaper className="w-8 h-8 text-accent" /> Latest From Our Blog
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Stay updated with our latest travel insights, tips, and destination highlights.
          </p>
        </div>
        
        {latestPublishedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestPublishedArticles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground">No blog posts yet. Check back soon!</p>
        )}

        {mockBlogArticles.filter(a => a.status === 'published').length > 3 && (
            <div className="text-center mt-10">
                 {/* Placeholder link, ideally this would go to a full /blog page */}
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="#">
                        View All Posts <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
