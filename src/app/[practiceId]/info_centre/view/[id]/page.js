import InfoItemPage from './page.jsx';
import { getSiteSettings } from '../../../../../lib/getSiteSettings';

export async function generateMetadata({ params }) {
  const { id, practiceId } = params;

  // Fetch site settings to get the practice name
  const siteSettings = await getSiteSettings(practiceId);
  const practiceName = siteSettings?.practiceName || 'Your Practice';

  // Fetch item details to get the item name and body
  let itemName = 'Info Centre'; // Default item name
  let itemDescription = 'Detailed information'; // Default description
  try {
    const itemResponse = await fetch(`https://www.ocumail.com/api/section_items/${id}`);
    if (itemResponse.ok) {
      const currentItem = await itemResponse.json();
      if (currentItem?.name) {
        itemName = currentItem.name;
        itemDescription = currentItem.body.replace(/<[^>]*>/g, "").trim();
      }
    }
  } catch (error) {
    console.error('Failed to fetch item details:', error);
  }

  return {
    title: `${itemName} | ${practiceName}`,
    description: itemDescription,
  };
}

export default function Page(props) {
  return <InfoItemPage {...props} />;
}
