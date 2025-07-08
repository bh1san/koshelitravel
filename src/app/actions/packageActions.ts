
'use server';
import { revalidatePath } from 'next/cache';
import { readPackages, writePackages } from '@/lib/package-store';
import type { TravelPackage } from '@/lib/mock-data';

export async function getPackageById(id: string): Promise<TravelPackage | null> {
  const packages = await readPackages();
  return packages.find(p => p.id === id) || null;
}

export async function updatePackage(updatedPkg: TravelPackage): Promise<{ success: boolean; message: string }> {
    try {
        const packages = await readPackages();
        const packageIndex = packages.findIndex(p => p.id === updatedPkg.id);

        if (packageIndex === -1) {
            return { success: false, message: 'Package not found.' };
        }

        packages[packageIndex] = updatedPkg;
        await writePackages(packages);

        revalidatePath('/');
        revalidatePath('/admin/packages');
        revalidatePath(`/admin/packages/${updatedPkg.id}/edit`);
        
        return { success: true, message: 'Package updated successfully.' };
    } catch (error: any) {
        console.error("Failed to update package:", error);
        return { success: false, message: 'Failed to update package on the server.' };
    }
}
