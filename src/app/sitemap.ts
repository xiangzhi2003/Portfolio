import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://chiangxiangzhi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new URL(siteUrl);
  const lastModified = new Date();

  const paths = ["/"];

  return paths.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified,
  }));
}
