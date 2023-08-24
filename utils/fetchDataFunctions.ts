import { productObject } from "@/app/products/page";
import { notFound } from "next/navigation";
import { CartItems } from "./StoreProvider";

export async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products");

  if (!res.ok) {
    notFound();
  }

  return await res.json();
}

export async function getFeaturedProducts() {
  const res = await fetch("http://localhost:3000/api/products");

  if (!res.ok) {
    notFound();
  }

  const products = await res.json();

  const featuredProducts = products.filter(
    (product: productObject) => product.isFeatured
  );

  return featuredProducts;
}

export async function getCategoryData(category: string) {
  const res = await fetch(
    `http://localhost:3000/api/products/category/${category}`
  );

  if (!res.ok) {
    notFound();
  }

  return await res.json();
}

export async function getProductData(category: string, slug: string) {
  const res = await fetch(
    `http://localhost:3000/api/products/category/${category}/${slug}`
  );

  if (!res.ok) {
    notFound();
  }

  return await res.json();
}

export async function getCartItems(cartItems: CartItems[]) {
  const res = await fetch(
    `/api/cart?cartItems=${encodeURIComponent(JSON.stringify(cartItems))}`
  );
  if (!res.ok) {
    notFound();
  }
  return await res.json();
}
