
'use server';

import { revalidatePath } from 'next/cache';
import { readSettings, writeSettings } from '@/lib/settings-store';

interface BannerSettings {
    imageUrl: string;
    title: string;
    subtitle: string;
}

interface PromoSettings {
    imageUrl: string;
}

// NOTE: getSiteSettings has been removed from this file.
// Components now fetch data directly from `readSettings` in the settings-store.

// Action to update banner settings in the persistent store
export async function updateBannerSettings(data: BannerSettings) {
    console.log("Server Action: Updating banner settings with:", data);
    try {
        const currentSettings = await readSettings();
        currentSettings.banner = data;
        await writeSettings(currentSettings);

        // Invalidate the cache for the homepage to ensure the change is reflected.
        revalidatePath('/');
        revalidatePath('/admin/banner-settings');
        
        return { success: true, message: "Banner settings updated successfully." };
    } catch (error: any) {
        console.error("Error updating banner settings:", error);
        return { success: false, message: error.message || "An unexpected error occurred." };
    }
}

// Action to update promo settings in the persistent store
export async function updatePromoSettings(data: PromoSettings) {
    console.log("Server Action: Updating promo settings with:", data);
    try {
        const currentSettings = await readSettings();
        currentSettings.promo = data;
        await writeSettings(currentSettings);

        revalidatePath('/');
        revalidatePath('/admin/promo-settings');

        return { success: true, message: "Promo settings updated successfully." };
    } catch (error: any) {
        console.error("Error updating promo settings:", error);
        return { success: false, message: error.message || "An unexpected error occurred." };
    }
}

// This function is still needed for the admin pages to fetch initial data.
export async function getSiteSettings() {
    return readSettings();
}
