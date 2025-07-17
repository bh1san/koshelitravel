
export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  date: string; // For filtering, example: "2024-08-15"
  budgetCategory: 'budget' | 'mid-range' | 'luxury'; // For filtering
  tags: string[];
  dataAiHint?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location?: string;
  image?: string;
  dataAiHint?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string; // for URL generation
  content: string;
  author: string;
  publishedDate: string; // "YYYY-MM-DD"
  status: 'draft' | 'published';
  tags?: string[];
  featuredImage?: string;
  featuredImageAiHint?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string; // URL for the image
  dataAiHint?: string;
}

export interface VisaOption {
  id: string;
  title: string;
  description: string;
  iconIdentifier: 'tourist' | 'business' | 'family' | 'student' | 'general';
}


// This object now serves as the default, initial configuration.
// The live settings are managed in `settings-store.json`.
export const defaultSiteSettings = {
  logoUrl: '',
  banner: {
    imageUrl: 'https://placehold.co/1920x1080.png',
    title: 'Your Next Adventure Awaits',
    subtitle: 'Discover breathtaking destinations and create unforgettable memories with KosheliTravel. Personalized plans, expert advice, and exclusive deals.',
  },
  promo: {
    imageUrl: 'https://placehold.co/1080x1080.png',
    enabled: true,
  }
};

// Travel Packages are now managed via `package-store.json`
// and the functions in `lib/package-store.ts`

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'KosheliTravel planned the most incredible trip to Italy for us! Every detail was perfect, and the AI recommendations were surprisingly spot on.',
    author: 'Sarah L.',
    location: 'New York, USA',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman smiling professional'
  },
  {
    id: '2',
    quote: 'Our family vacation to Bali was a dream come true, thanks to the amazing team at KosheliTravel. The kids loved it!',
    author: 'John B.',
    location: 'London, UK',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'family beach vacation'
  },
  {
    id: '3',
    quote: 'I used the AI tool to find a unique destination, and it suggested a hidden gem in Portugal. Best solo trip ever!',
    author: 'Maria G.',
    location: 'Toronto, Canada',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman solo traveler'
  },
];

export let mockBlogArticles: BlogArticle[] = [
  {
    id: 'blog-1',
    title: 'Top 5 Summer Destinations for 2024',
    slug: 'top-5-summer-destinations-2024',
    content: 'Discover the hottest places to visit this summer. From sunny beaches to cool mountain retreats, we have got you covered with insider tips and must-see attractions. Explore vibrant cultures and create unforgettable memories.',
    author: 'Admin TravelExpert',
    publishedDate: '2024-05-15',
    status: 'published',
    tags: ['summer', 'travel', 'vacation'],
    featuredImage: 'https://placehold.co/600x400.png',
    featuredImageAiHint: 'summer beach resort'
  },
  {
    id: 'blog-2',
    title: 'A Guide to Budget Travel in Southeast Asia',
    slug: 'guide-budget-travel-southeast-asia',
    content: 'Traveling on a budget? Southeast Asia offers incredible experiences without breaking the bank. Here is how to navigate bustling markets, ancient temples, and stunning natural landscapes while keeping your expenses low.',
    author: 'Admin Backpacker',
    publishedDate: '2024-06-22', 
    status: 'published',
    tags: ['budget travel', 'asia', 'adventure'],
    featuredImage: 'https://placehold.co/600x400.png',
    featuredImageAiHint: 'asia temple mountains'
  },
  {
    id: 'blog-3',
    title: 'Unveiling New Luxury Packages to the Maldives',
    slug: 'unveiling-new-luxury-packages-maldives',
    content: 'We are excited to announce our new lineup of luxury travel packages to the Maldives. Experience the world in style with overwater bungalows, private beaches, and world-class dining. Your ultimate escape awaits.',
    author: 'KosheliTravel Team',
    publishedDate: '2024-07-01', 
    status: 'published',
    tags: ['luxury', 'new', 'packages', 'maldives'],
    featuredImage: 'https://placehold.co/600x400.png',
    featuredImageAiHint: 'maldives luxury villa'
  },
  {
    id: 'blog-4',
    title: 'Exploring the Culinary Scene in Italy',
    slug: 'exploring-culinary-scene-italy',
    content: 'A deep dive into the delicious world of Italian cuisine. From pasta making in Tuscany to street food in Naples, get ready for a gastronomic journey. We will share our favorite spots and local secrets.',
    author: 'Chef Giovanni',
    publishedDate: '2024-03-10',
    status: 'published',
    tags: ['food', 'italy', 'culture'],
    featuredImage: 'https://placehold.co/600x400.png',
    featuredImageAiHint: 'italy food pasta'
  },
   {
    id: 'blog-5',
    title: 'Upcoming: Adventure Treks in Nepal',
    slug: 'upcoming-adventure-treks-nepal',
    content: 'Get ready for breathtaking views and challenging trails. We are currently finalizing our new adventure trekking packages in the Himalayas. Stay tuned for details on routes, difficulty levels, and booking information.',
    author: 'Admin Explorer',
    publishedDate: '2024-07-15',
    status: 'draft',
    tags: ['trekking', 'nepal', 'adventure', 'coming soon'],
    featuredImage: 'https://placehold.co/600x400.png',
    featuredImageAiHint: 'nepal mountains trekking'
  }
];

export let mockVisaOptions: VisaOption[] = [
  {
    id: 'visa-opt-1',
    title: 'Tourist Visa',
    description: 'Explore new destinations for leisure and tourism. We assist with applications for various countries.',
    iconIdentifier: 'tourist'
  },
  {
    id: 'visa-opt-2',
    title: 'Business Visa',
    description: 'Travel for business meetings, conferences, or exploring new ventures. Streamlined processing available.',
    iconIdentifier: 'business'
  },
  {
    id: 'visa-opt-3',
    title: 'Family Visit Visa',
    description: 'Visit your loved ones abroad. We help navigate the requirements for family sponsorship and invitations.',
    iconIdentifier: 'family'
  },
  {
    id: 'visa-opt-4',
    title: 'Student Visa',
    description: 'Pursue your educational goals overseas. Guidance on application, documentation, and university requirements.',
    iconIdentifier: 'student'
  }
];
