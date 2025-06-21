import type { SkillRequest, SkillOffer } from '@/lib/types';

export const dummyRequests: SkillRequest[] = [
  {
    id: 'req1',
    user: { name: 'Elena Rodriguez', avatar: 'https://placehold.co/100x100/E8D5C4/8D8D8D.png', location: 'Madrid, Spain' },
    skillOffered: 'Spanish Cuisine',
    skillRequested: 'Advanced CSS',
    status: 'pending',
    type: 'incoming',
  },
  {
    id: 'req2',
    user: { name: 'Kenji Tanaka', avatar: 'https://placehold.co/100x100/C4E8D5/8D8D8D.png', location: 'Tokyo, Japan' },
    skillOffered: 'Origami Art',
    skillRequested: 'Python for Data Science',
    status: 'accepted',
    type: 'outgoing',
  },
  {
    id: 'req3',
    user: { name: 'Fatima Al-Fassi', avatar: 'https://placehold.co/100x100/D5C4E8/8D8D8D.png', location: 'Dubai, UAE' },
    skillOffered: 'Digital Marketing',
    skillRequested: 'Introduction to 3D Modeling',
    status: 'declined',
    type: 'incoming',
  },
  {
    id: 'req4',
    user: { name: 'David Chen', avatar: 'https://placehold.co/100x100/E8E8C4/8D8D8D.png', location: 'New York, USA' },
    skillOffered: 'Financial Modeling',
    skillRequested: 'Public Speaking',
    status: 'pending',
    type: 'outgoing',
  },
];

export const dummyOffers: SkillOffer[] = [
  {
    id: 'offer1',
    user: { name: 'Maria Garcia', avatar: 'https://placehold.co/100x100/FFC0CB/8D8D8D.png', location: 'Barcelona, Spain' },
    skill: 'Salsa Dancing',
    description: 'Learn the basics of Salsa, including steps, turns, and rhythm. No partner required!',
  },
  {
    id: 'offer2',
    user: { name: 'John Smith', avatar: 'https://placehold.co/100x100/ADD8E6/8D8D8D.png', location: 'London, UK' },
    skill: 'Creative Writing',
    description: 'Unlock your storytelling potential. I can help with plot development, character arcs, and prose styling.',
  },
  {
    id: 'offer3',
    user: { name: 'Aisha Khan', avatar: 'https://placehold.co/100x100/F0E68C/8D8D8D.png', location: 'Mumbai, India' },
    skill: 'Indian Cooking',
    description: 'Master the art of Indian spices and create delicious, authentic dishes from scratch.',
  },
  {
    id: 'offer4',
    user: { name: 'Lucas Müller', avatar: 'https://placehold.co/100x100/90EE90/8D8D8D.png', location: 'Berlin, Germany' },
    skill: 'Music Production with Ableton',
    description: 'From beat making to final mixdown, I can guide you through producing your own electronic music tracks.',
  },
    {
    id: 'offer5',
    user: { name: 'Chloé Dubois', avatar: 'https://placehold.co/100x100/DDA0DD/8D8D8D.png', location: 'Paris, France' },
    skill: 'French Language',
    description: 'Conversational French for beginners to intermediates. Let\'s practice together!',
  },
  {
    id: 'offer6',
    user: { name: 'Samuel Jones', avatar: 'https://placehold.co/100x100/87CEEB/8D8D8D.png', location: 'Sydney, Australia' },
    skill: 'Surf Fundamentals',
    description: 'Catch your first wave! I provide beginner-friendly surf lessons focusing on safety and fun.',
  },
];
