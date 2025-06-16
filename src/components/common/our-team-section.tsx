
"use client";

import { mockTeamMembers } from '@/lib/mock-data';
import { TeamMemberCard } from './team-member-card';
import { Users } from 'lucide-react';

export function OurTeamSection() {
  return (
    <section id="our-team" className="py-12 md:py-16 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3 flex items-center justify-center gap-2">
            <Users className="w-8 h-8 text-accent" /> Meet Our Dedicated Team
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            The passionate professionals behind your unforgettable travel experiences.
          </p>
        </div>
        
        {mockTeamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {mockTeamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground">Team information coming soon!</p>
        )}
      </div>
    </section>
  );
}
