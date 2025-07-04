
"use client";

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { sendContactEmailAction } from '@/app/actions/sendEmailAction';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmissionStatus(null);

    try {
      const result = await sendContactEmailAction(formData);
      if (result.success) {
        setSubmissionStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        setSubmissionStatus({ type: 'error', message: result.message }); // Set local error message
        toast({ // Use toast for errors
          variant: "destructive",
          title: "Message Not Sent",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      const errorMessage = "An unexpected error occurred. Please try again later.";
      setSubmissionStatus({ type: 'error', message: errorMessage });
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-secondary">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">Get In Touch</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Have questions or ready to book your next adventure? Contact us today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll respond as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="bg-card border-input-border"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                  <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="bg-card border-input-border"/>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                  <Input id="subject" type="text" placeholder="Inquiry about Paris package" value={formData.subject} onChange={handleChange} required className="bg-card border-input-border"/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <Textarea id="message" placeholder="Your message here..." value={formData.message} onChange={handleChange} rows={5} required className="bg-card border-input-border"/>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Send Message
                </Button>
              </form>
              {submissionStatus && (
                <p className={`mt-4 text-sm ${submissionStatus.type === 'success' ? 'text-green-600' : 'text-destructive font-medium'}`}>
                  {submissionStatus.message}
                </p>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline">Direct Contact</CardTitle>
                <CardDescription>Reach us directly through phone or email.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-foreground/90">
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+971 4 353 8898</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>info@koshelitravel.com</span>
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>2 Al Raffa St - Al Fahidi - Dubai</span>
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Office Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-foreground/90 text-sm">
                    <p>Everyday: 9:00 AM - 11:00 PM</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
