
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, PlusCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { mockBlogArticles, type BlogArticle } from '@/lib/mock-data'; 

export default function NewBlogPostPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Admin'); 
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredImageAiHint, setFeaturedImageAiHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const newArticle: Omit<BlogArticle, 'id' | 'publishedDate'> & { publishedDate?: string } = {
      title,
      slug: slug || generateSlug(title),
      content,
      author,
      status,
      featuredImage: featuredImage || undefined,
      featuredImageAiHint: featuredImageAiHint || undefined,
    };
    
    console.log('Creating new blog post:', newArticle);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const fullNewArticle: BlogArticle = {
        ...newArticle,
        id: `blog-${Date.now()}`, 
        publishedDate: new Date().toISOString().split('T')[0], 
    };
    mockBlogArticles.push(fullNewArticle);


    setIsLoading(false);
    toast({
      title: "Blog Post Created",
      description: `"${title}" has been successfully created (simulated).`,
    });
    router.push('/admin/blogs');
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/blogs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs</Link>
      </Button>
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><PlusCircle /> Create New Blog Post</CardTitle>
          <CardDescription>Fill in the details for your new article or news item.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={handleTitleChange} required />
            </div>
             <div>
              <Label htmlFor="slug">Slug (URL-friendly version of title)</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated or custom-slug" />
               <p className="text-xs text-muted-foreground mt-1">If left empty, will be auto-generated from title.</p>
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
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input 
                id="featuredImage" 
                type="url"
                value={featuredImage} 
                onChange={(e) => setFeaturedImage(e.target.value)} 
                placeholder="https://example.com/your-image.png" 
              />
            </div>
            {featuredImage && (
                <div className="mt-2">
                    <Label>Image Preview:</Label>
                    <div className="mt-1 border rounded-md p-2 flex justify-center items-center bg-muted/30 max-h-64 overflow-hidden">
                        <img 
                            src={featuredImage} 
                            alt="Featured Image Preview" 
                            className="max-w-full max-h-56 object-contain rounded"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const errorMsg = document.createElement('p');
                                errorMsg.textContent = 'Preview not available or image URL is invalid.';
                                errorMsg.className = 'text-destructive text-xs';
                                target.parentNode?.appendChild(errorMsg);
                            }}
                        />
                    </div>
                </div>
            )}
            <div>
              <Label htmlFor="featuredImageAiHint">Featured Image AI Hint</Label>
              <Input 
                id="featuredImageAiHint" 
                value={featuredImageAiHint} 
                onChange={(e) => setFeaturedImageAiHint(e.target.value)} 
                placeholder="e.g., mountain landscape" 
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
            <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Post</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
