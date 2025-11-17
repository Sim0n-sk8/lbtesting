import InfoCentreListPage from '../../../../../../src/app/pages/InfoCentreListPage';
import { getSiteSettings } from '../../../../../../src/lib/getSiteSettings';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id, practiceId } = await Promise.resolve(params);

  // Fetch site settings to get the practice name
  const siteSettings = await getSiteSettings(practiceId);
  const practiceName = siteSettings?.practiceName || 'Your Practice';

  // Fetch category details to get the category name
  let categoryName = 'Info Centre'; // Default category name
  let categoryDescription = 'Detailed information'; // Default description
  try {
    const categoryResponse = await fetch(`https://www.ocumail.com/api/section_categories/${id}`);
    if (categoryResponse.ok) {
      const currentCategory = await categoryResponse.json();
      if (currentCategory?.name) {
        categoryName = currentCategory.name;
        categoryDescription = currentCategory.body.replace(/<[^>]*>/g, "").trim();
      }
    }
  } catch (error) {
    console.error('Failed to fetch category details:', error);
  }

  return {
    title: `${categoryName} | ${practiceName}`,
    description: categoryDescription,
  };
}

export default async function PracticeInfoCentreListPage({ params }) {
  // Destructure params in an async context
  const { id } = await Promise.resolve(params);
  
  return <InfoCentreListPage category={id} />;
}
