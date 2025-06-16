
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BlogArticle } from '@/lib/mock-data';
import { CalendarDays, UserCircle, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  article: BlogArticle;
}

export function BlogCard({ article }: BlogCardProps) {
  const snippet = article.content.substring(0, 150) + (article.content.length > 150 ? "..." : "");

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg animate-fadeIn h-full">
      <CardHeader className="p-0 relative">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            width={600}
            height={300} // Adjust height for blog card aspect ratio
            className="object-cover w-full h-48 md:h-52"
            data-ai-hint={article.featuredImageAiHint || 'blog topic'}
          />
        ) : (
          <div className="w-full h-48 md:h-52 bg-muted flex items-center justify-center">
            <UserCircle className="w-16 h-16 text-muted-foreground" /> {/* Placeholder icon */}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-lg md:text-xl font-headline font-semibold mb-2 text-primary">{article.title}</CardTitle>
        <div className="flex items-center text-xs text-muted-foreground mb-2 space-x-2">
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            <span>{new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <UserCircle size={14} />
            <span>{article.author}</span>
          </div>
        </div>
        <CardDescription className="text-sm text-foreground/80 mb-3 flex-grow line-clamp-3">
          {snippet}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {/* Placeholder link, ideally this would go to /blog/[slug] */}
        <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/10 hover:text-primary">
          <Link href={`#`}> 
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
