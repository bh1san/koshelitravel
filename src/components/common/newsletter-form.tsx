"use client";

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Newsletter subscription for:', email);
    toast({
      title: "Subscribed!",
      description: "You've successfully subscribed to our newsletter.",
    });
    setEmail('');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email for newsletter"
        className="bg-card flex-grow"
      />
      <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading} aria-label="Subscribe to newsletter">
        <Mail size={16} />
        <span className="ml-2">{isLoading ? 'Subscribing...' : 'Subscribe'}</span>
      </Button>
    </form>
  );
}
