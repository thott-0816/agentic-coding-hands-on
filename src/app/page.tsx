import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // TODO: Replace with Homepage SAA when implemented
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">Welcome, {user.email}</p>
    </div>
  );
}
