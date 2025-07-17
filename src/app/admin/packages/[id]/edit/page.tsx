
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Loader2, Package } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { TravelPackage } from '@/lib/mock-data';
import { getPackageById, updatePackage } from '@/app/actions/packageActions';
import { ImageUploader } from '@/components/admin/image-uploader';

export default function EditPackagePage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const { toast } = useToast();

    const [pkg, setPkg] = useState<TravelPackage | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        if (id && typeof id === 'string') {
            const fetchPackage = async () => {
                setIsLoading(true);
                const foundPackage = await getPackageById(id);
                if (foundPackage) {
                    setPkg(foundPackage);
                } else {
                    setIsNotFound(true);
                }
                setIsLoading(false);
            };
            fetchPackage();
        }
    }, [id]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!pkg) return;
        setPkg({ ...pkg, [e.target.id]: e.target.value });
    };

    const handleSelectChange = (name: keyof TravelPackage, value: string) => {
        if (!pkg) return;
        setPkg({ ...pkg, [name]: value });
    };

    const handleImageUploadComplete = (url: string) => {
        if (!pkg) return;
        setPkg({ ...pkg, image: url });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!pkg) return;
        setIsSubmitting(true);

        const result = await updatePackage(pkg);

        if (result.success) {
            toast({
                title: "Package Updated",
                description: `"${pkg.title}" has been successfully updated.`,
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

    if (isLoading) {
        return <div className="text-center p-10"><Loader2 className="mr-2 h-6 w-6 animate-spin mx-auto" /> Loading package data...</div>;
    }

    if (isNotFound) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Package Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>The travel package with ID "{id}" could not be found.</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" asChild>
                        <Link href="/admin/packages"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Packages List</Link>
                    </Button>
                </CardFooter>
            </Card>
        );
    }
    
    if (!pkg) return null;

    return (
        <div className="space-y-6">
            <Button variant="outline" size="sm" asChild className="mb-4">
                <Link href="/admin/packages"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Packages</Link>
            </Button>
            <Card className="max-w-2xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Package /> Edit Travel Package</CardTitle>
                    <CardDescription>Modify the details for "{pkg.title}".</CardDescription>
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
                                <Input id="price" value={pkg.price} onChange={handleFormChange} placeholder="$1500" required />
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
                        <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
