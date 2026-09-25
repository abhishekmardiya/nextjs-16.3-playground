import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the product catalog from the Fake Store API.",
};

export default async function Home() {
  "use cache";

  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10 flex flex-col gap-4 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between dark:border-white/10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Next.js 16.3 Preview
          </h1>
        </div>

        <Link
          href="/form"
          className="inline-flex items-center gap-2 self-start rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black/80 sm:self-auto dark:bg-white dark:text-black dark:hover:bg-white/80"
        >
          Go to Form<span aria-hidden>→</span>
        </Link>
      </header>

      <section className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
          >
            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-linear-to-br from-black/5 to-black/0 p-6 dark:from-white/10 dark:to-white/0">
              <Image
                width={100}
                height={100}
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                loading={index < 6 ? "eager" : "lazy"}
              />
              <span className="absolute top-3 left-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-medium capitalize text-black/70 shadow-sm backdrop-blur dark:bg-black/50 dark:text-white/70">
                {product.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 p-4">
              <h2 className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug">
                {product.title}
              </h2>

              <span className="flex items-center gap-1 text-xs text-black/60 dark:text-white/60">
                <span aria-hidden className="text-amber-500">
                  ★
                </span>
                {product.rating.rate}
                <span className="text-black/40 dark:text-white/40">
                  ({product.rating.count})
                </span>
              </span>

              <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-3 dark:border-white/5">
                <span className="text-base font-bold">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
