import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";

const ALLOWED_DOMAIN = "@sun-asterisk.com";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=failed`);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.session) {
    return NextResponse.redirect(`${origin}/login?error=failed`);
  }

  const email = data.session.user.email ?? "";

  if (!email.endsWith(ALLOWED_DOMAIN)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/login?error=unauthorized`);
  }

  return NextResponse.redirect(`${origin}/`);
}
