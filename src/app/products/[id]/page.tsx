import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductDetailSkeleton } from "@/components/Skeleton";
import { getProduct, getProducts } from "@/lib/products";

// Cache Components needs at least one param (an empty array is a build error).
// Every other product is generated on first visit or prefetch (ISR).
// A placeholder param (e.g. "__placeholder__" + notFound()) would skip this build, but then the build only validates the not-found path, so a real product render that misuses runtime APIs would fail at request time instead of at build.
// https://nextjs.org/docs/messages/empty-generate-static-params#option-2-use-a-placeholder-param
export async function generateStaticParams() {
  const products = await getProducts();
  return products.slice(0, 1).map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({
  params,
}: Pick<PageProps<"/products/[id]">, "params">): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return { title: "Product not found" };

  return {
    title: product.title,
    description: product.description,
  };
}

const ProductDetails = async ({
  params,
}: Pick<PageProps<"/products/[id]">, "params">) => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <article className="grid gap-10 md:grid-cols-2">
      <div className="flex aspect-square items-center justify-center rounded-3xl border border-black/10 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-white/5">
        <Image
          width={400}
          height={400}
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain"
          loading="eager"
        />
      </div>

      <div className="flex flex-col gap-5">
        <span className="self-start rounded-full bg-black/5 px-3 py-1 text-xs font-medium capitalize text-black/70 dark:bg-white/10 dark:text-white/70">
          {product.category}
        </span>

        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          {product.title}
        </h1>

        <span className="flex items-center gap-1 text-sm text-black/60 dark:text-white/60">
          <span aria-hidden className="text-amber-500">
            ★
          </span>
          {product.rating.rate}
          <span className="text-black/40 dark:text-white/40">
            ({product.rating.count} reviews)
          </span>
        </span>

        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>

        <p className="border-t border-black/5 pt-5 leading-relaxed text-black/70 dark:border-white/5 dark:text-white/70">
          {product.description}
        </p>
      </div>
    </article>
  );
};

export default function ProductPage({ params }: PageProps<"/products/[id]">) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
      >
        <span aria-hidden>←</span>Back to products
      </Link>

      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
    </main>
  );
}
