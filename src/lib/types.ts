export interface User {
  name: string;
  avatar: string;
  location: string;
}

export interface SkillRequest {
  id: string;
  user: User;
  skillOffered: string;
  skillRequested: string;
  status: 'pending' | 'accepted' | 'declined';
  type: 'incoming' | 'outgoing';
}

export interface SkillOffer {
  id: string;
  user: User;
  skill: string;
  description: string;
}
