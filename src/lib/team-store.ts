
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import type { TeamMember } from '@/lib/mock-data';
import { unstable_noStore as noStore } from 'next/cache';

const storePath = path.join(process.cwd(), 'team-store.json');

const defaultTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Alice Wonderland',
    role: 'Founder & CEO',
    bio: 'Alice is a visionary leader with over 15 years of experience in the travel industry, passionate about creating unforgettable journeys.',
    image: 'https://placehold.co/300x300.png',
    dataAiHint: 'woman portrait professional'
  },
  {
    id: 'team-2',
    name: 'Bob The Builder',
    role: 'Head of Operations',
    bio: 'Bob ensures every trip runs smoothly, focusing on logistics and customer satisfaction with meticulous attention to detail.',
    image: 'https://placehold.co/300x300.png',
    dataAiHint: 'man portrait friendly'
  },
  {
    id: 'team-3',
    name: 'Carol Danvers',
    role: 'Lead Travel Consultant',
    bio: 'Carol crafts personalized travel itineraries, leveraging her extensive knowledge of global destinations and hidden gems.',
    image: 'https://placehold.co/300x300.png',
    dataAiHint: 'woman smiling travel'
  },
  {
    id: 'team-4',
    name: 'David Copperfield',
    role: 'Marketing Manager',
    bio: 'David brings the magic of KosheliTravel to the world, sharing inspiring stories and connecting with fellow adventurers.',
    image: 'https://placehold.co/300x300.png',
    dataAiHint: 'man creative professional'
  }
];


export async function readTeamMembers(): Promise<TeamMember[]> {
  noStore();
  try {
    const fileContent = await fs.readFile(storePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('team-store.json not found, initializing with default data.');
      await writeTeamMembers(defaultTeamMembers);
      return defaultTeamMembers;
    }
    console.error('Failed to read team store:', error);
    throw new Error('Could not read team data.');
  }
}

export async function writeTeamMembers(data: TeamMember[]): Promise<void> {
  try {
    await fs.writeFile(storePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write team store:', error);
    throw new Error('Could not save team data.');
  }
}
