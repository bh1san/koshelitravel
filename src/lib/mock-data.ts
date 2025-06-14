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

export const mockTravelPackages: TravelPackage[] = [
  {
    id: '1',
    title: 'Parisian Dreams',
    destination: 'Paris, France',
    description: 'Experience the magic of Paris, from the Eiffel Tower to charming Montmartre. Includes museum passes and a Seine river cruise.',
    price: '$1200',
    duration: '7 Days',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'paris eiffel tower',
    date: '2024-09-10',
    budgetCategory: 'mid-range',
    tags: ['europe', 'city break', 'romance']
  },
  {
    id: '2',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    description: 'Explore the vibrant culture of Tokyo, from ancient temples to futuristic skyscrapers. Includes a guided tour of Tsukiji Market.',
    price: '$2200',
    duration: '10 Days',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'tokyo japan',
    date: '2024-10-05',
    budgetCategory: 'luxury',
    tags: ['asia', 'culture', 'foodie']
  },
  {
    id: '3',
    title: 'Roman Holiday',
    destination: 'Rome, Italy',
    description: 'Discover ancient wonders and culinary delights in the heart of Italy. Colosseum and Vatican City tours included.',
    price: '$1500',
    duration: '8 Days',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'rome colosseum',
    date: '2024-11-20',
    budgetCategory: 'mid-range',
    tags: ['europe', 'history', 'culture']
  },
  {
    id: '4',
    title: 'Bali Bliss',
    destination: 'Bali, Indonesia',
    description: 'Relax on stunning beaches, explore lush rice paddies, and immerse yourself in Balinese culture. Yoga retreat option available.',
    price: '$900',
    duration: '10 Days',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'bali beach',
    date: '2025-01-15',
    budgetCategory: 'budget',
    tags: ['asia', 'beach', 'relaxation', 'nature']
  },
  {
    id: '5',
    title: 'NYC Explorer',
    destination: 'New York, USA',
    description: 'Experience the city that never sleeps. Includes Broadway show tickets and a visit to the Statue of Liberty.',
    price: '$1800',
    duration: '7 Days',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'new york city',
    date: '2024-12-01',
    budgetCategory: 'luxury',
    tags: ['north america', 'city break', 'entertainment']
  },
  {
    id: '6',
    title: 'Santorini Sunsets',
    destination: 'Santorini, Greece',
    description: 'Witness breathtaking sunsets over the Aegean Sea from your cliffside villa. Includes island hopping and wine tasting.',
    price: '$2500',
    duration: '7 Days',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'santorini greece',
    date: '2024-09-25',
    budgetCategory: 'luxury',
    tags: ['europe', 'beach', 'romance', 'luxury']
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'KosheliTravel planned the most incredible trip to Italy for us! Every detail was perfect, and the AI recommendations were surprisingly spot on.',
    author: 'Sarah L.',
    location: 'New York, USA',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'happy person'
  },
  {
    id: '2',
    quote: 'Our family vacation to Bali was a dream come true, thanks to the amazing team at KosheliTravel. The kids loved it!',
    author: 'John B.',
    location: 'London, UK',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'smiling family'
  },
  {
    id: '3',
    quote: 'I used the AI tool to find a unique destination, and it suggested a hidden gem in Portugal. Best solo trip ever!',
    author: 'Maria G.',
    location: 'Toronto, Canada',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'traveler selfie'
  },
];
