import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GTProvider } from "gt-next";
import { getLocale } from "gt-next/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const locales = ["en", "es", "fr", "ja", "zh"];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const titles: Record<string, string> = {
    en: "<Static> & declareStatic() Demo | GT",
    es: "Demo de <Static> y declareStatic() | GT",
    fr: "Démo <Static> et declareStatic() | GT",
    ja: "<Static> と declareStatic() デモ | GT",
    zh: "<Static> 和 declareStatic() 演示 | GT",
  };

  const descriptions: Record<string, string> = {
    en: "Interactive demo of General Translation's <Static> and declareStatic() for grammatical agreement across languages",
    es: "Demo interactiva de <Static> y declareStatic() de General Translation para la concordancia gramatical entre idiomas",
    fr: "Démo interactive de <Static> et declareStatic() de General Translation pour l'accord grammatical entre les langues",
    ja: "General Translation の <Static> と declareStatic() による言語間の文法一致のインタラクティブデモ",
    zh: "General Translation 的 <Static> 和 declareStatic() 跨语言语法一致性交互式演示",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;
  const baseUrl = "https://static-demo.generaltranslation.dev";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale,
      type: "website",
      url: locale === "en" ? baseUrl : `${baseUrl}/${locale}`,
    },
    alternates: {
      canonical: locale === "en" ? baseUrl : `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, l === "en" ? baseUrl : `${baseUrl}/${l}`])
      ),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} antialiased`}>{
        <GTProvider>{children}</GTProvider>
      }</body>
    </html>
  );
}
