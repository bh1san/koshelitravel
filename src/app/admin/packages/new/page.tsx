
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
import { ArrowLeft, Save, Loader2, PackagePlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { TravelPackage } from '@/lib/mock-data';
import { ImageUploader } from '@/components/admin/image-uploader';
import { addPackage } from '@/app/actions/packageActions';

export default function NewPackagePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [pkg, setPkg] = useState<Partial<TravelPackage>>({
        title: '',
        destination: '',
        description: '',
        price: '',
        duration: '',
        image: 'https://placehold.co/600x400.png',
        date: '',
        budgetCategory: 'mid-range',
        tags: [],
        dataAiHint: ''
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPkg({ ...pkg, [e.target.id]: e.target.value });
    };

     const handleSelectChange = (name: keyof TravelPackage, value: string) => {
        setPkg({ ...pkg, [name]: value });
    };

    const handleImageUploadComplete = (url: string) => {
        setPkg({ ...pkg, image: url });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        const newPackageData: TravelPackage = {
            id: `pkg-${Date.now()}`,
            ...pkg
        } as TravelPackage;

        const result = await addPackage(newPackageData);

        if (result.success) {
            toast({
                title: "Package Added",
                description: `"${newPackageData.title}" has been successfully added.`,
            });
            router.push('/admin/packages');
        } else {
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
            });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="space-y-6">
            <Button variant="outline" size="sm" asChild className="mb-4">
                <Link href="/admin/packages"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Packages</Link>
            </Button>
            <Card className="max-w-2xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PackagePlus /> Add New Travel Package</CardTitle>
                    <CardDescription>Fill in the details for the new travel package.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                     <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={pkg.title} onChange={handleFormChange} required />
                        </div>
                        <div>
                            <Label htmlFor="destination">Destination</Label>
                            <Input id="destination" value={pkg.destination} onChange={handleFormChange} required />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={pkg.description} onChange={handleFormChange} rows={4} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" value={pkg.price} onChange={handleFormChange} placeholder="e.g., 5500 AED" required />
                            </div>
                            <div>
                                <Label htmlFor="duration">Duration</Label>
                                <Input id="duration" value={pkg.duration} onChange={handleFormChange} placeholder="e.g., 7 Days" required />
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" value={pkg.date} onChange={handleFormChange} required />
                            </div>
                            <div>
                                <Label htmlFor="budgetCategory">Budget Category</Label>
                                <Select onValueChange={(value) => handleSelectChange('budgetCategory', value)} value={pkg.budgetCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="budget">Budget</SelectItem>
                                        <SelectItem value="mid-range">Mid-Range</SelectItem>
                                        <SelectItem value="luxury">Luxury</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label>Package Image</Label>
                            <ImageUploader
                                onUploadComplete={handleImageUploadComplete}
                                currentImageUrl={pkg.image}
                                folder="packages"
                            />
                        </div>
                        <div>
                            <Label htmlFor="image">Or Paste Image URL</Label>
                            <Input id="image" value={pkg.image} onChange={handleFormChange} />
                        </div>
                        <div>
                            <Label htmlFor="dataAiHint">Image AI Hint</Label>
                            <Input id="dataAiHint" value={pkg.dataAiHint || ''} onChange={handleFormChange} placeholder="e.g. paris eiffel tower" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Adding...</> : <><Save className="mr-2 h-4 w-4" /> Add Package</>}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
