
'use client';

import Link from 'next/link';
import { mockBlogArticles, type BlogArticle } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function AdminBlogsPage() {
  const articles = mockBlogArticles; // In a real app, fetch this data
  const { toast } = useToast();

  const handleDelete = (articleId: string, articleTitle: string) => {
    // Simulate deletion
    console.log(`Deleting blog post: ${articleId}`);
    // In a real app, update data source here
    // For mock data, this won't persist.
    const articleIndex = mockBlogArticles.findIndex(a => a.id === articleId);
    if (articleIndex !== -1) {
        // This is a mock deletion, won't reflect in the UI without state update
        // mockBlogArticles.splice(articleIndex, 1);
    }
    toast({
      title: "Blog Post Deleted (Simulated)",
      description: `"${articleTitle}" has been marked for deletion. Data persistence not implemented.`,
      variant: "destructive",
    });
    // To refresh UI, you'd typically re-fetch or manage state
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Manage Blog Posts</h1>
          <p className="text-muted-foreground">Create, edit, and publish blog articles and news.</p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/admin/blogs/new"><PlusCircle className="mr-2" /> Create New Post</Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>Current blog posts and news articles in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {articles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>
                      <Badge variant={article.status === 'published' ? 'default' : 'secondary'}
                             className={article.status === 'published' ? 'bg-green-500/20 text-green-700' : 'bg-yellow-500/20 text-yellow-700'}
                      >
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{article.publishedDate}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/blogs/${article.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </Button>
                       <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id, article.title)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No blog posts found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
