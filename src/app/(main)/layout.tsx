import { cookies } from "next/headers";
import { getLocale, getDictionary } from "@/libs/i18n/config";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { WidgetButton } from "@/components/common/widget-button";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore.get("lang")?.value);
  const dictionary = getDictionary(locale);

  return (
    <>
      <Header dictionary={dictionary} locale={locale} variant="full" activeLink="/" />
      {children}
      <Footer dictionary={dictionary} variant="full" />
      <WidgetButton dictionary={dictionary} />
    </>
  );
}
