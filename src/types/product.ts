export interface IProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  status: "active" | "inactive";
  isFavorite: boolean;
  createdAt: string;
}
