export interface CardProps {
  doc_id?: string;
  id: number;
  image: string;
  title: string;
  description: string;
  is_favorite: boolean | undefined;
  rating: number;
}
