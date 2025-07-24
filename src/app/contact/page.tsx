
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Loader2, Clock } from 'lucide-react';
import { sendContactEmailAction } from '@/app/actions/sendEmailAction';

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const result = await sendContactEmailAction(formData);

    if (result.success) {
      toast({
        title: 'Message Sent!',
        description: result.message,
      });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-20">
          <div className="container text-center animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Get In Touch</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              We're here to help. Whether you have a question about our packages or need visa assistance, our team is ready to answer your questions.
            </p>
          </div>
        </section>

        {/* Contact Details & Form Section */}
        <section className="py-16 md:py-24">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8 animate-slideInUp">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  Fill out the form and our team will get back to you within 24 hours. For urgent inquiries, please use the contact details below.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-accent" />
                  <a href="mailto:koshelitravel@gmail.com" className="text-lg hover:text-primary transition-colors">koshelitravel@gmail.com</a>
                </div>
                 <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-accent" />
                  <a href="tel:+97143538898" className="text-lg hover:text-primary transition-colors">04 353 8898</a>
                </div>
                 <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent mt-1" />
                  <p className="text-lg">
                    2 Al Raffa St - Al Fahidi - Dubai
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-accent mt-1" />
                  <p className="text-lg">
                    Everyday 9 AM to 10.30PM
                  </p>
                </div>
              </div>
               <div className="mt-8 rounded-lg overflow-hidden shadow-xl">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.213398491873!2d55.2857056753835!3d25.26330547766782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434b9b089e8f%3A0x7c7843e33f07973d!2sAl%20Raffa%20St!5e0!3m2!1sen!2sae!4v1719835773255"
                    width="100%" 
                    height="350" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy"
                    title="Google Maps Location - Dubai"
                    className="w-full"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-xl animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold text-primary mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" type="text" placeholder="e.g., Visa Assistance Inquiry" value={formData.subject} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" placeholder="Please describe your inquiry in detail..." value={formData.message} onChange={handleInputChange} rows={5} required />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
