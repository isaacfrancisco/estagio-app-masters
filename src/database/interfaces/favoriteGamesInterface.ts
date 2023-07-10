export interface IFavoriteGame {
  doc_id?: string;
  user_uid: string;
  user_email: string;
  game_id: number;
  game_title: string;
  rating?: number;
}
