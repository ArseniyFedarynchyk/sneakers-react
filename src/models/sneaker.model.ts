export interface Sneaker {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  isFavorite?: boolean;
  isAdded?: boolean;
  favoriteId?: number | null;
  parentId?: number | null;
}
