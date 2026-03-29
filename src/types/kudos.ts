export interface KudoUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  department: string;
}

export interface Kudo {
  id: string;
  author_id: string;
  recipient_id: string;
  content: string;
  hashtags: string[];
  images: string[];
  hearts_count: number;
  created_at: string;
  updated_at: string;
  author: KudoUser;
  recipient: KudoUser;
  category?: string;
  is_hearted_by_me?: boolean;
}

export interface Heart {
  id: string;
  kudo_id: string;
  user_id: string;
}

export interface SecretBox {
  id: string;
  user_id: string;
  is_opened: boolean;
  opened_at: string | null;
}

export interface KudosStats {
  kudos_received: number;
  kudos_sent: number;
  hearts_received: number;
  secret_boxes_opened: number;
  secret_boxes_remaining: number;
}

export interface SpotlightEntry {
  user_id: string;
  name: string;
  kudos_count: number;
}

export interface SpotlightData {
  total_kudos: number;
  entries: SpotlightEntry[];
}

export interface Hashtag {
  id: string;
  name: string;
  slug: string;
}

export interface Department {
  id: string;
  name: string;
}
