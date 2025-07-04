export interface Sneakers {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite?: boolean;
  isAdded?: boolean;
  favoriteId?: number;
  parentId: number;
}
