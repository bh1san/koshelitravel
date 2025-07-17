
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import type { TravelPackage } from '@/lib/mock-data';
import { unstable_noStore as noStore } from 'next/cache';

const storePath = path.join(process.cwd(), 'package-store.json');

export async function readPackages(): Promise<TravelPackage[]> {
  noStore();
  try {
    const fileContent = await fs.readFile(storePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // If the file doesn't exist, it means something is wrong,
      // as it should be part of the project.
      // Return an empty array to prevent a crash and log a severe error.
      console.error('CRITICAL: package-store.json is missing.');
      return [];
    }
    console.error('Failed to read package store:', error);
    throw new Error('Could not read package data.');
  }
}

export async function writePackages(data: TravelPackage[]): Promise<void> {
  try {
    await fs.writeFile(storePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write package store:', error);
    throw new Error('Could not save package data.');
  }
}
