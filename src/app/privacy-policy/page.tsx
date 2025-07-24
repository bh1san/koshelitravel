
"use client";

import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [lastModifiedDate, setLastModifiedDate] = useState('');

  useEffect(() => {
    setLastModifiedDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-10 md:mb-12 animate-fadeIn">
            <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-3">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how KosheliTravel collects, uses, and protects your personal information.
            </p>
          </div>

          <div className="max-w-4xl mx-auto text-foreground/90 bg-card p-6 md:p-10 rounded-lg shadow-xl space-y-8 animate-slideInUp">
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">1. Introduction</h2>
              <p>Welcome to KosheliTravel. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.</p>
            </section>
            
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">2. Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide to us when you register on the website, inquire about our travel packages, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us. This may include:</p>
              <ul className="list-disc list-inside pl-5 space-y-1 mt-2">
                <li>Name and Contact Data (e.g., email address, phone number).</li>
                <li>Travel Preferences and History.</li>
                <li>Payment Information (processed securely by third-party payment gateways).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">3. How We Use Your Information</h2>
              <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We use the information we collect or receive:</p>
              <ul className="list-disc list-inside pl-5 space-y-1 mt-2">
                <li>To facilitate account creation and logon process.</li>
                <li>To provide, operate, and maintain our travel services.</li>
                <li>To send administrative information to you.</li>
                <li>To personalize your travel recommendations.</li>
                <li>To respond to user inquiries/offer support to users.</li>
                <li>To send you marketing and promotional communications.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">8. Your Privacy Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, update, or delete your information. Please contact us to exercise these rights.</p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">9. Policy Updates</h2>
              <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last modified" date. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
              {lastModifiedDate && <p className="mt-2 text-sm text-muted-foreground">This policy was last modified on {lastModifiedDate}.</p>}
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">10. Contacting Us</h2>
              <p>If you have questions or comments about this notice, you may contact us by email at koshelitravel@gmail.com.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
