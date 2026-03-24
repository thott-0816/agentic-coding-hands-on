import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import { cookies } from "next/headers";
import type { Locale } from "@/types/i18n";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SAA 2025 — Sun Annual Awards",
  description: "Sun Annual Awards 2025 — Root Further",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("lang")?.value as Locale) || "vi";

  return (
    <html lang={locale === "vi" ? "vi" : "en"}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${montserrat.variable} ${montserratAlternates.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
