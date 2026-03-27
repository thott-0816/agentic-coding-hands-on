import { cookies } from "next/headers";
import { getLocale, getDictionary } from "@/libs/i18n/config";
import { ActiveHeader, ActiveFooter } from "@/components/common/active-link-provider";
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
      <ActiveHeader dictionary={dictionary} locale={locale} variant="full" />
      {children}
      <ActiveFooter dictionary={dictionary} variant="full" />
      <WidgetButton dictionary={dictionary} />
    </>
  );
}
