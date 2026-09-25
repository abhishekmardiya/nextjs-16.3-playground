const API = "https://fakestoreapi.com/products";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export async function getProducts(): Promise<Product[]> {
  "use cache";

  const response = await fetch(API);
  return response.json();
}

export async function getProduct(id: string): Promise<Product | null> {
  "use cache";

  const response = await fetch(`${API}/${id}`);
  if (!response.ok) return null;

  // Unknown ids come back as 200 with an empty body
  const body = await response.text();
  return body ? JSON.parse(body) : null;
}
