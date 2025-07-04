export interface Sneaker {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite?: boolean;
  isAdded?: boolean;
  favoriteId?: number | null;
  parentId?: number | null;
}
