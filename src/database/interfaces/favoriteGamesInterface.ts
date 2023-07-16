export interface IFavoriteGame {
  doc_id?: string;
  user_uid: string;
  game_id: number;
  rating?: number;
  is_favorite: boolean;
}
