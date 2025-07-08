
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { defaultSiteSettings } from '@/lib/mock-data';

// Define the path for our persistent settings file.
const settingsFilePath = path.join(process.cwd(), 'settings-store.json');

// Type for the settings structure
interface SiteSettings {
  banner: {
    imageUrl: string;
    title: string;
    subtitle: string;
  };
  promo: {
    imageUrl: string;
  };
}

/**
 * Reads the settings from the JSON file.
 * If the file doesn't exist, it returns the default settings.
 */
export async function readSettings(): Promise<SiteSettings> {
  try {
    const fileContent = await fs.readFile(settingsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    // If the file doesn't exist, that's okay. We'll use the defaults.
    if (error.code === 'ENOENT') {
      console.log('settings-store.json not found, using default settings.');
      return defaultSiteSettings;
    }
    // For any other errors, we should log them.
    console.error('Failed to read settings file:', error);
    // Fallback to defaults on error
    return defaultSiteSettings;
  }
}

/**
 * Writes the provided settings object to the JSON file.
 * @param data The full site settings object to save.
 */
export async function writeSettings(data: SiteSettings): Promise<void> {
  try {
    await fs.writeFile(settingsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write settings file:', error);
    throw new Error('Could not save settings to the server.');
  }
}
