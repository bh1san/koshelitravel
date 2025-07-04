
'use server';

import { siteSettings } from '@/lib/mock-data';
import { revalidatePath } from 'next/cache';

interface BannerSettings {
    imageUrl: string;
    title: string;
    subtitle: string;
}

interface PromoSettings {
    imageUrl: string;
}

// Action to get the current settings
export async function getSiteSettings() {
    // Directly return the current, in-memory settings object.
    // This simulates reading from a database.
    return Promise.resolve(siteSettings);
}

// Action to update banner settings
export async function updateBannerSettings(data: BannerSettings) {
    console.log("Server Action: Updating banner settings with:", data);
    
    // In a real app, you'd save this to a database.
    // Here, we mutate the in-memory object.
    siteSettings.banner = data;
    
    // Invalidate the cache for the homepage to ensure the change is reflected.
    revalidatePath('/');
    
    return { success: true, message: "Banner settings updated successfully." };
}

// Action to update promo settings
export async function updatePromoSettings(data: PromoSettings) {
    console.log("Server Action: Updating promo settings with:", data);
    siteSettings.promo = data;
    revalidatePath('/');
    return { success: true, message: "Promo settings updated successfully." };
}
