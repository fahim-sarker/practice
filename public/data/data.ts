export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const data: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    description: "This is product 1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    description: "This is product 2",
  },
  {
    id: 3,
    name: "Product 3",
    price: 39.99,
    description: "This is product 3",
  },
];
