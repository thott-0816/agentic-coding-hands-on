import { cookies } from "next/headers";
import { getLocale, getDictionary } from "@/libs/i18n/config";
import { PrelaunchCountdown } from "@/components/countdown/prelaunch-countdown";

export default async function CountdownPage() {
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore.get("lang")?.value);
  const dictionary = getDictionary(locale);

  return <PrelaunchCountdown dictionary={dictionary} />;
}
