
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { TeamMember } from '@/lib/mock-data';
import { UserCircle } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="bg-card shadow-lg rounded-lg overflow-hidden h-full flex flex-col text-center items-center animate-slideInUp">
      <CardHeader className="p-4 items-center">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={120}
            height={120}
            className="rounded-full object-cover border-4 border-primary/20"
            data-ai-hint={member.dataAiHint || 'person portrait'}
          />
        ) : (
          <UserCircle className="w-28 h-28 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col flex-grow items-center">
        <CardTitle className="text-xl font-headline font-semibold mb-1 text-primary">{member.name}</CardTitle>
        <p className="text-sm text-accent font-medium mb-2">{member.role}</p>
        <CardDescription className="text-xs text-foreground/80 text-center flex-grow">{member.bio}</CardDescription>
      </CardContent>
    </Card>
  );
}
