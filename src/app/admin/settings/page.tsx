
// This is a placeholder page. The actual content is in the layout.
// We can redirect or show a summary here.
import { redirect } from 'next/navigation';

export default function SettingsPage() {
  // Redirect to the first settings tab by default
  redirect('/admin/settings/banner');
}
