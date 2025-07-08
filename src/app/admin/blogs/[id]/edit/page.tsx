
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockBlogArticles, type BlogArticle } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Edit as EditIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from '@/components/admin/image-uploader';

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredImageAiHint, setFeaturedImageAiHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const foundArticle = mockBlogArticles.find(a => a.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
        setTitle(foundArticle.title);
        setSlug(foundArticle.slug);
        setContent(foundArticle.content);
        setAuthor(foundArticle.author);
        setStatus(foundArticle.status);
        setFeaturedImage(foundArticle.featuredImage || '');
        setFeaturedImageAiHint(foundArticle.featuredImageAiHint || '');
      }
    }
  }, [id]);
  
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug || slug === generateSlug(article?.title || '')) { 
        setSlug(generateSlug(newTitle));
    }
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const updatedArticleData = { 
        title, 
        slug: slug || generateSlug(title), 
        content, 
        author, 
        status,
        featuredImage: featuredImage || undefined,
        featuredImageAiHint: featuredImageAiHint || undefined,
    };

    console.log('Updating blog post:', { id, ...updatedArticleData });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const articleIndex = mockBlogArticles.findIndex(a => a.id === id);
    if (articleIndex !== -1) {
        mockBlogArticles[articleIndex] = {
            ...mockBlogArticles[articleIndex],
            ...updatedArticleData,
        };
    }

    setIsLoading(false);
    toast({
      title: "Blog Post Updated",
      description: `"${title}" has been successfully updated (simulated).`,
    });
    router.push('/admin/blogs');
  };

  if (!article && !id) {
    return <p>Loading article data...</p>;
  }
  
  if (!article && id) {
     return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Blog Post Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p>The blog post with ID "{id}" could not be found.</p>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" asChild>
                    <Link href="/admin/blogs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs</Link>
                </Button>
            </CardFooter>
        </Card>
     );
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/blogs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs</Link>
      </Button>
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><EditIcon /> Edit Blog Post</CardTitle>
          <CardDescription>Modify the details for "{article?.title}".</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={handleTitleChange} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
              <p className="text-xs text-muted-foreground mt-1">URL-friendly version of the title.</p>
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={10} required />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <div>
              <Label>Featured Image</Label>
              <ImageUploader 
                onUploadComplete={setFeaturedImage}
                currentImageUrl={featuredImage}
                folder="blogs"
              />
            </div>
            <div className="text-sm text-muted-foreground text-center">OR</div>
            <div>
              <Label htmlFor="featuredImageUrl">Or Paste Image URL</Label>
              <Input
                id="featuredImageUrl"
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://example.com/image.png"
              />
              <p className="text-xs text-muted-foreground mt-1">Pasting a URL here will override the uploaded image. The preview above will update.</p>
            </div>
            <div>
              <Label htmlFor="featuredImageAiHint">Featured Image AI Hint</Label>
              <Input 
                id="featuredImageAiHint" 
                value={featuredImageAiHint} 
                onChange={(e) => setFeaturedImageAiHint(e.target.value)} 
                placeholder="e.g., historical landmark" 
              />
               <p className="text-xs text-muted-foreground mt-1">Keywords to help describe the image (max 2 words).</p>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: 'draft' | 'published') => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
